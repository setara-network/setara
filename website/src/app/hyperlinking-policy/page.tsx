import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Hyperlinking Policy — Setara Network",
  description: "Hyperlinking policy for the Setara Network website.",
};

export default function HyperlinkingPolicyPage() {
  return (
    <PolicyPage title="Hyperlinking Policy" lastUpdated="March 2026">
      <p>
        This policy outlines the guidelines for linking to and from the Setara Network
        website (setara.network).
      </p>

      <h2>Links to External Websites</h2>
      <p>
        This website may contain links to external websites for the convenience of our
        users. These links are provided for informational purposes only. Setara Network:
      </p>
      <ul>
        <li>Does not endorse or take responsibility for the content of external websites.</li>
        <li>Is not responsible for the privacy practices or policies of external websites.</li>
        <li>Does not guarantee the accuracy, reliability, or completeness of information on external sites.</li>
        <li>Shall not be liable for any loss or damage arising from the use of external websites.</li>
      </ul>
      <p>
        External links open in a new browser tab and are clearly indicated. Users are
        advised to read the privacy policies and terms of external websites before
        providing any personal information.
      </p>

      <h2>Linking to This Website</h2>
      <p>You are welcome to link to the Setara Network website, provided that:</p>
      <ul>
        <li>The link is not misleading or defamatory.</li>
        <li>The linking website does not imply endorsement by Setara Network.</li>
        <li>The linked page is not loaded into frames on the linking website.</li>
        <li>The link is clearly identifiable and points to the official Setara Network domain (setara.network).</li>
      </ul>

      <h2>Deep Linking</h2>
      <p>
        Deep linking (linking to specific pages rather than the homepage) is permitted
        for non-commercial purposes. For commercial deep linking arrangements, please
        <a href="/contact"> contact us</a>.
      </p>

      <h2>Removal of Links</h2>
      <p>
        Setara Network reserves the right to request removal of any link to this website
        that does not comply with this policy. If you find a broken link on this website
        or have concerns about any linked content, please <a href="/contact">contact us</a>.
      </p>
    </PolicyPage>
  );
}
