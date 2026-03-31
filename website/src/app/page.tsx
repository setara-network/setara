import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, Code, Globe, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* What is Setara — AI-extractable definition block */}
      <section className="bg-black border-b border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg sm:text-xl leading-relaxed text-gray-300">
            <strong className="text-white">Setara is India&apos;s first Proof-of-Authority blockchain purpose-built for document verification.</strong>{" "}
            Organizations register document hashes on an immutable ledger and anyone can verify authenticity in under 2 seconds.
            There are no gas fees, no tokens, and no cryptocurrency required — billing uses fiat credits in INR.
            Built on the Cosmos SDK with full NBF compliance, Setara serves universities, government institutions, NGOs, and enterprises across India.
          </p>
        </div>
      </section>

      {/* Main Hub Links */}
      <section className="bg-transparent relative py-20 pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(100,100,255,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(200,100,255,0.05),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Capabilities Teaser */}
            <Link href="/capabilities" className="group relative overflow-hidden rounded-[2.5rem] cosmos-glass p-12 transition-all hover:cosmos-glass-hover hover:border-white/20 min-h-[400px] flex flex-col justify-between">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px] group-hover:bg-indigo-500/20 transition-colors" />
              <div>
                <div className="w-14 h-14 rounded-full cosmos-glass flex items-center justify-center mb-10 text-white">
                  <Zap className="w-6 h-6 border-transparent" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">Core Capabilities</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Discover how Setara leverages the Cosmos SDK to provide unmatched modularity and cross-chain interoperability for document verification.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#E8613C] font-semibold mt-8">
                Explore Features <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            {/* Build Teaser */}
            <Link href="/build" className="group relative overflow-hidden rounded-[2.5rem] cosmos-glass p-12 transition-all hover:cosmos-glass-hover hover:border-white/20 min-h-[400px] flex flex-col justify-between">
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition-colors" />
              <div>
                <div className="w-14 h-14 rounded-full cosmos-glass flex items-center justify-center mb-10 text-white">
                  <Code className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">For Developers</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  REST API, SDKs in Node.js / Python / Go, and full documentation to integrate document verification into your applications.
                </p>
              </div>
              <div className="flex items-center gap-2 text-blue-500 font-semibold mt-8">
                Start Building <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            {/* Compliance Teaser */}
            <Link href="/compliance" className="group relative overflow-hidden rounded-[2.5rem] cosmos-glass p-12 transition-all hover:cosmos-glass-hover hover:border-white/20 min-h-[400px] flex flex-col justify-between">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-colors" />
              <div>
                <div className="w-14 h-14 rounded-full cosmos-glass flex items-center justify-center mb-10 text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">NBF Compliance</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Architected from the ground up for data localization, strict auditability, and alignment with India&apos;s National Blockchain Framework.
                </p>
              </div>
              <div className="flex items-center gap-2 text-green-500 font-semibold mt-8">
                View Compliance <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            {/* Use Cases Teaser */}
            <Link href="/use-cases" className="group relative overflow-hidden rounded-[2.5rem] cosmos-glass p-12 transition-all hover:cosmos-glass-hover hover:border-white/20 min-h-[400px] flex flex-col justify-between">
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
              <div>
                <div className="w-14 h-14 rounded-full cosmos-glass flex items-center justify-center mb-10 text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">Use Cases</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Sports certificates, university degrees, government documents, healthcare records, supply chain provenance — see how organizations use Setara.
                </p>
              </div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mt-8">
                Explore Use Cases <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

          </div>

          {/* Full Width CTA for Vs Hyperledger */}
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#18181b] to-black p-12 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#E8613C]/10 blur-[120px] rounded-[100%] pointer-events-none" />
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Why Setara over legacy permissioned chains?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
              Compare architectural complexity, true interoperability, and developer experience against Hyperledger Fabric.
            </p>
            <Link href="/vs-hyperledger" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 font-bold relative z-10 transition-all hover:bg-gray-200">
              Setara vs Hyperledger Fabric
            </Link>
          </div>

          {/* Register CTA */}
          <div className="mt-8 rounded-[2rem] border border-[#E8613C]/20 bg-gradient-to-br from-[#E8613C]/5 to-transparent p-12 text-center relative overflow-hidden">
            <h2 className="text-3xl font-bold text-white mb-4">Start Verifying Documents Today</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Register your organization, get 5,000 free credits, and make your first API call in minutes. No tokens, no wallets, no complexity.
            </p>
            <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8613C] text-white px-8 py-4 font-bold transition-all hover:bg-[#d4542f] shadow-[0_0_30px_-5px_rgba(232,97,60,0.4)]">
              Register Your Organization
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
