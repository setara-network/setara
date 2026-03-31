import Link from "next/link";

interface PolicyPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyPage({ title, lastUpdated, children }: PolicyPageProps) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb - GIGW requirement */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#E8613C] transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#1a1a2e] font-medium">{title}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-[#1a1a2e] sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>

        <div className="mt-10 prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1a1a2e] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#1a1a2e] [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-[#E8613C] [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
