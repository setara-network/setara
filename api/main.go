package main

import (
	"fmt"
	"log"
	"net/http"

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
	// PUBLIC routes (no auth)
	// ==========================================
	mux.HandleFunc("POST /api/v1/register", orgHandler.Register)
	mux.HandleFunc("GET /api/v1/verify", docHandler.VerifyDocument)
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

	handler := middleware.JSON(mux)

	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("Setara API starting on %s", addr)
	log.Printf("Public:  POST /api/v1/register, GET /api/v1/verify")
	log.Printf("Org:     /api/v1/me/* (X-API-Key header)")
	log.Printf("Admin:   /api/v1/admin/* (X-Admin-Secret header)")
	log.Fatal(http.ListenAndServe(addr, handler))
}
