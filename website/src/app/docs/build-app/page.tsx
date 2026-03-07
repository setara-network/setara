import Link from "next/link";

export const metadata = {
  title: "Build an App — Setara Network",
  description: "How to integrate Setara into your application for document registration and verification.",
};

function Code({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-4 rounded-xl bg-[#1a1a2e] overflow-hidden">
      {label && <div className="px-4 py-2 text-xs text-gray-400 border-b border-white/10">{label}</div>}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300 leading-relaxed"><code>{children}</code></pre>
      </div>
    </div>
  );
}

export default function BuildAppPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#E8613C] hover:underline">&larr; Back to Home</Link>
        </div>

        <h1 className="text-4xl font-bold text-[#1a1a2e]">Build an App on Setara</h1>
        <p className="mt-4 text-lg text-gray-600">Integrate Setara into your application for document registration and verification.</p>
        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Getting Started</h2>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">1. Register Your Organization</h3>
        <p className="text-gray-700 mt-2"><Link href="/register" className="text-[#E8613C] hover:underline">Register here</Link> or via the API:</p>
        <Code label="bash">{`curl -X POST https://api.setara.network/api/v1/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Organization",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@myorg.com",
    "phone": "+91-9876543210"
  }'`}</Code>
        <p className="text-gray-700">Save the returned <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">org_id</code> and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">api_key</code>.</p>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">2. Upload Document to IPFS</h3>
        <Code label="bash">{`# Using your org's IPFS node
curl -X POST "http://localhost:5001/api/v0/add" -F file=@certificate.pdf`}</Code>
        <p className="text-gray-700">Response:</p>
        <Code label="json">{`{
  "Hash": "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
  "Size": "12345"
}`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">3. Register Document on Setara</h3>
        <Code label="bash">{`# Compute SHA-256 hash of the file
HASH=$(sha256sum certificate.pdf | cut -d' ' -f1)

curl -X POST https://api.setara.network/api/v1/me/documents \\
  -H "X-API-Key: sk_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"hash\\": \\"sha256:$HASH\\",
    \\"ipfs_cid\\": \\"QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco\\",
    \\"doc_type\\": \\"certificate\\",
    \\"metadata\\": \\"{\\\\\\"name\\\\\\":\\\\\\"Award Certificate\\\\\\",\\\\\\"year\\\\\\":2026}\\",
    \\"recipient\\": \\"student@example.com\\"
  }"`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">4. Verify Document</h3>
        <Code label="bash">{`curl "https://api.setara.network/api/v1/verify?hash=sha256:$HASH"`}</Code>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Integration Examples</h2>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Node.js</h3>
        <Code label="javascript">{`const SETARA_API = 'https://api.setara.network';
const API_KEY = 'sk_your_api_key';

// Register a document
async function registerDocument(hash, ipfsCid, docType, metadata, recipient) {
  const res = await fetch(\`\${SETARA_API}/api/v1/me/documents\`, {
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
  const res = await fetch(\`\${SETARA_API}/api/v1/verify?hash=\${hash}\`);
  return res.json();
}

// Check wallet balance
async function getBalance() {
  const res = await fetch(\`\${SETARA_API}/api/v1/me/wallet\`, {
    headers: { 'X-API-Key': API_KEY },
  });
  return res.json();
}`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Python</h3>
        <Code label="python">{`import requests
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
    return requests.get(f'{SETARA_API}/api/v1/verify?hash={doc_hash}').json()`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Go</h3>
        <Code label="go">{`package main

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
}`}</Code>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Document Lifecycle</h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <ol className="space-y-3 text-gray-700 list-decimal pl-6">
            <li>Create document (PDF, image, etc.)</li>
            <li>Upload to IPFS &rarr; get CID</li>
            <li>Compute SHA-256 hash of file</li>
            <li>Register on Setara (hash + CID + metadata)</li>
            <li>Share verification link: <code className="bg-white px-1.5 py-0.5 rounded text-sm">setara.network/verify?hash=sha256:...</code></li>
            <li>Anyone can verify authenticity</li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Best Practices</h2>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
          <li>Always compute the hash client-side before uploading</li>
          <li>Store the IPFS CID and document hash in your application database as backup</li>
          <li>Use meaningful <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">doc_type</code> values (e.g., &quot;degree&quot;, &quot;certificate&quot;, &quot;license&quot;)</li>
          <li>Include relevant metadata (issuer name, date, recipient details)</li>
          <li>Monitor your credit balance via the wallet API</li>
        </ul>
      </article>
    </div>
  );
}
