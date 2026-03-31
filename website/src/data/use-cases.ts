export interface UseCase {
  slug: string;
  title: string;
  headline: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  heroSubtitle: string;
  problem: {
    title: string;
    points: string[];
  };
  solution: {
    title: string;
    points: { title: string; description: string }[];
  };
  howItWorks: { step: string; description: string }[];
  benefits: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  cta: string;
}

export const useCases: UseCase[] = [
  {
    slug: "sports-certificates",
    title: "Blockchain Sports Certificates",
    headline: "Tamper-Proof Sports Certificates on Blockchain",
    description:
      "Issue and verify sports competition certificates instantly using blockchain technology. Athletes, coaches, and organizers can trust every credential.",
    metaDescription:
      "Issue tamper-proof sports certificates on blockchain. Instant verification for athletes, coaches, and competition organizers. No tokens, no complexity — just trust.",
    keywords: [
      "sports certificate blockchain",
      "blockchain sports credentials",
      "digital sports certificates",
      "athlete certificate verification",
      "competition certificate blockchain India",
      "sports credential verification",
      "tamper-proof sports certificates",
    ],
    icon: "\u{1F3C6}",
    heroSubtitle:
      "Every medal, every competition, every achievement — permanently recorded and instantly verifiable on the Setara blockchain.",
    problem: {
      title: "The Problem with Sports Certificates Today",
      points: [
        "Paper certificates are easily forged or duplicated",
        "No centralized system to verify athletic achievements across federations",
        "Athletes lose certificates and have no way to recover them",
        "Employers and universities cannot verify sports credentials quickly",
        "Competition organizers lack affordable tools for issuing digital credentials",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Immutable Records",
          description:
            "Every certificate is hashed and stored on-chain. Once registered, it cannot be altered, deleted, or forged.",
        },
        {
          title: "Instant Verification",
          description:
            "Anyone can verify a certificate using a hash lookup — no login, no special software, no contacting the issuer.",
        },
        {
          title: "IPFS Storage",
          description:
            "The actual certificate file is stored on IPFS, giving athletes a permanent, decentralized copy they own.",
        },
        {
          title: "Bulk Issuance via API",
          description:
            "Competition organizers can issue hundreds of certificates programmatically using the Setara REST API.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Register Organization",
        description:
          "The sports federation or competition organizer registers on Setara and receives an API key with 5,000 free credits.",
      },
      {
        step: "Upload Certificate",
        description:
          "Upload the certificate PDF/image to IPFS. The file gets a unique content identifier (CID).",
      },
      {
        step: "Register On-Chain",
        description:
          "Submit the document hash, IPFS CID, and metadata (athlete name, event, date) to the Setara blockchain via API.",
      },
      {
        step: "Share & Verify",
        description:
          "Share the certificate link with the athlete. Anyone can verify authenticity by looking up the hash on the blockchain.",
      },
    ],
    benefits: [
      {
        title: "Zero Cost to Athletes",
        description: "Athletes don't pay anything. The issuing organization covers the cost at 1 credit (~\u20B91) per certificate.",
      },
      {
        title: "Works Across Federations",
        description: "Any organization can issue certificates on the same network. One verification system for all sports bodies.",
      },
      {
        title: "No Blockchain Knowledge Needed",
        description: "Simple REST API. No wallets, no tokens, no gas fees. If you can call an API, you can issue certificates.",
      },
      {
        title: "Lifetime Availability",
        description: "Certificates persist on-chain and on IPFS. Athletes can access them years after the event.",
      },
    ],
    stats: [
      { value: "\u20B91", label: "Per Certificate" },
      { value: "< 2s", label: "Verification Time" },
      { value: "5,000", label: "Free Credits" },
      { value: "\u221E", label: "Certificate Lifetime" },
    ],
    cta: "Start issuing tamper-proof sports certificates today.",
  },
  {
    slug: "university-degrees",
    title: "Blockchain University Degree Verification",
    headline: "Verify University Degrees Instantly on Blockchain",
    description:
      "End fake degrees forever. Universities register degree hashes on-chain, and employers verify in seconds — no phone calls, no waiting.",
    metaDescription:
      "Verify university degrees instantly on blockchain. End fake degrees with tamper-proof academic credentials. Built for Indian universities and employers.",
    keywords: [
      "university degree verification blockchain",
      "blockchain academic credentials",
      "fake degree prevention",
      "digital degree verification India",
      "tamper-proof university certificates",
      "academic credential blockchain",
      "degree authentication",
    ],
    icon: "\u{1F393}",
    heroSubtitle:
      "Universities issue, employers verify — in seconds, not weeks. Every degree permanently recorded on an immutable ledger.",
    problem: {
      title: "The Fake Degree Crisis",
      points: [
        "India has over 1,000 universities and thousands of fake degree mills",
        "Employers spend days or weeks verifying academic credentials manually",
        "No standardized digital system exists for cross-university verification",
        "Students lose original certificates with no reliable backup",
        "Background verification companies charge high fees for basic checks",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "University-Issued, Blockchain-Verified",
          description:
            "Universities register degree hashes directly on the Setara blockchain. Each credential gets an immutable proof of issuance.",
        },
        {
          title: "Employer Self-Service",
          description:
            "Employers verify degrees themselves via the public API or explorer — no intermediaries, no fees, no delays.",
        },
        {
          title: "Privacy-Preserving",
          description:
            "Only the hash is stored on-chain. The actual degree content remains private unless the student shares it.",
        },
        {
          title: "Batch Registration",
          description:
            "Universities can register entire graduating classes at once via the API. Thousands of degrees in minutes.",
        },
      ],
    },
    howItWorks: [
      {
        step: "University Registers",
        description:
          "The university registers as an organization on Setara and gets API credentials.",
      },
      {
        step: "Degree Issuance",
        description:
          "When degrees are issued, the university hashes each certificate and registers it on-chain with student metadata.",
      },
      {
        step: "Student Receives Proof",
        description:
          "Students get their degree plus a blockchain verification link/QR code they can share with employers.",
      },
      {
        step: "Employer Verifies",
        description:
          "Employers enter the hash or scan the QR code to instantly confirm authenticity — no account needed.",
      },
    ],
    benefits: [
      {
        title: "End Fake Degrees",
        description: "If it's not on-chain, it's not real. Employers can trust what they see.",
      },
      {
        title: "Instant Background Checks",
        description: "Reduce degree verification from weeks to seconds. No more calling university registrars.",
      },
      {
        title: "Low Cost for Universities",
        description: "At \u20B91 per degree, a university graduating 5,000 students pays just \u20B95,000 — and the first 5,000 are free.",
      },
      {
        title: "NEP 2020 Ready",
        description: "Aligns with India's National Education Policy push for digital academic records and ABC integration.",
      },
    ],
    stats: [
      { value: "1,000+", label: "Universities in India" },
      { value: "< 2s", label: "Verification Time" },
      { value: "\u20B91", label: "Per Degree" },
      { value: "0", label: "Cost to Verify" },
    ],
    cta: "Register your university and start issuing verifiable degrees.",
  },
  {
    slug: "government-documents",
    title: "Blockchain Government Document Verification",
    headline: "Secure Government Documents on Blockchain",
    description:
      "Land records, identity proofs, and official certificates with blockchain-grade security and instant public verification.",
    metaDescription:
      "Secure government documents on blockchain. Tamper-proof land records, identity proofs, and official certificates with instant verification. Built for Indian governance.",
    keywords: [
      "government document blockchain",
      "blockchain land records India",
      "digital government certificates",
      "tamper-proof government documents",
      "blockchain identity verification",
      "government record verification",
      "e-governance blockchain India",
    ],
    icon: "\u{1F3DB}",
    heroSubtitle:
      "Land records, identity proofs, and official documents — secured by blockchain, verified by anyone, tampered by no one.",
    problem: {
      title: "The Challenge with Government Records",
      points: [
        "Land record fraud costs Indian citizens crores annually",
        "Government certificates are easily forged with modern printing technology",
        "Citizens wait weeks for document verification across departments",
        "No single system connects state, central, and local government records",
        "Paper-based archives are vulnerable to natural disasters and deterioration",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Immutable Land Records",
          description:
            "Land ownership documents registered on-chain cannot be altered retroactively. Every change creates a transparent audit trail.",
        },
        {
          title: "Cross-Department Verification",
          description:
            "Any government department can verify documents issued by another without bilateral agreements or manual processes.",
        },
        {
          title: "Citizen Self-Service",
          description:
            "Citizens can verify their own documents anytime through the public explorer — no RTI applications needed.",
        },
        {
          title: "Disaster-Proof Records",
          description:
            "Blockchain data is replicated across multiple validator nodes. No single point of failure, no data loss from floods or fires.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Department Onboarding",
        description:
          "The government department registers on Setara and deploys a validator node for data sovereignty.",
      },
      {
        step: "Document Digitization",
        description:
          "Existing and new documents are hashed and registered on-chain via the API or admin panel.",
      },
      {
        step: "Public Verification Portal",
        description:
          "Citizens and businesses verify any document through a public web portal or API — no login required.",
      },
      {
        step: "Audit Trail",
        description:
          "Every registration and verification event is logged immutably, creating a complete audit trail for governance.",
      },
    ],
    benefits: [
      {
        title: "Reduce Land Fraud",
        description: "Blockchain-backed land records provide tamper-proof ownership history accessible to all parties.",
      },
      {
        title: "Faster Inter-Department Processes",
        description: "Eliminate manual verification between departments. One lookup confirms any government document.",
      },
      {
        title: "Compliance & Transparency",
        description: "Every action is auditable on-chain. Perfect for RTI compliance and governance transparency mandates.",
      },
      {
        title: "Data Sovereignty",
        description: "Government departments run their own nodes. Data stays sovereign while being publicly verifiable.",
      },
    ],
    stats: [
      { value: "28+", label: "States Servable" },
      { value: "< 2s", label: "Verification" },
      { value: "100%", label: "Audit Trail" },
      { value: "0", label: "Downtime Risk" },
    ],
    cta: "Bring blockchain-grade security to government documents.",
  },
  {
    slug: "corporate-compliance",
    title: "Blockchain Corporate Compliance & Audit Trail",
    headline: "Immutable Audit Trails for Corporate Compliance",
    description:
      "Store audit trails, legal documents, and compliance records with blockchain-grade immutability and timestamping.",
    metaDescription:
      "Immutable corporate audit trails on blockchain. Store compliance records, legal documents, and regulatory filings with tamper-proof timestamping. Enterprise-ready.",
    keywords: [
      "corporate compliance blockchain",
      "blockchain audit trail",
      "immutable compliance records",
      "corporate document blockchain",
      "regulatory compliance blockchain India",
      "tamper-proof audit trail",
      "enterprise document management blockchain",
    ],
    icon: "\u{1F4BC}",
    heroSubtitle:
      "Every audit trail, every compliance record, every legal document — immutably timestamped and independently verifiable.",
    problem: {
      title: "Why Corporate Compliance Needs Blockchain",
      points: [
        "Internal databases can be retroactively modified, undermining audit integrity",
        "Proving document existence at a specific time is difficult without third-party notarization",
        "Regulatory audits require months of document gathering and verification",
        "Multi-party business agreements lack a neutral, tamper-proof record",
        "Data breach disclosures and incident reports need provable timestamps",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Provable Timestamps",
          description:
            "Every document hash is timestamped by the blockchain consensus. Prove exactly when a document existed.",
        },
        {
          title: "Immutable Audit Trail",
          description:
            "Once a compliance record is on-chain, it cannot be modified or deleted — even by the issuing organization.",
        },
        {
          title: "Third-Party Verifiable",
          description:
            "Auditors, regulators, and counterparties can independently verify any record without relying on internal systems.",
        },
        {
          title: "API-First Integration",
          description:
            "Integrate Setara into existing compliance workflows via REST API. No new software to deploy for end users.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Register Organization",
        description:
          "The company registers on Setara and gets API credentials for their compliance team.",
      },
      {
        step: "Hash & Register",
        description:
          "Compliance documents are hashed and registered on-chain. The original file stays in your internal systems.",
      },
      {
        step: "Receive Proof",
        description:
          "Each registration returns a blockchain transaction ID — your proof of existence at a specific time.",
      },
      {
        step: "Audit Ready",
        description:
          "During audits, provide the document hash. The auditor verifies it against the blockchain independently.",
      },
    ],
    benefits: [
      {
        title: "Regulatory Confidence",
        description: "Show regulators that records haven't been tampered with — blockchain provides mathematical proof.",
      },
      {
        title: "Faster Audits",
        description: "Auditors verify documents in seconds instead of requesting access to internal systems.",
      },
      {
        title: "Legal Admissibility",
        description: "Blockchain timestamps provide strong evidence for legal proceedings and dispute resolution.",
      },
      {
        title: "No Vendor Lock-In",
        description: "Open-source, standard hash algorithms. Your data and proofs work independently of Setara.",
      },
    ],
    stats: [
      { value: "SHA-256", label: "Hash Standard" },
      { value: "< 2s", label: "Proof Generation" },
      { value: "\u221E", label: "Record Retention" },
      { value: "\u20B91", label: "Per Record" },
    ],
    cta: "Bring blockchain-grade immutability to your compliance records.",
  },
  {
    slug: "healthcare-records",
    title: "Blockchain Healthcare Record Verification",
    headline: "Privacy-Preserving Healthcare Records on Blockchain",
    description:
      "Verify patient records, prescriptions, and medical certificates with hash-based blockchain storage that never exposes sensitive data.",
    metaDescription:
      "Privacy-preserving healthcare records on blockchain. Verify medical certificates, prescriptions, and patient records without exposing sensitive data. HIPAA-friendly design.",
    keywords: [
      "healthcare blockchain",
      "medical record verification blockchain",
      "blockchain patient records",
      "healthcare document blockchain India",
      "medical certificate verification",
      "privacy-preserving health records",
      "blockchain prescription verification",
    ],
    icon: "\u{1FA7A}",
    heroSubtitle:
      "Verify medical records without exposing patient data. Hash-based blockchain storage ensures privacy and authenticity simultaneously.",
    problem: {
      title: "Healthcare Verification Challenges",
      points: [
        "Fake medical certificates and prescriptions are a growing concern",
        "Transferring medical records between hospitals is slow and error-prone",
        "Patient data privacy must be maintained while enabling verification",
        "Insurance fraud through fabricated medical documents costs the industry crores",
        "No standardized system exists for cross-hospital record verification in India",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Hash-Only On-Chain",
          description:
            "Only the document hash is stored on the blockchain. Actual patient data stays with the hospital — zero exposure risk.",
        },
        {
          title: "Consent-Based Sharing",
          description:
            "Patients share their document hash or QR code to enable verification. No data moves without patient consent.",
        },
        {
          title: "Cross-Hospital Verification",
          description:
            "Any hospital on the Setara network can verify records issued by another. One system for all healthcare providers.",
        },
        {
          title: "Insurance Fraud Prevention",
          description:
            "Insurers verify medical documents against the blockchain before processing claims — no fake certificates.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Hospital Registers",
        description:
          "The hospital or healthcare provider registers on Setara and gets API credentials.",
      },
      {
        step: "Record Issuance",
        description:
          "When issuing a medical certificate or discharge summary, the hospital hashes it and registers the hash on-chain.",
      },
      {
        step: "Patient Gets Proof",
        description:
          "The patient receives their document plus a verification QR code/link they control.",
      },
      {
        step: "Third-Party Verifies",
        description:
          "Insurers, other hospitals, or employers verify the document hash — confirming it was issued by a registered hospital.",
      },
    ],
    benefits: [
      {
        title: "Patient Privacy by Design",
        description: "Zero patient data on the blockchain. Only cryptographic hashes — mathematically impossible to reverse.",
      },
      {
        title: "Reduce Insurance Fraud",
        description: "Insurers verify claims documents against blockchain records before payout.",
      },
      {
        title: "Seamless Hospital Transfers",
        description: "Patients moving between hospitals carry verifiable proof of their medical history.",
      },
      {
        title: "Regulatory Compliance",
        description: "Hash-only storage complies with data protection regulations while enabling verification.",
      },
    ],
    stats: [
      { value: "0", label: "Patient Data On-Chain" },
      { value: "< 2s", label: "Verification" },
      { value: "\u20B91", label: "Per Record" },
      { value: "100%", label: "Privacy Preserved" },
    ],
    cta: "Start verifying healthcare records with privacy-first blockchain.",
  },
  {
    slug: "supply-chain",
    title: "Blockchain Supply Chain Verification",
    headline: "Verify Product Provenance on Blockchain",
    description:
      "Track certificates of origin, quality reports, and compliance documents across the supply chain with tamper-proof blockchain records.",
    metaDescription:
      "Blockchain supply chain verification for product provenance. Track certificates of origin, quality reports, and compliance across the supply chain. Built for Indian manufacturers.",
    keywords: [
      "supply chain blockchain",
      "product provenance blockchain",
      "certificate of origin blockchain",
      "supply chain verification India",
      "blockchain quality certificate",
      "product authentication blockchain",
      "supply chain document verification",
    ],
    icon: "\u{1F69A}",
    heroSubtitle:
      "From raw material to final product — every certificate of origin, quality report, and compliance document verified on an immutable ledger.",
    problem: {
      title: "Supply Chain Trust Gaps",
      points: [
        "Counterfeit goods cost Indian industries lakhs of crores annually",
        "Certificates of origin and quality reports are easily forged",
        "Multi-party supply chains have no shared, trusted record system",
        "Recalls are slow because provenance tracking is fragmented",
        "Export compliance documents require costly manual verification processes",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Provenance Trail",
          description:
            "Each supply chain participant registers their documents on-chain, creating an unbroken provenance trail.",
        },
        {
          title: "Multi-Party Trust",
          description:
            "Manufacturers, distributors, and retailers all verify against the same blockchain — no bilateral trust needed.",
        },
        {
          title: "Export Compliance",
          description:
            "Quality certificates and certificates of origin can be verified by customs and import authorities instantly.",
        },
        {
          title: "Recall Traceability",
          description:
            "Trace any product back to its origin documents in seconds. Critical for food safety and pharmaceutical recalls.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Participants Register",
        description:
          "Each supply chain participant (manufacturer, distributor, retailer) registers on Setara.",
      },
      {
        step: "Document Registration",
        description:
          "Quality certificates, test reports, and compliance documents are hashed and registered at each stage.",
      },
      {
        step: "Chain of Custody",
        description:
          "Each handoff is documented on-chain with references to previous documents — forming a provenance chain.",
      },
      {
        step: "End-to-End Verification",
        description:
          "Buyers, regulators, or customs can verify the entire document trail from raw material to finished product.",
      },
    ],
    benefits: [
      {
        title: "Fight Counterfeiting",
        description: "Authentic products have verifiable blockchain records. No record means no trust.",
      },
      {
        title: "Faster Customs Clearance",
        description: "Pre-verified documents on blockchain speed up import/export clearance.",
      },
      {
        title: "Shared Source of Truth",
        description: "All supply chain participants read from the same immutable ledger — no disputes about document authenticity.",
      },
      {
        title: "Low Integration Cost",
        description: "REST API integrates with existing ERP and supply chain management systems. No blockchain expertise needed.",
      },
    ],
    stats: [
      { value: "100%", label: "Traceable" },
      { value: "< 2s", label: "Verification" },
      { value: "\u20B91", label: "Per Document" },
      { value: "\u221E", label: "Audit History" },
    ],
    cta: "Bring tamper-proof verification to your supply chain.",
  },
  {
    slug: "legal-documents",
    title: "Blockchain Legal Document Authentication",
    headline: "Authenticate Legal Documents on Blockchain",
    description:
      "Contracts, affidavits, and legal agreements with blockchain-backed proof of existence and timestamping for dispute resolution.",
    metaDescription:
      "Authenticate legal documents on blockchain. Tamper-proof contracts, affidavits, and agreements with provable timestamps for dispute resolution and court admissibility.",
    keywords: [
      "legal document blockchain",
      "blockchain contract authentication",
      "proof of existence blockchain",
      "legal document timestamp",
      "blockchain affidavit verification",
      "digital contract blockchain India",
      "tamper-proof legal documents",
    ],
    icon: "\u2696\uFE0F",
    heroSubtitle:
      "Contracts, affidavits, and agreements — with blockchain-grade proof of existence that holds up in court.",
    problem: {
      title: "Legal Document Authentication Challenges",
      points: [
        "Proving when a document was created or signed is difficult without notarization",
        "Contract disputes often come down to one party's word against another's",
        "Notarization is expensive, time-consuming, and not scalable for high-volume legal operations",
        "Digital documents can be silently modified after signing",
        "Cross-border legal document verification lacks standardized trust infrastructure",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Proof of Existence",
          description:
            "Register a document hash on-chain to prove it existed at a specific point in time — consensus-backed timestamps.",
        },
        {
          title: "Tamper Detection",
          description:
            "Any modification to the original document changes its hash, instantly revealing tampering when verified against the blockchain.",
        },
        {
          title: "Neutral Record",
          description:
            "The blockchain is a neutral third party. Neither side in a dispute controls the verification infrastructure.",
        },
        {
          title: "Scalable Notarization",
          description:
            "Register thousands of documents at \u20B91 each — orders of magnitude cheaper than traditional notarization.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Register Firm",
        description:
          "The law firm or legal department registers on Setara and receives API credentials.",
      },
      {
        step: "Hash Document",
        description:
          "When a contract or legal document is finalized, compute its SHA-256 hash and register it on-chain.",
      },
      {
        step: "Store Proof",
        description:
          "Receive a blockchain transaction ID as proof of registration — your timestamp certificate.",
      },
      {
        step: "Verify When Needed",
        description:
          "In disputes or audits, re-hash the document and verify it matches the on-chain record. Proves it hasn't been altered.",
      },
    ],
    benefits: [
      {
        title: "Court-Ready Evidence",
        description: "Blockchain timestamps provide strong evidence for courts — cryptographically provable, not based on trust.",
      },
      {
        title: "Cost-Effective",
        description: "\u20B91 per document vs hundreds for traditional notarization. Scale legal document authentication affordably.",
      },
      {
        title: "Instant Verification",
        description: "Opposing counsel, judges, or arbitrators verify documents in seconds — no waiting for notary confirmation.",
      },
      {
        title: "IP Protection",
        description: "Establish provable creation dates for patents, copyrights, and trade secrets before filing.",
      },
    ],
    stats: [
      { value: "\u20B91", label: "Per Document" },
      { value: "vs \u20B9500+", label: "Traditional Notary" },
      { value: "< 2s", label: "Verification" },
      { value: "SHA-256", label: "Hash Standard" },
    ],
    cta: "Start authenticating legal documents on blockchain today.",
  },
  {
    slug: "education-certificates",
    title: "Blockchain Education Certificates",
    headline: "Issue Verifiable Education Certificates on Blockchain",
    description:
      "Schools, coaching institutes, and training providers can issue blockchain-verified certificates that students and employers trust instantly.",
    metaDescription:
      "Issue verifiable education certificates on blockchain. Schools, coaching institutes, and training providers get instant credential verification. Built for Indian education.",
    keywords: [
      "education certificate blockchain",
      "digital education credentials",
      "blockchain school certificates",
      "training certificate verification",
      "coaching institute certificate blockchain",
      "verifiable credentials education India",
      "blockchain certificate of completion",
    ],
    icon: "\u{1F4DA}",
    heroSubtitle:
      "From school marksheets to professional training certificates — every educational credential verifiable on blockchain in seconds.",
    problem: {
      title: "Education Credential Challenges",
      points: [
        "Fake certificates from coaching institutes and unrecognized institutions are rampant",
        "Employers cannot distinguish genuine training certificates from fabricated ones",
        "Students completing online courses have no universally verifiable proof",
        "Schools and training providers lack affordable digital credentialing tools",
        "Certificate verification requires contacting the issuing institution manually",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Institutional Identity",
          description:
            "Every issuing institution is a registered organization on Setara. Certificates are traceable to verified issuers.",
        },
        {
          title: "Universal Format",
          description:
            "Any certificate — marksheet, diploma, course completion — uses the same verification system. One lookup for all.",
        },
        {
          title: "Student Ownership",
          description:
            "Students receive an IPFS-backed copy and a blockchain verification link. Their credentials, permanently accessible.",
        },
        {
          title: "Affordable for Small Institutions",
          description:
            "5,000 free credits on signup. A coaching institute issuing 100 certificates pays just \u20B9100 after the free tier.",
        },
      ],
    },
    howItWorks: [
      {
        step: "Institution Registers",
        description:
          "The school, coaching institute, or training provider registers on Setara.",
      },
      {
        step: "Issue Certificate",
        description:
          "Generate the certificate, hash it, and register on-chain with student name, course, and date.",
      },
      {
        step: "Student Gets Link",
        description:
          "The student receives their certificate file and a permanent blockchain verification URL or QR code.",
      },
      {
        step: "Employer Verifies",
        description:
          "Employers scan the QR code or enter the hash to confirm the certificate is genuine and who issued it.",
      },
    ],
    benefits: [
      {
        title: "Trust for Small Institutions",
        description: "Even unknown coaching institutes gain credibility when their certificates are blockchain-verified.",
      },
      {
        title: "Portfolio Building",
        description: "Students build a verifiable portfolio of all their educational achievements across institutions.",
      },
      {
        title: "No Technical Barrier",
        description: "REST API and admin panel make it easy for non-technical staff to issue certificates.",
      },
      {
        title: "Scales from 10 to 10,000",
        description: "Issue certificates one at a time or in bulk via API. Same low cost regardless of volume.",
      },
    ],
    stats: [
      { value: "5,000", label: "Free Certificates" },
      { value: "\u20B91", label: "After Free Tier" },
      { value: "< 2s", label: "Verification" },
      { value: "1", label: "API Call to Issue" },
    ],
    cta: "Start issuing verifiable education certificates today.",
  },
  {
    slug: "ngo-certificates",
    title: "Blockchain Certificates for NGOs",
    headline: "Transparent, Verifiable Certificates for NGOs",
    description:
      "NGOs and non-profits can issue donor receipts, volunteer certificates, and impact reports with blockchain-backed transparency and trust.",
    metaDescription:
      "Blockchain certificates for NGOs and non-profits. Issue verifiable donor receipts, volunteer certificates, and impact reports with full transparency. Affordable and easy to use.",
    keywords: [
      "NGO blockchain certificates",
      "non-profit blockchain",
      "donor receipt blockchain",
      "volunteer certificate verification",
      "NGO transparency blockchain",
      "blockchain impact reporting",
      "non-profit document verification India",
    ],
    icon: "\u{1F91D}",
    heroSubtitle:
      "Donor receipts, volunteer certificates, and impact reports — transparently issued and publicly verifiable on blockchain.",
    problem: {
      title: "Trust Challenges for NGOs",
      points: [
        "Donors lack verifiable proof that their contributions were acknowledged",
        "Fake NGOs issue fabricated receipts for tax deduction fraud",
        "Volunteer certificates from NGOs carry no verifiable weight with employers",
        "Impact reports are not independently verifiable by stakeholders",
        "Small NGOs lack the budget for expensive credentialing platforms",
      ],
    },
    solution: {
      title: "How Setara Solves This",
      points: [
        {
          title: "Verifiable Donor Receipts",
          description:
            "Every donation receipt is registered on-chain. Donors and tax authorities can verify its authenticity instantly.",
        },
        {
          title: "Trusted Volunteer Certificates",
          description:
            "Volunteer certificates issued on Setara are traceable to the registered NGO — employers can trust them.",
        },
        {
          title: "Transparent Impact Reporting",
          description:
            "Register impact reports on-chain so stakeholders can verify that reports haven't been altered after publication.",
        },
        {
          title: "Free for Most NGOs",
          description:
            "5,000 free credits cover most small NGOs entirely. Larger organizations pay just \u20B91 per document.",
        },
      ],
    },
    howItWorks: [
      {
        step: "NGO Registers",
        description:
          "The NGO registers on Setara with their organization details and receives API credentials.",
      },
      {
        step: "Issue Documents",
        description:
          "Donor receipts, volunteer certificates, and reports are hashed and registered on-chain.",
      },
      {
        step: "Share Verification Links",
        description:
          "Recipients get their documents with a blockchain verification link or QR code.",
      },
      {
        step: "Public Verification",
        description:
          "Anyone — donors, employers, tax authorities — can verify any document without logging in.",
      },
    ],
    benefits: [
      {
        title: "Build Donor Trust",
        description: "Transparent, verifiable receipts show donors their contributions are acknowledged on an immutable ledger.",
      },
      {
        title: "Fight Fake NGO Fraud",
        description: "Only registered NGOs can issue certificates. Verification traces back to the registered organization.",
      },
      {
        title: "Empower Volunteers",
        description: "Volunteers get blockchain-verified certificates that carry real weight on their resumes.",
      },
      {
        title: "Essentially Free",
        description: "5,000 free credits on signup. Most small NGOs never need to pay.",
      },
    ],
    stats: [
      { value: "5,000", label: "Free Documents" },
      { value: "\u20B91", label: "After Free Tier" },
      { value: "0", label: "Cost to Verify" },
      { value: "< 2s", label: "Verification" },
    ],
    cta: "Start issuing transparent, verifiable certificates for your NGO.",
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((uc) => uc.slug === slug);
}

export function getAllSlugs(): string[] {
  return useCases.map((uc) => uc.slug);
}
