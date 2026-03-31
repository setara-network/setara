import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Copyright Policy — Setara Network",
  description: "Copyright policy for the Setara Network website.",
};

export default function CopyrightPage() {
  return (
    <PolicyPage title="Copyright Policy" lastUpdated="March 2026">
      <p>
        The content of this website is owned and maintained by Setara Network unless
        otherwise stated. This copyright policy outlines the terms governing the use of
        material published on this website.
      </p>

      <h2>Copyright Notice</h2>
      <p>
        &copy; {new Date().getFullYear()} Setara Network. All rights reserved unless
        otherwise indicated.
      </p>

      <h2>Website Content</h2>
      <p>
        Material featured on this website may be reproduced free of charge for
        non-commercial, informational, or educational purposes, provided that:
      </p>
      <ul>
        <li>The material is not modified or altered in any way.</li>
        <li>The source is acknowledged as &ldquo;Setara Network — setara.network&rdquo;.</li>
        <li>The material is not used in a misleading context.</li>
      </ul>
      <p>
        For commercial use or reproduction, prior written permission must be obtained
        from Setara Network by <a href="/contact">contacting us</a>.
      </p>

      <h2>Open Source Software</h2>
      <p>
        The Setara blockchain software is open source and available on GitHub. The
        software is distributed under its respective open source license, which may
        differ from the copyright terms applicable to this website&apos;s content.
      </p>

      <h2>Third-Party Content</h2>
      <p>
        Where content from third parties is featured on this website, the copyright
        for such content remains with the respective owners. Permission to reproduce
        such material must be obtained from the relevant copyright holders.
      </p>

      <h2>Trademarks</h2>
      <p>
        &ldquo;Setara&rdquo; and the Setara Network logo are trademarks of Setara Network.
        Unauthorized use of these trademarks is prohibited.
      </p>

      <h2>Reporting Copyright Violations</h2>
      <p>
        If you believe that any content on this website infringes your copyright, please
        <a href="/contact"> contact us</a> with details of the alleged infringement.
      </p>
    </PolicyPage>
  );
}
