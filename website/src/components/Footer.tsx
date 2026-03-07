"use client";

import Image from "next/image";

const footerLinks = {
  Product: [
    { label: "What is Setara", href: "#what-is-setara" },
    { label: "Architecture", href: "#architecture" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Ecosystem", href: "#ecosystem" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs/build-app" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Run a Node", href: "/docs/run-node" },
    { label: "GitHub", href: "https://github.com/setara-network" },
  ],
  Community: [
    { label: "Twitter", href: "#" },
    { label: "Discord", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-[#1a1a2e] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/setara_dark.png"
              alt="Setara Network"
              width={130}
              height={36}
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              India&apos;s sovereign document blockchain. Secure, verify, and manage
              documents on a decentralized network built for organizations.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
              <span className="text-[#E8613C]">&#9679;</span>
              Built in India
            </div>
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
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; 2026 Setara Network. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            setara.network
          </p>
        </div>
      </div>
    </footer>
  );
}
