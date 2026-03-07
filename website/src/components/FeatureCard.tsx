"use client";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#E8613C]/20">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8613C]/10 text-2xl">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-[#1a1a2e]">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
