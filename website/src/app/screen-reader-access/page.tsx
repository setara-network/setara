import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Screen Reader Access — Setara Network",
  description: "Screen reader compatibility information for the Setara Network website.",
};

export default function ScreenReaderAccessPage() {
  return (
    <PolicyPage title="Screen Reader Access" lastUpdated="March 2026">
      <p>
        This website is designed to be accessible with screen readers and other assistive
        technologies. The following information will help screen reader users navigate the
        website effectively.
      </p>

      <h2>Compatible Screen Readers</h2>
      <p>This website has been tested and is compatible with the following screen readers:</p>

      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-semibold text-[#1a1a2e]">Screen Reader</th>
              <th className="px-4 py-3 text-left font-semibold text-[#1a1a2e]">Website</th>
              <th className="px-4 py-3 text-left font-semibold text-[#1a1a2e]">Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium">JAWS</td>
              <td className="px-4 py-3"><a href="https://www.freedomscientific.com/products/software/jaws/" target="_blank" rel="noopener noreferrer">Freedom Scientific<span className="sr-only"> (opens in new tab)</span></a></td>
              <td className="px-4 py-3">Commercial</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium">NVDA</td>
              <td className="px-4 py-3"><a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">NV Access<span className="sr-only"> (opens in new tab)</span></a></td>
              <td className="px-4 py-3">Free / Open Source</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium">VoiceOver</td>
              <td className="px-4 py-3">Built into macOS and iOS</td>
              <td className="px-4 py-3">Free (built-in)</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium">TalkBack</td>
              <td className="px-4 py-3">Built into Android</td>
              <td className="px-4 py-3">Free (built-in)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Narrator</td>
              <td className="px-4 py-3">Built into Windows</td>
              <td className="px-4 py-3">Free (built-in)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Navigating This Website</h2>

      <h3>Landmarks</h3>
      <p>The website uses ARIA landmarks to help you navigate between major sections:</p>
      <ul>
        <li><strong>Banner:</strong> Contains the accessibility toolbar and main navigation</li>
        <li><strong>Navigation:</strong> The main menu for navigating between pages</li>
        <li><strong>Main:</strong> The primary content area of each page</li>
        <li><strong>Content Info:</strong> The footer containing policy links and site information</li>
      </ul>

      <h3>Headings</h3>
      <p>
        Pages are structured with a logical heading hierarchy (H1 through H4). You can use
        your screen reader&apos;s heading navigation to quickly jump between sections.
      </p>

      <h3>Skip Navigation</h3>
      <p>
        A &ldquo;Skip to Main Content&rdquo; link is the first focusable element on every page. Activate it
        to bypass the navigation and go directly to the page content.
      </p>

      <h3>Keyboard Shortcuts</h3>
      <ul>
        <li><strong>Tab:</strong> Move to next focusable element</li>
        <li><strong>Shift + Tab:</strong> Move to previous focusable element</li>
        <li><strong>Enter:</strong> Activate links and buttons</li>
        <li><strong>Escape:</strong> Close menus and dialogs</li>
      </ul>

      <h2>Need Help?</h2>
      <p>
        If you face any difficulty accessing the content on this website using assistive
        technologies, please <a href="/contact">contact us</a> and we will assist you.
      </p>
    </PolicyPage>
  );
}
