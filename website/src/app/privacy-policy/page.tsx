import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Setara Network",
  description: "Privacy policy for the Setara Network website and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" lastUpdated="March 2026">
      <p>
        Setara Network (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
        protecting the privacy of visitors to this website and users of our services. This
        policy explains what information we collect, how we use it, and how we protect it.
      </p>

      <h2>Information We Collect</h2>

      <h3>Automatically Collected Information</h3>
      <p>When you visit our website, we may automatically collect:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Pages visited and time spent</li>
        <li>Referring website address</li>
      </ul>
      <p>This information is used for website analytics and improving user experience.</p>

      <h3>Information You Provide</h3>
      <p>When you register an organization or contact us, we collect:</p>
      <ul>
        <li>Organization name</li>
        <li>Contact person&apos;s name (first and last)</li>
        <li>Email address</li>
        <li>Phone number</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>Providing and maintaining our services</li>
        <li>Processing organization registrations</li>
        <li>Communicating with you regarding your account or services</li>
        <li>Improving our website and services</li>
        <li>Complying with legal obligations</li>
      </ul>

      <h2>Data Storage and Security</h2>
      <p>
        Organization data is stored securely in our database. Document hashes and metadata
        registered on the Setara blockchain are public and immutable by design — this is
        a core feature of the service for verification purposes.
      </p>
      <p>
        We implement appropriate technical and organizational security measures to protect
        your personal information against unauthorized access, alteration, or destruction.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not sell, trade, or share your personal information with third parties for
        marketing purposes. Information may be shared only:
      </p>
      <ul>
        <li>With your consent</li>
        <li>To comply with legal obligations or court orders</li>
        <li>To protect the rights and safety of Setara Network and its users</li>
      </ul>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your personal information (where legally permissible)</li>
        <li>Withdraw consent for data processing</li>
      </ul>
      <p>
        Please note that document hashes registered on the blockchain are immutable and
        cannot be deleted due to the nature of blockchain technology.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Changes will be posted on
        this page with an updated revision date. We encourage you to review this policy
        periodically.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this privacy policy or to exercise your rights, please visit
        our <a href="/contact">Contact Us</a> page.
      </p>
    </PolicyPage>
  );
}
