import type { Metadata } from "next";
import CosmosFeatures from "@/components/CosmosFeatures";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blockchain Infrastructure Capabilities | Setara Network",
  description:
    "Explore Setara's Cosmos SDK capabilities: modular architecture, IBC interoperability, EVM compatibility, data sovereignty, and Proof-of-Authority consensus for document verification.",
  alternates: { canonical: "/capabilities" },
  openGraph: {
    title: "Blockchain Infrastructure Capabilities | Setara Network",
    description:
      "Cosmos SDK modularity, IBC cross-chain communication, EVM compatibility, and sovereign infrastructure for document verification in India.",
    url: "/capabilities",
  },
};

export default function CapabilitiesPage() {
  return (
    <div className="bg-[#09090b] min-h-screen pt-24 pb-20">

      {/* Hero for Capabilities */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          Sovereign Blockchain <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">Infrastructure</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
          Setara leverages the battle-tested Cosmos SDK runtime, providing modular architecture, built-in cross-chain communication via IBC, and full EVM compatibility for document verification at scale.
        </p>
      </div>

      <CosmosFeatures />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-16 text-center">
        <div className="rounded-3xl border border-white/10 bg-[#18181b] p-10 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to architect your solution?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you need document verification for a single institution or a network of organizations, Setara has the infrastructure ready.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#E8613C] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#d4542f] shadow-[0_0_20px_-5px_rgba(232,97,60,0.5)]">
            Register Your Organization
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
