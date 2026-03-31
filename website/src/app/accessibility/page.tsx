import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Accessibility Statement — Setara Network",
  description: "Setara Network accessibility statement and WCAG 2.1 compliance information.",
};

export default function AccessibilityPage() {
  return (
    <PolicyPage title="Accessibility Statement" lastUpdated="March 2026">
      <p>
        Setara Network is committed to making its website accessible to all users, including
        persons with disabilities. We strive to conform to the Web Content Accessibility
        Guidelines (WCAG) 2.1 Level AA standards as recommended by the Guidelines for
        Indian Government Websites (GIGW).
      </p>

      <h2>Accessibility Features</h2>
      <p>This website includes the following accessibility features:</p>
      <ul>
        <li><strong>Skip to Main Content:</strong> A skip navigation link is provided at the top of every page to allow users to bypass repeated navigation and jump directly to the main content.</li>
        <li><strong>Text Resize:</strong> Users can increase or decrease the text size using the A-/A/A+ controls in the accessibility toolbar at the top of every page.</li>
        <li><strong>High Contrast Mode:</strong> A high contrast viewing option is available via the accessibility toolbar for users with low vision.</li>
        <li><strong>Keyboard Navigation:</strong> All interactive elements on this website can be accessed using the keyboard. Use the Tab key to navigate forward, Shift+Tab to navigate backward, and Enter to activate links and buttons.</li>
        <li><strong>Screen Reader Compatibility:</strong> This website is designed to be compatible with popular screen readers. See our <a href="/screen-reader-access">Screen Reader Access</a> page for details.</li>
        <li><strong>Descriptive Links:</strong> Link text is meaningful and describes the destination or purpose of the link.</li>
        <li><strong>Alternative Text:</strong> All meaningful images include descriptive alternative text. Decorative images are appropriately marked to be ignored by screen readers.</li>
        <li><strong>Semantic HTML:</strong> Proper HTML markup is used including headings, lists, landmarks, and ARIA attributes to ensure content structure is conveyed to assistive technologies.</li>
        <li><strong>Focus Indicators:</strong> Visible focus indicators are provided on all interactive elements for keyboard users.</li>
        <li><strong>Print Friendly:</strong> Pages can be printed in a reader-friendly format on A4 paper.</li>
      </ul>

      <h2>Conformance Status</h2>
      <p>
        This website aims to conform to WCAG 2.1 Level AA. We regularly audit our pages and
        make improvements to ensure ongoing compliance. While we strive for full conformance,
        some content may not yet fully meet all accessibility standards.
      </p>

      <h2>Technologies Used</h2>
      <p>This website relies on the following technologies:</p>
      <ul>
        <li>HTML5</li>
        <li>WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)</li>
        <li>CSS (Cascading Style Sheets)</li>
        <li>JavaScript</li>
      </ul>

      <h2>Feedback</h2>
      <p>
        We welcome your feedback on the accessibility of this website. If you encounter any
        accessibility barriers or have suggestions for improvement, please{" "}
        <a href="/contact">contact us</a>.
      </p>
      <p>We will make reasonable efforts to respond to accessibility feedback within 5 business days.</p>
    </PolicyPage>
  );
}
