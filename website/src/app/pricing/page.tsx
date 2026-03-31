import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, IndianRupee, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Credits — Document Verification on Blockchain | Setara Network",
  description:
    "Setara uses simple INR-based credits — no tokens, no crypto, no hidden fees. 1 credit = 1 INR. Register documents on blockchain from ₹1 each. Start free with 5,000 credits. Transparent pricing for Indian organizations.",
  alternates: { canonical: "/pricing" },
  keywords: [
    "blockchain document verification cost India",
    "document verification pricing India",
    "blockchain notarization cost",
    "document hash blockchain price",
    "INR blockchain pricing",
    "no crypto document verification",
    "Setara pricing",
    "document registration cost",
  ],
  openGraph: {
    title: "Pricing & Credits — Document Verification on Blockchain | Setara Network",
    description:
      "No tokens, no crypto, no hidden fees. 1 credit = 1 INR. Register documents on an immutable blockchain ledger from ₹1 each. Start free with 5,000 credits.",
    url: "/pricing",
    type: "website",
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Setara Document Verification — Blockchain Credits",
  description:
    "INR-based credits for registering and verifying documents on the Setara blockchain. No cryptocurrency required. 1 credit = 1 INR. Verification is always free.",
  brand: {
    "@type": "Brand",
    name: "Setara Network",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "0",
      priceCurrency: "INR",
      description: "5,000 free credits on signup. No credit card required.",
      availability: "https://schema.org/InStock",
      url: "https://setara.network/register",
    },
    {
      "@type": "Offer",
      name: "Growth",
      description: "Custom credit packages for growing organizations on mainnet.",
      availability: "https://schema.org/InStock",
      url: "https://setara.network/contact",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description: "Volume discounts, SLA guarantees, on-premise deployment for large enterprises.",
      availability: "https://schema.org/InStock",
      url: "https://setara.network/contact",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://setara.network/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: "https://setara.network/pricing",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to register a document on the blockchain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Document registration costs 1 credit per document. Since 1 credit = 1 INR, that is ₹1 per document by default. Organizations can have a custom per-document fee configured by the Setara admin.",
      },
    },
    {
      "@type": "Question",
      name: "Is document verification free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Verification is always free and requires no authentication. Anyone can call the public GET /api/v1/verify endpoint to confirm the authenticity and timestamp of any registered document — no account, no API key, no credits needed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add more credits to my account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credits are managed centrally by the Setara super admin. Contact our team at contact@setara.network or reach out through the contact page to top up your organization's credit balance.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a minimum credit purchase amount?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No minimum purchase. Every new organization receives 5,000 free credits on signup — enough to register 5,000 documents. For additional credits, contact the Setara team and we will work out a package that fits your volume.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer volume discounts for high-volume organizations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For organizations registering large volumes of documents, we offer custom pricing with volume discounts. Contact our sales team to discuss an Enterprise package with SLA guarantees and dedicated support.",
      },
    },
  ],
};

const starterFeatures = [
  "5,000 free credits on signup",
  "Testnet access",
  "REST API key included",
  "Email support",
  "Public verification endpoint",
  "No credit card required",
];

const growthFeatures = [
  "Custom credit packages",
  "Mainnet access",
  "Priority support",
  "Dedicated account manager",
  "Volume-based credit pricing",
  "Audit logs and reporting",
];

const enterpriseFeatures = [
  "Volume discounts",
  "SLA guarantees",
  "On-premise deployment option",
  "Custom integration support",
  "Dedicated infrastructure",
  "24/7 technical support",
];

