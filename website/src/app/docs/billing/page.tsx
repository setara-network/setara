import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing & Credits Guide | Setara Network",
  description:
    "Learn how the Setara credit system works: INR-based fiat billing, free credits on signup, checking your balance, and what happens when credits run out.",
};

function Code({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-4 rounded-xl bg-[#1a1a2e] overflow-hidden">
      {label && (
        <div className="px-4 py-2 text-xs text-gray-400 border-b border-white/10">
          {label}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300 leading-relaxed">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <Link href="/docs" className="text-sm text-[#E8613C] hover:underline">
            &larr; Documentation
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-[#1a1a2e]">Billing &amp; Credits</h1>
        <p className="mt-4 text-lg text-gray-600">
          Setara uses a simple fiat credit system. No tokens, no cryptocurrency — just INR credits.
        </p>
        <hr className="my-8 border-gray-200" />

        {/* How Credits Work */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">How Credits Work</h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E8613C]/15 flex items-center justify-center text-[#E8613C] text-xs font-bold">1</span>
            <p className="text-gray-700">
              <strong>1 credit = 1 INR</strong> (Indian Rupee). Credits are a direct fiat equivalent
              — no exchange rates, no volatility.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E8613C]/15 flex items-center justify-center text-[#E8613C] text-xs font-bold">2</span>
            <p className="text-gray-700">
              <strong>1 document registration = 1 credit</strong> (configurable per organization via{" "}
              <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-sm">
                credit_rate
              </code>
              ).
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E8613C]/15 flex items-center justify-center text-[#E8613C] text-xs font-bold">3</span>
            <p className="text-gray-700">
              <strong>Document verification is always free.</strong> The{" "}
              <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-sm">
                GET /api/v1/verify
              </code>{" "}
              endpoint is public and requires no authentication or credits.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E8613C]/15 flex items-center justify-center text-[#E8613C] text-xs font-bold">4</span>
            <p className="text-gray-700">
              <strong>Credits are deducted automatically</strong> on each successful document
              registration. No billing cycle, no surprise charges.
            </p>
          </div>
        </div>

        {/* Free Credits */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Free Credits</h2>
        <p className="mt-4 text-gray-700">
          Every new organization receives <strong>5,000 free credits</strong> on registration — enough
          to register 5,000 documents before needing a top-up.
        </p>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
          <li>Free credits are applied instantly on signup</li>
          <li>They work on both testnet and mainnet</li>
          <li>No credit card required to get started</li>
          <li>Credits do not expire</li>
        </ul>

        {/* Checking Balance */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Checking Your Balance</h2>
        <p className="mt-4 text-gray-700">
          Use the wallet endpoint to retrieve your current credit balance at any time:
        </p>
        <Code label="bash">{`curl https://api.setara.network/api/v1/me/wallet \\
  -H "X-API-Key: sk_your_api_key"`}</Code>
        <p className="text-sm font-semibold text-gray-500 mt-4">Response (200):</p>
        <Code label="json">{`{
  "credits": 4850,
  "org_id": "abc123def456...",
  "org_name": "My Organization"
}`}</Code>
        <p className="mt-2 text-gray-700">
          You can also view transaction history at{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
            GET /api/v1/me/transactions
          </code>{" "}
          to see a full ledger of credits earned and spent. See the{" "}
          <Link href="/docs/api" className="text-[#E8613C] hover:underline">
            API Reference
          </Link>{" "}
          for the full response shape.
        </p>

        {/* Adding Credits */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Adding Credits</h2>
        <p className="mt-4 text-gray-700">
          Credits are managed by the Setara super admin. To top up your organization&apos;s balance:
        </p>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
          <li>
            Email{" "}
            <a href="mailto:support@setara.network" className="text-[#E8613C] hover:underline">
              support@setara.network
            </a>{" "}
            with the amount and your org ID
          </li>
          <li>Or contact your dedicated account manager if you have one</li>
          <li>Payment is processed via Razorpay or bank transfer (INR)</li>
        </ul>
        <p className="mt-6 text-sm font-semibold text-gray-500">
          Admin API endpoint (for reference):
        </p>
        <Code label="bash">{`POST /api/v1/admin/wallets/{org_id}/credit

{
  "credits": 10000,
  "reference": "Razorpay payment #pay_abc123"
}`}</Code>
        <p className="mt-2 text-gray-600 text-sm">
          This endpoint requires the{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">X-Admin-Secret</code> header
          and is only accessible to Setara administrators.
        </p>

        {/* Zero Credits */}
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">What Happens at Zero Credits</h2>
        <p className="mt-4 text-gray-700">
          If your organization runs out of credits, the API will return a{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">402 insufficient_credits</code>{" "}
          error on any new document registration attempt. Here is what remains unaffected:
        </p>
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-sm mt-0.5">&#10003;</span>
            <p className="text-gray-700">
              <strong>Existing documents remain on-chain</strong> and are permanently accessible
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-sm mt-0.5">&#10003;</span>
            <p className="text-gray-700">
              <strong>Verification continues to work</strong> — it is free and has no credit
              requirement
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 font-bold text-sm mt-0.5">&#10003;</span>
            <p className="text-gray-700">
              <strong>No data is deleted</strong> — the blockchain is immutable
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 font-bold text-sm mt-0.5">&#10005;</span>
            <p className="text-gray-700">
              <strong>New registrations are blocked</strong> until credits are topped up
            </p>
          </div>
        </div>

        {/* Next links */}
        <hr className="my-10 border-gray-200" />
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/docs/api"
            className="flex-1 rounded-xl border border-gray-200 px-5 py-4 hover:border-[#E8613C] transition-colors group"
          >
            <div className="text-xs text-gray-500 mb-1">Next</div>
            <div className="font-semibold text-[#1a1a2e] group-hover:text-[#E8613C] transition-colors">
              API Reference &rarr;
            </div>
          </Link>
          <Link
            href="/docs/errors"
            className="flex-1 rounded-xl border border-gray-200 px-5 py-4 hover:border-[#E8613C] transition-colors group"
          >
            <div className="text-xs text-gray-500 mb-1">Next</div>
            <div className="font-semibold text-[#1a1a2e] group-hover:text-[#E8613C] transition-colors">
              Error Codes &rarr;
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
}
