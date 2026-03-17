#!/bin/bash
set -euo pipefail

MONIKER=${MONIKER:-"setara-node"}
CHAIN_ID=${CHAIN_ID:-"setara-testnet-1"}
HOME_DIR="${HOME}/.setara"

# Validate peer/seed format: only allow node_id@host:port comma-separated
validate_peers() {
  local val="$1"
  if [[ -n "$val" ]] && ! echo "$val" | grep -qP '^[a-f0-9]+@[\w.\-]+:\d+(,[a-f0-9]+@[\w.\-]+:\d+)*$'; then
    echo "WARNING: Peer format looks invalid, skipping: $val"
    return 1
  fi
  return 0
}

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

# Configure seeds and persistent peers (use | as sed delimiter to avoid / injection)
if [ -n "${SEEDS:-}" ]; then
  if validate_peers "$SEEDS"; then
    sed -i "s|^seeds = .*|seeds = \"$SEEDS\"|" "$HOME_DIR/config/config.toml"
  fi
fi

if [ -n "${PERSISTENT_PEERS:-}" ]; then
  if validate_peers "$PERSISTENT_PEERS"; then
    sed -i "s|^persistent_peers = .*|persistent_peers = \"$PERSISTENT_PEERS\"|" "$HOME_DIR/config/config.toml"
  fi
fi

# Enable API and gRPC (bind to 0.0.0.0 inside container; access control via Docker port mapping)
sed -i 's/^enable = false/enable = true/' "$HOME_DIR/config/app.toml"
sed -i 's|^address = "tcp://localhost:1317"|address = "tcp://0.0.0.0:1317"|' "$HOME_DIR/config/app.toml"
sed -i 's|^address = "localhost:9090"|address = "0.0.0.0:9090"|' "$HOME_DIR/config/app.toml"

# Allow external RPC connections (within container network)
sed -i 's|^laddr = "tcp://127.0.0.1:26657"|laddr = "tcp://0.0.0.0:26657"|' "$HOME_DIR/config/config.toml"

echo "Starting Setara node..."
exec setarad start --home "$HOME_DIR" --minimum-gas-prices 0setara
