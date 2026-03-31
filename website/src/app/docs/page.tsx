import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Documentation | Setara Network",
  description:
    "Full API reference, integration guides, and node setup documentation for Setara Network. Register documents, verify hashes, and manage credits with a simple REST API.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Developer Documentation | Setara Network",
    description:
      "Full API reference, integration guides, and node setup documentation for Setara Network.",
    url: "https://setara.network/docs",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://setara.network",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Developer Documentation",
      item: "https://setara.network/docs",
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Developer Documentation — Setara Network",
  description:
    "Full API reference, integration guides, and node setup documentation for Setara Network.",
  url: "https://setara.network/docs",
  publisher: {
    "@type": "Organization",
    name: "Setara Network",
    url: "https://setara.network",
  },
  dateModified: "2026-03-31",
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

const docCards = [
  {
    href: "/docs/build-app",
    title: "Build an App",
    description:
      "4-step integration guide with working code examples in Node.js, Python, and Go.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    href: "/docs/api",
    title: "API Reference",
    description:
      "All endpoints, request and response examples, authentication, and error codes.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    href: "/docs/run-node",
    title: "Run a Node",
    description:
      "Docker deployment, port configuration, and troubleshooting for validator nodes.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
  },
];

export default function DocsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-10">
        <h1 className="text-4xl font-bold text-[#1a1a2e]">
          Developer Documentation
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Everything you need to integrate blockchain document verification into
          your applications. Setara provides a simple REST API — register
          documents, verify hashes, and manage credits.
        </p>

        <hr className="my-8 border-gray-200" />

        {/* Quick Start */}
        <h2 className="text-2xl font-bold text-[#1a1a2e]">Quick Start</h2>
        <ol className="mt-5 space-y-6">
          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8613C] text-sm font-bold text-white">
              1
            </span>
            <div>
              <p className="font-semibold text-[#1a1a2e]">
                Register your organization
              </p>
              <p className="mt-1 text-gray-700">
                Create an account at{" "}
                <Link
                  href="/register"
                  className="text-[#E8613C] hover:underline"
                >
                  setara.network/register
                </Link>{" "}
                to receive your API key and 5,000 free credits.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8613C] text-sm font-bold text-white">
              2
            </span>
            <div>
              <p className="font-semibold text-[#1a1a2e]">
                Get your API key from the response
              </p>
              <p className="mt-1 text-gray-700">
                The registration response includes your{" "}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
                  api_key
                </code>{" "}
                (starts with{" "}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
                  sk_
                </code>
                ). Store it securely — it authenticates all document operations.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8613C] text-sm font-bold text-white">
              3
            </span>
            <div>
              <p className="font-semibold text-[#1a1a2e]">
                Make your first API call
              </p>
              <p className="mt-1 text-gray-700">
                Register a document hash on the blockchain:
              </p>
              <Code label="bash">{`curl -X POST https://api.setara.network/api/v1/me/documents \\
  -H "X-API-Key: sk_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "ipfs_cid": "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    "doc_type": "certificate",
    "metadata": "{\\"name\\":\\"Award Certificate\\"}",
    "recipient": "recipient@example.com"
  }'`}</Code>
            </div>
          </li>
        </ol>

        <hr className="my-10 border-gray-200" />

        {/* Doc cards */}
        <h2 className="text-2xl font-bold text-[#1a1a2e]">
          Explore the Docs
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {docCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[#E8613C]/40 hover:shadow-md"
            >
              <div className="mb-3 inline-flex rounded-lg bg-[#E8613C]/10 p-2 text-[#E8613C] transition-colors duration-200 group-hover:bg-[#E8613C]/20">
                {card.icon}
              </div>
              <h3 className="font-semibold text-[#1a1a2e]">{card.title}</h3>
              <p className="mt-1.5 text-sm text-gray-600">{card.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[#E8613C] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>

        <hr className="my-10 border-gray-200" />

        {/* Need help */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-6">
          <h2 className="text-xl font-bold text-[#1a1a2e]">Need Help?</h2>
          <p className="mt-2 text-gray-700">
            Can&apos;t find what you&apos;re looking for? Reach out to us
            directly or browse the help centre.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-[#E8613C] px-4 py-2 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
            >
              Contact Support
            </Link>
            <Link
              href="/help"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:border-[#E8613C] hover:text-[#E8613C]"
            >
              Help Centre
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
