package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"setara/api/middleware"
	"setara/api/models"
	"setara/api/store"
)

type WalletHandler struct {
	db *store.Store
}

func NewWalletHandler(db *store.Store) *WalletHandler {
	return &WalletHandler{db: db}
}

// --- Org endpoints (API key auth) ---

// GetMyBalance returns the authenticated org's wallet balance
func (h *WalletHandler) GetMyBalance(w http.ResponseWriter, r *http.Request) {
	orgID := r.Context().Value(middleware.OrgIDKey).(string)
	wallet, err := h.db.GetWallet(orgID)
	if err != nil {
		http.Error(w, `{"error":"wallet not found"}`, http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(wallet)
}

// GetMyTransactions returns the authenticated org's transaction history
func (h *WalletHandler) GetMyTransactions(w http.ResponseWriter, r *http.Request) {
	orgID := r.Context().Value(middleware.OrgIDKey).(string)
	txns, err := h.db.GetTransactions(orgID)
	if err != nil {
		http.Error(w, `{"error":"failed to fetch transactions"}`, http.StatusInternalServerError)
		return
	}
	if txns == nil {
		txns = []models.WalletTransaction{}
	}
	json.NewEncoder(w).Encode(txns)
}

// --- Super Admin endpoints ---

// AdminGetBalance returns any org's wallet (super admin only)
func (h *WalletHandler) AdminGetBalance(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	wallet, err := h.db.GetWallet(orgID)
	if err != nil {
		http.Error(w, `{"error":"wallet not found"}`, http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(wallet)
}

// AdminCreditWallet adds credits to an org's wallet (super admin only)
func (h *WalletHandler) AdminCreditWallet(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	var req models.CreditRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if req.Credits <= 0 {
		http.Error(w, `{"error":"credits must be a positive number"}`, http.StatusBadRequest)
		return
	}

	if req.Credits > 1000000 {
		http.Error(w, `{"error":"credits cannot exceed 1,000,000 per transaction"}`, http.StatusBadRequest)
		return
	}

	if err := h.db.CreditWallet(orgID, req.Credits, "credit", req.Reference); err != nil {
		http.Error(w, `{"error":"failed to credit wallet"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("AUDIT: admin credited %.0f credits to org %s, ref: %s", req.Credits, orgID, req.Reference)

	wallet, _ := h.db.GetWallet(orgID)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":      "done",
		"org_id":      orgID,
		"credited":    req.Credits,
		"new_balance": wallet.Credits,
	})
}

// AdminGetTransactions returns any org's transactions (super admin only)
func (h *WalletHandler) AdminGetTransactions(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	txns, err := h.db.GetTransactions(orgID)
	if err != nil {
		http.Error(w, `{"error":"failed to fetch transactions"}`, http.StatusInternalServerError)
		return
	}
	if txns == nil {
		txns = []models.WalletTransaction{}
	}
	json.NewEncoder(w).Encode(txns)
}

// AdminUpdateBilling updates billing config for an org (super admin only)
func (h *WalletHandler) AdminUpdateBilling(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")
	var req models.UpdateBillingRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	// Validate non-negative values
	if req.DocFeeCredits != nil && *req.DocFeeCredits < 0 {
		http.Error(w, `{"error":"doc_fee_credits cannot be negative"}`, http.StatusBadRequest)
		return
	}
	if req.MonthlyNodeFee != nil && *req.MonthlyNodeFee < 0 {
		http.Error(w, `{"error":"monthly_node_fee cannot be negative"}`, http.StatusBadRequest)
		return
	}
	if req.CreditRate != nil && *req.CreditRate <= 0 {
		http.Error(w, `{"error":"credit_rate must be positive"}`, http.StatusBadRequest)
		return
	}

	if err := h.db.UpdateBillingConfig(orgID, &req); err != nil {
		http.Error(w, `{"error":"failed to update billing"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("AUDIT: admin updated billing for org %s", orgID)

	bc, _ := h.db.GetBillingConfig(orgID)
	json.NewEncoder(w).Encode(bc)
}
