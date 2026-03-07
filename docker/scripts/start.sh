#!/bin/bash
set -e

MONIKER=${MONIKER:-"setara-node"}
CHAIN_ID=${CHAIN_ID:-"setara-testnet-1"}
HOME_DIR="/root/.setara"

# Initialize if not already done
if [ ! -f "$HOME_DIR/config/genesis.json" ]; then
  echo "Initializing Setara node..."
  setarad init "$MONIKER" --chain-id "$CHAIN_ID" --home "$HOME_DIR" --default-denom setara

  # If a genesis file is provided via volume mount, use it
  if [ -f "/genesis/genesis.json" ]; then
    echo "Using provided genesis file..."
    cp /genesis/genesis.json "$HOME_DIR/config/genesis.json"
  fi
fi

# Configure seeds and persistent peers
if [ -n "$SEEDS" ]; then
  sed -i "s/^seeds = .*/seeds = \"$SEEDS\"/" "$HOME_DIR/config/config.toml"
fi

if [ -n "$PERSISTENT_PEERS" ]; then
  sed -i "s/^persistent_peers = .*/persistent_peers = \"$PERSISTENT_PEERS\"/" "$HOME_DIR/config/config.toml"
fi

# Enable API and gRPC
sed -i 's/^enable = false/enable = true/' "$HOME_DIR/config/app.toml"
sed -i 's/^address = "tcp:\/\/localhost:1317"/address = "tcp:\/\/0.0.0.0:1317"/' "$HOME_DIR/config/app.toml"
sed -i 's/^address = "localhost:9090"/address = "0.0.0.0:9090"/' "$HOME_DIR/config/app.toml"

# Allow external RPC connections
sed -i 's/^laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26657"/' "$HOME_DIR/config/config.toml"

echo "Starting Setara node..."
exec setarad start --home "$HOME_DIR" --minimum-gas-prices 0setara
