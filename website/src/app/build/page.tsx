import type { Metadata } from "next";
import { Code, Terminal, Layers, Repeat } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Build on Setara | Developer Hub | Setara Network",
  description:
    "Documentation, REST API, and SDKs for integrating blockchain document verification into your applications. Node.js, Python, and Go examples. Deploy validator nodes via Docker.",
  keywords: [
    "blockchain API",
    "document verification API",
    "Cosmos SDK developer",
    "blockchain developer India",
    "document registration API",
  ],
  alternates: { canonical: "/build" },
  openGraph: {
    title: "Build on Setara | Developer Hub",
    description:
      "REST API, SDKs, and documentation for blockchain document verification. Get started in minutes.",
    url: "/build",
  },
};

export default function BuildPage() {
  return (
    <div className="bg-[#09090b] min-h-screen pt-24 pb-20">

      {/* Hero Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
          <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">Build</span> Document Verification Apps
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
          Integrate Setara&apos;s document verification into your applications with our REST API. Register documents, verify hashes, and manage organization wallets — all with simple HTTP calls.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

          {/* Card 1: Quick Start */}
          <div className="bg-[#18181b] rounded-3xl border border-white/5 p-10 hover:border-white/10 transition-colors group">
             <div className="w-16 h-16 rounded-2xl bg-[#E8613C]/10 flex items-center justify-center mb-8 border border-[#E8613C]/20 group-hover:border-[#E8613C]/50 transition-colors">
               <Layers className="w-8 h-8 text-[#E8613C]" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-4">Quick Start — Build an App</h2>
             <p className="text-gray-400 mb-8 leading-relaxed">
               Register your organization, get an API key, and make your first document registration in 4 steps. Available in curl, Node.js, Python, and Go.
             </p>
             <div className="bg-[#09090b] text-gray-300 font-mono text-sm p-4 rounded-xl mb-6 border border-white/5">
                <span className="text-green-400">curl</span> -X POST https://api.setara.network/api/v1/register \<br/>
                {"  "}-H &quot;Content-Type: application/json&quot; \<br/>
                {"  "}-d &apos;{`{"name":"MyOrg","email":"admin@myorg.in"}`}&apos;
             </div>
             <Link href="/docs/build-app" className="text-[#E8613C] font-semibold hover:text-[#d4542f] flex items-center gap-1 group/btn">
               Read Build Guide
               <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
             </Link>
          </div>

          {/* Card 2: Run a Node */}
          <div className="bg-[#18181b] rounded-3xl border border-white/5 p-10 hover:border-white/10 transition-colors group">
             <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
               <Terminal className="w-8 h-8 text-blue-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-4">Run a Validator Node</h2>
             <p className="text-gray-400 mb-8 leading-relaxed">
               Deploy your organization&apos;s validator node via Docker Compose. Includes IPFS, the Setara chain binary, and automatic peer discovery. Minimum: 2 CPU, 4GB RAM, 100GB SSD.
             </p>
              <div className="bg-[#09090b] text-gray-300 font-mono text-sm p-4 rounded-xl mb-6 border border-white/5">
                <span className="text-green-400">git clone</span> https://github.com/setara-network/setara \<br/>
                <span className="text-green-400">cd</span> docker && <span className="text-green-400">docker compose</span> up -d
             </div>
             <Link href="/docs/run-node" className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-1 group/btn">
               View Node Setup Guide
               <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
             </Link>
          </div>

        </div>

        {/* Resources Grid */}
        <div className="border-t border-white/5 pt-16">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Core Engineering Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <Link href="/docs/api" className="p-6 rounded-2xl border border-white/5 bg-[#18181b] flex items-start gap-4 hover:bg-white/5 transition-colors">
              <Code className="text-[#E8613C] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Full API Reference</h3>
                <p className="text-sm text-gray-400 mt-2">REST endpoints for document registration, verification, and wallet management.</p>
              </div>
            </Link>

            <Link href="/docs/build-app" className="p-6 rounded-2xl border border-white/5 bg-[#18181b] flex items-start gap-4 hover:bg-white/5 transition-colors">
              <Repeat className="text-[#E8613C] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Integration Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Step-by-step tutorial with code examples in Node.js, Python, and Go.</p>
              </div>
            </Link>

            <Link href="/docs/run-node" className="p-6 rounded-2xl border border-white/5 bg-[#18181b] flex items-start gap-4 hover:bg-white/5 transition-colors">
              <Layers className="text-[#E8613C] shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white">Validator Node Setup</h3>
                <p className="text-sm text-gray-400 mt-2">Docker Compose deployment, port configuration, and troubleshooting.</p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
