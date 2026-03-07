package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"

	"setara/api/config"
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

func (h *DocumentHandler) RegisterDocument(w http.ResponseWriter, r *http.Request) {
	orgID := r.PathValue("org_id")

	var req models.DocumentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Hash == "" || req.IpfsCid == "" || req.DocType == "" {
		http.Error(w, "hash, ipfs_cid, and doc_type are required", http.StatusBadRequest)
		return
	}

	// Check wallet balance
	wallet, err := h.db.GetWallet(orgID)
	if err != nil {
		http.Error(w, "wallet not found", http.StatusNotFound)
		return
	}

	billing, err := h.db.GetBillingConfig(orgID)
	if err != nil {
		http.Error(w, "billing config not found", http.StatusInternalServerError)
		return
	}

	if wallet.Balance < billing.DocFee {
		http.Error(w, fmt.Sprintf("insufficient balance: %.2f < %.2f", wallet.Balance, billing.DocFee), http.StatusPaymentRequired)
		return
	}

	// Get org's chain address
	org, err := h.db.GetOrg(orgID)
	if err != nil {
		http.Error(w, "organization not found", http.StatusNotFound)
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
		http.Error(w, fmt.Sprintf("chain tx failed: %s", string(output)), http.StatusInternalServerError)
		return
	}

	// Deduct from wallet
	if err := h.db.DeductBalance(orgID, billing.DocFee, "document_fee", req.Hash); err != nil {
		// TX already submitted, log the error but don't fail the response
		fmt.Printf("WARNING: failed to deduct balance for org %s: %v\n", orgID, err)
	}

	resp := map[string]interface{}{
		"status":    "submitted",
		"org_id":    orgID,
		"hash":      req.Hash,
		"chain_address": org.ChainAddress,
		"tx_output": json.RawMessage(output),
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resp)
}

func (h *DocumentHandler) VerifyDocument(w http.ResponseWriter, r *http.Request) {
	hash := r.URL.Query().Get("hash")
	if hash == "" {
		http.Error(w, "hash query parameter is required", http.StatusBadRequest)
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
		http.Error(w, fmt.Sprintf("document not found: %s", string(output)), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
}
