package config

import "os"

type Config struct {
	Port             string
	ChainRPC         string
	ChainGRPC        string
	ChainID          string
	KeyringBackend   string
	AdminKeyName     string
	HomePath         string
	RazorpayKeyID    string
	RazorpaySecret   string
	DefaultDocFee    float64
	DefaultNodeFee   float64
	DatabasePath     string
}

func Load() *Config {
	return &Config{
		Port:           getEnv("API_PORT", "8888"),
		ChainRPC:       getEnv("CHAIN_RPC", "http://localhost:26657"),
		ChainGRPC:      getEnv("CHAIN_GRPC", "localhost:9090"),
		ChainID:        getEnv("CHAIN_ID", "setara-testnet-1"),
		KeyringBackend: getEnv("KEYRING_BACKEND", "test"),
		AdminKeyName:   getEnv("ADMIN_KEY_NAME", "admin"),
		HomePath:       getEnv("SETARA_HOME", ""),
		RazorpayKeyID:  getEnv("RAZORPAY_KEY_ID", ""),
		RazorpaySecret: getEnv("RAZORPAY_SECRET", ""),
		DefaultDocFee:  5.0,  // INR per document
		DefaultNodeFee: 5000, // INR per month
		DatabasePath:   getEnv("DB_PATH", "setara-api.db"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
