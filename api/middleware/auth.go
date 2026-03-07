package middleware

import (
	"context"
	"net/http"
	"strings"

	"setara/api/store"
)

type contextKey string

const OrgIDKey contextKey = "org_id"

func APIKeyAuth(db *store.Store) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey := r.Header.Get("X-API-Key")
			if apiKey == "" {
				auth := r.Header.Get("Authorization")
				if strings.HasPrefix(auth, "Bearer ") {
					apiKey = strings.TrimPrefix(auth, "Bearer ")
				}
			}

			if apiKey == "" {
				http.Error(w, "missing API key", http.StatusUnauthorized)
				return
			}

			org, err := db.GetOrgByAPIKey(apiKey)
			if err != nil {
				http.Error(w, "invalid API key", http.StatusUnauthorized)
				return
			}

			if !org.IsActive {
				http.Error(w, "organization is inactive", http.StatusForbidden)
				return
			}

			ctx := context.WithValue(r.Context(), OrgIDKey, org.ID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func JSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
