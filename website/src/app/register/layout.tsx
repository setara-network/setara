import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Your Organization",
  description:
    "Register your organization on the Setara blockchain. Get your API key and 5,000 free credits to start registering and verifying documents on-chain.",
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Register Your Organization — Setara Network",
    description:
      "Register your organization on the Setara blockchain. Get an API key and 5,000 free credits instantly.",
    url: "/register",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
