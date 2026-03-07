package middleware

import (
	"context"
	"crypto/subtle"
	"net/http"
	"strings"

	"setara/api/store"
)

type contextKey string

const OrgIDKey contextKey = "org_id"

// APIKeyAuth authenticates orgs via X-API-Key header
func APIKeyAuth(db *store.Store) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
				http.Error(w, `{"error":"invalid API key"}`, http.StatusUnauthorized)
				return
			}

			if !org.IsActive {
				http.Error(w, `{"error":"organization is inactive"}`, http.StatusForbidden)
				return
			}

			ctx := context.WithValue(r.Context(), OrgIDKey, org.ID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// SuperAdminAuth authenticates super admin via X-Admin-Secret header
func SuperAdminAuth(adminSecret string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
				http.Error(w, `{"error":"invalid admin secret"}`, http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func JSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-API-Key, X-Admin-Secret, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
