package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"setara/api/config"
	"setara/api/handlers"
	"setara/api/middleware"
	"setara/api/store"
)

func main() {
	cfg := config.Load()

	if cfg.AdminSecret == "" {
		log.Println("WARNING: ADMIN_SECRET not set. Super admin API will be disabled.")
	}

	db, err := store.New(cfg.DatabasePath)
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}
	defer db.Close()

	orgHandler := handlers.NewOrgHandler(db)
	walletHandler := handlers.NewWalletHandler(db)
	docHandler := handlers.NewDocumentHandler(db, cfg)

	mux := http.NewServeMux()

	// ==========================================
	// PUBLIC routes (no auth, rate limited)
	// ==========================================
	mux.Handle("POST /api/v1/register", middleware.PublicRateLimit(http.HandlerFunc(orgHandler.Register)))
	mux.Handle("GET /api/v1/verify", middleware.PublicRateLimit(http.HandlerFunc(docHandler.VerifyDocument)))
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"status":"ok"}`))
	})

	// ==========================================
	// ORG routes (API key auth)
	// ==========================================
	orgMux := http.NewServeMux()
	orgMux.HandleFunc("GET /api/v1/me/wallet", walletHandler.GetMyBalance)
	orgMux.HandleFunc("GET /api/v1/me/transactions", walletHandler.GetMyTransactions)
	orgMux.HandleFunc("POST /api/v1/me/documents", docHandler.RegisterDocument)

	mux.Handle("/api/v1/me/", middleware.APIKeyAuth(db)(orgMux))

	// ==========================================
	// SUPER ADMIN routes (admin secret auth)
	// ==========================================
	adminMux := http.NewServeMux()
	adminMux.HandleFunc("GET /api/v1/admin/orgs", orgHandler.ListOrgs)
	adminMux.HandleFunc("GET /api/v1/admin/orgs/{id}", orgHandler.GetOrg)
	adminMux.HandleFunc("POST /api/v1/admin/orgs/{id}/deactivate", orgHandler.DeactivateOrg)
	adminMux.HandleFunc("POST /api/v1/admin/orgs/{id}/activate", orgHandler.ActivateOrg)
	adminMux.HandleFunc("GET /api/v1/admin/wallets/{org_id}", walletHandler.AdminGetBalance)
	adminMux.HandleFunc("POST /api/v1/admin/wallets/{org_id}/credit", walletHandler.AdminCreditWallet)
	adminMux.HandleFunc("GET /api/v1/admin/wallets/{org_id}/transactions", walletHandler.AdminGetTransactions)
	adminMux.HandleFunc("PATCH /api/v1/admin/billing/{org_id}", walletHandler.AdminUpdateBilling)

	mux.Handle("/api/v1/admin/", middleware.SuperAdminAuth(cfg.AdminSecret)(adminMux))

	// Apply global middleware: body size limit → security headers → CORS → content-type
	handler := middleware.CORS(middleware.SecurityHeaders(middleware.MaxBodySize(1 << 20)(middleware.JSON(mux)))) // 1MB max body

	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("Setara API starting on %s", addr)
	log.Printf("Public:  POST /api/v1/register, GET /api/v1/verify")
	log.Printf("Org:     /api/v1/me/* (X-API-Key header)")
	log.Printf("Admin:   /api/v1/admin/* (X-Admin-Secret header)")

	srv := &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
		ReadHeaderTimeout: 5 * time.Second,
		MaxHeaderBytes:    1 << 16, // 64KB max headers
	}
	log.Fatal(srv.ListenAndServe())
}
