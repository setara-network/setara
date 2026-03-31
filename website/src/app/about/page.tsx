import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, GitBranch, Globe, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About Setara Network — India's Document Verification Blockchain | Setara Network",
  description:
    "Setara Network is India's sovereign Proof-of-Authority blockchain for tamper-proof document verification. Built on Cosmos SDK v0.53.6, NBF-compliant, zero gas fees, fiat billing in INR. Serving universities, government institutions, and enterprises across India.",
  keywords: [
    "about Setara Network",
    "India blockchain document verification",
    "Proof-of-Authority blockchain India",
    "Cosmos SDK document verification",
    "NBF compliant blockchain",
    "zero gas fee blockchain India",
    "tamper proof certificates India",
    "blockchain for universities India",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: "Setara Network",
    locale: "en_IN",
    title: "About Setara Network — India's Document Verification Blockchain | Setara Network",
    description:
      "Setara Network is India's sovereign Proof-of-Authority blockchain built on Cosmos SDK. Zero gas fees, fiat billing in INR, and 100% NBF-compliant architecture for document verification at scale.",
    url: "https://setara.network/about",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About Setara Network — India's Document Verification Blockchain",
      },
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Setara Network",
  url: "https://setara.network",
  logo: "https://setara.network/setara_dark.png",
  description:
    "India's sovereign Proof-of-Authority blockchain for document verification. Organizations register document hashes on an immutable ledger — anyone can verify authenticity. Zero gas fees, no tokens.",
  foundingLocation: {
    "@type": "Place",
    name: "India",
  },
  sameAs: ["https://github.com/setara-network"],
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
      name: "About",
      item: "https://setara.network/about",
    },
  ],
};

const howItWorksSteps = [
  {
    step: "01",
    title: "Register Your Organization",
    description:
      "Sign up at setara.network, receive API credentials, and get 5,000 free credits instantly. No wallet setup, no token purchase required.",
  },
  {
    step: "02",
    title: "Upload Document to IPFS",
    description:
      "Your document is stored on IPFS via your organization's node, producing a content-addressed hash that uniquely fingerprints the file.",
  },
  {
    step: "03",
    title: "Register Hash On-Chain",
    description:
      "The document hash is written to the Setara blockchain via a single REST API call. One credit is deducted from your balance — 1 credit = 1 INR.",
  },
  {
    step: "04",
    title: "Anyone Can Verify",
    description:
      "Any party with the document hash can query the public verification endpoint. No account, no login, no fees. Authenticity confirmed in under 2 seconds.",
  },
];

const technologyItems = [
  {
    label: "Runtime",
    value: "Cosmos SDK v0.53.6 with CometBFT consensus",
  },
  {
    label: "Consensus",
    value: "Proof-of-Authority — organizations become validators, not miners",
  },
  {
    label: "Interoperability",
    value: "IBC (Inter-Blockchain Communication) protocol native support",
  },
  {
    label: "Gas Fees",
    value: "Zero — no gas, no tokens, no cryptocurrency",
  },
  {
    label: "Billing",
    value: "Fiat credits in INR — 1 credit = 1 document registration",
  },
  {
    label: "Storage",
    value: "IPFS for document content; only hash fingerprints stored on-chain",
  },
  {
    label: "Network ID",
    value: "setara-testnet-1 (testnet) · setara-1 (mainnet, planned)",
  },
  {
    label: "Free Tier",
    value: "5,000 credits on signup — verify your first 5,000 documents at no cost",
  },
];

