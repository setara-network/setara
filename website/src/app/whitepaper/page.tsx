import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Whitepaper — Setara Network",
  description: "Setara Network whitepaper: India's sovereign document blockchain.",
};

function SideLink({ id, label, sub }: { id: string; label: string; sub?: boolean }) {
  return (
    <a
      href={`#${id}`}
      className={`block text-sm transition-colors hover:text-[#E8613C] ${
        sub ? "pl-4 text-gray-400 hover:text-[#E8613C]" : "font-medium text-gray-300"
      }`}
    >
      {label}
    </a>
  );
}

function Section({ id, number, title, children }: { id: string; number?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex items-baseline gap-3">
        {number && (
          <span className="font-mono text-sm text-[#E8613C]">{number}</span>
        )}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
      <div className="mt-12 border-b border-white/5" />
    </section>
  );
}

function SubSection({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mt-8 scroll-mt-28">
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-mono text-xs text-[#E8613C]/70">{number}</span>
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
      </div>
      <div className="space-y-3 text-gray-400 leading-relaxed">{children}</div>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="rounded-lg bg-black/30 border border-white/5 p-4 overflow-x-auto">
      <pre className="text-sm text-gray-400 font-mono leading-relaxed"><code>{children}</code></pre>
    </div>
  );
}

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0d0d1a] pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E8613C] transition mb-10">
            &larr; setara.network
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8613C]" />
                WHITEPAPER v1.0
              </div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">
                Setara Network
              </h1>
              <p className="mt-3 text-xl text-gray-400">
                India&apos;s Sovereign Document Blockchain
              </p>
            </div>
            <div className="hidden lg:block">
              <Image src="/setara_dark.png" alt="Setara" width={100} height={28} />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-xs text-gray-500 font-mono">
            <span>VERSION 1.0</span>
            <span>MARCH 2026</span>
            <span>COSMOS SDK v0.53</span>
            <span>COMETBFT</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex gap-12">
          {/* Sidebar */}
          <nav className="hidden lg:block w-56 shrink-0 sticky top-28 self-start space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pb-20">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">Contents</p>
            <SideLink id="abstract" label="Abstract" />
            <SideLink id="problem" label="1. The Problem" />
            <SideLink id="solution" label="2. The Solution" />
            <SideLink id="design-principles" label="Design Principles" sub />
            <SideLink id="architecture" label="3. Architecture" />
            <SideLink id="chain-layer" label="Chain Layer" sub />
            <SideLink id="storage-layer" label="Storage Layer" sub />
            <SideLink id="api-layer" label="API Layer" sub />
            <SideLink id="infrastructure" label="Infrastructure" sub />
            <SideLink id="consensus" label="4. Consensus" />
            <SideLink id="billing" label="5. Billing Model" />
            <SideLink id="networks" label="6. Networks" />
            <SideLink id="use-cases" label="7. Use Cases" />
            <SideLink id="roadmap" label="8. Roadmap" />
            <SideLink id="security" label="9. Security" />
            <SideLink id="conclusion" label="10. Conclusion" />
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-12">
            {/* Abstract */}
            <Section id="abstract" title="Abstract">
              <div className="rounded-lg border border-[#E8613C]/20 bg-[#E8613C]/5 p-6">
                <p className="text-gray-300 leading-relaxed">
                  Setara is a sovereign, purpose-built blockchain for document management, designed and built in India.
                  It enables organizations to register, store, and verify documents on an immutable ledger without the
                  complexity of tokens, wallets, or cryptocurrency. Built on the Cosmos SDK with CometBFT consensus,
                  Setara offers enterprise-grade reliability with consumer-grade simplicity.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-2">
                {[
                  ["0", "Tokens Required"],
                  ["~1s", "Block Finality"],
                  ["INR", "Fiat Billing"],
                  ["100%", "Open Source"],
                ].map(([val, label]) => (
                  <div key={label} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
                    <div className="text-xl font-bold text-[#E8613C] font-mono">{val}</div>
                    <div className="mt-1 text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 1. The Problem */}
            <Section id="problem" number="01" title="The Problem">
              <p>
                India&apos;s digital infrastructure is rapidly growing, but document verification remains
                fragmented and trust-dependent:
              </p>
              <div className="space-y-3">
                {[
                  ["Certificate fraud", "costs Indian universities and employers billions annually"],
                  ["Document verification", "requires manual processes, taking days or weeks"],
                  ["No unified system", "exists for cross-organizational document trust"],
                  ["Existing blockchain solutions", "require token management, making them impractical for non-technical organizations"],
                  ["Centralized databases", "are single points of failure and susceptible to tampering"],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <span className="mt-0.5 text-red-400">&#10005;</span>
                    <p><span className="font-semibold text-gray-200">{title}</span> {desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 2. The Solution */}
            <Section id="solution" number="02" title="The Setara Solution">
              <p>Setara is a <span className="font-semibold text-white">permissionless read, permissioned write</span> blockchain:</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ["Read: Anyone", "Verify any document on the network without authentication"],
                  ["Write: Orgs Only", "Only registered organizations can register documents"],
                  ["No Tokens", "Billing in fiat (INR) via credit system — no crypto complexity"],
                  ["Self-Hosted", "Each organization runs their own validator node + IPFS storage"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-[#E8613C] font-mono">{title}</p>
                    <p className="mt-1 text-sm text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>

              <SubSection id="design-principles" number="2.1" title="Design Principles">
                <div className="space-y-2">
                  {[
                    ["Simplicity over sophistication", "Minimal components, one-command deployment"],
                    ["Fiat-first", "Credits in INR, no token economics or trading"],
                    ["Organization-centric", "Built for institutions, not individuals"],
                    ["Sovereign", "Designed for Indian regulatory requirements"],
                    ["Open source", "Transparent and auditable"],
                  ].map(([principle, desc], i) => (
                    <div key={principle} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#E8613C] mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <p><span className="font-medium text-gray-200">{principle}</span> — {desc}</p>
                    </div>
                  ))}
                </div>
              </SubSection>
            </Section>

            {/* 3. Architecture */}
            <Section id="architecture" number="03" title="Architecture">
              <SubSection id="chain-layer" number="3.1" title="Chain Layer">
                <p>Setara is built on:</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    ["Cosmos SDK v0.53", "Modular blockchain framework"],
                    ["CometBFT", "Byzantine fault-tolerant consensus"],
                    ["Proof of Authority", "Organizations become validators"],
                  ].map(([name, desc]) => (
                    <div key={name} className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                      <p className="text-sm font-semibold text-white font-mono">{name}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4">The chain has two custom modules:</p>

                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5 mt-2">
                  <p className="font-mono text-sm font-semibold text-[#E8613C]">x/document</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li><code className="text-gray-300">RegisterDocument</code> — Store hash, IPFS CID, metadata, recipient</li>
                    <li><code className="text-gray-300">VerifyDocument</code> — Emit verification event</li>
                    <li><code className="text-gray-300">DocumentByHash</code> — O(1) lookup via secondary index</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                  <p className="font-mono text-sm font-semibold text-[#E8613C]">x/organization</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li><code className="text-gray-300">RegisterOrganization</code> — Register org on-chain with admin address</li>
                    <li>Access control — Only org admins can register documents</li>
                  </ul>
                </div>
              </SubSection>

              <SubSection id="storage-layer" number="3.2" title="Storage Layer">
                <CodeBlock>{`On-chain:  document_hash | ipfs_cid | metadata | issuer | recipient | timestamp
IPFS:      actual files (certificates, PDFs, images)
Per-org:   each org runs its own IPFS node → data sovereignty`}</CodeBlock>
              </SubSection>

              <SubSection id="api-layer" number="3.3" title="API Layer">
                <p>REST API server handling organization registration, credit-based billing, document submission, and public verification.</p>
                <CodeBlock>{`POST /api/v1/register          # Self-service org registration
POST /api/v1/me/documents      # Register document (deducts credits)
GET  /api/v1/verify?hash=...   # Public verification
GET  /api/v1/me/wallet          # Check credit balance`}</CodeBlock>
              </SubSection>

              <SubSection id="infrastructure" number="3.4" title="Infrastructure">
                <Table
                  headers={["Component", "Hosted By", "Technology"]}
                  rows={[
                    ["Seed / Sentry nodes", "Setara", "setarad"],
                    ["API Server", "Setara", "Go + SQLite"],
                    ["Block Explorer", "Setara", "Ping.pub"],
                    ["Admin Panel", "Setara", "Web (Tailwind)"],
                    ["Validator Node", "Each Org", "setarad (Docker)"],
                    ["IPFS Node", "Each Org", "Kubo (Docker)"],
                  ]}
                />
              </SubSection>
            </Section>

            {/* 4. Consensus */}
            <Section id="consensus" number="04" title="Consensus & Validators">
              <p>Setara uses a <span className="font-semibold text-white">Proof of Authority</span> model:</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ["Validators", "Each registered org runs a validator node"],
                  ["No Staking", "Validators are trusted organizations, not token holders"],
                  ["Zero Gas", "Transactions are free at the chain level"],
                  ["Instant Finality", "CometBFT provides immediate block finality"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">Validator Requirements</p>
                <Table
                  headers={["Requirement", "Specification"]}
                  rows={[
                    ["Identity", "Registered organization with verified identity"],
                    ["Server", "2 CPU, 4GB RAM, 100GB SSD minimum"],
                    ["Network", "Stable internet connection"],
                    ["Setup", "Docker Compose — one-command deployment"],
                  ]}
                />
              </div>
            </Section>

            {/* 5. Billing */}
            <Section id="billing" number="05" title="Billing Model">
              <Table
                headers={["Item", "Cost"]}
                rows={[
                  ["Signup bonus", "5,000 credits (free)"],
                  ["Document registration", "1 credit (default, configurable per org)"],
                  ["Credit rate", "1 credit = 1 INR (configurable)"],
                  ["Validator node", "Free (testnet), pricing TBD (mainnet)"],
                ]}
              />
              <div className="mt-6">
                <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">Flow</p>
                <CodeBlock>{`1. Organization registers via API → receives 5,000 free credits
2. Each document registration deducts credits from wallet
3. Super admin manages wallet top-ups (fiat via Razorpay)
4. Per-org configurable pricing for enterprise clients`}</CodeBlock>
              </div>
            </Section>

            {/* 6. Networks */}
            <Section id="networks" number="06" title="Networks">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="font-mono text-sm text-green-400">ACTIVE</span>
                  </div>
                  <p className="font-mono text-lg font-bold text-white">setara-testnet-1</p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-400">
                    <li>Development and testing</li>
                    <li>5,000 free credits on signup</li>
                    <li>Data may be reset periodically</li>
                    <li>Open for all organizations</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="font-mono text-sm text-yellow-400">COMING SOON</span>
                  </div>
                  <p className="font-mono text-lg font-bold text-white">setara-1</p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-400">
                    <li>Production network</li>
                    <li>Paid credits (after free tier)</li>
                    <li>Permanent, immutable data</li>
                    <li>Validator onboarding required</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* 7. Use Cases */}
            <Section id="use-cases" number="07" title="Use Cases">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ["Sports Certificates", "Krida e Pramaan: Competition certificates on-chain. Athletes and employers verify instantly."],
                  ["Academic Credentials", "Tamper-proof degree certificates. Employers verify without contacting the university."],
                  ["Government Documents", "Land records, identity proofs, official documents with immutable audit trails."],
                  ["Corporate Compliance", "Audit trails, legal documents stored immutably for regulatory requirements."],
                  ["Healthcare Records", "Patient records with verifiable provenance and privacy-preserving hash storage."],
                  ["Supply Chain", "Certificate of origin and provenance tracking for goods."],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 8. Roadmap */}
            <Section id="roadmap" number="08" title="Roadmap">
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1",
                    title: "Foundation",
                    status: "CURRENT",
                    statusColor: "text-green-400 border-green-400/30 bg-green-400/10",
                    items: ["Setara Document Chain (testnet)", "API with credit-based billing", "Docker deployment", "Block explorer", "Website & docs"],
                  },
                  {
                    phase: "Phase 2",
                    title: "Growth",
                    status: "NEXT",
                    statusColor: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
                    items: ["Mainnet launch", "Razorpay integration", "SDK (JS, Python, Go)", "Mobile verification app", "First 10 organizations"],
                  },
                  {
                    phase: "Phase 3",
                    title: "Ecosystem",
                    status: "PLANNED",
                    statusColor: "text-gray-400 border-gray-400/30 bg-gray-400/10",
                    items: ["EVM chain (Ethermint) via IBC", "NFT chain for certificate NFTs", "Token chain", "Developer grants program"],
                  },
                  {
                    phase: "Phase 4",
                    title: "Scale",
                    status: "VISION",
                    statusColor: "text-gray-500 border-gray-500/30 bg-gray-500/10",
                    items: ["100+ organizations", "Multi-region validators", "Government partnerships", "International expansion"],
                  },
                ].map((p) => (
                  <div key={p.phase} className="rounded-lg border border-white/5 bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-[#E8613C]">{p.phase}</span>
                      <span className="font-semibold text-white">{p.title}</span>
                      <span className={`ml-auto rounded-full border px-2.5 py-0.5 text-[10px] font-mono ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.items.map((item) => (
                        <span key={item} className="rounded bg-white/5 px-2.5 py-1 text-xs text-gray-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 9. Security */}
            <Section id="security" number="09" title="Security">
              <div className="space-y-3">
                {[
                  ["CometBFT consensus", "Byzantine fault-tolerant up to 1/3 malicious validators"],
                  ["Access control", "Only org admins can write, enforced at chain level via keeper interfaces"],
                  ["No tokens", "No economic attack surface — no MEV, no front-running, no token manipulation"],
                  ["IPFS content addressing", "Documents are immutable by CID — tamper-proof by design"],
                  ["API key authentication", "Per-org API keys with super admin oversight and constant-time comparison"],
                  ["Deterministic IDs", "SHA-256 based ID generation prevents enumeration attacks"],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <span className="mt-0.5 text-green-400">&#10003;</span>
                    <p><span className="font-semibold text-gray-200">{title}</span> — {desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 10. Conclusion */}
            <Section id="conclusion" number="10" title="Conclusion">
              <div className="rounded-lg border border-[#E8613C]/20 bg-[#E8613C]/5 p-6">
                <p className="text-gray-300 leading-relaxed">
                  Setara makes blockchain practical for Indian organizations by removing the complexity of tokens and
                  cryptocurrency while preserving the guarantees of decentralization, immutability, and trustless
                  verification. It is designed to be the document trust layer for India.
                </p>
              </div>
            </Section>

            {/* Footer */}
            <div className="mt-16 border-t border-white/5 pt-8 text-center">
              <p className="font-mono text-sm text-gray-500">SETARA NETWORK</p>
              <p className="mt-1 text-sm text-gray-600">setara.network</p>
              <p className="mt-4 text-xs text-gray-700">Built with pride in India.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
