# Setara API Reference

Base URL: `https://api.setara.network` (mainnet) | `https://testnet-api.setara.network` (testnet)

---

## Authentication

- **Public endpoints**: No authentication required
- **Org endpoints**: Include `X-API-Key: sk_your_key` header
- **Admin endpoints**: Include `X-Admin-Secret: your_secret` header

---

## Public Endpoints

### Register Organization

```
POST /api/v1/register
```

Register a new organization and receive credentials.

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

**Response (201):**
```json
{
  "org_id": "abc123def456...",
  "api_key": "sk_...",
  "credits": 5000,
  "message": "Registration successful.",
  "note": "You have been credited 5,000 free credits to build and test."
}
```

**Errors:**
- `400` — Missing required fields
- `409` — Email already registered

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
    "hash": "sha256:abc123...",
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
- `400` — Missing hash parameter
- `404` — Document not found

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
  "org_id": "abc123...",
  "credits": 4999,
  "credit_rate": 1.0,
  "last_topup_at": "2026-03-07T12:00:00Z"
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
    "id": "tx123...",
    "org_id": "abc123...",
    "type": "signup_bonus",
    "credits": 5000,
    "reference": "Welcome bonus - 5000 free credits",
    "created_at": "2026-03-07T12:00:00Z"
  },
  {
    "id": "tx456...",
    "org_id": "abc123...",
    "type": "document_fee",
    "credits": -1,
    "reference": "sha256:doc_hash",
    "created_at": "2026-03-07T12:05:00Z"
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
  "hash": "sha256:your_document_hash",
  "ipfs_cid": "QmYourCID",
  "doc_type": "certificate",
  "metadata": "{\"key\":\"value\"}",
  "recipient": "recipient_identifier"
}
```

**Response (201):**
```json
{
  "status": "submitted",
  "hash": "sha256:your_document_hash",
  "credits_deducted": 1,
  "credits_remaining": 4999
}
```

**Errors:**
- `400` — Missing required fields
- `402` — Insufficient credits
- `500` — Chain transaction failed

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
