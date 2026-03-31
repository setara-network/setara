import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { fetchBlogs } from "@/lib/strapi";
import type { StrapiBlog } from "@/lib/strapi";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Blog — Blockchain & Document Verification Insights | Setara Network",
  description:
    "Insights on blockchain document verification, Cosmos SDK development, and the future of trust infrastructure in India. Read the latest from the Setara Network team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog — Blockchain & Document Verification Insights | Setara Network",
    description:
      "Insights on blockchain document verification, Cosmos SDK development, and the future of trust infrastructure in India.",
    url: "/blog",
    siteName: "Setara Network",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Setara Network Blog — Blockchain & Document Verification Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Blockchain & Document Verification Insights | Setara Network",
    description:
      "Insights on blockchain document verification, Cosmos SDK development, and the future of trust infrastructure in India.",
  },
};

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

function CollectionPageJsonLd({ posts }: { posts: StrapiBlog[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Blockchain & Document Verification Insights | Setara Network",
    description:
      "Insights on blockchain document verification, Cosmos SDK development, and the future of trust infrastructure in India.",
    url: "https://setara.network/blog",
    publisher: {
      "@type": "Organization",
      name: "Setara Network",
      url: "https://setara.network",
      logo: "https://setara.network/setara_dark.png",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://setara.network/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORIES = [
  "All",
  "Technology",
  "Use Cases",
  "Tutorials",
  "Industry",
  "News",
];

const CATEGORY_ACCENT_COLORS: Record<string, string> = {
  Technology: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Use Cases": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Tutorials: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Industry: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  News: "bg-[#E8613C]/10 text-[#E8613C] border-[#E8613C]/20",
};

function categoryStyle(category: string): string {
  return (
    CATEGORY_ACCENT_COLORS[category] ??
    "bg-white/5 text-gray-400 border-white/10"
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BlogCard({ post }: { post: StrapiBlog }) {
  const imageUrl =
    post.image?.url && post.image.url.startsWith("http")
      ? post.image.url
      : post.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://cms.nubo.email"}${post.image.url}`
      : null;

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const truncatedDescription =
    post.description && post.description.length > 140
      ? post.description.slice(0, 137) + "..."
      : post.description;

  return (
    <article className="group flex flex-col bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-0.5">
      {/* Image */}
      {imageUrl ? (
        <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-[#0f0f12] shrink-0" tabIndex={-1} aria-hidden="true">
          <Image
            src={imageUrl}
            alt={post.image?.alternativeText ?? post.title}
            width={post.image?.width ?? 800}
            height={post.image?.height ?? 450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      ) : (
        <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f12] shrink-0 overflow-hidden" tabIndex={-1} aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,97,60,0.08),transparent_70%)]" />
        </Link>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category + Popular badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {post.category && (
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryStyle(post.category)}`}>
              {post.category}
            </span>
          )}
          {post.isPopular && (
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8613C]/10 text-[#E8613C] border border-[#E8613C]/20">
              Popular
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="block mb-3 group/title">
          <h2 className="text-base font-bold text-white leading-snug group-hover/title:text-[#E8613C] transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        {truncatedDescription && (
          <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
            {truncatedDescription}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5 text-xs text-gray-500">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              {formattedDate}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              {post.readTime}
            </span>
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="ml-auto flex items-center gap-1 text-[#E8613C] font-semibold hover:underline"
            aria-label={`Read: ${post.title}`}
          >
            Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ComingSoonCard() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#18181b] border border-white/5 flex items-center justify-center mb-6">
        <BookOpen className="w-7 h-7 text-[#E8613C]" />
      </div>
      <h2 className="text-xl font-bold text-white mb-3">Content Coming Soon</h2>
      <p className="text-gray-400 max-w-md leading-relaxed">
        We&apos;re working on great content about blockchain document verification, Cosmos SDK development, and trust infrastructure in India. Check back soon or subscribe below to get notified.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPage() {
  const { data: posts } = await fetchBlogs(1, 12);

  return (
    <>
      <CollectionPageJsonLd posts={posts} />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-20">

        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-14 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(232,97,60,0.06),transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8613C]/10 border border-[#E8613C]/20 px-4 py-1.5 text-sm font-medium text-[#E8613C] mb-6">
              Setara Network Blog
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-5">
              Blog
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              Insights on blockchain document verification, Cosmos SDK development, and the future of trust infrastructure in India.
            </p>
          </div>
        </section>

        {/* Category filter pills (static, server-rendered) */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-10" aria-label="Blog categories">
          <div className="flex flex-wrap gap-2 justify-center" role="list">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                role="listitem"
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-default ${
                  cat === "All"
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-gray-300"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Blog grid */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-20" aria-label="Blog posts">
          {posts.length === 0 ? (
            <div className="bg-[#18181b] border border-white/5 rounded-2xl">
              <ComingSoonCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Subscribe CTA */}
        <section className="mx-auto max-w-3xl px-6 lg:px-8" aria-labelledby="subscribe-heading">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#18181b] to-[#09090b] p-10 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#E8613C]/8 blur-[100px] rounded-[100%] pointer-events-none" />
            <div className="relative z-10">
              <h2 id="subscribe-heading" className="text-2xl font-bold text-white mb-3">
                Stay updated
              </h2>
              <p className="text-gray-400 mb-7 max-w-lg mx-auto">
                Get the latest insights on blockchain document verification, Cosmos SDK updates, and trust infrastructure news delivered to your inbox.
              </p>

              {/* Email CTA — UI only, uses mailto as placeholder */}
              <form
                action="mailto:hello@setara.network?subject=Blog%20Subscription"
                method="get"
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                aria-label="Subscribe to blog updates"
              >
                <label htmlFor="subscribe-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  name="body"
                  placeholder="you@organisation.in"
                  required
                  className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E8613C]/50 focus:ring-1 focus:ring-[#E8613C]/30 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8613C] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d4542f] shadow-[0_0_20px_-5px_rgba(232,97,60,0.4)] shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
