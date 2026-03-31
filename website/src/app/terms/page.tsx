import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Setara Network",
  description: "Terms and conditions for using the Setara Network website and services.",
};

export default function TermsPage() {
  return (
    <PolicyPage title="Terms & Conditions" lastUpdated="March 2026">
      <p>
        By accessing and using the Setara Network website (setara.network) and associated
        services, you agree to be bound by these terms and conditions.
      </p>

      <h2>Use of the Website</h2>
      <p>
        This website is provided for informational purposes and to enable organizations to
        register and use the Setara document blockchain. You agree to use this website
        only for lawful purposes and in accordance with these terms.
      </p>

      <h2>Organization Registration</h2>
      <ul>
        <li>You must provide accurate and complete information during registration.</li>
        <li>You are responsible for maintaining the confidentiality of your API key.</li>
        <li>Each organization is responsible for the documents registered under its account.</li>
        <li>Setara Network reserves the right to suspend or terminate accounts that violate these terms.</li>
      </ul>

      <h2>Document Registration</h2>
      <ul>
        <li>Documents registered on the blockchain are immutable and cannot be deleted or modified.</li>
        <li>You must have the legal right to register any document you submit.</li>
        <li>Setara Network does not store the actual documents — only cryptographic hashes and IPFS content identifiers (CIDs) are stored on-chain.</li>
        <li>Registration consumes credits from your organization&apos;s wallet as per the prevailing fee schedule.</li>
      </ul>

      <h2>Credits and Billing</h2>
      <ul>
        <li>New organizations receive complimentary credits upon registration.</li>
        <li>Additional credits can be purchased through the billing system.</li>
        <li>Credits are non-refundable once used for document registration.</li>
        <li>Credit rates may be updated with prior notice.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, logos, and software, is the
        property of Setara Network unless otherwise stated. The Setara Network software
        is open source and available under its respective license on GitHub.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Setara Network provides this service &ldquo;as is&rdquo; without warranties of any kind.
        We shall not be liable for any direct, indirect, incidental, or consequential
        damages arising from your use of the website or services.
      </p>

      <h2>Network Availability</h2>
      <p>
        While we strive for high availability, we do not guarantee uninterrupted access
        to the blockchain network or API services. The testnet may be reset periodically
        during development phases.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with the laws of India.
        Any disputes shall be subject to the jurisdiction of courts in India.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Changes will be posted on
        this page with an updated revision date. Continued use of the website after changes
        constitutes acceptance of the modified terms.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, please visit our <a href="/contact">Contact Us</a> page.
      </p>
    </PolicyPage>
  );
}
