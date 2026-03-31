import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, ArrowRight, ExternalLink } from "lucide-react";
import {
  fetchPseoPageBySlug,
  fetchAllPseoSlugs,
  type StrapiPseoPage,
} from "@/lib/strapi";

// ---------------------------------------------------------------------------
// Static params — gracefully returns [] when Strapi has no content yet
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const slugs = await fetchAllPseoSlugs();
    if (!slugs || slugs.length === 0) return [];
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Category display helpers
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<StrapiPseoPage["category"], string> = {
  INDUSTRY: "Industries",
  DOCUMENT: "Document Types",
  CITY: "Cities",
  COMPARISON: "Comparisons",
  GUIDE: "Guides",
  FAQ_CLUSTER: "FAQ Clusters",
};

const CATEGORY_PATHS: Record<StrapiPseoPage["category"], string> = {
  INDUSTRY: "/p?category=INDUSTRY",
  DOCUMENT: "/p?category=DOCUMENT",
  CITY: "/p?category=CITY",
  COMPARISON: "/p?category=COMPARISON",
  GUIDE: "/p?category=GUIDE",
  FAQ_CLUSTER: "/p?category=FAQ_CLUSTER",
};

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPseoPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found | Setara Network",
      robots: { index: false },
    };
  }

  const categoryLabel = CATEGORY_LABELS[page.category];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/p/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/p/${slug}`,
      type: page.category === "COMPARISON" ? "article" : "website",
      siteName: "Setara Network",
      locale: "en_IN",
    },
    other: {
      "article:section": categoryLabel,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function PseoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchPseoPageBySlug(slug);

  if (!page) notFound();

  const categoryLabel = CATEGORY_LABELS[page.category];
  const pageTitle = page.metaTitle;

  // ---- JSON-LD: BreadcrumbList ----
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
        name: categoryLabel,
        item: `https://setara.network${CATEGORY_PATHS[page.category]}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
        item: `https://setara.network/p/${slug}`,
      },
    ],
  };

  // ---- JSON-LD: FAQPage (if faqs present) ----
  const faqJsonLd =
    page.faqs && page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // ---- JSON-LD: Article (COMPARISON) or WebPage (all others) ----
  const pageSchemaJsonLd =
    page.category === "COMPARISON"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.h1,
          description: page.metaDescription,
          url: `https://setara.network/p/${slug}`,
          dateModified: new Date().toISOString().split("T")[0],
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
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.h1,
          description: page.metaDescription,
          url: `https://setara.network/p/${slug}`,
          isPartOf: {
            "@type": "WebSite",
            name: "Setara Network",
            url: "https://setara.network",
          },
        };

  const hasStats = page.stats && page.stats.length > 0;
  const hasFeatures = page.features && page.features.length > 0;
  const hasComparison = page.comparisonData && page.comparisonData.length > 0;
  const hasFaqs = page.faqs && page.faqs.length > 0;
  const hasInternalLinks = page.internalLinks && page.internalLinks.length > 0;

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemaJsonLd) }}
      />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#E8613C] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-700">/</li>
              <li>
                <Link
                  href="/p"
                  className="hover:text-[#E8613C] transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-700">/</li>
              <li aria-current="page" className="text-gray-400 truncate max-w-[200px] sm:max-w-none">
                {page.h1}
              </li>
            </ol>
          </nav>

          {/* ----------------------------------------------------------------
              HERO
          ---------------------------------------------------------------- */}
          <section className="mx-auto max-w-3xl text-center pb-16">
            {/* Category badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8613C]" />
              {categoryLabel}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              {page.h1}
            </h1>

            {page.introText && (
              <p className="mt-6 text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                {page.introText}
              </p>
            )}

            {page.ctaText && page.ctaUrl && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href={page.ctaUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E8613C] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E8613C]/20 hover:bg-[#d4552f] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {page.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </section>

          {/* ----------------------------------------------------------------
              STATS BAR
          ---------------------------------------------------------------- */}
          {hasStats && (
            <section aria-label="Key statistics" className="mb-20">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {page.stats!.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-[#18181b] p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-white sm:text-4xl">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-[#E8613C]">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------
              FEATURES GRID
          ---------------------------------------------------------------- */}
          {hasFeatures && (
            <section aria-label="Features" className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 sm:text-3xl">
                Why Setara
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {page.features!.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-[#18181b] p-7 hover:border-white/10 transition-colors duration-200"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8613C]/10">
                      <span className="text-lg font-bold text-[#E8613C]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------
              COMPARISON TABLE
          ---------------------------------------------------------------- */}
          {hasComparison && (
            <section aria-label="Feature comparison" className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 sm:text-3xl">
                How Setara Compares
              </h2>
              <div className="bg-[#18181b] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-6 px-6 sm:px-8 text-sm font-semibold text-gray-300 w-1/3 uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="py-6 px-6 sm:px-8 bg-[#E8613C]/5 border-x border-white/10 w-1/3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-[#E8613C] flex items-center justify-center text-white font-bold text-xs shrink-0">
                              S
                            </div>
                            <span className="text-xl font-bold text-white">
                              Setara Network
                            </span>
                          </div>
                        </th>
                        <th className="py-6 px-6 sm:px-8 w-1/3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gray-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                              C
                            </div>
                            <span className="text-xl font-bold text-gray-300">
                              Competitor
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {page.comparisonData!.map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-5 px-6 sm:px-8 font-medium text-gray-300 text-sm sm:text-base">
                            {row.feature}
                          </td>
                          <td className="py-5 px-6 sm:px-8 bg-[#E8613C]/[0.02] border-x border-white/5 text-gray-200">
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-[#E8613C] shrink-0" />
                              <span className="text-sm">{row.setara}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6 sm:px-8 text-gray-400">
                            <div className="flex items-center gap-3">
                              <X className="w-5 h-5 text-gray-600 shrink-0" />
                              <span className="text-sm">{row.competitor}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------
              FAQ ACCORDION (rendered open — no JS required)
          ---------------------------------------------------------------- */}
          {hasFaqs && (
            <section aria-label="Frequently asked questions" className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 max-w-3xl">
                {page.faqs!.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-[#18181b] p-6 hover:border-white/10 transition-colors duration-200"
                  >
                    <h3 className="text-base font-semibold text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------
              INTERNAL LINKS CLUSTER
          ---------------------------------------------------------------- */}
          {hasInternalLinks && (
            <section aria-label="Related pages" className="mb-20">
              <h2 className="text-lg font-semibold text-gray-300 mb-5 uppercase tracking-wider text-sm">
                Related Resources
              </h2>
              <div className="flex flex-wrap gap-3">
                {page.internalLinks!.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#18181b] px-4 py-2.5 text-sm text-gray-300 hover:border-[#E8613C]/30 hover:text-white hover:bg-white/5 transition-all duration-150"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------
              BOTTOM CTA
          ---------------------------------------------------------------- */}
          <section
            aria-label="Get started"
            className="mt-8 rounded-3xl border border-[#E8613C]/20 bg-gradient-to-br from-[#E8613C]/5 via-transparent to-transparent p-10 sm:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8613C]/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative max-w-xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
                Ready to get started with Setara?
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Register your organization and receive 5,000 free credits. No
                cryptocurrency, no gas fees — just secure document verification on
                India&apos;s Proof-of-Authority blockchain.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E8613C] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E8613C]/25 hover:bg-[#d4552f] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Register Your Organization
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
