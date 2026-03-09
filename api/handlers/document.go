package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"os/exec"
	"regexp"
	"strings"

	"setara/api/config"
	"setara/api/middleware"
	"setara/api/store"
)

type DocumentHandler struct {
	db  *store.Store
	cfg *config.Config
}

func NewDocumentHandler(db *store.Store, cfg *config.Config) *DocumentHandler {
	return &DocumentHandler{db: db, cfg: cfg}
}

// hashPattern validates document hash format (sha256: prefix + 64 hex chars, or just 64 hex chars)
var hashPattern = regexp.MustCompile(`^(sha256:)?[0-9a-fA-F]{64}$`)

// safeStringPattern allows alphanumeric, spaces, common punctuation — no control chars or shell metacharacters
// safeStringPattern: we just check length in code; this pattern rejects control chars
var safeStringPattern = regexp.MustCompile(`^[^\x00-\x1f]*$`)

// RegisterDocument is an org-authenticated endpoint
func (h *DocumentHandler) RegisterDocument(w http.ResponseWriter, r *http.Request) {
	orgID := r.Context().Value(middleware.OrgIDKey).(string)

	var req struct {
		Hash      string `json:"hash"`
		IpfsCid   string `json:"ipfs_cid"`
		DocType   string `json:"doc_type"`
		Metadata  string `json:"metadata"`
		Recipient string `json:"recipient"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if req.Hash == "" || req.IpfsCid == "" || req.DocType == "" {
		http.Error(w, `{"error":"hash, ipfs_cid, and doc_type are required"}`, http.StatusBadRequest)
		return
	}

	// Validate hash format
	if !hashPattern.MatchString(req.Hash) {
		http.Error(w, `{"error":"invalid hash format, expected sha256:<64 hex chars> or 64 hex chars"}`, http.StatusBadRequest)
		return
	}

	// Validate field lengths and characters
	if len(req.DocType) > 100 {
		http.Error(w, `{"error":"doc_type too long (max 100 chars)"}`, http.StatusBadRequest)
		return
	}
	if len(req.Metadata) > 2048 {
		http.Error(w, `{"error":"metadata too long (max 2048 chars)"}`, http.StatusBadRequest)
		return
	}
	if len(req.Recipient) > 256 {
		http.Error(w, `{"error":"recipient too long (max 256 chars)"}`, http.StatusBadRequest)
		return
	}
	if len(req.IpfsCid) > 256 {
		http.Error(w, `{"error":"ipfs_cid too long (max 256 chars)"}`, http.StatusBadRequest)
		return
	}

	// Validate metadata and recipient don't contain dangerous characters
	if req.Metadata != "" && !safeStringPattern.MatchString(req.Metadata) {
		http.Error(w, `{"error":"metadata contains invalid characters"}`, http.StatusBadRequest)
		return
	}
	if req.Recipient != "" && !safeStringPattern.MatchString(req.Recipient) {
		http.Error(w, `{"error":"recipient contains invalid characters"}`, http.StatusBadRequest)
		return
	}

	// Atomically check balance and deduct credits
	billing, err := h.db.GetBillingConfig(orgID)
	if err != nil {
		http.Error(w, `{"error":"billing config not found"}`, http.StatusInternalServerError)
		return
	}

	if billing.DocFeeCredits <= 0 {
		http.Error(w, `{"error":"invalid billing configuration"}`, http.StatusInternalServerError)
		return
	}

	// Atomic credit deduction (check + deduct in single transaction)
	if err := h.db.DeductCredits(orgID, billing.DocFeeCredits, "document_fee", req.Hash); err != nil {
		if err.Error() == "insufficient credits" {
			wallet, _ := h.db.GetWallet(orgID)
			http.Error(w, `{"error":"insufficient credits","available":`+
				jsonFloat(wallet.Credits)+`,"required":`+jsonFloat(billing.DocFeeCredits)+`}`,
				http.StatusPaymentRequired)
			return
		}
		http.Error(w, `{"error":"failed to process credits"}`, http.StatusInternalServerError)
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
		// Refund credits on chain failure
		if refundErr := h.db.CreditWallet(orgID, billing.DocFeeCredits, "refund", "chain_tx_failed:"+req.Hash); refundErr != nil {
			log.Printf("CRITICAL: failed to refund credits for org %s hash %s: %v", orgID, req.Hash, refundErr)
		}
		log.Printf("ERROR: chain tx failed for org %s: %v, output: %s", orgID, err, string(output))
		http.Error(w, `{"error":"chain transaction failed"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("AUDIT: document registered by org %s, hash %s, fee %.0f", orgID, req.Hash, billing.DocFeeCredits)

	newWallet, _ := h.db.GetWallet(orgID)

	// Extract only the JSON portion from setarad output (it may print non-JSON lines like "gas estimate: ...")
	var txOutput json.RawMessage
	outStr := string(output)
	if idx := strings.Index(outStr, "{"); idx >= 0 {
		txOutput = json.RawMessage(outStr[idx:])
	} else {
		txOutput = json.RawMessage(`{}`)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":            "submitted",
		"hash":              req.Hash,
		"credits_deducted":  billing.DocFeeCredits,
		"credits_remaining": newWallet.Credits,
		"tx_output":         txOutput,
	})
}

// VerifyDocument is a PUBLIC endpoint — anyone can verify
func (h *DocumentHandler) VerifyDocument(w http.ResponseWriter, r *http.Request) {
	hash := r.URL.Query().Get("hash")
	if hash == "" {
		http.Error(w, `{"error":"hash query parameter is required"}`, http.StatusBadRequest)
		return
	}

	// Validate hash format
	if !hashPattern.MatchString(hash) {
		http.Error(w, `{"error":"invalid hash format"}`, http.StatusBadRequest)
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

func jsonFloat(f float64) string {
	b, _ := json.Marshal(f)
	return string(b)
}
