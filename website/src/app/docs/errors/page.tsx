import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error Codes Reference | Setara Network",
  description:
    "Complete reference for all API error codes returned by Setara Network, with troubleshooting guidance and retry strategies.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Error Codes Reference — Setara Network",
  description:
    "Complete reference for all API error codes returned by Setara Network, with troubleshooting guidance and retry strategies.",
  author: {
    "@type": "Organization",
    name: "Setara Network",
    url: "https://setara.network",
  },
  publisher: {
    "@type": "Organization",
    name: "Setara Network",
    url: "https://setara.network",
  },
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

const errorCodes = [
  {
    status: 400,
    code: "missing_fields",
    description: "Required fields are missing from the request",
    resolution: "Check the API reference for required fields",
  },
  {
    status: 400,
    code: "invalid_hash",
    description: 'Hash format is invalid (expected sha256:<64 hex chars> or 64 hex chars)',
    resolution: 'Use format "sha256:<64 hex chars>" or provide plain 64 hex characters',
  },
  {
    status: 400,
    code: "invalid_email",
    description: "Email format is invalid",
    resolution: "Provide a valid email address",
  },
  {
    status: 401,
    code: "unauthorized",
    description: "Missing or invalid API key",
    resolution: "Include X-API-Key header with your sk_ key",
  },
  {
    status: 402,
    code: "insufficient_credits",
    description: "Organization has no remaining credits",
    resolution: "Top up credits via admin or contact sales",
  },
  {
    status: 404,
    code: "not_found",
    description: "Resource not found",
    resolution: "Verify the endpoint URL and parameters",
  },
  {
    status: 409,
    code: "duplicate_document",
    description: "Document hash already registered on-chain",
    resolution: "Verify the document hash — each hash can only be registered once",
  },
  {
    status: 429,
    code: "rate_limited",
    description: "Too many requests",
    resolution: "Wait and retry with exponential backoff",
  },
  {
    status: 500,
    code: "chain_error",
    description: "Blockchain transaction failed",
    resolution: "Retry after 5 seconds; if persistent, check node status",
  },
  {
    status: 500,
    code: "internal_error",
    description: "Unexpected server error",
    resolution: "Report to support@setara.network",
  },
];

export default function ErrorCodesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <Link href="/docs" className="text-sm text-[#E8613C] hover:underline">
              &larr; Documentation
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-[#1a1a2e]">Error Codes Reference</h1>
          <p className="mt-4 text-lg text-gray-600">
            Complete reference for all error responses from the Setara API.
          </p>
          <hr className="my-8 border-gray-200" />

          {/* Error Response Format */}
          <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Error Response Format</h2>
          <p className="mt-4 text-gray-700">
            All error responses follow a consistent JSON shape regardless of the HTTP status code:
          </p>
          <Code label="json">{`{
  "error": "human readable error description"
}`}</Code>
          <p className="mt-2 text-gray-700">
            The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">error</code> field
            contains a human-readable description of the problem. Use it for both programmatic handling
            and display/logging.
          </p>

          {/* Error Code Table */}
          <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">All Error Codes</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100 text-[#1a1a2e]">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">HTTP Status</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Error Code</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {errorCodes.map(({ status, code, description, resolution }) => (
                  <tr key={code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          status === 400
                            ? "bg-yellow-100 text-yellow-700"
                            : status === 401 || status === 402
                            ? "bg-orange-100 text-orange-700"
                            : status === 404
                            ? "bg-blue-100 text-blue-700"
                            : status === 409
                            ? "bg-purple-100 text-purple-700"
                            : status === 429
                            ? "bg-red-100 text-red-700"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-[#1a1a2e]">
                        {code}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{description}</td>
                    <td className="px-4 py-3 text-gray-600">{resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Retry Strategy */}
          <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Retry Strategy</h2>
          <p className="mt-4 text-gray-700">
            For <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">429 rate_limited</code>{" "}
            and{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">500</code> errors, use
            exponential backoff: wait before retrying, and double the wait time on each subsequent
            failure.
          </p>
          <Code label="javascript">{`async function withRetry(fn, maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fn();
      if (res.status === 429 || res.status >= 500) {
        const wait = Math.min(1000 * 2 ** (attempt - 1), 16000); // 1s, 2s, 4s, 8s, 16s cap
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }
      }
      return res;
    } catch (err) {
      if (attempt === maxAttempts) throw err;
    }
  }
}`}</Code>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
            <li>
              <strong>429 rate_limited</strong>: back off and retry — the request is valid but
              throttled
            </li>
            <li>
              <strong>500 chain_error</strong>: retry after at least 5 seconds; the blockchain node
              may be catching up
            </li>
            <li>
              <strong>500 internal_error</strong>: retry once; if the error persists, contact support
            </li>
            <li>
              <strong>4xx client errors</strong>: do not retry — fix the request first
            </li>
          </ul>

          {/* Getting Help */}
          <h2 className="text-2xl font-bold text-[#1a1a2e] mt-12">Getting Help</h2>
          <p className="mt-4 text-gray-700">
            If you encounter an error not listed here, or a persistent{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">500 internal_error</code>,
            please reach out:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
            <li>
              Email:{" "}
              <a
                href="mailto:support@setara.network"
                className="text-[#E8613C] hover:underline"
              >
                support@setara.network
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-[#E8613C] hover:underline">
                Contact page
              </Link>
            </li>
          </ul>

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
              href="/docs/build-app"
              className="flex-1 rounded-xl border border-gray-200 px-5 py-4 hover:border-[#E8613C] transition-colors group"
            >
              <div className="text-xs text-gray-500 mb-1">Next</div>
              <div className="font-semibold text-[#1a1a2e] group-hover:text-[#E8613C] transition-colors">
                Build an App &rarr;
              </div>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
