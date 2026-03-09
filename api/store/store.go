package store

import (
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"fmt"
	"time"

	"setara/api/models"

	_ "github.com/mattn/go-sqlite3"
)

type Store struct {
	db *sql.DB
}

func New(dbPath string) (*Store, error) {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	s := &Store{db: db}
	if err := s.migrate(); err != nil {
		return nil, err
	}
	return s, nil
}

func (s *Store) migrate() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS organizations (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			first_name TEXT NOT NULL,
			last_name TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			phone TEXT NOT NULL,
			ipfs_endpoint TEXT DEFAULT '',
			chain_address TEXT DEFAULT '',
			api_key TEXT UNIQUE,
			is_active BOOLEAN DEFAULT 1,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS wallets (
			org_id TEXT PRIMARY KEY REFERENCES organizations(id),
			credits REAL DEFAULT 0,
			credit_rate REAL DEFAULT 1.0,
			last_topup_at DATETIME
		)`,
		`CREATE TABLE IF NOT EXISTS wallet_transactions (
			id TEXT PRIMARY KEY,
			org_id TEXT REFERENCES organizations(id),
			type TEXT NOT NULL,
			credits REAL NOT NULL,
			reference TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS billing_configs (
			org_id TEXT PRIMARY KEY REFERENCES organizations(id),
			doc_fee_credits REAL DEFAULT 1.0,
			monthly_node_fee REAL DEFAULT 0.0
		)`,
	}

	for _, q := range queries {
		if _, err := s.db.Exec(q); err != nil {
			return fmt.Errorf("migration failed: %w", err)
		}
	}
	return nil
}

func (s *Store) Close() error {
	return s.db.Close()
}

func generateID() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func generateAPIKey() string {
	b := make([]byte, 32)
	rand.Read(b)
	return "sk_" + hex.EncodeToString(b)
}

// RegisterOrg creates a new org with wallet (5000 bonus credits) and billing config
func (s *Store) RegisterOrg(req *models.RegisterRequest) (*models.Organization, error) {
	// Check if email already exists
	var exists int
	err := s.db.QueryRow(`SELECT COUNT(*) FROM organizations WHERE email = ?`, req.Email).Scan(&exists)
	if err != nil {
		return nil, err
	}
	if exists > 0 {
		return nil, fmt.Errorf("email already registered")
	}

	tx, err := s.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	org := &models.Organization{
		ID:        generateID(),
		Name:      req.Name,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Phone:     req.Phone,
		APIKey:    generateAPIKey(),
		IsActive:  true,
		CreatedAt: time.Now(),
	}

	_, err = tx.Exec(
		`INSERT INTO organizations (id, name, first_name, last_name, email, phone, api_key, is_active, created_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		org.ID, org.Name, org.FirstName, org.LastName, org.Email, org.Phone, org.APIKey, org.IsActive, org.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	// Create wallet with 5000 signup bonus credits
	now := time.Now()
	_, err = tx.Exec(`INSERT INTO wallets (org_id, credits, credit_rate, last_topup_at) VALUES (?, 5000, 1.0, ?)`, org.ID, now)
	if err != nil {
		return nil, err
	}

	// Log the signup bonus transaction
	_, err = tx.Exec(
		`INSERT INTO wallet_transactions (id, org_id, type, credits, reference) VALUES (?, ?, 'signup_bonus', 5000, 'Welcome bonus - 5000 free credits')`,
		generateID(), org.ID,
	)
	if err != nil {
		return nil, err
	}

	// Create default billing config (1 credit per doc, 0 monthly node fee)
	_, err = tx.Exec(`INSERT INTO billing_configs (org_id, doc_fee_credits, monthly_node_fee) VALUES (?, 1.0, 0.0)`, org.ID)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return org, nil
}

func (s *Store) GetOrg(id string) (*models.Organization, error) {
	org := &models.Organization{}
	err := s.db.QueryRow(
		`SELECT id, name, first_name, last_name, email, phone, ipfs_endpoint, chain_address, api_key, is_active, created_at
		 FROM organizations WHERE id = ?`, id,
	).Scan(&org.ID, &org.Name, &org.FirstName, &org.LastName, &org.Email, &org.Phone,
		&org.IpfsEndpoint, &org.ChainAddress, &org.APIKey, &org.IsActive, &org.CreatedAt)
	if err != nil {
		return nil, err
	}
	return org, nil
}

func (s *Store) GetOrgByAPIKey(apiKey string) (*models.Organization, error) {
	org := &models.Organization{}
	err := s.db.QueryRow(
		`SELECT id, name, first_name, last_name, email, phone, ipfs_endpoint, chain_address, api_key, is_active, created_at
		 FROM organizations WHERE api_key = ?`, apiKey,
	).Scan(&org.ID, &org.Name, &org.FirstName, &org.LastName, &org.Email, &org.Phone,
		&org.IpfsEndpoint, &org.ChainAddress, &org.APIKey, &org.IsActive, &org.CreatedAt)
	if err != nil {
		return nil, err
	}
	return org, nil
}

func (s *Store) ListOrgs() ([]models.Organization, error) {
	rows, err := s.db.Query(
		`SELECT id, name, first_name, last_name, email, phone, ipfs_endpoint, chain_address, api_key, is_active, created_at
		 FROM organizations ORDER BY created_at DESC`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orgs []models.Organization
	for rows.Next() {
		var org models.Organization
		if err := rows.Scan(&org.ID, &org.Name, &org.FirstName, &org.LastName, &org.Email, &org.Phone,
			&org.IpfsEndpoint, &org.ChainAddress, &org.APIKey, &org.IsActive, &org.CreatedAt); err != nil {
			return nil, err
		}
		orgs = append(orgs, org)
	}
	return orgs, nil
}

func (s *Store) SetOrgActive(orgID string, active bool) error {
	_, err := s.db.Exec(`UPDATE organizations SET is_active = ? WHERE id = ?`, active, orgID)
	return err
}

// Wallet methods

func (s *Store) GetWallet(orgID string) (*models.Wallet, error) {
	w := &models.Wallet{}
	err := s.db.QueryRow(
		`SELECT org_id, credits, credit_rate, last_topup_at FROM wallets WHERE org_id = ?`, orgID,
	).Scan(&w.OrgID, &w.Credits, &w.CreditRate, &w.LastTopupAt)
	if err != nil {
		return nil, err
	}
	return w, nil
}

func (s *Store) CreditWallet(orgID string, credits float64, txType, reference string) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.Exec(`UPDATE wallets SET credits = credits + ?, last_topup_at = CURRENT_TIMESTAMP WHERE org_id = ?`, credits, orgID)
	if err != nil {
		return err
	}

	_, err = tx.Exec(
		`INSERT INTO wallet_transactions (id, org_id, type, credits, reference) VALUES (?, ?, ?, ?, ?)`,
		generateID(), orgID, txType, credits, reference,
	)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (s *Store) DeductCredits(orgID string, credits float64, txType, reference string) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	var balance float64
	err = tx.QueryRow(`SELECT credits FROM wallets WHERE org_id = ?`, orgID).Scan(&balance)
	if err != nil {
		return err
	}

	if balance < credits {
		return fmt.Errorf("insufficient credits")
	}

	_, err = tx.Exec(`UPDATE wallets SET credits = credits - ? WHERE org_id = ?`, credits, orgID)
	if err != nil {
		return err
	}

	_, err = tx.Exec(
		`INSERT INTO wallet_transactions (id, org_id, type, credits, reference) VALUES (?, ?, ?, ?, ?)`,
		generateID(), orgID, txType, -credits, reference,
	)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (s *Store) GetTransactions(orgID string) ([]models.WalletTransaction, error) {
	rows, err := s.db.Query(
		`SELECT id, org_id, type, credits, reference, created_at FROM wallet_transactions WHERE org_id = ? ORDER BY created_at DESC`, orgID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var txns []models.WalletTransaction
	for rows.Next() {
		var t models.WalletTransaction
		if err := rows.Scan(&t.ID, &t.OrgID, &t.Type, &t.Credits, &t.Reference, &t.CreatedAt); err != nil {
			return nil, err
		}
		txns = append(txns, t)
	}
	return txns, nil
}

// Billing methods

func (s *Store) GetBillingConfig(orgID string) (*models.BillingConfig, error) {
	bc := &models.BillingConfig{}
	err := s.db.QueryRow(
		`SELECT org_id, doc_fee_credits, monthly_node_fee FROM billing_configs WHERE org_id = ?`, orgID,
	).Scan(&bc.OrgID, &bc.DocFeeCredits, &bc.MonthlyNodeFee)
	if err != nil {
		return nil, err
	}
	return bc, nil
}

func (s *Store) UpdateBillingConfig(orgID string, req *models.UpdateBillingRequest) error {
	if req.DocFeeCredits != nil {
		if _, err := s.db.Exec(`UPDATE billing_configs SET doc_fee_credits = ? WHERE org_id = ?`, *req.DocFeeCredits, orgID); err != nil {
			return err
		}
	}
	if req.MonthlyNodeFee != nil {
		if _, err := s.db.Exec(`UPDATE billing_configs SET monthly_node_fee = ? WHERE org_id = ?`, *req.MonthlyNodeFee, orgID); err != nil {
			return err
		}
	}
	if req.CreditRate != nil {
		if _, err := s.db.Exec(`UPDATE wallets SET credit_rate = ? WHERE org_id = ?`, *req.CreditRate, orgID); err != nil {
			return err
		}
	}
	return nil
}
