# Setara API Reference

Base URL: `https://api.setara.network` (mainnet) | `https://testnet-api.setara.network` (testnet)

---

## Authentication

- **Public endpoints**: No authentication required
- **Org endpoints**: Include `X-API-Key: sk_your_key` header
- **Admin endpoints**: Include `X-Admin-Secret: your_secret` header

All errors are returned as JSON:
```json
{
  "error": "description of what went wrong"
}
```

Org and Admin endpoints return `401` with `{"error":"missing API key"}` or `{"error":"invalid API key"}` when authentication fails.

---

## Public Endpoints

### Register Organization

```
POST /api/v1/register
```

Register a new organization and receive credentials. Each call creates a new organization (the same email can register multiple organizations).

**Request:**
```json
{
  "name": "My Organization",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@myorg.com",
  "phone": "+91-9876543210"
}
```

All fields are required.

**Response (201):**
```json
{
  "org_id": "922991d01b50c237d698400d397bf580",
  "api_key": "sk_f82c04ff829ee920aaa5507ab07143f38191304d...",
  "credits": 5000,
  "message": "Registration successful. Save your org_id and api_key — you will need them to interact with Setara Network.",
  "note": "You have been credited 5,000 free credits to build and test."
}
```

**Errors:**
- `400` — `name, first_name, last_name, email, and phone are required`

---

### Verify Document

```
GET /api/v1/verify?hash={document_hash}
```

Verify a document's existence and retrieve its metadata.

**Response (200):**
```json
{
  "document": {
    "index": "2039392f88207867",
    "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb924...",
    "ipfs_cid": "QmXoy...",
    "org_id": "59fa906eb2e113ef",
    "doc_type": "certificate",
    "metadata": "{\"name\":\"Award\"}",
    "issuer": "setara1abc...",
    "recipient": "recipient_id",
    "issued_at": "1772867826"
  }
}
```

**Errors:**
- `400` — `hash query parameter is required`
- `404` — `document not found`

---

## Org Endpoints

All require `X-API-Key` header.

### Get Wallet Balance

```
GET /api/v1/me/wallet
```

**Response:**
```json
{
  "org_id": "922991d01b50c237d698400d397bf580",
  "credits": 5000,
  "credit_rate": 1,
  "last_topup_at": "2026-04-03T09:41:43.195925377Z"
}
```

### Get Transaction History

```
GET /api/v1/me/transactions
```

**Response:**
```json
[
  {
    "id": "9b72ac773952a069e5f2aee58c545f82",
    "org_id": "922991d01b50c237d698400d397bf580",
    "type": "signup_bonus",
    "credits": 5000,
    "reference": "Welcome bonus - 5000 free credits",
    "created_at": "2026-04-03T09:41:43Z"
  },
  {
    "id": "a1b2c3d4e5f6...",
    "org_id": "922991d01b50c237d698400d397bf580",
    "type": "document_fee",
    "credits": -1,
    "reference": "sha256:e3b0c44298fc1c149afbf4c8996fb924...",
    "created_at": "2026-04-03T10:05:00Z"
  }
]
```

### Register Document

```
POST /api/v1/me/documents
```

**Request:**
```json
{
  "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "ipfs_cid": "QmYourCID",
  "doc_type": "certificate",
  "metadata": "{\"key\":\"value\"}",
  "recipient": "recipient_identifier"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `hash` | Yes | SHA-256 hash of the document. Format: `sha256:<64 hex chars>` or plain `64 hex chars`. |
| `ipfs_cid` | Yes | IPFS content identifier (CID) of the uploaded document. |
| `doc_type` | Yes | Document type (e.g., `certificate`, `degree`, `license`). |
| `metadata` | No | JSON string with additional document metadata. |
| `recipient` | No | Identifier for the document recipient (email, ID, etc.). |

**Response (201):**
```json
{
  "status": "submitted",
  "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "credits_deducted": 1,
  "credits_remaining": 4999
}
```

**Errors:**
- `400` — `hash, ipfs_cid, and doc_type are required`
- `400` — `invalid hash format, expected sha256:<64 hex chars> or 64 hex chars`
- `402` — Insufficient credits
- `500` — `chain transaction failed`

---

## Admin Endpoints

All require `X-Admin-Secret` header.

### List Organizations

```
GET /api/v1/admin/orgs
```

### Get Organization

```
GET /api/v1/admin/orgs/{id}
```

### Activate/Deactivate Organization

```
POST /api/v1/admin/orgs/{id}/activate
POST /api/v1/admin/orgs/{id}/deactivate
```

### Get Wallet

```
GET /api/v1/admin/wallets/{org_id}
```

### Credit/Deduct Wallet

```
POST /api/v1/admin/wallets/{org_id}/credit
```

**Request:**
```json
{
  "credits": 10000,
  "reference": "Razorpay payment #pay_abc123"
}
```

Use negative credits to deduct.

### Get Transactions

```
GET /api/v1/admin/wallets/{org_id}/transactions
```

### Update Billing

```
PATCH /api/v1/admin/billing/{org_id}
```

**Request:**
```json
{
  "doc_fee_credits": 5,
  "credit_rate": 1.5,
  "monthly_node_fee": 1000
}
```

All fields are optional — only provided fields are updated.
