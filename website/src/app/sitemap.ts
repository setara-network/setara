import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/use-cases";
import { fetchBlogSlugsWithDates, fetchAllPseoSlugs, fetchAllGlossarySlugs } from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://setara.network";
  const lastUpdated = new Date("2026-03-31");

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: lastUpdated, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/use-cases`, lastModified: lastUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/whitepaper`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/capabilities`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/compliance`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/vs-hyperledger`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/register`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/verify`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: lastUpdated, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: lastUpdated, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/build`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/explore`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/docs`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/docs/api`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/docs/build-app`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/docs/run-node`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/docs/errors`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/docs/billing`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/help`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/accessibility`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/screen-reader-access`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/copyright`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/hyperlinking-policy`, lastModified: lastUpdated, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Use case pages (from local data)
  const useCasePages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/use-cases/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog pages (from Strapi — graceful fallback if unavailable)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await fetchBlogSlugsWithDates();
    blogPages = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.date ? new Date(b.date) : lastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Strapi unavailable — skip blog pages
  }

  // pSEO pages (from Strapi)
  let pseoPages: MetadataRoute.Sitemap = [];
  try {
    const pseo = await fetchAllPseoSlugs();
    pseoPages = pseo.map((p) => ({
      url: `${baseUrl}/p/${p.slug}`,
      lastModified: lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Strapi unavailable — skip pSEO pages
  }

  // Glossary pages (from Strapi)
  let glossaryPages: MetadataRoute.Sitemap = [];
  try {
    const terms = await fetchAllGlossarySlugs();
    glossaryPages = terms.map((slug) => ({
      url: `${baseUrl}/glossary/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch {
    // Strapi unavailable — skip glossary pages
  }

  return [...staticPages, ...useCasePages, ...blogPages, ...pseoPages, ...glossaryPages];
}
