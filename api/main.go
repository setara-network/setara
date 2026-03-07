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

	db, err := store.New(cfg.DatabasePath)
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}
	defer db.Close()

	orgHandler := handlers.NewOrgHandler(db)
	walletHandler := handlers.NewWalletHandler(db)
	docHandler := handlers.NewDocumentHandler(db, cfg)

	mux := http.NewServeMux()

	// Public routes
	mux.HandleFunc("GET /api/v1/verify", docHandler.VerifyDocument)
	mux.HandleFunc("POST /api/v1/webhooks/razorpay", walletHandler.RazorpayWebhook)

	// Admin routes (no API key needed for org management)
	mux.HandleFunc("GET /api/v1/admin/orgs", orgHandler.ListOrgs)
	mux.HandleFunc("GET /api/v1/admin/orgs/{id}", orgHandler.GetOrg)
	mux.HandleFunc("POST /api/v1/admin/orgs", orgHandler.CreateOrg)

	// Authenticated routes (API key required)
	authed := http.NewServeMux()
	authed.HandleFunc("GET /api/v1/wallet/{org_id}", walletHandler.GetBalance)
	authed.HandleFunc("GET /api/v1/wallet/{org_id}/transactions", walletHandler.GetTransactions)
	authed.HandleFunc("POST /api/v1/wallet/{org_id}/topup", walletHandler.CreateTopupOrder)
	authed.HandleFunc("POST /api/v1/orgs/{org_id}/documents", docHandler.RegisterDocument)

	// Apply middleware to authed routes
	mux.Handle("/api/v1/wallet/", middleware.APIKeyAuth(db)(authed))
	mux.Handle("/api/v1/orgs/", middleware.APIKeyAuth(db)(authed))

	// Health check
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"status":"ok"}`))
	})

	handler := middleware.JSON(mux)

	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("Setara API starting on %s", addr)
	log.Fatal(http.ListenAndServe(addr, handler))
}
