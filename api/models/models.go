package models

import "time"

type Organization struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	FirstName    string    `json:"first_name"`
	LastName     string    `json:"last_name"`
	Email        string    `json:"email"`
	Phone        string    `json:"phone"`
	IpfsEndpoint string    `json:"ipfs_endpoint,omitempty"`
	ChainAddress string    `json:"chain_address,omitempty"`
	APIKey       string    `json:"api_key,omitempty"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
}

type RegisterRequest struct {
	Name      string `json:"name"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
}

type Wallet struct {
	OrgID       string     `json:"org_id"`
	Credits     float64    `json:"credits"`
	CreditRate  float64    `json:"credit_rate"` // 1 credit = X INR (default 1.0)
	LastTopupAt *time.Time `json:"last_topup_at,omitempty"`
}

type WalletTransaction struct {
	ID        string    `json:"id"`
	OrgID     string    `json:"org_id"`
	Type      string    `json:"type"` // "signup_bonus", "credit", "document_fee", "node_fee", "adjustment"
	Credits   float64   `json:"credits"`
	Reference string    `json:"reference"`
	CreatedAt time.Time `json:"created_at"`
}

type BillingConfig struct {
	OrgID          string  `json:"org_id"`
	DocFeeCredits  float64 `json:"doc_fee_credits"`  // credits per document (default 1)
	MonthlyNodeFee float64 `json:"monthly_node_fee"` // credits per month (0 = free)
}

type DocumentRequest struct {
	Hash      string `json:"hash"`
	IpfsCid   string `json:"ipfs_cid"`
	DocType   string `json:"doc_type"`
	Metadata  string `json:"metadata"`
	Recipient string `json:"recipient"`
}

// Super admin requests
type CreditRequest struct {
	Credits   float64 `json:"credits"`
	Reference string  `json:"reference"`
}

type UpdateBillingRequest struct {
	DocFeeCredits  *float64 `json:"doc_fee_credits,omitempty"`
	MonthlyNodeFee *float64 `json:"monthly_node_fee,omitempty"`
	CreditRate     *float64 `json:"credit_rate,omitempty"`
}
