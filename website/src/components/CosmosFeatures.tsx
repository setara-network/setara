"use client";

import { motion } from "framer-motion";
import { Blocks, Network, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Blocks,
    title: "Unmatched Modularity",
    description: "Mix and match pre-built modules for staking, auth, and governance. Build complex logic without starting from scratch."
  },
  {
    icon: Lock,
    title: "True Sovereignty",
    description: "Launch your own dedicated AppChain. Gain full control over your chain's governance, fee models, and consensus without shared-state congestion."
  },
  {
    icon: Network,
    title: "Native Interoperability",
    description: "Built-in Inter-Blockchain Communication (IBC) allows seamless asset and data transfers across independent blockchains."
  },
  {
    icon: Zap,
    title: "EVM Compatibility",
    description: "Deploy your existing Solidity smart contracts directly onto Setara's highly performant CometBFT consensus engine."
  }
];

export default function CosmosFeatures() {
  return (
    <section id="capabilities" className="relative bg-transparent py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#E8613C]">Built on Cosmos SDK</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need. Nothing you don't.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Setara inherits the industry-leading features of the Cosmos SDK, providing a rich, modular framework tailored for both permissioned enterprise use-cases and public, tokenized networks.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col rounded-3xl cosmos-glass p-10 transition-all hover:cosmos-glass-hover hover:border-white/20 hover:-translate-y-1"
              >
                <dt className="flex items-center gap-x-3 text-xl font-bold text-white mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
