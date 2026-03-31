interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  id?: string;
}

export default function SectionHeading({ title, subtitle, centered = true, id }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-[#1a1a2e] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-gray-600 leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
