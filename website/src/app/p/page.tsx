import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPseoPages, type StrapiPseoPage } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Resources — Document Verification Guides & Comparisons | Setara Network",
  description:
    "Explore guides, comparisons, industry use cases, city-specific information, and FAQs about blockchain document verification on Setara Network.",
  alternates: { canonical: "/p" },
  openGraph: {
    title: "Resources — Document Verification Guides & Comparisons | Setara Network",
    description:
      "Guides, comparisons, industry use cases, and FAQs about blockchain document verification on Setara Network.",
    url: "/p",
    type: "website",
    siteName: "Setara Network",
    locale: "en_IN",
  },
};

// ---------------------------------------------------------------------------
// Category display config
// ---------------------------------------------------------------------------

const CATEGORIES: {
  key: StrapiPseoPage["category"];
  label: string;
  description: string;
  accent: string;
}[] = [
  {
    key: "INDUSTRY",
    label: "Industries",
    description: "How Setara serves specific sectors — education, healthcare, government, and more.",
    accent: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  },
  {
    key: "DOCUMENT",
    label: "Document Types",
    description: "Verification workflows for degrees, certificates, contracts, and other document formats.",
    accent: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  {
    key: "CITY",
    label: "Cities",
    description: "Setara availability and partners across Indian cities and regions.",
    accent: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    key: "COMPARISON",
    label: "Comparisons",
    description: "Side-by-side comparisons of Setara against alternative blockchain platforms.",
    accent: "bg-[#E8613C]/10 border-[#E8613C]/20 text-[#E8613C]",
  },
  {
    key: "GUIDE",
    label: "Guides",
    description: "Step-by-step guides for integrating, deploying, and using Setara.",
    accent: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  {
    key: "FAQ_CLUSTER",
    label: "FAQ Clusters",
    description: "Focused Q&A clusters covering specific topics in depth.",
    accent: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function PseoIndexPage() {
  const { data: allPages } = await fetchPseoPages();

  // Group by category
  const grouped = new Map<StrapiPseoPage["category"], StrapiPseoPage[]>();
  for (const page of allPages) {
    const existing = grouped.get(page.category) ?? [];
    grouped.set(page.category, [...existing, page]);
  }

  const isEmpty = allPages.length === 0;

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
        name: "Resources",
        item: "https://setara.network/p",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-24">
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
              <li aria-current="page" className="text-gray-400">
                Resources
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-5">
              Resources
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Guides, comparisons, industry insights, and FAQs about blockchain
              document verification on Setara Network.
            </p>
          </div>

          {/* Empty state */}
          {isEmpty && (
            <div className="rounded-3xl border border-white/5 bg-[#18181b] p-16 text-center max-w-lg mx-auto">
              <div className="mb-4 text-4xl" aria-hidden="true">📄</div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                We are publishing guides, comparisons, and industry resources
                regularly. Check back soon or explore the site in the meantime.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-all duration-150"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Category sections */}
          {!isEmpty && (
            <div className="space-y-16">
              {CATEGORIES.map((cat) => {
                const pages = grouped.get(cat.key);
                if (!pages || pages.length === 0) return null;

                return (
                  <section key={cat.key} aria-labelledby={`cat-${cat.key}`}>
                    {/* Category heading */}
                    <div className="flex items-start gap-4 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${cat.accent}`}
                          >
                            {cat.label}
                          </span>
                          <span className="text-sm text-gray-600">
                            {pages.length} {pages.length === 1 ? "page" : "pages"}
                          </span>
                        </div>
                        <h2
                          id={`cat-${cat.key}`}
                          className="text-xl font-bold text-white"
                        >
                          {cat.label}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 max-w-xl">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Pages grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {pages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/p/${page.slug}`}
                          className="group rounded-2xl border border-white/5 bg-[#18181b] p-6 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-150"
                        >
                          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#E8613C] transition-colors duration-150 line-clamp-2">
                            {page.h1 || page.metaTitle}
                          </h3>
                          {page.metaDescription && (
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                              {page.metaDescription}
                            </p>
                          )}
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#E8613C] font-medium mt-auto">
                            Read more
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-150" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-24 rounded-3xl border border-[#E8613C]/20 bg-gradient-to-br from-[#E8613C]/5 via-transparent to-transparent p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8613C]/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative max-w-xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
                Start verifying documents on Setara
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Register your organization and receive 5,000 free credits. No
                cryptocurrency, no gas fees — just secure, immutable document
                verification.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E8613C] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E8613C]/25 hover:bg-[#d4552f] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Register Your Organization
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
