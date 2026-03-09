package middleware

import (
	"context"
	"crypto/subtle"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"setara/api/store"
)

type contextKey string

const OrgIDKey contextKey = "org_id"

// rateLimiter tracks request counts per IP
type rateLimiter struct {
	mu       sync.Mutex
	requests map[string][]time.Time
	limit    int
	window   time.Duration
}

func newRateLimiter(limit int, window time.Duration) *rateLimiter {
	return &rateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
}

func (rl *rateLimiter) allow(key string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-rl.window)

	// Remove expired entries
	valid := rl.requests[key][:0]
	for _, t := range rl.requests[key] {
		if t.After(cutoff) {
			valid = append(valid, t)
		}
	}

	if len(valid) >= rl.limit {
		rl.requests[key] = valid
		return false
	}

	rl.requests[key] = append(valid, now)
	return true
}

var (
	publicLimiter = newRateLimiter(30, time.Minute)  // 30 req/min for public endpoints
	orgLimiter    = newRateLimiter(60, time.Minute)   // 60 req/min for authenticated org endpoints
	adminLimiter  = newRateLimiter(120, time.Minute)  // 120 req/min for admin endpoints
)

func getClientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		parts := strings.SplitN(xff, ",", 2)
		return strings.TrimSpace(parts[0])
	}
	if xri := r.Header.Get("X-Real-IP"); xri != "" {
		return xri
	}
	return r.RemoteAddr
}

// RateLimit applies rate limiting based on client IP
func RateLimit(rl *rateLimiter) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := getClientIP(r)
			if !rl.allow(ip) {
				http.Error(w, `{"error":"rate limit exceeded, try again later"}`, http.StatusTooManyRequests)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// PublicRateLimit for public endpoints
func PublicRateLimit(next http.Handler) http.Handler {
	return RateLimit(publicLimiter)(next)
}

// APIKeyAuth authenticates orgs via X-API-Key header
func APIKeyAuth(db *store.Store) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		rlHandler := RateLimit(orgLimiter)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method == "OPTIONS" {
				next.ServeHTTP(w, r)
				return
			}
			apiKey := r.Header.Get("X-API-Key")
			if apiKey == "" {
				auth := r.Header.Get("Authorization")
				if strings.HasPrefix(auth, "Bearer ") {
					apiKey = strings.TrimPrefix(auth, "Bearer ")
				}
			}

			if apiKey == "" {
				http.Error(w, `{"error":"missing API key"}`, http.StatusUnauthorized)
				return
			}

			org, err := db.GetOrgByAPIKey(apiKey)
			if err != nil {
				log.Printf("AUTH: failed API key attempt from %s", getClientIP(r))
				http.Error(w, `{"error":"invalid API key"}`, http.StatusUnauthorized)
				return
			}

			if !org.IsActive {
				http.Error(w, `{"error":"organization is inactive"}`, http.StatusForbidden)
				return
			}

			ctx := context.WithValue(r.Context(), OrgIDKey, org.ID)
			next.ServeHTTP(w, r.WithContext(ctx))
		}))
		return rlHandler
	}
}

// SuperAdminAuth authenticates super admin via X-Admin-Secret header
func SuperAdminAuth(adminSecret string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		rlHandler := RateLimit(adminLimiter)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method == "OPTIONS" {
				next.ServeHTTP(w, r)
				return
			}
			if adminSecret == "" {
				http.Error(w, `{"error":"admin API not configured"}`, http.StatusServiceUnavailable)
				return
			}

			secret := r.Header.Get("X-Admin-Secret")
			if secret == "" {
				http.Error(w, `{"error":"missing admin secret"}`, http.StatusUnauthorized)
				return
			}

			if subtle.ConstantTimeCompare([]byte(secret), []byte(adminSecret)) != 1 {
				log.Printf("AUDIT: failed admin auth attempt from %s", getClientIP(r))
				http.Error(w, `{"error":"invalid admin secret"}`, http.StatusUnauthorized)
				return
			}

			log.Printf("AUDIT: admin authenticated from %s %s %s", getClientIP(r), r.Method, r.URL.Path)
			next.ServeHTTP(w, r)
		}))
		return rlHandler
	}
}

func JSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

// SecurityHeaders adds standard security headers
func SecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		w.Header().Set("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'")
		next.ServeHTTP(w, r)
	})
}

// CORS with configurable allowed origins
func CORS(next http.Handler) http.Handler {
	allowedOrigins := map[string]bool{
		"https://setara.network":          true,
		"https://www.setara.network":      true,
		"https://admin.setara.network":    true,
		"https://explorer.setara.network": true,
		"https://kridaepramaan.org":       true,
		"http://localhost:3000":           true,
		"http://localhost:5173":           true,
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-API-Key, X-Admin-Secret, Authorization")
		w.Header().Set("Access-Control-Max-Age", "86400")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// MaxBodySize limits request body size
func MaxBodySize(maxBytes int64) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			r.Body = http.MaxBytesReader(w, r.Body, maxBytes)
			next.ServeHTTP(w, r)
		})
	}
}
