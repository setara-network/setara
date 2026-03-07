"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#2d1b3d] pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#E8613C]/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#E8613C]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#E8613C]" />
            Permissionless Document Blockchain
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            India&apos;s Sovereign{" "}
            <span className="bg-gradient-to-r from-[#E8613C] to-[#f09070] bg-clip-text text-transparent">
              Document Blockchain
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Secure, verify, and manage documents on a decentralized network built for
            organizations. Zero tokens. Zero complexity. Just trust.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#developers"
              className="w-full rounded-full bg-[#E8613C] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#E8613C]/25 transition-all hover:bg-[#d4542f] hover:shadow-xl hover:shadow-[#E8613C]/30 sm:w-auto"
            >
              Start Building
            </a>
            <a
              href="/whitepaper"
              className="w-full rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              Read Whitepaper
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="mt-1 text-sm text-gray-400">Tokens Required</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">1 Command</div>
            <div className="mt-1 text-sm text-gray-400">Node Deployment</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="mt-1 text-sm text-gray-400">Open Source</div>
          </div>
        </div>
      </div>
    </section>
  );
}
