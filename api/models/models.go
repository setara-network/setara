package models

import "time"

type Organization struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	IpfsEndpoint string    `json:"ipfs_endpoint"`
	ChainAddress string    `json:"chain_address"`
	APIKey       string    `json:"api_key"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
}

type Wallet struct {
	OrgID       string  `json:"org_id"`
	Balance     float64 `json:"balance"`
	Currency    string  `json:"currency"`
	LastTopupAt *time.Time `json:"last_topup_at,omitempty"`
}

type WalletTransaction struct {
	ID        string    `json:"id"`
	OrgID     string    `json:"org_id"`
	Type      string    `json:"type"` // "topup", "document_fee", "node_fee"
	Amount    float64   `json:"amount"`
	Reference string    `json:"reference"`
	CreatedAt time.Time `json:"created_at"`
}

type BillingConfig struct {
	OrgID          string  `json:"org_id"`
	DocFee         float64 `json:"doc_fee"`          // per document fee in INR
	MonthlyNodeFee float64 `json:"monthly_node_fee"` // monthly validator fee in INR
}

type DocumentRequest struct {
	Hash      string `json:"hash" validate:"required"`
	IpfsCid   string `json:"ipfs_cid" validate:"required"`
	DocType   string `json:"doc_type" validate:"required"`
	Metadata  string `json:"metadata"`
	Recipient string `json:"recipient"`
}

type TopupRequest struct {
	Amount float64 `json:"amount" validate:"required,gt=0"`
}

type RazorpayWebhook struct {
	Event   string                 `json:"event"`
	Payload map[string]interface{} `json:"payload"`
}
