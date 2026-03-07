package handlers

import (
	"encoding/json"
	"net/http"

	"setara/api/models"
	"setara/api/store"
)

type WalletHandler struct {
	db *store.Store
}

func NewWalletHandler(db *store.Store) *WalletHandler {
	return &WalletHandler{db: db}
}

func (h *WalletHandler) GetBalance(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	wallet, err := h.db.GetWallet(orgID)
	if err != nil {
		http.Error(w, "wallet not found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(wallet)
}

func (h *WalletHandler) GetTransactions(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	txns, err := h.db.GetTransactions(orgID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(txns)
}

func (h *WalletHandler) CreateTopupOrder(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	var req models.TopupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Amount <= 0 {
		http.Error(w, "amount must be positive", http.StatusBadRequest)
		return
	}

	// TODO: Create Razorpay order and return order_id
	// For now, return a mock response
	resp := map[string]interface{}{
		"org_id":   orgID,
		"amount":   req.Amount,
		"currency": "INR",
		"status":   "order_created",
		"message":  "Razorpay integration pending - use webhook to confirm payment",
	}
	json.NewEncoder(w).Encode(resp)
}

func (h *WalletHandler) RazorpayWebhook(w http.ResponseWriter, r *http.Request) {
	var webhook models.RazorpayWebhook
	if err := json.NewDecoder(r.Body).Decode(&webhook); err != nil {
		http.Error(w, "invalid webhook payload", http.StatusBadRequest)
		return
	}

	// TODO: Verify Razorpay signature
	// TODO: Extract payment details and credit wallet

	if webhook.Event == "payment.captured" {
		// Credit the wallet
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"status": "processed"})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ignored"})
}
