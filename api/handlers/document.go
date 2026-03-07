package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"

	"setara/api/config"
	"setara/api/middleware"
	"setara/api/models"
	"setara/api/store"
)

type DocumentHandler struct {
	db  *store.Store
	cfg *config.Config
}

func NewDocumentHandler(db *store.Store, cfg *config.Config) *DocumentHandler {
	return &DocumentHandler{db: db, cfg: cfg}
}

// RegisterDocument is an org-authenticated endpoint
func (h *DocumentHandler) RegisterDocument(w http.ResponseWriter, r *http.Request) {
	orgID := r.Context().Value(middleware.OrgIDKey).(string)

	var req models.DocumentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if req.Hash == "" || req.IpfsCid == "" || req.DocType == "" {
		http.Error(w, `{"error":"hash, ipfs_cid, and doc_type are required"}`, http.StatusBadRequest)
		return
	}

	// Check wallet balance
	wallet, err := h.db.GetWallet(orgID)
	if err != nil {
		http.Error(w, `{"error":"wallet not found"}`, http.StatusNotFound)
		return
	}

	billing, err := h.db.GetBillingConfig(orgID)
	if err != nil {
		http.Error(w, `{"error":"billing config not found"}`, http.StatusInternalServerError)
		return
	}

	if wallet.Credits < billing.DocFeeCredits {
		msg := fmt.Sprintf(`{"error":"insufficient credits","available":%.0f,"required":%.0f}`, wallet.Credits, billing.DocFeeCredits)
		http.Error(w, msg, http.StatusPaymentRequired)
		return
	}

	// Submit transaction to chain
	args := []string{
		"tx", "document", "register-document",
		req.Hash, req.IpfsCid, orgID, req.DocType, req.Metadata, req.Recipient,
		"--from", h.cfg.AdminKeyName,
		"--keyring-backend", h.cfg.KeyringBackend,
		"--chain-id", h.cfg.ChainID,
		"--fees", "0setara",
		"--gas", "auto",
		"-y",
		"--node", h.cfg.ChainRPC,
		"-o", "json",
	}

	if h.cfg.HomePath != "" {
		args = append(args, "--home", h.cfg.HomePath)
	}

	cmd := exec.Command("setarad", args...)
	output, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf(`{"error":"chain tx failed","details":%q}`, string(output)), http.StatusInternalServerError)
		return
	}

	// Deduct credits
	if err := h.db.DeductCredits(orgID, billing.DocFeeCredits, "document_fee", req.Hash); err != nil {
		fmt.Printf("WARNING: failed to deduct credits for org %s: %v\n", orgID, err)
	}

	newWallet, _ := h.db.GetWallet(orgID)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":            "submitted",
		"hash":              req.Hash,
		"credits_deducted":  billing.DocFeeCredits,
		"credits_remaining": newWallet.Credits,
		"tx_output":         json.RawMessage(output),
	})
}

// VerifyDocument is a PUBLIC endpoint — anyone can verify
func (h *DocumentHandler) VerifyDocument(w http.ResponseWriter, r *http.Request) {
	hash := r.URL.Query().Get("hash")
	if hash == "" {
		http.Error(w, `{"error":"hash query parameter is required"}`, http.StatusBadRequest)
		return
	}

	args := []string{
		"q", "document", "document-by-hash", hash,
		"--node", h.cfg.ChainRPC,
		"-o", "json",
	}

	cmd := exec.Command("setarad", args...)
	output, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, `{"error":"document not found"}`, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
}
