import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Use Cases", href: "/use-cases" },
    { label: "Verify Document", href: "/verify" },
    { label: "Pricing", href: "/pricing" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Setara vs Hyperledger", href: "/vs-hyperledger" },
    { label: "NBF Compliance", href: "/compliance" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Glossary", href: "/glossary" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Build an App", href: "/docs/build-app" },
    { label: "Run a Node", href: "/docs/run-node" },
    { label: "Error Codes", href: "/docs/errors" },
    { label: "Billing & Credits", href: "/docs/billing" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "GitHub", href: "https://github.com/setara-network", external: true },
  ],
  "Website Policies": [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Copyright Policy", href: "/copyright" },
    { label: "Hyperlinking Policy", href: "/hyperlinking-policy" },
    { label: "Accessibility Statement", href: "/accessibility" },
  ],
  Help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Help", href: "/help" },
    { label: "Sitemap", href: "/sitemap-page" },
    { label: "Screen Reader Access", href: "/screen-reader-access" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-[#1a1a2e] text-gray-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Setara Network - Home">
              <Image
                src="/setara_dark.png"
                alt=""
                width={130}
                height={36}
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              India&apos;s sovereign document blockchain. Register, verify, and manage
              documents on a Proof-of-Authority network. Zero gas fees, no tokens.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
              <span className="text-[#E8613C]" aria-hidden="true">&#9679;</span>
              Built in India
            </div>

            {/* Content Ownership - GIGW requirement */}
            <p className="mt-6 text-xs text-gray-500">
              Content owned and maintained by Setara Network.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Setara Network. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Last Updated: March 2026</span>
            <span className="hidden sm:inline" aria-hidden="true">|</span>
            <span className="hidden sm:inline">setara.network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
