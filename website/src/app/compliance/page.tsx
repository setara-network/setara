import type { Metadata } from "next";
import NBFCompliance from "@/components/NBFCompliance";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NBF Compliance & Data Localization | Setara Network",
  description:
    "Setara is architected for 100% alignment with India's National Blockchain Framework (NBF). Data localization, permissioned architecture, CERT-In audit readiness, and sovereign data residency by design.",
  keywords: [
    "NBF compliance blockchain",
    "National Blockchain Framework India",
    "data localization blockchain",
    "CERT-In audit blockchain",
    "permissioned blockchain India",
    "government blockchain compliance",
  ],
  alternates: { canonical: "/compliance" },
  openGraph: {
    title: "NBF Compliance & Data Localization | Setara Network",
    description:
      "100% National Blockchain Framework compliance by design. Data localization, permissioned architecture, and audit readiness for government and enterprise use.",
    url: "/compliance",
  },
};

export default function CompliancePage() {
  return (
    <div className="bg-[#09090b] min-h-screen pt-24 pb-20">

      {/* Hero for Compliance */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          NBF <span className="text-green-500">Compliance</span> by Design
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
          Setara does not treat compliance as an afterthought. Data localization, permissioned access, and audit readiness are fundamental architecture requirements designed for federal and enterprise use in India.
        </p>
      </div>

      <NBFCompliance />

      {/* Additional content below the main component */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#18181b] rounded-2xl p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">Data Localization Guarantees</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Sovereign AppChains on Setara can explicitly define their validator sets and data residency rules. This strictly guarantees that sensitive citizen or enterprise data will never cross physical boundaries unless explicitly programmed via IBC rules.
            </p>
          </div>
          <div className="bg-[#18181b] rounded-2xl p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">Empanelled Audit Preparedness</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              The underlying CometBFT consensus logs are deterministically verifiable. This enables streamlined audit processes from empanelled cybersecurity agencies (e.g., CERT-In), significantly reducing the friction to production deployment.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
           <Link href="/contact" className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
            Request Compliance Report
          </Link>
        </div>
      </div>
    </div>
  );
}
