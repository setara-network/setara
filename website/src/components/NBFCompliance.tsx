"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, FileCheck, Building2 } from "lucide-react";

export default function NBFCompliance() {
  return (
    <section id="compliance" className="relative bg-[#09090b] py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#E8613C]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base font-semibold leading-7 text-[#E8613C]">Regulatory Alignment</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              100% NBF Compliance by Design
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Setara is architected from the ground up to align perfectly with India's National Blockchain Framework (NBF). We guarantee adherence to stringent security, privacy, and localization mandates required by government and public institutions.
            </p>

            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <ShieldCheck className="absolute left-1 top-1 h-5 w-5 text-[#E8613C]" aria-hidden="true" />
                  Permissioned Architecture.
                </dt>{' '}
                <dd className="inline text-gray-400">Robust identity management ensures only authorized participants can validate or read sensitive data.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <FileCheck className="absolute left-1 top-1 h-5 w-5 text-[#E8613C]" aria-hidden="true" />
                  Auditability & Security.
                </dt>{' '}
                <dd className="inline text-gray-400">Immutable ledger logs optimized for empanelled agency audits, satisfying stringent national security models.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-white">
                  <Building2 className="absolute left-1 top-1 h-5 w-5 text-[#E8613C]" aria-hidden="true" />
                  Data Localization.
                </dt>{' '}
                <dd className="inline text-gray-400">Core node configuration explicitly ensures that sensitive public data remains entirely within sovereign borders.</dd>
              </div>
            </dl>
          </motion.div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#18181b] p-8 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8613C]/10 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-[#E8613C]" />
                Compliance Checklist
              </h3>
              
              <ul className="space-y-4">
                {[
                  "Rigorous Onboarding Protocols",
                  "Cosmos SDK Architecture Base",
                  "Support for Praamaanik Integration",
                  "Role-Based Access Control (RBAC)",
                  "Transparent Governance Mechanisms",
                  "Secure Smart Contract Runtime (EVM)"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                    className="flex items-center gap-3 text-gray-300 bg-white/5 px-4 py-3 rounded-xl border border-white/5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
