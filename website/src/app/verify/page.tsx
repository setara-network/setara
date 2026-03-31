"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const MAINNET_API = process.env.NEXT_PUBLIC_API_URL || "https://api.setara.network";
const TESTNET_API = process.env.NEXT_PUBLIC_TESTNET_API_URL || "https://testnet-api.setara.network";

async function computeHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

type VerifyResult =
  | { registered: false }
  | {
      registered: true;
      document: {
        hash: string;
        doc_type: string;
        ipfs_cid: string;
        registered_by: string;
        registered_at: string;
        tx_hash: string;
      };
    };

type VerifyStatus = "idle" | "loading" | "found" | "not_found" | "error";

export default function VerifyPage() {
  const [network, setNetwork] = useState<"testnet" | "mainnet">("mainnet");
  const [method, setMethod] = useState<"hash" | "file">("hash");
  const [hashInput, setHashInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [computedHash, setComputedHash] = useState("");
  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiUrl = network === "testnet" ? TESTNET_API : MAINNET_API;

  const handleFileSelect = useCallback(async (file: File) => {
    setSelectedFile(file);
    setComputedHash("");
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    const hex = await computeHash(file);
    setComputedHash(hex);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    let rawHash = "";
    if (method === "hash") {
      rawHash = hashInput.trim();
    } else {
      if (!computedHash) {
        setStatus("error");
        setErrorMsg("Hash computation is still in progress. Please wait.");
        return;
      }
      rawHash = computedHash;
    }

    // Normalize: strip existing sha256: prefix then re-add
    const cleanHash = rawHash.replace(/^sha256:/i, "");
    const queryHash = `sha256:${cleanHash}`;

    try {
      const res = await fetch(
        `${apiUrl}/api/v1/verify?hash=${encodeURIComponent(queryHash)}`
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data.error || `Request failed (HTTP ${res.status})`);
        return;
      }

      const data: VerifyResult = await res.json();
      setResult(data);
      setStatus(data.registered ? "found" : "not_found");
    } catch {
      setStatus("error");
      setErrorMsg("Could not reach the Setara API. Please check your connection and try again.");
    }
  }

  function resetForm() {
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    setHashInput("");
    setSelectedFile(null);
    setComputedHash("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const canSubmit =
    status !== "loading" &&
    (method === "hash" ? hashInput.trim().length > 0 : selectedFile !== null && computedHash !== "");

  return (
    <div className="min-h-screen bg-[#09090b] pt-24 pb-20">

      {/* Hero */}
      <section className="relative pt-12 pb-16 text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,97,60,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8613C]/30 bg-[#E8613C]/10 px-4 py-1.5 text-xs font-medium text-[#E8613C] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8613C] animate-pulse" />
            Free &middot; Instant &middot; No account required
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Verify a Document
          </h1>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
            Check whether any document has been registered on the Setara blockchain.
            Anyone can verify — no API key, no sign-up, no fees.
          </p>
        </div>
      </section>

      {/* Main Card */}
      <section className="mx-auto max-w-2xl px-6">
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        <div className="rounded-2xl cosmos-glass p-8">

          {/* Network toggle */}
          <div className="mb-6">
            <fieldset>
              <legend className="sr-only">Select network</legend>
              <div
                className="flex rounded-lg bg-white/5 p-1"
                role="radiogroup"
                aria-label="Network selection"
              >
                {(["mainnet", "testnet"] as const).map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => { setNetwork(net); resetForm(); }}
                    role="radio"
                    aria-checked={network === net}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                      network === net
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {net === "mainnet" ? "Mainnet" : "Testnet"}
                  </button>
                ))}
              </div>
            </fieldset>
            <p className="mt-2 text-xs text-gray-500 text-center">
              {network === "mainnet"
                ? "Production network — permanent, immutable records."
                : "Development network — data may be reset periodically."}
            </p>
          </div>

          {/* Method toggle */}
          <div className="mb-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setMethod("hash"); resetForm(); }}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition ${
                  method === "hash"
                    ? "border-[#E8613C]/60 bg-[#E8613C]/10 text-[#E8613C]"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                Enter Hash
              </button>
              <button
                type="button"
                onClick={() => { setMethod("file"); resetForm(); }}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition ${
                  method === "file"
                    ? "border-[#E8613C]/60 bg-[#E8613C]/10 text-[#E8613C]"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">

            {method === "hash" ? (
              <div>
                <label htmlFor="verify-hash" className="block text-sm font-medium text-gray-300 mb-1.5">
                  SHA-256 Document Hash
                </label>
                <input
                  id="verify-hash"
                  type="text"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="sha256:a1b2c3... or just the raw hex"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#E8613C]/60 focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20 font-mono transition"
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="mt-1.5 text-xs text-gray-600">
                  The hash may include or omit the <code className="text-gray-400">sha256:</code> prefix — both are accepted.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Upload Document File
                </label>
                {/* Drop zone */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="File upload drop zone. Click or drag a file here."
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition ${
                    dragOver
                      ? "border-[#E8613C]/60 bg-[#E8613C]/5"
                      : selectedFile
                      ? "border-white/20 bg-white/5"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    onChange={handleFileInput}
                    aria-hidden="true"
                    tabIndex={-1}
                  />

                  {selectedFile ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-white truncate max-w-xs">{selectedFile.name}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                      {computedHash ? (
                        <div className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-left w-full">
                          <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider font-medium">Computed Hash</p>
                          <p className="text-xs text-gray-300 font-mono break-all">sha256:{computedHash}</p>
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-[#E8613C] animate-pulse">Computing SHA-256...</p>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">
                        <span className="text-white font-medium">Click to upload</span> or drag a file here
                      </p>
                      <p className="mt-1 text-xs text-gray-600">Any file type &middot; Hash computed locally in your browser</p>
                    </>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-gray-600">
                  Your file never leaves your device — only the SHA-256 hash is sent to the blockchain API.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-lg bg-[#E8613C] py-3 text-sm font-semibold text-white transition hover:bg-[#d4542f] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_24px_-6px_rgba(232,97,60,0.4)] hover:shadow-[0_0_32px_-4px_rgba(232,97,60,0.5)]"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Checking blockchain...
                </span>
              ) : (
                "Verify Document"
              )}
            </button>
          </form>

          {/* Results */}
          {status === "found" && result && result.registered && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">Document verified on-chain</p>
                  <p className="text-xs text-emerald-400/60">This document is registered on the Setara blockchain.</p>
                </div>
              </div>
              <dl className="space-y-3">
                <ResultRow label="Document Type" value={result.document.doc_type} />
                <ResultRow label="Registered By" value={result.document.registered_by} />
                <ResultRow
                  label="Registered At"
                  value={new Date(result.document.registered_at).toLocaleString("en-IN", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                />
                {result.document.tx_hash && (
                  <div>
                    <dt className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                      Transaction Hash
                    </dt>
                    <dd className="text-xs font-mono text-gray-300 break-all bg-black/20 rounded px-3 py-2 select-all">
                      {result.document.tx_hash}
                    </dd>
                  </div>
                )}
                {result.document.ipfs_cid && (
                  <div>
                    <dt className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                      IPFS CID
                    </dt>
                    <dd className="text-xs font-mono text-gray-300 break-all bg-black/20 rounded px-3 py-2 select-all">
                      {result.document.ipfs_cid}
                    </dd>
                  </div>
                )}
              </dl>
              <button
                onClick={resetForm}
                className="mt-5 w-full rounded-lg border border-white/10 py-2 text-xs font-medium text-gray-400 hover:text-white hover:border-white/20 transition"
              >
                Verify another document
              </button>
            </div>
          )}

          {status === "not_found" && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-xl border border-[#E8613C]/30 bg-[#E8613C]/10 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8613C]/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8613C" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#E8613C]">Document not found on blockchain</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                No record matching this hash was found on the Setara {network}.
                This could mean the document was never registered, was registered on a different network,
                or the hash is incorrect.
              </p>
              <button
                onClick={resetForm}
                className="mt-4 w-full rounded-lg border border-white/10 py-2 text-xs font-medium text-gray-400 hover:text-white hover:border-white/20 transition"
              >
                Try a different hash
              </button>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              aria-live="assertive"
              className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-400">Verification failed</p>
                  <p className="text-xs text-red-400/80 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-2xl px-6 mt-16">
        <h2 className="text-xl font-bold text-white text-center mb-10">How Verification Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StepCard
            number="1"
            title="Compute Hash"
            description="A SHA-256 fingerprint of your document is generated — either from the hash you paste or computed locally in your browser from the uploaded file."
          />
          <StepCard
            number="2"
            title="Query Blockchain"
            description="The hash is sent to the Setara API, which looks up the immutable on-chain ledger to find a matching registration record."
          />
          <StepCard
            number="3"
            title="Instant Result"
            description="Within seconds you see the verification result, including who registered the document, when, and the on-chain transaction hash."
          />
        </div>

        <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
            Want to register documents for your organization?{" "}
            <Link href="/register" className="text-[#E8613C] hover:text-[#d4542f] font-medium transition-colors">
              Register an account
            </Link>{" "}
            and get 5,000 free credits. No gas fees, no tokens, no complexity.
          </p>
        </div>
      </section>

    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-0.5">{label}</dt>
      <dd className="text-sm text-white font-medium">{value}</dd>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl cosmos-glass p-6 flex flex-col gap-3">
      <div className="w-8 h-8 rounded-full bg-[#E8613C]/15 border border-[#E8613C]/30 flex items-center justify-center text-sm font-bold text-[#E8613C]">
        {number}
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
