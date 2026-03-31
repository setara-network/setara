import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchGlossaryTermBySlug,
  fetchAllGlossarySlugs,
} from "@/lib/strapi";

export async function generateStaticParams() {
  try {
    const slugs = await fetchAllGlossarySlugs();
    return slugs.map((slug) => ({ term: slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term: slug } = await params;
  const entry = await fetchGlossaryTermBySlug(slug);
  if (!entry) return {};

  const title = `What is ${entry.term}? | Blockchain Glossary | Setara Network`;
  const description =
    entry.definition.length > 160
      ? `${entry.definition.slice(0, 157)}…`
      : entry.definition;

  return {
    title,
    description,
    alternates: { canonical: `/glossary/${entry.slug}` },
    openGraph: {
      title,
      description,
      url: `https://setara.network/glossary/${entry.slug}`,
      type: "article",
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const entry = await fetchGlossaryTermBySlug(slug);

  if (!entry) notFound();

  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: entry.term,
    description: entry.definition,
    url: `https://setara.network/glossary/${entry.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Blockchain Glossary — Setara Network",
      url: "https://setara.network/glossary",
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
        name: "Glossary",
        item: "https://setara.network/glossary",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.term,
        item: `https://setara.network/glossary/${entry.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-[#09090b]">
        <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="transition-colors hover:text-[#E8613C]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/glossary"
                  className="transition-colors hover:text-[#E8613C]"
                >
                  Glossary
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                aria-current="page"
                className="max-w-[200px] truncate font-medium text-gray-300"
              >
                {entry.term}
              </li>
            </ol>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            What is {entry.term}?
          </h1>

          {/* Definition card */}
          <div className="mt-8 rounded-2xl border border-[#E8613C]/20 bg-[#18181b] p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E8613C]">
              Definition
            </p>
            <p className="mt-3 text-lg leading-relaxed text-gray-200">
              {entry.definition}
            </p>
          </div>

          {/* Long description */}
          {entry.longDescription && (
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-bold text-white">
                In Depth
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-400">
                {entry.longDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* Related terms */}
          {entry.relatedTerms && entry.relatedTerms.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-5 text-xl font-bold text-white">
                Related Terms
              </h2>
              <div className="flex flex-wrap gap-3">
                {entry.relatedTerms.map((relatedSlug) => (
                  <Link
                    key={relatedSlug}
                    href={`/glossary/${relatedSlug}`}
                    className="rounded-full border border-white/10 bg-[#18181b] px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:border-[#E8613C]/40 hover:bg-[#1f1f23] hover:text-[#E8613C]"
                  >
                    {relatedSlug.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-white/5 bg-[#18181b] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Keep Learning
            </p>
            <p className="mt-3 text-gray-400">
              Explore the full glossary or dive deeper into the technical
              documentation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/glossary"
                className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white"
              >
                &larr; All Glossary Terms
              </Link>
              <Link
                href="/docs"
                className="rounded-full bg-[#E8613C] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Read our Docs
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
