"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-screen flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Giant Ambient Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-teal-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 text-center z-10 flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md mb-8 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          India&apos;s Sovereign Document Blockchain
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-tight text-center">
          Blockchain Document<br />
          <span className="bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Verification.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mx-auto mt-10 max-w-2xl text-xl sm:text-2xl leading-relaxed text-gray-400 font-light"
        >
          Register, store, and verify documents on an immutable blockchain.{" "}
          <strong className="font-semibold text-white">Zero gas fees. No tokens. No crypto complexity.</strong>{" "}
          Built on the Cosmos SDK for Indian organizations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row w-full sm:w-auto"
        >
          <Link
            href="/register"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-transform hover:scale-105"
          >
            Register Your Organization
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/use-cases"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white/5 transition-colors"
          >
            Explore Use Cases
          </Link>
        </motion.div>

        {/* Tech Stats */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 border-t border-white/10 pt-12 text-center w-full max-w-4xl"
        >
           <div>
             <div className="text-4xl font-bold tracking-tighter text-white">Zero</div>
             <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">Gas Fees</div>
           </div>
           <div>
             <div className="text-4xl font-bold tracking-tighter text-white">PoA</div>
             <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">Consensus</div>
           </div>
           <div>
             <div className="text-4xl font-bold tracking-tighter text-white">10K+</div>
             <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">TPS</div>
           </div>
           <div>
             <div className="text-4xl font-bold tracking-tighter text-white">100%</div>
             <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">NBF Ready</div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
