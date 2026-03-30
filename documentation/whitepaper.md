# Setara Network — Whitepaper

**Version 1.0 | March 2026**

---

## Abstract

Setara is a sovereign, purpose-built blockchain for document management, designed and built in India. It enables organizations to register, store, and verify documents on an immutable ledger without the complexity of tokens, wallets, or cryptocurrency. Built on the Cosmos SDK with CometBFT consensus, Setara offers enterprise-grade reliability with consumer-grade simplicity.

---

## 1. The Problem

India's digital infrastructure is rapidly growing, but document verification remains fragmented and trust-dependent:

- **Certificate fraud** costs Indian universities and employers billions annually
- **Document verification** requires manual processes, taking days or weeks
- **No unified system** exists for cross-organizational document trust
- **Existing blockchain solutions** require token management, making them impractical for non-technical organizations
- **Centralized databases** are single points of failure and susceptible to tampering

## 2. The Setara Solution

Setara is a **permissionless read, permissioned write** blockchain:

- **Anyone** can verify a document on the network
- **Only registered organizations** can register documents
- **No tokens or cryptocurrency** — billing is in fiat (INR) via a credit system
- **Each organization** runs its own validator node and IPFS storage
- **Documents are never stored on-chain** — only hashes and metadata

### 2.1 Design Principles

1. **Simplicity over sophistication** — Minimal components, one-command deployment
2. **Fiat-first** — Credits in INR, no token economics or trading
3. **Organization-centric** — Built for institutions, not individuals
4. **Sovereign** — Designed for Indian regulatory requirements
5. **Open source** — Transparent and auditable

## 3. Architecture

### 3.1 Chain Layer

Setara is built on:
- **Cosmos SDK v0.53** — Modular blockchain framework
- **CometBFT** — Byzantine fault-tolerant consensus
- **Proof of Authority** — Organizations become validators by running nodes

The chain has two custom modules:

**Document Module (`x/document`)**
- `RegisterDocument` — Store document hash, IPFS CID, metadata, and recipient
- `VerifyDocument` — Emit verification event for a document
- `DocumentByHash` — Query document by its hash (O(1) lookup via secondary index)

**Organization Module (`x/organization`)**
- `RegisterOrganization` — Register an org on-chain with admin address
- Access control enforcement — Only org admins can register documents for their org

### 3.2 Storage Layer

- **On-chain:** Document hash, IPFS CID, metadata, issuer, recipient, timestamp
- **IPFS:** Actual document files (certificates, PDFs, images)
- Each organization runs its own IPFS node, ensuring data sovereignty

### 3.3 API Layer

A REST API server handles:
- **Organization registration** — Self-service, instant
- **Credit-based billing** — credits denominated in INR, configurable per org
- **Document submission** — Validates credits, submits to chain, deducts balance
- **Public verification** — Anyone can verify via hash

### 3.4 Infrastructure

| Component | Hosted By | Technology |
|-----------|-----------|------------|
| Seed/Sentry nodes | Setara | setarad |
| API Server | Setara | Go |
| Block Explorer | Setara | Ping.pub |
| Admin Panel | Setara | Web |
| Validator Node | Each Org | setarad (Docker) |
| IPFS Node | Each Org | Kubo (Docker) |

## 4. Consensus & Validators

Setara uses a **Proof of Authority** model:

- Each registered organization runs a validator node
- No staking or delegation — validators are trusted organizations
- Zero gas fees — transactions are free at the chain level
- Block time: ~5 seconds
- Finality: Instant (CometBFT provides immediate finality)

### 4.1 Validator Requirements

- Registered organization with verified identity
- Docker-capable server (2 CPU, 4GB RAM, 100GB SSD minimum)
- Stable internet connection
- Setara provides Docker Compose for one-command setup

## 5. Billing Model

### 5.1 Credit System

| Item | Cost |
|------|------|
| Signup bonus | 5,000 credits (free) |
| Document registration | 1 credit (default, configurable per org) |
| Credit rate | Denominated in INR (default, configurable per org) |
| Validator node | Free (testnet), pricing TBD (mainnet) |

### 5.2 How It Works

1. Organization registers via API → receives 5,000 free credits
2. Each document registration deducts credits from wallet
3. Super admin manages wallet top-ups (fiat payment via Razorpay)
4. Per-org configurable pricing for enterprise clients

## 6. Networks

### 6.1 Testnet (`setara-testnet-1`)

- For development and testing
- Free 5,000 credits on signup
- Data may be reset periodically
- Open for all organizations

### 6.2 Mainnet (`setara-1`)

- Production network
- Paid credits (after free tier)
- Permanent, immutable data
- Validator onboarding required

## 7. Use Cases

### 7.1 Sports Certificates (Krida e Pramaan)
Sports competition certificates registered on-chain with full metadata. Athletes and employers can verify authenticity instantly.

### 7.2 Academic Credentials
Universities issue tamper-proof degree certificates. Employers verify directly from the blockchain without contacting the university.

### 7.3 Government Documents
Land records, identity proofs, and official documents with immutable audit trails.

### 7.4 Corporate Compliance
Audit trails, legal documents, and compliance records stored immutably for regulatory requirements.

### 7.5 Healthcare Records
Patient records and prescriptions with verifiable provenance and privacy.

## 8. Roadmap

### Phase 1 — Foundation (Current)
- Setara Document Chain (testnet)
- API with credit-based billing
- Docker deployment for organizations
- Block explorer
- Website and documentation

### Phase 2 — Growth
- Mainnet launch
- Razorpay payment integration
- SDK (JavaScript, Python, Go)
- Mobile verification app
- First 10 organizations onboarded

### Phase 3 — Ecosystem
- EVM-compatible chain (Ethermint) via IBC
- NFT chain for certificate NFTs
- Token chain for future tokenization needs
- Developer grants program
- Cross-chain document verification

### Phase 4 — Scale
- 100+ organizations
- Multi-region validator deployment
- Government partnerships
- International expansion

## 9. Security

- **CometBFT consensus** — Byzantine fault-tolerant up to 1/3 malicious validators
- **Access control** — Only org admins can write, enforced at chain level
- **No tokens** — No economic attack surface (no MEV, no front-running)
- **IPFS content addressing** — Documents are immutable by CID
- **API key authentication** — Per-org API keys with super admin oversight
- **Constant-time auth** — Admin secret comparison prevents timing attacks

## 10. Conclusion

Setara makes blockchain practical for Indian organizations by removing the complexity of tokens and cryptocurrency while preserving the guarantees of decentralization, immutability, and trustless verification. It is designed to be the document trust layer for India.

---

**Setara Network**
setara.network

Built with pride in India.
