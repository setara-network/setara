import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap — Setara Network",
  description: "Complete sitemap of the Setara Network website.",
};

const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Register Organization", href: "/register" },
      { label: "Whitepaper", href: "/whitepaper" },
    ],
  },
  {
    title: "Developer Resources",
    links: [
      { label: "Build an App", href: "/docs/build-app" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Run a Node", href: "/docs/run-node" },
    ],
  },
  {
    title: "Website Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Copyright Policy", href: "/copyright" },
      { label: "Hyperlinking Policy", href: "/hyperlinking-policy" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help", href: "/help" },
      { label: "Screen Reader Access", href: "/screen-reader-access" },
      { label: "Sitemap", href: "/sitemap-page" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#E8613C] transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#1a1a2e] font-medium">Sitemap</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-[#1a1a2e] sm:text-4xl">Sitemap</h1>
        <p className="mt-4 text-lg text-gray-600">
          A complete listing of all pages available on the Setara Network website.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {sitemapSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-[#1a1a2e] border-b border-gray-200 pb-2 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#E8613C] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
