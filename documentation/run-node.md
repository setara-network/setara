# Run a Setara Validator Node

This guide walks you through setting up a Setara validator node for your organization.

## Prerequisites

- Docker and Docker Compose installed
- Server: 2 CPU, 4GB RAM, 100GB SSD minimum
- Stable internet connection
- A registered Setara organization ([register here](https://api.setara.network/api/v1/register))

## Quick Setup (Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/setara-network/setara.git
cd setara/docker
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
MONIKER=your-org-name
CHAIN_ID=setara-testnet-1
PERSISTENT_PEERS=node_id@seed.setara.network:26656
```

### 3. Get Genesis File

For testnet:
```bash
curl -o genesis/genesis.json https://raw.githubusercontent.com/setara-network/networks/main/testnet/genesis.json
```

### 4. Start Your Node

```bash
docker compose up -d
```

This starts:
- **setara-node** — Your validator node (ports 26656, 26657, 1317, 9090)
- **setara-ipfs** — Your IPFS node (ports 4001, 5001, 8080)
- **setara-api** — API server connected to your node (port 8888)

### 5. Check Status

```bash
# Check if node is syncing
docker logs setara-node --tail 20

# Check block height
curl http://localhost:26657/status | jq '.result.sync_info.latest_block_height'
```

## Ports

| Port | Service | Description |
|------|---------|-------------|
| 26656 | P2P | Peer-to-peer communication |
| 26657 | RPC | Tendermint RPC |
| 1317 | REST | Cosmos REST API |
| 9090 | gRPC | gRPC endpoint |
| 4001 | IPFS Swarm | IPFS peer communication |
| 5001 | IPFS API | IPFS HTTP API |
| 8080 | IPFS Gateway | IPFS public gateway |
| 8888 | Setara API | Organization API |

## Manual Setup (Without Docker)

### 1. Build from Source

```bash
git clone https://github.com/setara-network/setara.git
cd setara
go build -o setarad ./cmd/setarad
```

### 2. Initialize

```bash
setarad init "your-org-name" --chain-id setara-testnet-1 --default-denom setara
```

### 3. Configure Genesis

Copy the network genesis file to `~/.setara/config/genesis.json`.

### 4. Set Peers

Edit `~/.setara/config/config.toml`:
```toml
persistent_peers = "node_id@seed.setara.network:26656"
```

### 5. Start

```bash
setarad start --minimum-gas-prices 0setara
```

## Upgrading

```bash
cd setara/docker
docker compose pull
docker compose up -d
```

## Troubleshooting

**Node not syncing:**
- Check peers: `curl http://localhost:26657/net_info | jq '.result.n_peers'`
- Verify genesis file matches the network
- Ensure port 26656 is open

**IPFS not connecting:**
- Check: `docker logs setara-ipfs`
- Ensure port 4001 is accessible

## Support

- Documentation: [setara.network/docs](https://setara.network/docs)
- GitHub Issues: [github.com/setara-network/setara/issues](https://github.com/setara-network/setara/issues)
