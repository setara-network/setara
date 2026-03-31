import type { Metadata } from "next";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Setara vs Hyperledger Fabric — Enterprise Blockchain Comparison | Setara Network",
  description:
    "Compare Setara Network and Hyperledger Fabric for enterprise blockchain: architecture, setup complexity, cost, NBF compliance, interoperability, and EVM compatibility. See why organizations choose Setara.",
  keywords: [
    "Setara vs Hyperledger",
    "Hyperledger Fabric alternative",
    "Cosmos SDK vs Hyperledger",
    "enterprise blockchain comparison India",
    "permissioned blockchain comparison",
  ],
  alternates: { canonical: "/vs-hyperledger" },
  openGraph: {
    title: "Setara vs Hyperledger Fabric | Enterprise Blockchain Comparison",
    description:
      "Compare architecture, cost, compliance, and developer experience between Setara and Hyperledger Fabric.",
    url: "/vs-hyperledger",
    type: "article",
  },
};

export default function VsHyperledger() {
  const comparisonData = [
    {
      feature: "Architecture",
      setara: "Modular Cosmos SDK (AppChains)",
      hyperledger: "Complex multi-channel permissioned",
    },
    {
      feature: "Interoperability",
      setara: "Native Inter-Blockchain Communication (IBC)",
      hyperledger: "Isolated networks; requires clunky bridge solutions",
    },
    {
      feature: "EVM Compatibility",
      setara: "Native support (Deploy standard Solidity)",
      hyperledger: "Not native (Requires complex EVM chaincode integration)",
    },
    {
      feature: "Setup Complexity",
      setara: "Low — 1-click Docker deployment",
      hyperledger: "Extremely High — Certificate Authorities, Orderers, Peers",
    },
    {
      feature: "Cost Efficiency (TCO)",
      setara: "High — Shared root security / low infra overhead",
      hyperledger: "Low — Requires massive devops and consulting overhead",
    },
    {
      feature: "NBF Compliance",
      setara: "100% By Design (Public-Permissioned models)",
      hyperledger: "Requires custom configuration & audits",
    },
    {
      feature: "Developer Ecosystem",
      setara: "Massive (Solidity, Cosmos, Web3.js)",
      hyperledger: "Niche (Go/Node.js Chaincode specifically)",
    },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Setara vs Hyperledger Fabric — Enterprise Blockchain Comparison",
    description: "A comprehensive comparison between Setara Network and Hyperledger Fabric for enterprise blockchain solutions.",
    url: "https://setara.network/vs-hyperledger",
    datePublished: "2026-03-01",
    dateModified: "2026-03-31",
    author: { "@type": "Organization", name: "Setara Network", url: "https://setara.network" },
    publisher: { "@type": "Organization", name: "Setara Network", url: "https://setara.network" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="bg-[#09090b] min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header */}
          <div className="mx-auto max-w-3xl text-center pb-16">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Setara <span className="text-gray-500 font-light italic">vs</span> Hyperledger Fabric
            </h1>
            <p className="text-lg leading-8 text-gray-400">
              Why organizations are moving away from complex, walled-garden permissioned chains to modular, interoperable ecosystems built on the Cosmos SDK.
            </p>
          </div>

          {/* Feature Comparison Table */}
          <div className="mt-8 bg-[#18181b] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-6 sm:px-8 text-sm font-semibold text-gray-300 w-1/3 uppercase tracking-wider">Features</th>
                    <th className="py-6 px-6 sm:px-8 bg-[#E8613C]/5 border-x border-white/10 w-1/3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#E8613C] flex items-center justify-center text-white font-bold text-xs">S</div>
                        <span className="text-xl font-bold text-white">Setara Network</span>
                      </div>
                    </th>
                    <th className="py-6 px-6 sm:px-8 w-1/3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">H</div>
                        <span className="text-xl font-bold text-white">Hyperledger Fabric</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-6 sm:px-8 font-medium text-gray-300 text-sm sm:text-base">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 sm:px-8 bg-[#E8613C]/[0.02] border-x border-white/5 text-gray-200">
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-[#E8613C] shrink-0" />
                          <span className="text-sm">{row.setara}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-gray-400">
                        <div className="flex items-center gap-3">
                          {row.hyperledger.includes("Not ") || row.hyperledger.includes("Complex") || row.hyperledger.includes("Extremely") || row.hyperledger.includes("Requires") ? (
                            <X className="w-5 h-5 text-gray-600 shrink-0" />
                          ) : (
                            <span className="w-5 h-5 shrink-0" />
                          )}
                          <span className="text-sm">{row.hyperledger}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deep Dive Sections */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">

            <div className="rounded-2xl border border-white/10 bg-[#18181b] p-8">
              <h3 className="text-2xl font-bold text-white mb-4">The True Cost of Ownership</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Hyperledger Fabric is notorious for &quot;consulting-ware&quot; — requiring entire teams of highly specialized DevOps engineers just to manage Certificate Authorities (CAs), Orderer nodes, and channel policies.
              </p>
              <p className="text-gray-400 leading-relaxed">
                <strong className="text-white">Setara eliminates this overhead.</strong> Built for developers first, deploying a Setara node takes minutes via Docker. State management is unified yet sovereign, dropping your total cost of ownership by up to 80% compared to Fabric deployments.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8613C]/30 bg-[#E8613C]/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8613C]/10 blur-3xl rounded-full pointer-events-none" />
              <h3 className="text-2xl font-bold text-white mb-4">Interoperability First</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Fabric networks are information silos. They require bespoke, centralized bridges to talk to the rest of the world.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Because Setara inherits the <strong>Cosmos SDK</strong>, it comes out of the box with the Inter-Blockchain Communication (IBC) protocol. Setara can natively trust and transfer data amongst itself and across the broader Cosmos ecosystem — future-proofing your enterprise network.
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
