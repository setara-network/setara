import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help & FAQ — Setara Network",
  description:
    "Frequently asked questions about Setara blockchain document verification. Learn how to get started, pricing, accessibility features, and contact support.",
  alternates: { canonical: "/help" },
  openGraph: {
    title: "Help & FAQ — Setara Network",
    description: "Answers to common questions about Setara blockchain document verification.",
    url: "/help",
  },
};

const faqs = [
  {
    q: "What is Setara Network?",
    a: "Setara is India's first Proof-of-Authority blockchain purpose-built for document verification. Organizations register document hashes on an immutable ledger and anyone can verify authenticity in under 2 seconds. There are no gas fees, no tokens, and no cryptocurrency required — billing uses fiat credits in INR.",
  },
  {
    q: "Do I need cryptocurrency to use Setara?",
    a: "No. Setara uses a fiat-based credit system (INR). There are no tokens to buy, no wallets to manage, and no cryptocurrency complexity. Each document registration costs 1 credit, and 1 credit equals 1 INR.",
  },
  {
    q: "How do I get started?",
    a: "Register your organization on the registration page. You will receive an organization ID, API key, and 5,000 free credits to start registering and verifying documents immediately.",
  },
  {
    q: "Is there a cost to use the testnet?",
    a: "No. The testnet is free to use. You receive 5,000 complimentary credits upon registration. Production mainnet credits are billed at 1 credit = 1 INR.",
  },
  {
    q: "What types of documents can be registered on Setara?",
    a: "Any document that can be hashed can be registered. Common use cases include university degrees, sports certificates, government documents, healthcare records, legal documents, NGO donor receipts, and supply chain provenance records.",
  },
  {
    q: "How does document verification work?",
    a: "When a document is registered, its SHA-256 hash and optional IPFS CID are stored on the blockchain. Anyone can verify a document by computing its hash and checking it against the on-chain record via the public API — no authentication required for verification.",
  },
  {
    q: "Is Setara compliant with Indian regulations?",
    a: "Yes. Setara is architected for 100% compliance with India's National Blockchain Framework (NBF). This includes data localization guarantees, permissioned architecture, CERT-In audit readiness, and sovereign data residency.",
  },
  {
    q: "Who can I contact for support?",
    a: "Visit our Contact Us page or email support@setara.network for technical support. Developer documentation is available at the API Reference and Build an App guides.",
  },
];

export default function HelpPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setara.network" },
      { "@type": "ListItem", position: 2, name: "Help & FAQ", item: "https://setara.network/help" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#E8613C] transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#1a1a2e] font-medium">Help</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold text-[#1a1a2e] sm:text-4xl">Help & Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Find answers to common questions about Setara blockchain document verification and learn how to navigate this website.
          </p>

          <div className="mt-12 space-y-12">
            {/* Navigation Help */}
            <section>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Navigating This Website</h2>
              <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The website has a consistent navigation bar at the top of every page with links
                  to all major sections. On mobile devices, tap the menu icon to access navigation links.
                </p>
                <p>
                  The footer at the bottom of every page contains links to all website policies,
                  support pages, and developer resources.
                </p>
                <p>
                  You can also view the complete <Link href="/sitemap-page" className="text-[#E8613C] hover:underline">Sitemap</Link> for
                  a full listing of all pages on this website.
                </p>
              </div>
            </section>

            {/* Accessibility */}
            <section>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Accessibility Features</h2>
              <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                <p>This website includes several accessibility features:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Skip to Content:</strong> Press Tab on any page to reveal a &ldquo;Skip to Main Content&rdquo; link that bypasses the navigation.</li>
                  <li><strong>Text Resize:</strong> Use the A-/A/A+ buttons in the top bar to adjust text size.</li>
                  <li><strong>High Contrast:</strong> Click the contrast toggle in the top bar for a high contrast view.</li>
                  <li><strong>Keyboard Navigation:</strong> All features are accessible via keyboard.</li>
                </ul>
                <p>
                  For more details, see our <Link href="/accessibility" className="text-[#E8613C] hover:underline">Accessibility Statement</Link> and{" "}
                  <Link href="/screen-reader-access" className="text-[#E8613C] hover:underline">Screen Reader Access</Link> pages.
                </p>
              </div>
            </section>

            {/* Quick Links */}
            <section>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Quick Links</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: "Register Organization", href: "/register", desc: "Sign up and get API credentials" },
                  { title: "API Documentation", href: "/docs/api", desc: "REST API reference" },
                  { title: "Run a Node", href: "/docs/run-node", desc: "Deploy your own Setara node" },
                  { title: "Build an App", href: "/docs/build-app", desc: "Integration guide for developers" },
                  { title: "Use Cases", href: "/use-cases", desc: "Explore industry applications" },
                  { title: "Whitepaper", href: "/whitepaper", desc: "Technical overview of Setara" },
                  { title: "Contact Us", href: "/contact", desc: "Get in touch with the team" },
                  { title: "Sitemap", href: "/sitemap-page", desc: "Complete list of all pages" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-gray-200 p-4 transition-all hover:border-[#E8613C]/30 hover:shadow-sm"
                  >
                    <h3 className="font-semibold text-[#1a1a2e]">{link.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-[#1a1a2e]">{faq.q}</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
