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
			description TEXT,
			ipfs_endpoint TEXT,
			chain_address TEXT,
			api_key TEXT UNIQUE,
			is_active BOOLEAN DEFAULT 1,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS wallets (
			org_id TEXT PRIMARY KEY REFERENCES organizations(id),
			balance REAL DEFAULT 0,
			currency TEXT DEFAULT 'INR',
			last_topup_at DATETIME
		)`,
		`CREATE TABLE IF NOT EXISTS wallet_transactions (
			id TEXT PRIMARY KEY,
			org_id TEXT REFERENCES organizations(id),
			type TEXT NOT NULL,
			amount REAL NOT NULL,
			reference TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS billing_configs (
			org_id TEXT PRIMARY KEY REFERENCES organizations(id),
			doc_fee REAL DEFAULT 5.0,
			monthly_node_fee REAL DEFAULT 5000.0
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

// Organization methods

func (s *Store) CreateOrg(org *models.Organization) error {
	if org.ID == "" {
		org.ID = generateID()
	}
	org.APIKey = generateAPIKey()
	org.IsActive = true
	org.CreatedAt = time.Now()

	_, err := s.db.Exec(
		`INSERT INTO organizations (id, name, description, ipfs_endpoint, chain_address, api_key, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		org.ID, org.Name, org.Description, org.IpfsEndpoint, org.ChainAddress, org.APIKey, org.IsActive, org.CreatedAt,
	)
	if err != nil {
		return err
	}

	// Create wallet and billing config
	_, err = s.db.Exec(`INSERT INTO wallets (org_id, balance, currency) VALUES (?, 0, 'INR')`, org.ID)
	if err != nil {
		return err
	}

	_, err = s.db.Exec(`INSERT INTO billing_configs (org_id) VALUES (?)`, org.ID)
	return err
}

func (s *Store) GetOrg(id string) (*models.Organization, error) {
	org := &models.Organization{}
	err := s.db.QueryRow(
		`SELECT id, name, description, ipfs_endpoint, chain_address, api_key, is_active, created_at FROM organizations WHERE id = ?`, id,
	).Scan(&org.ID, &org.Name, &org.Description, &org.IpfsEndpoint, &org.ChainAddress, &org.APIKey, &org.IsActive, &org.CreatedAt)
	if err != nil {
		return nil, err
	}
	return org, nil
}

func (s *Store) GetOrgByAPIKey(apiKey string) (*models.Organization, error) {
	org := &models.Organization{}
	err := s.db.QueryRow(
		`SELECT id, name, description, ipfs_endpoint, chain_address, api_key, is_active, created_at FROM organizations WHERE api_key = ?`, apiKey,
	).Scan(&org.ID, &org.Name, &org.Description, &org.IpfsEndpoint, &org.ChainAddress, &org.APIKey, &org.IsActive, &org.CreatedAt)
	if err != nil {
		return nil, err
	}
	return org, nil
}

func (s *Store) ListOrgs() ([]models.Organization, error) {
	rows, err := s.db.Query(`SELECT id, name, description, ipfs_endpoint, chain_address, api_key, is_active, created_at FROM organizations`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orgs []models.Organization
	for rows.Next() {
		var org models.Organization
		if err := rows.Scan(&org.ID, &org.Name, &org.Description, &org.IpfsEndpoint, &org.ChainAddress, &org.APIKey, &org.IsActive, &org.CreatedAt); err != nil {
			return nil, err
		}
		orgs = append(orgs, org)
	}
	return orgs, nil
}

// Wallet methods

func (s *Store) GetWallet(orgID string) (*models.Wallet, error) {
	w := &models.Wallet{}
	err := s.db.QueryRow(
		`SELECT org_id, balance, currency, last_topup_at FROM wallets WHERE org_id = ?`, orgID,
	).Scan(&w.OrgID, &w.Balance, &w.Currency, &w.LastTopupAt)
	if err != nil {
		return nil, err
	}
	return w, nil
}

func (s *Store) CreditBalance(orgID string, amount float64, txType, reference string) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.Exec(`UPDATE wallets SET balance = balance + ?, last_topup_at = CURRENT_TIMESTAMP WHERE org_id = ?`, amount, orgID)
	if err != nil {
		return err
	}

	_, err = tx.Exec(
		`INSERT INTO wallet_transactions (id, org_id, type, amount, reference) VALUES (?, ?, ?, ?, ?)`,
		generateID(), orgID, txType, amount, reference,
	)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (s *Store) DeductBalance(orgID string, amount float64, txType, reference string) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	var balance float64
	err = tx.QueryRow(`SELECT balance FROM wallets WHERE org_id = ?`, orgID).Scan(&balance)
	if err != nil {
		return err
	}

	if balance < amount {
		return fmt.Errorf("insufficient balance: %.2f < %.2f", balance, amount)
	}

	_, err = tx.Exec(`UPDATE wallets SET balance = balance - ? WHERE org_id = ?`, amount, orgID)
	if err != nil {
		return err
	}

	_, err = tx.Exec(
		`INSERT INTO wallet_transactions (id, org_id, type, amount, reference) VALUES (?, ?, ?, ?, ?)`,
		generateID(), orgID, txType, -amount, reference,
	)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (s *Store) GetTransactions(orgID string) ([]models.WalletTransaction, error) {
	rows, err := s.db.Query(
		`SELECT id, org_id, type, amount, reference, created_at FROM wallet_transactions WHERE org_id = ? ORDER BY created_at DESC`, orgID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var txns []models.WalletTransaction
	for rows.Next() {
		var t models.WalletTransaction
		if err := rows.Scan(&t.ID, &t.OrgID, &t.Type, &t.Amount, &t.Reference, &t.CreatedAt); err != nil {
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
		`SELECT org_id, doc_fee, monthly_node_fee FROM billing_configs WHERE org_id = ?`, orgID,
	).Scan(&bc.OrgID, &bc.DocFee, &bc.MonthlyNodeFee)
	if err != nil {
		return nil, err
	}
	return bc, nil
}

func (s *Store) UpdateBillingConfig(bc *models.BillingConfig) error {
	_, err := s.db.Exec(
		`UPDATE billing_configs SET doc_fee = ?, monthly_node_fee = ? WHERE org_id = ?`,
		bc.DocFee, bc.MonthlyNodeFee, bc.OrgID,
	)
	return err
}
