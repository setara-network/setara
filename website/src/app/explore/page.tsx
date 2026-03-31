import type { Metadata } from "next";
import { CreditCard, Server, LayoutDashboard, Rocket } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore the Ecosystem | Setara Network",
  description:
    "Browse wallets, block explorers, verification tools, and decentralized applications running on the Setara document verification blockchain.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore the Ecosystem | Setara Network",
    description:
      "Browse wallets, explorers, and applications running on Setara.",
    url: "/explore",
  },
};

const ecosystemItems = [
  {
    icon: CreditCard,
    title: "Fiat Web Toolkit",
    description: "Credit-based wallet system allowing enterprises to pay validator fees natively using simple fiat billing in INR.",
    status: "Live",
    category: "Wallets",
    href: "/docs/build-app",
  },
  {
    icon: Server,
    title: "Block Explorer (Ping.Pub)",
    description: "A tailored block explorer tracking Cosmos events, document registrations, and cross-chain IBC transfers across the network.",
    status: "Live",
    category: "Infrastructure",
    href: "/explore",
  },
  {
    icon: LayoutDashboard,
    title: "DocuHash Verify",
    description: "The official user interface for registering document hashes on Setara. Instantly verify certificates and credentials.",
    status: "Live",
    category: "DApps",
    href: "/docs/api",
  },
  {
    icon: Rocket,
    title: "Setara Keplr Integration",
    description: "Seamlessly import Setara accounts into the Keplr browser extension for interaction with cross-chain dApps.",
    status: "Coming Soon",
    category: "Wallets",
    href: "/explore",
  },
];

export default function ExplorePage() {
  return (
    <div className="bg-[#09090b] min-h-screen pt-24 pb-20">

      {/* Search Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Explore the <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Ecosystem</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400 mb-10">
            A growing registry of verification tools, decentralized applications, and enterprise infrastructure built on Setara.
          </p>

          <div className="relative max-w-xl mx-auto">
            <label htmlFor="ecosystem-search" className="sr-only">Search apps, wallets, and validators</label>
            <input
              id="ecosystem-search"
              type="text"
              placeholder="Search apps, wallets, validators..."
              className="w-full bg-[#18181b] border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8613C] transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-[#E8613C] text-white px-6 rounded-full font-semibold text-sm hover:bg-[#d4542f] transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemItems.map((item, idx) => (
            <Link key={idx} href={item.href} className="bg-[#18181b] border border-white/5 p-8 rounded-3xl hover:border-white/20 transition-all hover:-translate-y-1 shadow-md block">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                   <item.icon className="w-6 h-6 text-[#E8613C]" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${item.status === 'Live' ? 'border-green-500/20 bg-green-500/10 text-green-400' : 'border-amber-500/20 bg-amber-500/10 text-amber-400'}`}>
                   {item.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-20">
                {item.description}
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                 <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">{item.category}</span>
                 <span className="text-[#E8613C] text-sm font-semibold">View →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 bg-gradient-to-r from-[#18181b] to-[#18181b] border border-white/10 p-10 rounded-3xl text-center relative overflow-hidden">
           <div className="absolute -right-32 -bottom-20 w-96 h-96 bg-[#E8613C]/10 blur-3xl rounded-full pointer-events-none" />
           <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Have an application built on Setara?</h3>
           <p className="text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">
             Submit your DApp, validator node, or wallet implementation to be featured in the official ecosystem directory.
           </p>
           <Link href="/contact" className="relative z-10 inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
             Submit to Registry
           </Link>
        </div>

      </div>
    </div>
  );
}
