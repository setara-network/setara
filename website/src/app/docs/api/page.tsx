import Link from "next/link";

export const metadata = {
  title: "API Reference — Setara Network",
  description: "Complete API reference for Setara Network document registration and verification.",
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

function Endpoint({ method, path }: { method: string; path: string }) {
  const colors: Record<string, string> = {
    GET: "bg-green-100 text-green-700",
    POST: "bg-blue-100 text-blue-700",
    PATCH: "bg-yellow-100 text-yellow-700",
  };
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${colors[method] || "bg-gray-100 text-gray-700"}`}>{method}</span>
      <code className="text-[#1a1a2e] font-semibold">{path}</code>
    </div>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#E8613C] hover:underline">&larr; Back to Home</Link>
        </div>

        <h1 className="text-4xl font-bold text-[#1a1a2e]">API Reference</h1>
        <p className="mt-4 text-lg text-gray-600">
          Base URL: <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://api.setara.network</code> (mainnet)
          | <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://testnet-api.setara.network</code> (testnet)
        </p>
        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Authentication</h2>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
          <li><strong>Public endpoints</strong>: No authentication required</li>
          <li><strong>Org endpoints</strong>: Include <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">X-API-Key: sk_your_key</code> header</li>
          <li><strong>Admin endpoints</strong>: Include <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">X-Admin-Secret: your_secret</code> header</li>
        </ul>

        {/* Public Endpoints */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Public Endpoints</h2>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Register Organization</h3>
        <Endpoint method="POST" path="/api/v1/register" />
        <p className="text-gray-700">Register a new organization and receive credentials.</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">Request:</p>
        <Code label="json">{`{
  "name": "My Organization",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@myorg.com",
  "phone": "+91-9876543210"
}`}</Code>
        <p className="text-sm font-semibold text-gray-500 mt-4">Response (201):</p>
        <Code label="json">{`{
  "org_id": "abc123def456...",
  "api_key": "sk_...",
  "credits": 5000,
  "message": "Registration successful.",
  "note": "You have been credited 5,000 free credits to build and test."
}`}</Code>
        <p className="text-gray-600 text-sm mt-2">Errors: <code>400</code> Missing required fields | <code>409</code> Email already registered</p>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Verify Document</h3>
        <Endpoint method="GET" path="/api/v1/verify?hash={document_hash}" />
        <p className="text-gray-700">Verify a document&apos;s existence and retrieve its metadata.</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">Response (200):</p>
        <Code label="json">{`{
  "document": {
    "index": "2039392f88207867",
    "hash": "sha256:abc123...",
    "ipfs_cid": "QmXoy...",
    "org_id": "59fa906eb2e113ef",
    "doc_type": "certificate",
    "metadata": "{\\"name\\":\\"Award\\"}",
    "issuer": "setara1abc...",
    "recipient": "recipient_id",
    "issued_at": "1772867826"
  }
}`}</Code>
        <p className="text-gray-600 text-sm mt-2">Errors: <code>400</code> Missing hash parameter | <code>404</code> Document not found</p>

        {/* Org Endpoints */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Org Endpoints</h2>
        <p className="text-gray-600 text-sm">All require <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">X-API-Key</code> header.</p>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Get Wallet Balance</h3>
        <Endpoint method="GET" path="/api/v1/me/wallet" />
        <Code label="json">{`{
  "org_id": "abc123...",
  "credits": 4999,
  "credit_rate": 1.0,
  "last_topup_at": "2026-03-07T12:00:00Z"
}`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Get Transaction History</h3>
        <Endpoint method="GET" path="/api/v1/me/transactions" />
        <Code label="json">{`[
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
]`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Register Document</h3>
        <Endpoint method="POST" path="/api/v1/me/documents" />
        <p className="text-sm font-semibold text-gray-500 mt-2">Request:</p>
        <Code label="json">{`{
  "hash": "sha256:your_document_hash",
  "ipfs_cid": "QmYourCID",
  "doc_type": "certificate",
  "metadata": "{\\"key\\":\\"value\\"}",
  "recipient": "recipient_identifier"
}`}</Code>
        <p className="text-sm font-semibold text-gray-500 mt-4">Response (201):</p>
        <Code label="json">{`{
  "status": "submitted",
  "hash": "sha256:your_document_hash",
  "credits_deducted": 1,
  "credits_remaining": 4999
}`}</Code>
        <p className="text-gray-600 text-sm mt-2">Errors: <code>400</code> Missing fields | <code>402</code> Insufficient credits | <code>500</code> Chain transaction failed</p>

        {/* Admin Endpoints */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Admin Endpoints</h2>
        <p className="text-gray-600 text-sm">All require <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">X-Admin-Secret</code> header.</p>

        <Endpoint method="GET" path="/api/v1/admin/orgs" />
        <p className="text-gray-700">List all organizations.</p>

        <Endpoint method="GET" path="/api/v1/admin/orgs/{id}" />
        <p className="text-gray-700">Get organization details.</p>

        <Endpoint method="POST" path="/api/v1/admin/orgs/{id}/activate" />
        <Endpoint method="POST" path="/api/v1/admin/orgs/{id}/deactivate" />
        <p className="text-gray-700">Activate or deactivate an organization.</p>

        <Endpoint method="GET" path="/api/v1/admin/wallets/{org_id}" />
        <p className="text-gray-700">Get wallet balance for an organization.</p>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Credit/Deduct Wallet</h3>
        <Endpoint method="POST" path="/api/v1/admin/wallets/{org_id}/credit" />
        <Code label="json">{`{
  "credits": 10000,
  "reference": "Razorpay payment #pay_abc123"
}`}</Code>
        <p className="text-gray-700 text-sm">Use negative credits to deduct.</p>

        <Endpoint method="GET" path="/api/v1/admin/wallets/{org_id}/transactions" />
        <p className="text-gray-700">Get transaction history for an organization.</p>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Update Billing</h3>
        <Endpoint method="PATCH" path="/api/v1/admin/billing/{org_id}" />
        <Code label="json">{`{
  "doc_fee_credits": 5,
  "credit_rate": 1.5,
  "monthly_node_fee": 1000
}`}</Code>
        <p className="text-gray-700 text-sm">All fields are optional — only provided fields are updated.</p>
      </article>
    </div>
  );
}
