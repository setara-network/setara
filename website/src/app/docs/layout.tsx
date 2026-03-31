"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navSections: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "Getting Started",
    links: [
      { label: "Overview", href: "/docs" },
      { label: "Build an App", href: "/docs/build-app" },
      { label: "Run a Node", href: "/docs/run-node" },
    ],
  },
  {
    heading: "Reference",
    links: [
      { label: "API Reference", href: "/docs/api" },
      { label: "Error Codes", href: "/docs/errors" },
      { label: "Billing & Credits", href: "/docs/billing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Whitepaper", href: "/whitepaper" },
      { label: "GitHub", href: "https://github.com/setara-network", external: true },
    ],
  },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Documentation navigation">
      {navSections.map((section) => (
        <div key={section.heading} className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {section.heading}
          </p>
          <ul className="space-y-0.5">
            {section.links.map((link) => {
              const isActive =
                !link.external &&
                (link.href === "/docs"
                  ? pathname === "/docs"
                  : pathname === link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-150 ${
                      isActive
                        ? "font-semibold text-[#E8613C]"
                        : "font-normal text-gray-600 hover:text-[#E8613C]"
                    }`}
                  >
                    {link.label}
                    {link.external && (
                      <svg
                        className="h-3 w-3 shrink-0 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Mobile menu toggle */}
      <div className="border-b border-gray-200 bg-white lg:hidden">
        <div className="mx-auto max-w-7xl px-6">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 py-3 text-sm font-medium text-gray-600 hover:text-[#E8613C]"
            aria-expanded={mobileMenuOpen}
            aria-controls="docs-mobile-nav"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            Docs Menu
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="docs-mobile-nav"
            className="border-t border-gray-200 bg-gray-50 px-6 py-4"
          >
            <SidebarContent pathname={pathname} />
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="mx-auto flex max-w-7xl gap-0">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20 border-r border-gray-200 py-8 pr-6 pl-6">
            <SidebarContent pathname={pathname} />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
