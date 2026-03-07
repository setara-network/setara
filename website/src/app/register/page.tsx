"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.setara.network";

export default function RegisterPage() {
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [form, setForm] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    org_id: string;
    api_key: string;
    credits: number;
    message: string;
  } | null>(null);

  const apiUrl = network === "testnet"
    ? (process.env.NEXT_PUBLIC_TESTNET_API_URL || "https://testnet-api.setara.network")
    : API_BASE;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Registration failed (HTTP ${res.status})`);
        return;
      }

      setResult(data);
    } catch {
      setError("Failed to connect to Setara API. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#2d1b3d] pt-24 pb-20">
      <div className="mx-auto max-w-lg px-6">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">&larr; Back to Home</Link>
        </div>

        {!result ? (
          <div className="rounded-2xl bg-white p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Register Your Organization</h1>
            <p className="mt-2 text-sm text-gray-500">
              Get your org ID, API key, and 5,000 free credits to start building.
            </p>

            {/* Network selector */}
            <div className="mt-6 flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setNetwork("testnet")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                  network === "testnet"
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Testnet
              </button>
              <button
                type="button"
                onClick={() => setNetwork("mainnet")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                  network === "mainnet"
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mainnet
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400 text-center">
              {network === "testnet"
                ? "For development and testing. Data may be reset periodically."
                : "Production network. Permanent, immutable data."}
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                  placeholder="Acme Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    required
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                  placeholder="+91-9876543210"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#E8613C] py-3 text-sm font-semibold text-white transition hover:bg-[#d4542f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register Organization"}
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 shadow-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] text-center">Registration Successful</h1>
            <p className="mt-2 text-sm text-gray-500 text-center">{result.message}</p>

            <div className="mt-8 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Organization ID</label>
                <p className="mt-1 font-mono text-sm text-[#1a1a2e] break-all select-all">{result.org_id}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</label>
                <p className="mt-1 font-mono text-sm text-[#1a1a2e] break-all select-all">{result.api_key}</p>
              </div>
              <div className="rounded-lg bg-[#E8613C]/5 border border-[#E8613C]/20 p-4">
                <label className="block text-xs font-medium text-[#E8613C] uppercase tracking-wider">Free Credits</label>
                <p className="mt-1 text-2xl font-bold text-[#1a1a2e]">{result.credits?.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Save your API key!</strong> You will need it to authenticate API requests. It will not be shown again.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/docs/build-app"
                className="w-full rounded-lg bg-[#E8613C] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#d4542f]"
              >
                Start Building
              </Link>
              <Link
                href="/docs/run-node"
                className="w-full rounded-lg border border-gray-300 py-3 text-center text-sm font-semibold text-[#1a1a2e] transition hover:bg-gray-50"
              >
                Set Up a Node
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
