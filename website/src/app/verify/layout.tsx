import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Document — Blockchain Document Verification | Setara Network",
  description:
    "Verify any document's authenticity on the Setara blockchain. Enter a document hash or upload a file to check if it has been registered on-chain. Free, instant, no account required.",
  keywords: [
    "verify document blockchain",
    "document verification",
    "check certificate authenticity",
    "blockchain verification tool",
  ],
  alternates: { canonical: "/verify" },
  openGraph: {
    title: "Verify Document on Blockchain | Setara Network",
    description:
      "Free, instant document verification. Check if any document has been registered on the Setara blockchain.",
    url: "/verify",
  },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
