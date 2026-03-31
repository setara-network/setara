/**
 * AI Content Generation Pipeline for Setara Network
 *
 * Generates blog posts, pSEO pages, and glossary terms using Claude,
 * then publishes them to Strapi CMS.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... STRAPI_URL=https://cms.nubo.email npx tsx scripts/generate-content.ts [command]
 *
 * Commands:
 *   glossary       — Generate and publish 50 glossary terms
 *   pseo           — Generate and publish pSEO pages (all categories)
 *   blogs          — Generate and publish blog posts
 *   all            — Run all generators
 *   dry-run        — Generate content but don't publish (writes to scripts/output/)
 *
 * Environment:
 *   ANTHROPIC_API_KEY  — Claude API key (required)
 *   STRAPI_URL         — Strapi base URL (default: https://cms.nubo.email)
 *   STRAPI_TOKEN       — Strapi API token (optional if public write access)
 *   DRY_RUN            — Set to "true" to skip publishing
 */

import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const STRAPI_URL = process.env.STRAPI_URL || "https://cms.nubo.email";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";
const DRY_RUN = process.env.DRY_RUN === "true";
const OUTPUT_DIR = join(__dirname, "output");

if (!ANTHROPIC_API_KEY) {
  console.error("❌ ANTHROPIC_API_KEY is required");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ---------------------------------------------------------------------------
// Strapi publishing
// ---------------------------------------------------------------------------

async function publishToStrapi(endpoint: string, data: Record<string, unknown>): Promise<boolean> {
  if (DRY_RUN) {
    console.log(`  [dry-run] Would publish to ${endpoint}`);
    return true;
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

  try {
    const res = await fetch(`${STRAPI_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`  ❌ Strapi ${res.status}: ${body.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`  ❌ Strapi error:`, err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Claude helper
// ---------------------------------------------------------------------------

async function generateWithClaude(systemPrompt: string, userPrompt: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const block = message.content[0];
  if (block.type === "text") return block.text;
  throw new Error("Unexpected response type");
}

async function generateJSON<T>(systemPrompt: string, userPrompt: string): Promise<T> {
  const raw = await generateWithClaude(
    systemPrompt + "\n\nIMPORTANT: Respond with ONLY valid JSON. No markdown, no code fences, no explanation.",
    userPrompt
  );

  // Strip any markdown code fences
  const cleaned = raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
  return JSON.parse(cleaned) as T;
}

// ---------------------------------------------------------------------------
// Setara context (injected into all prompts)
// ---------------------------------------------------------------------------

const SETARA_CONTEXT = `
Setara Network is India's first Proof-of-Authority blockchain purpose-built for document verification.
Key facts:
- Built on Cosmos SDK v0.53.6 with CometBFT consensus
- Zero gas fees — uses fiat credits (1 credit = 1 INR per document)
- 5,000 free credits on signup
- Organizations register document SHA-256 hashes on an immutable ledger
- Anyone can verify documents via the public API (free, no auth)
- Documents stored on IPFS, hashes stored on-chain
- 100% NBF (National Blockchain Framework) compliant
- Data localization: all data stays in India
- Orgs become validators and run their own nodes
- REST API with Node.js, Python, and Go examples
- Target users: universities, government institutions, NGOs, healthcare, sports bodies, legal firms
- Brand: professional, trustworthy, Indian-first, no-nonsense
- Website: setara.network
- Competitors: Hyperledger Fabric, DigiLocker, traditional CAs
`;

// ---------------------------------------------------------------------------
// GLOSSARY GENERATOR
// ---------------------------------------------------------------------------

interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  longDescription: string;
  relatedTerms: string[];
}

const GLOSSARY_TERMS_TO_GENERATE = [
  "Proof of Authority", "Consensus Mechanism", "CometBFT", "Cosmos SDK",
  "Inter-Blockchain Communication", "IBC Protocol", "Validator Node",
  "SHA-256 Hash", "IPFS", "Content Identifier (CID)", "Immutable Ledger",
  "Block Height", "Transaction Hash", "Genesis Block", "Peer-to-Peer Network",
  "Smart Contract", "Gas Fee", "Zero Gas Fee", "Fiat Credits",
  "National Blockchain Framework", "Data Localization", "Permissioned Blockchain",
  "Public Blockchain", "API Key", "REST API", "Document Hash",
  "Digital Signature", "Tamper-Proof", "On-Chain", "Off-Chain",
  "Block Explorer", "Node Operator", "Docker Compose", "Seed Node",
  "Persistent Peers", "RPC Endpoint", "gRPC", "Tendermint",
  "Application Blockchain Interface", "State Machine", "Module",
  "Blockchain Interoperability", "Cross-Chain", "Token", "Denomination",
  "EVM Compatibility", "Solidity", "AppChain", "Sovereign Chain",
  "CERT-In", "DPDP Act",
];

async function generateGlossary() {
  console.log("\n📖 Generating glossary terms...\n");

  const batchSize = 10;
  let published = 0;

  for (let i = 0; i < GLOSSARY_TERMS_TO_GENERATE.length; i += batchSize) {
    const batch = GLOSSARY_TERMS_TO_GENERATE.slice(i, i + batchSize);
    console.log(`  Batch ${Math.floor(i / batchSize) + 1}: ${batch.join(", ")}`);

    const terms = await generateJSON<GlossaryTerm[]>(
      `You are a blockchain technical writer creating glossary entries for Setara Network's documentation.
${SETARA_CONTEXT}
Write for a semi-technical Indian audience — government officials, university admins, and developers.
Keep definitions clear, jargon-free where possible, and always relate back to document verification when relevant.`,
      `Generate glossary entries for these terms: ${JSON.stringify(batch)}

Return a JSON array where each item has:
- "term": the term name (title case)
- "slug": URL-safe lowercase slug (e.g., "proof-of-authority")
- "definition": 1-2 sentence definition (under 200 chars)
- "longDescription": 2-3 paragraph detailed explanation with context on how it relates to Setara/document verification
- "relatedTerms": array of 2-4 related term slugs from this full list: ${JSON.stringify(GLOSSARY_TERMS_TO_GENERATE.map(t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")))}`
    );

    for (const term of terms) {
      const ok = await publishToStrapi("/api/setara-glossary-terms", term);
      if (ok) published++;
      console.log(`  ${ok ? "✅" : "❌"} ${term.term}`);
    }

    // Rate limiting
    if (i + batchSize < GLOSSARY_TERMS_TO_GENERATE.length) {
      await sleep(2000);
    }
  }

  console.log(`\n📖 Glossary: ${published}/${GLOSSARY_TERMS_TO_GENERATE.length} published\n`);
  return published;
}

// ---------------------------------------------------------------------------
// pSEO PAGE GENERATOR
// ---------------------------------------------------------------------------

interface PseoPage {
  slug: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introText: string;
  stats: { value: string; suffix?: string; label: string }[];
  features: { title: string; description: string }[];
  comparisonData?: { feature: string; setara: string; competitor: string }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
}

const PSEO_SEEDS = {
  INDUSTRY: [
    "universities", "government-departments", "ngos", "hospitals", "pharma-companies",
    "sports-federations", "law-firms", "insurance-companies", "banks", "schools",
    "coaching-institutes", "polytechnics", "iti-institutes", "medical-colleges",
    "engineering-colleges", "chartered-accountants", "company-secretaries",
    "real-estate-developers", "construction-companies", "shipping-companies",
    "logistics-companies", "telecom-companies", "it-companies", "startups",
    "manufacturing-companies",
  ],
  DOCUMENT: [
    "degree-certificates", "mark-sheets", "birth-certificates", "death-certificates",
    "marriage-certificates", "land-records", "property-documents", "tax-certificates",
    "gst-certificates", "pan-cards", "aadhaar-verification", "driving-licenses",
    "passport-verification", "police-clearance", "noc-certificates",
    "experience-letters", "bonafide-certificates", "migration-certificates",
    "transfer-certificates", "character-certificates", "medical-certificates",
    "fitness-certificates", "insurance-claims", "warranty-certificates",
    "product-authenticity",
  ],
  CITY: [
    "mumbai", "delhi", "bangalore", "chennai", "hyderabad", "pune", "kolkata",
    "ahmedabad", "jaipur", "lucknow", "chandigarh", "bhopal", "patna",
    "thiruvananthapuram", "bhubaneswar", "dehradun", "guwahati", "ranchi",
    "raipur", "gandhinagar", "shimla", "panaji", "imphal", "agartala",
    "itanagar", "kohima", "aizawl", "gangtok", "srinagar", "jammu",
    "port-blair", "silvassa", "kavaratti", "daman", "puducherry",
    "noida", "gurugram", "faridabad", "ghaziabad", "navi-mumbai",
  ],
  COMPARISON: [
    "setara-vs-digilocker", "setara-vs-docusign", "setara-vs-ethereum",
    "setara-vs-polygon-id", "setara-vs-hyperledger-besu", "setara-vs-corda",
    "blockchain-vs-traditional-verification", "blockchain-vs-digital-signatures",
    "blockchain-vs-pdf-certificates", "setara-vs-certichain",
  ],
  GUIDE: [
    "how-to-verify-degree-certificate", "how-to-register-documents-on-blockchain",
    "how-to-set-up-blockchain-for-university", "how-to-run-a-validator-node",
    "what-is-proof-of-authority", "what-is-document-hashing",
    "blockchain-for-government-beginners-guide", "nbf-compliance-checklist",
    "ipfs-document-storage-guide", "blockchain-api-integration-tutorial",
    "how-to-prevent-certificate-fraud", "digital-transformation-government-guide",
    "blockchain-vs-database-for-records", "how-to-choose-enterprise-blockchain",
    "zero-gas-fee-blockchain-explained",
  ],
};

async function generatePseoPages() {
  console.log("\n🌐 Generating pSEO pages...\n");

  let totalPublished = 0;

  for (const [category, slugs] of Object.entries(PSEO_SEEDS)) {
    console.log(`\n  📂 Category: ${category} (${slugs.length} pages)\n`);

    for (let i = 0; i < slugs.length; i += 3) {
      const batch = slugs.slice(i, i + 3);

      const pages = await generateJSON<PseoPage[]>(
        `You are an SEO content strategist for Setara Network, India's blockchain for document verification.
${SETARA_CONTEXT}
Generate pSEO pages optimized for Indian search queries. Write for Indian business decision-makers, IT admins, and compliance officers.
Every page must be factual, authoritative, and drive organic traffic for document verification blockchain queries in India.`,
        `Generate pSEO pages for these slugs in the "${category}" category: ${JSON.stringify(batch)}

Category context:
- INDUSTRY: "Blockchain Document Verification for [Industry]" — explain why this specific industry needs blockchain verification
- DOCUMENT: "Verify [Document Type] on Blockchain" — explain how this specific document type benefits from blockchain
- CITY: "Blockchain Document Verification in [City]" — local SEO targeting Indian cities, mention local institutions
- COMPARISON: "[Setara vs X]" — fair comparison with a specific competitor or alternative approach
- GUIDE: "How to [Action]" — step-by-step educational guide

Return a JSON array where each page has:
- "slug": "${category === "INDUSTRY" ? "for-" : category === "CITY" ? "in-" : ""}${batch[0]}" format slug
- "category": "${category}"
- "metaTitle": SEO title (under 60 chars) with primary keyword
- "metaDescription": SEO description (150-160 chars) with primary + secondary keywords
- "h1": compelling H1 (different from metaTitle, includes primary keyword)
- "introText": 3-4 sentences (150-250 words) of authoritative intro text. Mention Setara specifically.
- "stats": array of exactly 4 stat objects: { "value": "string", "suffix": "optional", "label": "string" }
- "features": array of exactly 4 feature objects: { "title": "string", "description": "2-3 sentences" }
${category === "COMPARISON" ? '- "comparisonData": array of 6-8 comparison rows: { "feature": "string", "setara": "string", "competitor": "string" }' : ""}
- "faqs": array of exactly 5 FAQ objects: { "question": "string", "answer": "2-3 sentence answer" }
- "internalLinks": array of 4 links: { "href": "/use-cases or /docs/api or /register or /pricing or /verify", "label": "descriptive label" }`
      );

      for (const page of pages) {
        // Ensure proper slug format
        if (category === "INDUSTRY" && !page.slug.startsWith("for-")) page.slug = `for-${batch[pages.indexOf(page)] || page.slug}`;
        if (category === "CITY" && !page.slug.startsWith("in-")) page.slug = `in-${batch[pages.indexOf(page)] || page.slug}`;

        const ok = await publishToStrapi("/api/setara-pseo-pages", page);
        if (ok) totalPublished++;
        console.log(`    ${ok ? "✅" : "❌"} ${page.slug} — ${page.metaTitle}`);
      }

      await sleep(2000);
    }
  }

  console.log(`\n🌐 pSEO: ${totalPublished} pages published\n`);
  return totalPublished;
}

// ---------------------------------------------------------------------------
// BLOG POST GENERATOR
// ---------------------------------------------------------------------------

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  isPopular: boolean;
  blogSection: { blogTitle: string; blogDse: string }[];
}

const BLOG_TOPICS = [
  // Technology
  { topic: "What is Proof of Authority and Why Setara Uses It", category: "Technology", popular: true },
  { topic: "How Blockchain Makes Document Fraud Impossible", category: "Technology", popular: true },
  { topic: "Understanding Zero Gas Fee Blockchain Architecture", category: "Technology" },
  { topic: "IPFS vs Traditional Storage for Document Management", category: "Technology" },
  { topic: "Cosmos SDK: Why We Chose It for Document Verification", category: "Technology" },
  { topic: "How SHA-256 Hashing Ensures Document Integrity", category: "Technology" },
  { topic: "The Role of Validators in Proof of Authority Networks", category: "Technology" },
  { topic: "Building REST APIs on Top of Blockchain", category: "Technology" },
  // Industry
  { topic: "How Universities Can Eliminate Fake Degree Certificates", category: "Use Cases", popular: true },
  { topic: "Blockchain for Government Document Management in India", category: "Use Cases", popular: true },
  { topic: "Why NGOs Need Blockchain for Donor Receipt Verification", category: "Use Cases" },
  { topic: "Healthcare Records on Blockchain: Privacy Meets Transparency", category: "Use Cases" },
  { topic: "Sports Certificate Fraud: A Blockchain Solution", category: "Use Cases" },
  { topic: "Supply Chain Document Verification with Blockchain", category: "Use Cases" },
  { topic: "Legal Document Authentication in the Digital Age", category: "Use Cases" },
  // Compliance
  { topic: "India's National Blockchain Framework Explained", category: "Industry", popular: true },
  { topic: "Data Localization Requirements for Blockchain in India", category: "Industry" },
  { topic: "CERT-In Audit Readiness for Blockchain Platforms", category: "Industry" },
  { topic: "How DPDP Act Affects Document Storage on Blockchain", category: "Industry" },
  // Tutorials
  { topic: "Getting Started with Setara API in 5 Minutes", category: "Tutorials", popular: true },
  { topic: "Building a Document Verification App with Node.js and Setara", category: "Tutorials" },
  { topic: "Running a Setara Validator Node: Step-by-Step Guide", category: "Tutorials" },
  { topic: "Integrating Setara Document Verification in Python", category: "Tutorials" },
  { topic: "How to Verify Documents Using the Setara Public API", category: "Tutorials" },
  // Thought Leadership
  { topic: "Why India Needs a Sovereign Document Blockchain", category: "Industry", popular: true },
  { topic: "The Future of Digital Credentials in Indian Education", category: "Industry" },
  { topic: "Blockchain vs DigiLocker: Complementary or Competitive?", category: "Industry" },
  { topic: "Why Zero Gas Fees Matter for Enterprise Blockchain Adoption", category: "Industry" },
  { topic: "From Paper to Blockchain: Digital Transformation for Government", category: "Industry" },
  { topic: "The True Cost of Document Fraud in India", category: "Industry" },
];

async function generateBlogPosts() {
  console.log("\n📝 Generating blog posts...\n");

  let published = 0;
  const today = new Date();

  for (let i = 0; i < BLOG_TOPICS.length; i++) {
    const { topic, category, popular } = BLOG_TOPICS[i];
    const date = new Date(today);
    date.setDate(date.getDate() - i * 2); // Space posts 2 days apart

    console.log(`  Generating: ${topic}...`);

    const post = await generateJSON<BlogPost>(
      `You are a senior content writer for Setara Network, writing authoritative blog posts about blockchain document verification for an Indian audience.
${SETARA_CONTEXT}
Write factual, well-structured blog posts that demonstrate deep expertise. Use real Indian examples (UGC, AICTE, MoHFW, state governments, specific universities).
Every post should naturally mention Setara where relevant but not be overly promotional.
Target: 1200-1800 words per post. Use HTML formatting in the blogDse field (paragraphs, lists, strong, code blocks).`,
      `Write a blog post about: "${topic}"

Return JSON with:
- "title": compelling blog title (50-70 chars)
- "slug": URL slug (lowercase, hyphened)
- "description": meta description (150-160 chars) for SEO
- "date": "${date.toISOString().split("T")[0]}"
- "readTime": estimated read time (e.g., "5 min")
- "category": "${category}"
- "isPopular": ${popular ? "true" : "false"}
- "blogSection": array of 4-6 sections, each with:
  - "blogTitle": section heading
  - "blogDse": HTML content (2-4 paragraphs per section, use <p>, <ul>, <li>, <strong>, <code>, <blockquote>)`
    );

    const ok = await publishToStrapi("/api/setara-blogs", post);
    if (ok) published++;
    console.log(`  ${ok ? "✅" : "❌"} ${post.title}`);

    // Save locally too
    saveToOutput(`blogs/${post.slug}.json`, post);

    await sleep(3000); // Respect rate limits
  }

  console.log(`\n📝 Blogs: ${published}/${BLOG_TOPICS.length} published\n`);
  return published;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function saveToOutput(path: string, data: unknown) {
  const fullPath = join(OUTPUT_DIR, path);
  const dir = fullPath.substring(0, fullPath.lastIndexOf("/"));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const command = process.argv[2] || "all";

  console.log(`\n🚀 Setara Content Pipeline — ${command}\n`);
  console.log(`  Strapi:  ${STRAPI_URL}`);
  console.log(`  Dry run: ${DRY_RUN}`);
  console.log(`  Output:  ${OUTPUT_DIR}\n`);

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const results: Record<string, number> = {};

  switch (command) {
    case "glossary":
      results.glossary = await generateGlossary();
      break;
    case "pseo":
      results.pseo = await generatePseoPages();
      break;
    case "blogs":
      results.blogs = await generateBlogPosts();
      break;
    case "all":
      results.glossary = await generateGlossary();
      results.pseo = await generatePseoPages();
      results.blogs = await generateBlogPosts();
      break;
    case "dry-run":
      process.env.DRY_RUN = "true";
      results.glossary = await generateGlossary();
      results.pseo = await generatePseoPages();
      results.blogs = await generateBlogPosts();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error("Usage: npx tsx scripts/generate-content.ts [glossary|pseo|blogs|all|dry-run]");
      process.exit(1);
  }

  console.log("\n═══════════════════════════════════════════");
  console.log("  RESULTS");
  console.log("═══════════════════════════════════════════");
  for (const [key, count] of Object.entries(results)) {
    console.log(`  ${key}: ${count} published`);
  }
  console.log("═══════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
