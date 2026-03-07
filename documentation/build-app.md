# Build an App on Setara

This guide shows you how to integrate Setara into your application for document registration and verification.

## Getting Started

### 1. Register Your Organization

```bash
curl -X POST https://api.setara.network/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Organization",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@myorg.com",
    "phone": "+91-9876543210"
  }'
```

Save the returned `org_id` and `api_key`.

### 2. Upload Document to IPFS

```bash
# Using your org's IPFS node
curl -X POST "http://localhost:5001/api/v0/add" -F file=@certificate.pdf
```

Response:
```json
{
  "Hash": "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
  "Size": "12345"
}
```

### 3. Register Document on Setara

```bash
# Compute SHA-256 hash of the file
HASH=$(sha256sum certificate.pdf | cut -d' ' -f1)

curl -X POST https://api.setara.network/api/v1/me/documents \
  -H "X-API-Key: sk_your_api_key" \
  -H "Content-Type: application/json" \
  -d "{
    \"hash\": \"sha256:$HASH\",
    \"ipfs_cid\": \"QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco\",
    \"doc_type\": \"certificate\",
    \"metadata\": \"{\\\"name\\\":\\\"Award Certificate\\\",\\\"year\\\":2026}\",
    \"recipient\": \"student@example.com\"
  }"
```

### 4. Verify Document

```bash
curl "https://api.setara.network/api/v1/verify?hash=sha256:$HASH"
```

## Integration Examples

### Node.js

```javascript
const SETARA_API = 'https://api.setara.network';
const API_KEY = 'sk_your_api_key';

// Register a document
async function registerDocument(hash, ipfsCid, docType, metadata, recipient) {
  const res = await fetch(`${SETARA_API}/api/v1/me/documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ hash, ipfs_cid: ipfsCid, doc_type: docType, metadata, recipient }),
  });
  return res.json();
}

// Verify a document (no auth needed)
async function verifyDocument(hash) {
  const res = await fetch(`${SETARA_API}/api/v1/verify?hash=${hash}`);
  return res.json();
}

// Check wallet balance
async function getBalance() {
  const res = await fetch(`${SETARA_API}/api/v1/me/wallet`, {
    headers: { 'X-API-Key': API_KEY },
  });
  return res.json();
}
```

### Python

```python
import requests
import hashlib

SETARA_API = 'https://api.setara.network'
API_KEY = 'sk_your_api_key'

def register_document(file_path, ipfs_cid, doc_type, metadata, recipient):
    with open(file_path, 'rb') as f:
        file_hash = 'sha256:' + hashlib.sha256(f.read()).hexdigest()

    return requests.post(
        f'{SETARA_API}/api/v1/me/documents',
        headers={'X-API-Key': API_KEY},
        json={
            'hash': file_hash,
            'ipfs_cid': ipfs_cid,
            'doc_type': doc_type,
            'metadata': metadata,
            'recipient': recipient,
        },
    ).json()

def verify_document(doc_hash):
    return requests.get(f'{SETARA_API}/api/v1/verify?hash={doc_hash}').json()
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

const (
    setaraAPI = "https://api.setara.network"
    apiKey    = "sk_your_api_key"
)

func registerDocument(hash, ipfsCid, docType, metadata, recipient string) (map[string]interface{}, error) {
    body, _ := json.Marshal(map[string]string{
        "hash":      hash,
        "ipfs_cid":  ipfsCid,
        "doc_type":  docType,
        "metadata":  metadata,
        "recipient": recipient,
    })

    req, _ := http.NewRequest("POST", setaraAPI+"/api/v1/me/documents", bytes.NewBuffer(body))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("X-API-Key", apiKey)

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    return result, nil
}
```

## Document Lifecycle

```
1. Create document (PDF, image, etc.)
2. Upload to IPFS → get CID
3. Compute SHA-256 hash of file
4. Register on Setara (hash + CID + metadata)
5. Share verification link: setara.network/verify?hash=sha256:...
6. Anyone can verify authenticity
```

## Best Practices

- Always compute the hash client-side before uploading
- Store the IPFS CID and document hash in your application database as backup
- Use meaningful `doc_type` values (e.g., "degree", "certificate", "license")
- Include relevant metadata (issuer name, date, recipient details)
- Monitor your credit balance via the wallet API
