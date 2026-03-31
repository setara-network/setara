import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { fetchBlogBySlug, fetchAllBlogSlugs } from "@/lib/strapi";
import type { StrapiBlog } from "@/lib/strapi";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await fetchAllBlogSlugs();
    if (!slugs || slugs.length === 0) return [];
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Setara Network Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl =
    post.image?.url && post.image.url.startsWith("http")
      ? post.image.url
      : post.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://cms.nubo.email"}${post.image.url}`
      : null;

  return {
    title: `${post.title} | Setara Network Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "Setara Network",
      locale: "en_IN",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["Setara Network"],
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: post.image?.width ?? 1200,
                height: post.image?.height ?? 630,
                alt: post.image?.alternativeText ?? post.title,
              },
            ],
          }
        : {
            images: [
              {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD helpers
// ---------------------------------------------------------------------------

function ArticleJsonLd({ post }: { post: StrapiBlog }) {
  const imageUrl =
    post.image?.url && post.image.url.startsWith("http")
      ? post.image.url
      : post.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://cms.nubo.email"}${post.image.url}`
      : "https://setara.network/opengraph-image";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://setara.network/blog/${post.slug}`,
    image: imageUrl,
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
      "@id": `https://setara.network/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ post }: { post: StrapiBlog }) {
  const jsonLd = {
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
        name: "Blog",
        item: "https://setara.network/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://setara.network/blog/${post.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Category accent colors (shared with listing page)
// ---------------------------------------------------------------------------

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
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl =
    post.image?.url && post.image.url.startsWith("http")
      ? post.image.url
      : post.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://cms.nubo.email"}${post.image.url}`
      : null;

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">

          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-8 pt-6">
            <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-gray-300 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {post.category && (
              <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full border ${categoryStyle(post.category)}`}>
                {post.category}
              </span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <time dateTime={post.date}>{formattedDate}</time>
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {post.readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight mb-8">
            {post.title}
          </h1>

          {/* Hero image */}
          {imageUrl && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#18181b] mb-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
              <Image
                src={imageUrl}
                alt={post.image?.alternativeText ?? post.title}
                width={post.image?.width ?? 1200}
                height={post.image?.height ?? 675}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Article body */}
          <article aria-label="Blog post content">
            {/* Description lead */}
            {post.description && (
              <p className="text-lg text-gray-300 leading-relaxed mb-10 font-medium border-l-2 border-[#E8613C] pl-5">
                {post.description}
              </p>
            )}

            {/* Blog sections */}
            {post.blogSection && post.blogSection.length > 0 ? (
              <div className="space-y-12">
                {post.blogSection.map((section, index) => (
                  <section key={index} aria-labelledby={`section-heading-${index}`}>
                    {/* Section heading */}
                    {section.blogTitle && (
                      <h2
                        id={`section-heading-${index}`}
                        className="text-xl font-bold text-white mb-4 mt-2"
                      >
                        {section.blogTitle}
                      </h2>
                    )}

                    {/* Section images (if any) */}
                    {section.blogImage && section.blogImage.length > 0 && (
                      <div className="flex flex-col gap-4 mb-6">
                        {section.blogImage.map((img, imgIndex) => {
                          const sectionImgUrl =
                            img.url && img.url.startsWith("http")
                              ? img.url
                              : img.url
                              ? `${process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://cms.nubo.email"}${img.url}`
                              : null;
                          if (!sectionImgUrl) return null;
                          return (
                            <div
                              key={imgIndex}
                              className="relative w-full rounded-xl overflow-hidden bg-[#18181b]"
                            >
                              <Image
                                src={sectionImgUrl}
                                alt={img.alternativeText ?? section.blogTitle ?? "Section image"}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Section body — markdown rendered as HTML from trusted CMS */}
                    {section.blogDse && (
                      <div
                        className="prose-blog"
                        dangerouslySetInnerHTML={{ __html: section.blogDse }}
                      />
                    )}
                  </section>
                ))}
              </div>
            ) : (
              /* Graceful fallback if no sections */
              !post.description && (
                <p className="text-gray-400 text-center py-10">
                  Content for this article is being prepared. Check back soon.
                </p>
              )
            )}
          </article>

          {/* Divider */}
          <hr className="border-white/5 my-14" />

          {/* Register CTA */}
          <div className="relative rounded-3xl border border-[#E8613C]/20 bg-gradient-to-br from-[#E8613C]/5 to-transparent p-10 text-center overflow-hidden mb-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-[#E8613C]/10 blur-[80px] rounded-[100%] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-3">
                Ready to verify documents on-chain?
              </h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                Register your organization on Setara Network and get 5,000 free credits. No gas fees, no tokens, no complexity.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8613C] px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d4542f] shadow-[0_0_20px_-5px_rgba(232,97,60,0.4)]"
              >
                Register Your Organization
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              More Posts
            </Link>
          </div>

        </div>
      </div>

      {/* Prose styles scoped to this page */}
      <style>{`
        .prose-blog {
          color: rgb(209 213 219); /* text-gray-300 */
          font-size: 1rem;
          line-height: 1.75;
        }
        .prose-blog h1,
        .prose-blog h2,
        .prose-blog h3,
        .prose-blog h4,
        .prose-blog h5,
        .prose-blog h6 {
          color: #ffffff;
          font-weight: 700;
          margin-top: 1.75em;
          margin-bottom: 0.6em;
          line-height: 1.3;
        }
        .prose-blog h2 { font-size: 1.35rem; }
        .prose-blog h3 { font-size: 1.15rem; }
        .prose-blog p {
          margin-top: 0;
          margin-bottom: 1.25em;
        }
        .prose-blog a {
          color: #E8613C;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-blog a:hover {
          color: #f09070;
        }
        .prose-blog strong {
          color: #ffffff;
          font-weight: 600;
        }
        .prose-blog em {
          color: rgb(209 213 219);
        }
        .prose-blog ul,
        .prose-blog ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25em;
        }
        .prose-blog ul { list-style-type: disc; }
        .prose-blog ol { list-style-type: decimal; }
        .prose-blog li {
          margin-bottom: 0.35em;
        }
        .prose-blog blockquote {
          border-left: 3px solid #E8613C;
          padding-left: 1.25rem;
          margin-left: 0;
          margin-right: 0;
          color: rgb(156 163 175); /* text-gray-400 */
          font-style: italic;
          margin-bottom: 1.25em;
        }
        .prose-blog code {
          background: #1a1a2e;
          color: rgb(209 213 219);
          padding: 0.15em 0.45em;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: var(--font-mono), ui-monospace, monospace;
        }
        .prose-blog pre {
          background: #1a1a2e;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.5em;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .prose-blog pre code {
          background: transparent;
          padding: 0;
          border-radius: 0;
          font-size: inherit;
        }
        .prose-blog hr {
          border-color: rgba(255,255,255,0.05);
          margin: 2em 0;
        }
        .prose-blog img {
          border-radius: 0.75rem;
          margin: 1.5em auto;
          max-width: 100%;
          height: auto;
        }
        .prose-blog table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5em;
          font-size: 0.9rem;
        }
        .prose-blog th {
          background: rgba(255,255,255,0.04);
          color: #ffffff;
          font-weight: 600;
          text-align: left;
          padding: 0.65rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .prose-blog td {
          padding: 0.6rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: rgb(209 213 219);
          vertical-align: top;
        }
        .prose-blog tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </>
  );
}
