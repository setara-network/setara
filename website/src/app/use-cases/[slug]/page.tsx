import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCases, getUseCaseBySlug, getAllSlugs } from "@/data/use-cases";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);
  if (!uc) return {};

  return {
    title: uc.title,
    description: uc.metaDescription,
    keywords: uc.keywords,
    alternates: { canonical: `/use-cases/${uc.slug}` },
    openGraph: {
      title: `${uc.title} — Setara Network`,
      description: uc.metaDescription,
      url: `/use-cases/${uc.slug}`,
      type: "article",
    },
    twitter: {
      title: `${uc.title} — Setara Network`,
      description: uc.metaDescription,
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);
  if (!uc) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: uc.headline,
    description: uc.metaDescription,
    url: `https://setara.network/use-cases/${uc.slug}`,
    datePublished: "2026-03-01",
    dateModified: "2026-03-31",
    author: {
      "@type": "Organization",
      name: "Setara Network",
      url: "https://setara.network",
    },
    publisher: {
      "@type": "Organization",
      name: "Setara Network",
      url: "https://setara.network",
      logo: {
        "@type": "ImageObject",
        url: "https://setara.network/setara_dark.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://setara.network/use-cases/${uc.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setara.network" },
      { "@type": "ListItem", position: 2, name: "Use Cases", item: "https://setara.network/use-cases" },
      { "@type": "ListItem", position: 3, name: uc.title, item: `https://setara.network/use-cases/${uc.slug}` },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${uc.title} Works on Setara Blockchain`,
    description: uc.metaDescription,
    step: uc.howItWorks.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.step,
      text: step.description,
    })),
  };

  const otherUseCases = useCases.filter((u) => u.slug !== uc.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#E8613C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Link
            href="/use-cases"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            &larr; All Use Cases
          </Link>
          <div className="mb-6 flex justify-center">
            <span className="text-5xl">{uc.icon}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {uc.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            {uc.heroSubtitle}
          </p>

          {/* Stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {uc.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-[#E8613C] font-mono">{stat.value}</div>
                <div className="mt-1 text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a2e]">
            {uc.problem.title}
          </h2>
          <div className="mt-8 space-y-4">
            {uc.problem.points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <span className="mt-0.5 text-red-400">&#10005;</span>
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-[#f8f9fa] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a2e] text-center">
            {uc.solution.title}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {uc.solution.points.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#1a1a2e]">{point.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a2e] text-center">
            How It Works
          </h2>
          <div className="mt-12 space-y-0">
            {uc.howItWorks.map((step, i) => (
              <div key={step.step} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Timeline line */}
                {i < uc.howItWorks.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-px bg-[#E8613C]/20" />
                )}
                {/* Step number */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8613C] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-[#1a1a2e]">{step.step}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#f8f9fa] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#1a1a2e] text-center">
            Benefits
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {uc.benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4">
                <span className="mt-1 text-[#E8613C] text-lg">&#10003;</span>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e]">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b3d] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {uc.cta}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Register your organization, get 5,000 free credits, and start in minutes. No tokens, no wallets, no complexity.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="w-full rounded-full bg-[#E8613C] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#E8613C]/25 transition-all hover:bg-[#d4542f] sm:w-auto"
            >
              Register Your Organization
            </Link>
            <Link
              href="/docs/api"
              className="w-full rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Related Use Cases */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#1a1a2e] text-center">
            Other Use Cases
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherUseCases.map((other) => (
              <Link
                key={other.slug}
                href={`/use-cases/${other.slug}`}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-[#E8613C]/20"
              >
                <span className="text-3xl">{other.icon}</span>
                <h3 className="mt-3 font-semibold text-[#1a1a2e]">{other.title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{other.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/use-cases"
              className="text-sm font-semibold text-[#E8613C] hover:underline"
            >
              View all use cases &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
