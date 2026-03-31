import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — Setara Network",
  description: "Contact the Setara Network team for support, feedback, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#E8613C] transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#1a1a2e] font-medium">Contact Us</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-[#1a1a2e] sm:text-4xl">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Have questions, feedback, or need assistance? Reach out to the Setara Network team.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-[#1a1a2e]">General Inquiries</h2>
              <p className="mt-2 text-gray-600">
                For general questions about Setara Network and our services.
              </p>
              <p className="mt-2">
                <a href="mailto:contact@setara.network" className="text-[#E8613C] hover:underline font-medium">
                  contact@setara.network
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1a1a2e]">Technical Support</h2>
              <p className="mt-2 text-gray-600">
                For help with API integration, node setup, or technical issues.
              </p>
              <p className="mt-2">
                <a href="mailto:support@setara.network" className="text-[#E8613C] hover:underline font-medium">
                  support@setara.network
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1a1a2e]">Organization Registration</h2>
              <p className="mt-2 text-gray-600">
                Ready to get started? Register your organization to receive API credentials
                and free credits.
              </p>
              <p className="mt-2">
                <Link href="/register" className="text-[#E8613C] hover:underline font-medium">
                  Register Now &rarr;
                </Link>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1a1a2e]">Accessibility Feedback</h2>
              <p className="mt-2 text-gray-600">
                If you encounter any accessibility issues on this website, please let us know.
              </p>
              <p className="mt-2">
                <a href="mailto:accessibility@setara.network" className="text-[#E8613C] hover:underline font-medium">
                  accessibility@setara.network
                </a>
              </p>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Send Feedback</h2>
            <p className="mt-2 text-sm text-gray-500">
              Your feedback helps us improve. All fields are required.
            </p>

            <form className="mt-6 space-y-4" action="mailto:contact@setara.network" method="POST" encType="text/plain">
              <div>
                <label htmlFor="feedback-name" className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="feedback-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                />
              </div>
              <div>
                <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="feedback-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                />
              </div>
              <div>
                <label htmlFor="feedback-subject" className="block text-sm font-medium text-gray-700">
                  Subject <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="feedback-subject"
                  name="subject"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                />
              </div>
              <div>
                <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <textarea
                  id="feedback-message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E8613C] focus:outline-none focus:ring-2 focus:ring-[#E8613C]/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#E8613C] py-3 text-sm font-semibold text-white transition hover:bg-[#d4542f]"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