const nbfItems = [
  {
    title: "Data Localization",
    description:
      "All validator nodes and API infrastructure operate within Indian data centres. Citizen and enterprise data never crosses physical national boundaries unless explicitly programmed via IBC rules.",
  },
  {
    title: "Permissioned Write Architecture",
    description:
      "Only registered, KYC-verified organizations may write to the chain. Anyone may read and verify — this public-permissioned model is the exact architecture prescribed by India's National Blockchain Framework.",
  },
  {
    title: "CERT-In Audit Readiness",
    description:
      "CometBFT consensus logs are deterministically verifiable, enabling streamlined audit processes from empanelled CERT-In cybersecurity agencies without bespoke log extraction tooling.",
  },
  {
    title: "Immutable Audit Trail",
    description:
      "Every document registration is timestamped, attributed to a registered organization, and permanently recorded. No administrator — including Setara — can alter or delete a record once committed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300" aria-current="page">About</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mx-auto max-w-3xl text-center pb-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
              <span className="h-2 w-2 rounded-full bg-[#E8613C]" />
              Built in India, for India
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">
                Setara Network
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-400">
              Setara is India&apos;s first Proof-of-Authority blockchain purpose-built for document
              verification — making tamper-proof records accessible, affordable, and auditable for
              every organization across the country.
            </p>
          </div>

          {/* ── Mission ─────────────────────────────────────────────────── */}
          <section aria-labelledby="mission-heading" className="mb-24">
            <div className="rounded-3xl border border-white/10 bg-[#18181b] p-10 sm:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#E8613C]/8 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#E8613C]/10 border border-[#E8613C]/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#E8613C]" />
                    </div>
                    <h2
                      id="mission-heading"
                      className="text-2xl font-bold text-white"
                    >
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Setara&apos;s mission is to make document verification{" "}
                    <strong className="text-white">accessible, tamper-proof, and affordable</strong>{" "}
                    for every organization in India.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Credential fraud costs Indian institutions crores of rupees every year. Verification
                    today relies on phone calls, PDFs, and manual checks that are slow, expensive, and
                    trivially forged. Setara replaces that with an immutable on-chain record that anyone
                    can query in under two seconds — no middleman, no fee, no trust required.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "&lt; 2s", label: "Verification time" },
                    { value: "Zero", label: "Gas fees" },
                    { value: "5,000", label: "Free credits on signup" },
                    { value: "100%", label: "NBF compliant" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center"
                    >
                      <p
                        className="text-3xl font-extrabold text-white mb-1"
                        dangerouslySetInnerHTML={{ __html: stat.value }}
                      />
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── How It Works ────────────────────────────────────────────── */}
          <section aria-labelledby="how-it-works-heading" className="mb-24">
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-blue-400" />
                </div>
                <h2
                  id="how-it-works-heading"
                  className="text-2xl font-bold text-white"
                >
                  How It Works
                </h2>
              </div>
              <p className="text-gray-400 max-w-xl mx-auto">
                Four steps from signup to your first verified document. No blockchain expertise required.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorksSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/5 bg-[#18181b] p-7 relative overflow-hidden group hover:border-white/10 transition-colors"
                >
                  <div className="absolute -top-4 -right-4 text-[6rem] font-black text-white/[0.03] select-none leading-none pointer-events-none">
                    {item.step}
                  </div>
                  <span className="inline-block mb-5 text-xs font-bold tracking-widest text-[#E8613C] uppercase">
                    Step {item.step}
                  </span>
                  <h3 className="text-white font-semibold text-base mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Billing uses fiat credits in INR — 1 credit = 1 document registration. No cryptocurrency, no wallet, no exchange.
            </p>
          </section>

          {/* ── Technology ──────────────────────────────────────────────── */}
          <section aria-labelledby="technology-heading" className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2
                    id="technology-heading"
                    className="text-2xl font-bold text-white"
                  >
                    Technology
                  </h2>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Setara is built on the{" "}
                  <strong className="text-white">Cosmos SDK v0.53.6</strong> — the same battle-tested
                  runtime powering Cosmos Hub, Osmosis, and dozens of sovereign appchains globally.
                  CometBFT delivers Byzantine fault-tolerant finality without energy-intensive proof-of-work.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  IBC interoperability means Setara is not a walled garden. As the ecosystem matures,
                  cross-chain document attestation becomes possible without bespoke bridge infrastructure.
                </p>
              </div>

              <div className="lg:col-span-3 rounded-2xl border border-white/5 bg-[#18181b] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    Technical Specifications
                  </p>
                </div>
                <dl className="divide-y divide-white/5">
                  {technologyItems.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-5 px-6 py-4 gap-4 hover:bg-white/[0.015] transition-colors"
                    >
                      <dt className="col-span-2 text-sm font-medium text-gray-400 self-start pt-0.5">
                        {item.label}
                      </dt>
                      <dd className="col-span-3 text-sm text-gray-200 leading-relaxed">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* ── NBF Compliance ──────────────────────────────────────────── */}
          <section aria-labelledby="nbf-heading" className="mb-24">
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                </div>
                <h2
                  id="nbf-heading"
                  className="text-2xl font-bold text-white"
                >
                  NBF Compliance
                </h2>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Setara is architected from the ground up for 100% alignment with India&apos;s{" "}
                <strong className="text-white">National Blockchain Framework</strong>. Compliance is
                not a layer added on top — it is a fundamental design constraint.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nbfItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/5 bg-[#18181b] p-8 hover:border-green-500/20 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                      <span className="block w-1.5 h-1.5 rounded-full bg-green-400" />
                    </span>
                    <h3 className="text-white font-semibold text-base">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed pl-8">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/compliance"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
              >
                Read the full compliance overview
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* ── Open Source ─────────────────────────────────────────────── */}
          <section aria-labelledby="open-source-heading" className="mb-24">
            <div className="rounded-3xl border border-white/10 bg-[#18181b] p-10 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)] pointer-events-none" />
              <div className="relative z-10">
                <h2
                  id="open-source-heading"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Open Source
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
                  The Setara chain, API server, and deployment tooling are open source. Every line of
                  consensus code is publicly auditable. Organizations deploying validators can inspect
                  exactly what they are running — no black-box binaries, no hidden logic.
                </p>
                <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="https://github.com/setara-network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25"
                  >
                    <Globe className="w-4 h-4" />
                    github.com/setara-network
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Contact ─────────────────────────────────────────────────── */}
          <section aria-labelledby="contact-heading" className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-white/5 bg-[#18181b] p-8">
                <h2
                  id="contact-heading"
                  className="text-xl font-bold text-white mb-3"
                >
                  Get in Touch
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Whether you are a university evaluating document verification, a government institution
                  with compliance questions, or a developer looking to integrate the API — we would like
                  to hear from you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8613C] hover:text-[#f09070] transition-colors"
                >
                  Contact Setara Network
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[#18181b] p-8">
                <h3 className="text-xl font-bold text-white mb-3">Developer Resources</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Full REST API documentation, SDK examples for Node.js, Python, and Go, and a
                  step-by-step integration guide are available in the developer docs.
                </p>
                <Link
                  href="/docs/build-app"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Developer Docs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <section aria-labelledby="cta-heading">
            <div className="rounded-[2rem] border border-[#E8613C]/20 bg-gradient-to-br from-[#E8613C]/5 to-transparent p-12 text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#E8613C]/8 blur-[100px] rounded-[100%] pointer-events-none" />
              <div className="relative z-10">
                <h2
                  id="cta-heading"
                  className="text-3xl font-bold text-white mb-4"
                >
                  Start Verifying Documents Today
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                  Register your organization, receive 5,000 free credits, and make your first
                  verification API call in minutes. No tokens, no wallets, no complexity.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E8613C] text-white px-8 py-4 font-bold transition-all hover:bg-[#d4542f] shadow-[0_0_30px_-5px_rgba(232,97,60,0.4)]"
                >
                  Register Your Organization
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
