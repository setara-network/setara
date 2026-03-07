#!/bin/bash
# Setara Explorer Setup
# Uses Ping.pub (https://github.com/ping-pub/explorer)
#
# Option 1: Docker (quick)
#   docker compose up -d
#
# Option 2: Build from source (customizable)
#   git clone https://github.com/ping-pub/explorer.git ping-explorer
#   cd ping-explorer
#   cp ../chain.json chains/mainnet/setara.json
#   yarn install && yarn build
#   # Serve the dist/ folder with nginx

set -e

echo "Starting Setara Explorer..."
echo "Make sure your Setara node is running and accessible."
echo ""
echo "Update chain.json with your node's API/RPC addresses before starting."
echo ""

docker compose up -d
echo ""
echo "Explorer running at http://localhost:8090"
echo "Navigate to the Setara chain to view blocks, transactions, and verify documents."
