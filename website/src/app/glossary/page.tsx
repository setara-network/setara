import type { Metadata } from "next";
import Link from "next/link";
import { fetchGlossaryTerms } from "@/lib/strapi";
import type { StrapiGlossaryTerm } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blockchain Glossary — Key Terms & Definitions | Setara Network",
  description:
    "A comprehensive glossary of blockchain and document verification terms. Understand Proof-of-Authority, hash functions, IPFS, Cosmos SDK, and all key concepts behind Setara Network.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "Blockchain Glossary — Key Terms & Definitions | Setara Network",
    description:
      "A comprehensive glossary of blockchain and document verification terms used by Setara Network.",
    url: "https://setara.network/glossary",
    type: "website",
  },
};

function groupByLetter(terms: StrapiGlossaryTerm[]): Record<string, StrapiGlossaryTerm[]> {
  const groups: Record<string, StrapiGlossaryTerm[]> = {};
  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
  }
  return groups;
}

export default async function GlossaryPage() {
  const { data: terms } = await fetchGlossaryTerms();

  const grouped = groupByLetter(terms);
  const letters = Object.keys(grouped).sort();

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Blockchain Glossary — Setara Network",
    description:
      "Key blockchain and document verification terms used by Setara Network.",
    url: "https://setara.network/glossary",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `https://setara.network/glossary/${t.slug}`,
      inDefinedTermSet: "https://setara.network/glossary",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />

      <div className="min-h-screen bg-[#09090b]">
        {/* Hero */}
        <section className="border-b border-white/5 px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#E8613C]">
              Reference
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Blockchain Glossary
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Every key term you need to understand blockchain-based document
              verification — from hash functions and Proof-of-Authority consensus
              to IPFS, Cosmos SDK modules, and Setara-specific concepts.
            </p>
            {letters.length > 0 && (
              <nav aria-label="Jump to letter" className="mt-10 flex flex-wrap justify-center gap-2">
                {letters.map((letter) => (
                  <a
                    key={letter}
                    href={`#letter-${letter}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18181b] text-sm font-bold text-gray-300 transition-colors hover:bg-[#E8613C]/20 hover:text-[#E8613C] border border-white/5"
                  >
                    {letter}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </section>

        {/* Terms */}
        <main id="main-content" className="mx-auto max-w-5xl px-6 py-16">
          {terms.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-[#18181b] px-8 py-16 text-center">
              <p className="text-2xl font-bold text-white">Coming Soon</p>
              <p className="mt-3 text-gray-400">
                We&apos;re building a comprehensive glossary of blockchain and
                document verification terms. Check back soon.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/docs"
                  className="rounded-full bg-[#E8613C] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Read the Docs
                </Link>
                <Link
                  href="/help"
                  className="rounded-full border border-white/10 bg-[#18181b] px-6 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  Help Centre
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-14">
              {letters.map((letter) => (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8613C]/10 text-lg font-extrabold text-[#E8613C]">
                      {letter}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {grouped[letter].map((term) => (
                      <Link
                        key={term.slug}
                        href={`/glossary/${term.slug}`}
                        className="group rounded-2xl border border-white/5 bg-[#18181b] p-6 transition-all hover:border-[#E8613C]/30 hover:bg-[#1f1f23]"
                      >
                        <h2 className="font-bold text-white group-hover:text-[#E8613C] transition-colors">
                          {term.term}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400 line-clamp-3">
                          {term.definition.length > 150
                            ? `${term.definition.slice(0, 150).trimEnd()}…`
                            : term.definition}
                        </p>
                        <span className="mt-3 inline-block text-xs font-semibold text-[#E8613C] opacity-0 transition-opacity group-hover:opacity-100">
                          Read more &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Footer links */}
          <div className="mt-20 rounded-2xl border border-white/5 bg-[#18181b] p-8">
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Explore More
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/docs"
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-[#E8613C]/40 hover:text-[#E8613C]"
              >
                Developer Documentation
              </Link>
              <Link
                href="/whitepaper"
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-[#E8613C]/40 hover:text-[#E8613C]"
              >
                Whitepaper
              </Link>
              <Link
                href="/help"
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-[#E8613C]/40 hover:text-[#E8613C]"
              >
                Help Centre
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
