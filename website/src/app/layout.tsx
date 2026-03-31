import type { Metadata, Viewport } from "next";
import { Mulish, Geist_Mono } from "next/font/google";
import "./globals.css";
import AccessibilityBar from "@/components/AccessibilityBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E8613C",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://setara.network"),
  title: "Setara Network — India's Blockchain for Document Verification",
  description:
    "Register, verify, and manage documents on India's sovereign Proof-of-Authority blockchain. Zero gas fees, zero tokens, zero complexity. Built on the Cosmos SDK for organizations, universities, and government institutions.",
  keywords: [
    "blockchain document verification",
    "document verification India",
    "blockchain certificate verification",
    "proof of authority blockchain",
    "Cosmos SDK India",
    "NBF compliance blockchain",
    "zero gas fee blockchain",
    "setara network",
    "document blockchain",
    "tamper proof certificates",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    siteName: "Setara Network",
    locale: "en_IN",
    title: "Setara Network — India's Blockchain for Document Verification",
    description:
      "Register, verify, and manage documents on India's sovereign Proof-of-Authority blockchain. Zero gas fees, zero tokens. Built on Cosmos SDK.",
    url: "https://setara.network",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Setara Network — Document Verification Blockchain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Setara Network — India's Blockchain for Document Verification",
    description:
      "Register, verify, and manage documents on India's sovereign Proof-of-Authority blockchain. Zero gas fees, zero tokens.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Setara Network",
  url: "https://setara.network",
  logo: "https://setara.network/setara_dark.png",
  description:
    "India's sovereign Proof-of-Authority blockchain for document verification. Organizations register document hashes on an immutable ledger — anyone can verify authenticity. Zero gas fees, no tokens.",
  foundingLocation: {
    "@type": "Place",
    name: "India",
  },
  sameAs: ["https://github.com/setara-network"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Setara Network",
  url: "https://setara.network",
  description: "India's blockchain for document verification",
  publisher: { "@type": "Organization", name: "Setara Network" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${mulish.variable} ${geistMono.variable} antialiased font-size-normal`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* GIGW: Skip to main content link */}
        <a href="#main-content" className="skip-to-content">
          Skip to Main Content
        </a>

        {/* DBIM: Accessibility utility bar */}
        <AccessibilityBar />

        {/* Main navigation */}
        <Navbar />

        {/* GIGW: Main content landmark */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer with policy links */}
        <Footer />
      </body>
    </html>
  );
}