const faqs = [
  {
    q: "How much does it cost to register a document on the blockchain?",
    a: "Document registration costs 1 credit per document. Since 1 credit = 1 INR, that is ₹1 per document by default. Organizations can have a custom per-document fee configured by the Setara admin to suit high-volume use cases.",
  },
  {
    q: "Is document verification free?",
    a: "Yes — always. Anyone can call the public GET /api/v1/verify endpoint to confirm whether a document is registered on-chain, along with its timestamp and registering organization. No account, no API key, and no credits are required.",
  },
  {
    q: "How do I add more credits to my account?",
    a: "Credits are managed centrally by the Setara super admin. Contact our team or use the admin API to top up your organization's credit balance. There is no self-serve credit purchase portal — all transactions go through the Setara team.",
  },
  {
    q: "Is there a minimum credit purchase amount?",
    a: "No minimum. Every new organization receives 5,000 free credits on signup — enough to register 5,000 documents at the default rate. When you need more, contact the Setara team and we will set up a package suited to your volume.",
  },
  {
    q: "Do you offer volume discounts for large organizations?",
    a: "Yes. Enterprise customers registering high volumes of documents benefit from custom pricing and volume discounts. Reach out to discuss an Enterprise package that includes SLA guarantees, dedicated support, and tailored credit rates.",
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-24">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 lg:px-8 pt-6 pb-2">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-300" aria-current="page">Pricing</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,97,60,0.07),transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8613C]/30 bg-[#E8613C]/10 px-4 py-1.5 text-sm text-[#E8613C] font-medium mb-6">
              <IndianRupee className="w-3.5 h-3.5" />
              INR-based credits — no crypto required
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              No hidden fees. No tokens. No cryptocurrency. Setara uses plain INR-based credits —
              one rupee buys one credit, and one credit registers one document. Verification is
              always free, for everyone.
            </p>
          </div>
        </section>

        {/* How Credits Work */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How Credits Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8613C]/15 flex items-center justify-center text-[#E8613C]">
                <IndianRupee className="w-5 h-5" />
              </div>
              <p className="text-white font-semibold text-base">1 credit = ₹1 INR</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Credits map directly to Indian Rupees. No exchange rates, no conversion fees, no
                wallet setup — just straightforward fiat billing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8613C]/15 flex items-center justify-center text-[#E8613C]">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-white font-semibold text-base">1 document = 1 credit</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Each document registration on the blockchain costs 1 credit by default. Your
                organization can have a custom rate configured for high-volume use.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-white font-semibold text-base">Verification is free</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Anyone can verify any document via the public API — no account, no API key, no
                credits. Verification will always remain free.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-white font-semibold text-base">5,000 free credits</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every new organization receives 5,000 credits on signup — enough to register 5,000
                documents at no cost. No credit card needed.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Plans</h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
            Start free on testnet and scale to mainnet when you are ready. No subscription fees —
            you only pay for what you register.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Starter */}
            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-8 flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">Starter</p>
                <p className="text-4xl font-extrabold text-white">Free</p>
                <p className="text-gray-400 text-sm mt-1">5,000 credits included at signup</p>
              </div>
              <ul className="flex flex-col gap-3">
                {starterFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#E8613C] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d4542f] shadow-[0_0_20px_-5px_rgba(232,97,60,0.4)]"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Growth — highlighted */}
            <div className="rounded-2xl border border-[#E8613C]/40 bg-[#18181b] p-8 flex flex-col gap-6 relative shadow-[0_0_40px_-10px_rgba(232,97,60,0.25)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-[#E8613C] px-3.5 py-1 text-xs font-semibold text-white">
                Popular
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">Growth</p>
                <p className="text-4xl font-extrabold text-white">Contact Sales</p>
                <p className="text-gray-400 text-sm mt-1">Custom credit packages</p>
              </div>
              <ul className="flex flex-col gap-3">
                {growthFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E8613C] mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E8613C] px-6 py-3 text-sm font-semibold text-[#E8613C] transition-all hover:bg-[#E8613C] hover:text-white"
              >
                Talk to Sales
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-8 flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">Enterprise</p>
                <p className="text-4xl font-extrabold text-white">Contact Sales</p>
                <p className="text-gray-400 text-sm mt-1">Volume discounts available</p>
              </div>
              <ul className="flex flex-col gap-3">
                {enterpriseFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Contact Enterprise Sales
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 lg:px-8 pb-24">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <HelpCircle className="w-6 h-6 text-[#E8613C]" />
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col divide-y divide-white/5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-6">
                <p className="text-white font-semibold mb-2">{q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-[#18181b] p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,97,60,0.07),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Start registering documents today
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Sign up in under a minute. Get 5,000 free credits, an API key, and full access to
                the Setara testnet — no credit card, no crypto wallet required.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8613C] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#d4542f] shadow-[0_0_20px_-5px_rgba(232,97,60,0.5)]"
              >
                Register Your Organization
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
