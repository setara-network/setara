import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* What is Setara */}
      <section id="what-is-setara" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="What is Setara?"
            subtitle="Setara is a permissionless blockchain purpose-built for document management. Organizations register, store document hashes and IPFS CIDs on-chain, and anyone can verify authenticity — no tokens, no wallets, no complexity."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={"\u{1F4C4}"}
              title="Document Registration"
              description="Register document hashes and IPFS CIDs on-chain with full metadata. Each document gets a tamper-proof, permanent record that anyone can verify."
            />
            <FeatureCard
              icon={"\u2713"}
              title="Certificate Verification"
              description="Instantly verify the authenticity of any document against the blockchain. No special software needed — just a hash or CID lookup."
            />
            <FeatureCard
              icon={"\u{1F3E2}"}
              title="Organization Management"
              description="Organizations register on-chain with verified identities. Manage documents, credits, and permissions through a clean API interface."
            />
          </div>
        </div>
      </section>

      {/* Why Setara */}
      <section id="why-setara" className="bg-[#f8f9fa] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Why Setara?"
            subtitle="Purpose-built for the real world. No tokens to buy, no wallets to manage, no complexity to navigate."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whySetaraItems.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Architecture"
            subtitle="A minimal, production-ready architecture with three core components."
          />

          {/* Architecture visual */}
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Org Node */}
              <div className="rounded-2xl border-2 border-[#E8613C]/20 bg-[#E8613C]/5 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8613C]/10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8613C" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a1a2e]">Org Node</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-mono text-xs text-[#E8613C]">setarad</span> + IPFS
                </p>
                <p className="mt-2 text-xs text-gray-500">Hosted by organizations</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="hidden md:block">
                  <svg width="100%" height="40" viewBox="0 0 200 40">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#E8613C" />
                      </marker>
                    </defs>
                    <line x1="0" y1="20" x2="180" y2="20" stroke="#E8613C" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6,4" />
                  </svg>
                </div>
                <div className="rounded-2xl border-2 border-[#E8613C] bg-[#E8613C] p-6 text-center shadow-lg shadow-[#E8613C]/20 md:absolute md:relative">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">Setara Network</h3>
                  <p className="text-sm text-white/80">CometBFT Consensus</p>
                  <p className="mt-2 text-xs text-white/60">Decentralized validators</p>
                </div>
              </div>

              {/* Explorer */}
              <div className="rounded-2xl border-2 border-[#E8613C]/20 bg-[#E8613C]/5 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8613C]/10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8613C" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a1a2e]">Explorer / Verify</h3>
                <p className="text-sm text-gray-600">Ping.pub + Verification UI</p>
                <p className="mt-2 text-xs text-gray-500">Hosted by Setara</p>
              </div>
            </div>

            {/* Architecture details */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h4 className="mb-4 text-lg font-bold text-[#1a1a2e]">What Setara Hosts</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    Block explorer (Ping.pub-based)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    Document verification portal
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    Network seed nodes and validators
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    Credit management system
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h4 className="mb-4 text-lg font-bold text-[#1a1a2e]">What Organizations Host</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    Their own node running <span className="font-mono text-sm text-[#E8613C]">setarad</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    IPFS node for document storage
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    API gateway for their applications
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#E8613C]">&#10003;</span>
                    Docker-based, one-command setup
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="bg-[#f8f9fa] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Use Cases"
            subtitle="From sports certificates to government records, Setara is built for real-world document verification needs."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section id="developers" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="For Developers"
            subtitle="Everything you need to build on Setara. Run a node, integrate the API, or build a verification app."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8613C]/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8613C" strokeWidth="2">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#1a1a2e]">Run a Node</h3>
              <p className="mb-4 text-gray-600">
                Deploy your own Setara node with Docker. One command, fully configured,
                production-ready.
              </p>
              <a href="/docs/run-node" className="text-sm font-semibold text-[#E8613C] hover:underline">
                Node Setup Guide &rarr;
              </a>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8613C]/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8613C" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#1a1a2e]">Build an App</h3>
              <p className="mb-4 text-gray-600">
                Integrate document verification into your application with our REST API
                and SDK.
              </p>
              <a href="/docs/build-app" className="text-sm font-semibold text-[#E8613C] hover:underline">
                Developer Docs &rarr;
              </a>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8613C]/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8613C" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#1a1a2e]">API Reference</h3>
              <p className="mb-4 text-gray-600">
                Complete API documentation for document registration, verification,
                and organization management.
              </p>
              <a href="/docs/api" className="text-sm font-semibold text-[#E8613C] hover:underline">
                View API Docs &rarr;
              </a>
            </div>
          </div>

          {/* Code snippet */}
          <div className="mt-16 mx-auto max-w-3xl">
            <div className="rounded-2xl bg-[#1a1a2e] p-1">
              <div className="flex items-center gap-2 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-400">Register a document</span>
              </div>
              <div className="rounded-b-xl bg-[#0d0d1a] p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  <code className="text-gray-300">
                    <span className="text-[#E8613C]">curl</span>{" -X POST https://api.setara.network/v1/documents \\\n"}
                    {"  -H "}<span className="text-green-400">{'"Content-Type: application/json"'}</span>{" \\\n"}
                    {"  -H "}<span className="text-green-400">{'"Authorization: Bearer <API_KEY>"'}</span>{" \\\n"}
                    {"  -d "}<span className="text-green-400">{"'{\n"}</span>
                    <span className="text-green-400">{"    \"hash\": \"sha256:abc123...\",\n"}</span>
                    <span className="text-green-400">{"    \"cid\": \"QmXyz...\",\n"}</span>
                    <span className="text-green-400">{"    \"metadata\": {\n"}</span>
                    <span className="text-green-400">{"      \"type\": \"certificate\",\n"}</span>
                    <span className="text-green-400">{"      \"issuer\": \"org_id\"\n"}</span>
                    <span className="text-green-400">{"    }\n"}</span>
                    <span className="text-green-400">{"  }'"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section id="ecosystem" className="bg-[#f8f9fa] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Ecosystem"
            subtitle="A growing ecosystem of tools and services around the Setara network."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystemItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-[#E8613C]/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8613C]/10 text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1a1a2e]">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                <div className="mt-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${item.status === "Live" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b3d] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to build on{" "}
            <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">
              Setara
            </span>
            ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
            Register your organization, deploy a node, and start putting documents on-chain
            in minutes. No tokens required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/register"
              className="w-full rounded-full bg-[#E8613C] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#E8613C]/25 transition-all hover:bg-[#d4542f] sm:w-auto"
            >
              Register Your Organization
            </a>
            <a
              href="#"
              className="w-full rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              Join the Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// Data

const whySetaraItems = [
  {
    icon: "\u{1F4B3}",
    title: "No Tokens Required",
    description:
      "Pay with fiat through a simple credit system. No cryptocurrency wallets, no exchanges, no volatility. Just straightforward billing.",
  },
  {
    icon: "\u{1F3E2}",
    title: "Enterprise Ready",
    description:
      "Docker-based deployment with one-command setup. Production-grade infrastructure that IT teams can manage without blockchain expertise.",
  },
  {
    icon: "\u{1F1EE}\u{1F1F3}",
    title: "Built for India",
    description:
      "Designed for Indian organizations and regulatory needs. Purpose-built to serve the document verification requirements of a billion people.",
  },
  {
    icon: "\u{1F513}",
    title: "Open Source",
    description:
      "Fully transparent and auditable codebase. Community-driven development ensures the network serves its users, not shareholders.",
  },
  {
    icon: "\u26A1",
    title: "Lightweight",
    description:
      "Minimal components, easy to manage. No bloated dependencies or complex configurations. Just what you need, nothing more.",
  },
  {
    icon: "\u{1F517}",
    title: "Interoperable",
    description:
      "IBC-ready architecture for future multi-chain expansion. Connect with other Cosmos-based networks when you need to.",
  },
];

const useCases = [
  {
    icon: "\u{1F3C6}",
    title: "Sports Certificates",
    description:
      "Krida e Pramaan: Competition certificates on blockchain. Athletes and organizers can issue and verify sports credentials instantly.",
  },
  {
    icon: "\u{1F393}",
    title: "University Degrees",
    description:
      "Tamper-proof academic credentials that employers can verify in seconds. No more fake degrees or lengthy verification processes.",
  },
  {
    icon: "\u{1F3DB}",
    title: "Government Documents",
    description:
      "Land records, identity proofs, and official certificates with blockchain-grade security and instant verification.",
  },
  {
    icon: "\u{1F4BC}",
    title: "Corporate Compliance",
    description:
      "Audit trails, legal documents, and compliance records with immutable proof of existence and timestamping.",
  },
  {
    icon: "\u{1FA7A}",
    title: "Healthcare Records",
    description:
      "Patient records verification with privacy-preserving hash-based storage. Verify without exposing sensitive data.",
  },
  {
    icon: "\u{1F69A}",
    title: "Supply Chain",
    description:
      "Provenance tracking and certificate of origin for goods. Verify the authenticity of products across the supply chain.",
  },
];

const ecosystemItems = [
  {
    icon: "\u{1F4B0}",
    title: "Wallet",
    description:
      "Credit-based wallet system for managing document registration fees. Simple fiat billing without cryptocurrency.",
    status: "Live",
  },
  {
    icon: "\u{1F50D}",
    title: "Explorer",
    description:
      "Ping.pub-based block explorer for browsing transactions, blocks, and on-chain documents.",
    status: "Live",
  },
  {
    icon: "\u{1F4F1}",
    title: "Apps",
    description:
      "Verification apps and integrations built on the Setara API. Mobile and web tools for end users.",
    status: "Coming Soon",
  },
  {
    icon: "\u{1F6E1}",
    title: "Validators",
    description:
      "Decentralized validator network securing the chain. Organizations can run validators to participate in consensus.",
    status: "Live",
  },
];
