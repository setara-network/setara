import type { Metadata } from "next";
import Link from "next/link";
import { useCases } from "@/data/use-cases";

export const metadata: Metadata = {
  title: "Blockchain Document Verification Use Cases | Setara Network",
  description:
    "Explore how organizations use Setara blockchain for document verification. Sports certificates, university degrees, government records, healthcare, supply chain, legal documents, and more.",
  keywords: [
    "blockchain use cases",
    "document verification use cases",
    "blockchain certificate verification",
    "blockchain for education",
    "blockchain for healthcare",
    "blockchain for government",
    "blockchain for supply chain",
    "blockchain for India",
  ],
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Use Cases — Setara Network",
    description:
      "Explore how organizations use Setara blockchain for document verification across industries.",
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Setara Network Use Cases",
    description: metadata.description,
    url: "https://setara.network/use-cases",
    mainEntity: useCases.map((uc) => ({
      "@type": "Article",
      name: uc.title,
      description: uc.metaDescription,
      url: `https://setara.network/use-cases/${uc.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#2d1b3d] pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#E8613C]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <span className="h-2 w-2 rounded-full bg-[#E8613C]" />
            {useCases.length} Industries
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Blockchain Document Verification for{" "}
            <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">
              Every Industry
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            From sports certificates to government records, Setara is purpose-built for
            real-world document verification. No tokens, no wallets — just trust.
          </p>
        </div>
      </section>

      {/* Use Case Grid */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-[#E8613C]/20"
              >
                <span className="text-4xl">{uc.icon}</span>
                <h2 className="mt-4 text-xl font-semibold text-[#1a1a2e] group-hover:text-[#E8613C] transition-colors">
                  {uc.title}
                </h2>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {uc.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {uc.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-sm font-semibold text-[#E8613C]">
                  Learn more &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f9fa] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a2e]">
            Don&apos;t See Your Industry?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Setara works for any organization that needs to register and verify documents.
            If you can hash a file, you can put it on Setara.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="w-full rounded-full bg-[#E8613C] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#E8613C]/25 transition-all hover:bg-[#d4542f] sm:w-auto"
            >
              Register Your Organization
            </Link>
            <Link
              href="/docs/build-app"
              className="w-full rounded-full border border-gray-200 px-8 py-3.5 text-base font-semibold text-[#1a1a2e] transition-all hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              Developer Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
