/**
 * Strapi CMS client for blog and pSEO content.
 * Uses Nubo's Strapi instance (public API, no auth required) with Setara-specific content types.
 *
 * Environment variables:
 *   STRAPI_URL       – defaults to https://cms.nubo.email (public, no token needed)
 *   STRAPI_TOKEN     – optional, only if your Strapi instance requires auth
 */

const STRAPI_URL = process.env.STRAPI_URL || "https://cms.nubo.email";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StrapiBlog {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  isPopular?: boolean;
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  blogSection?: {
    blogTitle: string;
    blogDse: string; // markdown body
    blogImage?: { url: string; alternativeText?: string }[];
  }[];
}

export interface StrapiPseoPage {
  id: number;
  slug: string;
  category: "INDUSTRY" | "DOCUMENT" | "CITY" | "COMPARISON" | "GUIDE" | "FAQ_CLUSTER";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introText: string;
  ctaText?: string;
  ctaUrl?: string;
  stats?: { value: string; suffix?: string; label: string }[];
  features?: { title: string; description: string }[];
  comparisonData?: { feature: string; setara: string; competitor: string }[];
  faqs?: { question: string; answer: string }[];
  internalLinks?: { href: string; label: string }[];
}

export interface StrapiGlossaryTerm {
  id: number;
  term: string;
  slug: string;
  definition: string;
  longDescription?: string;
  relatedTerms?: string[];
}

interface StrapiResponse<T> {
  data: (T & { id: number })[] | { id: number; attributes: T }[];
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function headers(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) h["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  return h;
}

/** Normalize Strapi v4 (attributes wrapper) vs v5 (flat) response shapes. */
function normalize<T>(items: StrapiResponse<T>["data"]): T[] {
  return items.map((item) => {
    if ("attributes" in item) {
      return { id: item.id, ...item.attributes } as T;
    }
    return item as T;
  });
}

async function fetchStrapi<T>(path: string, revalidate = 3600): Promise<{ data: T[]; total: number }> {
  const url = `${STRAPI_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate },
    });
    if (!res.ok) {
      console.error(`Strapi fetch failed: ${res.status} ${res.statusText} for ${url}`);
      return { data: [], total: 0 };
    }
    const json: StrapiResponse<T> = await res.json();
    return {
      data: normalize<T>(json.data),
      total: json.meta?.pagination?.total ?? json.data.length,
    };
  } catch (err) {
    console.error(`Strapi fetch error for ${url}:`, err);
    return { data: [], total: 0 };
  }
}

// ---------------------------------------------------------------------------
// Blog API
// ---------------------------------------------------------------------------

export async function fetchBlogs(page = 1, pageSize = 12) {
  return fetchStrapi<StrapiBlog>(
    `/api/setara-blogs?populate=*&sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
}

export async function fetchBlogBySlug(slug: string) {
  const { data } = await fetchStrapi<StrapiBlog>(
    `/api/setara-blogs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=width&populate[image][fields][3]=height&populate[blogSection][populate]=*`
  );
  return data[0] ?? null;
}

export async function fetchAllBlogSlugs() {
  const { data } = await fetchStrapi<Pick<StrapiBlog, "slug">>(
    `/api/setara-blogs?fields[0]=slug&pagination[limit]=2000`
  );
  return data.map((b) => b.slug);
}

export async function fetchBlogSlugsWithDates() {
  const { data } = await fetchStrapi<Pick<StrapiBlog, "slug" | "date">>(
    `/api/setara-blogs?fields[0]=slug&fields[1]=date&sort=date:desc&pagination[limit]=2000`
  );
  return data;
}

// ---------------------------------------------------------------------------
// pSEO API
// ---------------------------------------------------------------------------

export async function fetchPseoPages(category?: string) {
  const filter = category ? `&filters[category][$eq]=${category}` : "";
  return fetchStrapi<StrapiPseoPage>(
    `/api/setara-pseo-pages?populate=*&sort=slug:asc${filter}&pagination[limit]=2000`
  );
}

export async function fetchPseoPageBySlug(slug: string) {
  const { data } = await fetchStrapi<StrapiPseoPage>(
    `/api/setara-pseo-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  return data[0] ?? null;
}

export async function fetchAllPseoSlugs() {
  const { data } = await fetchStrapi<Pick<StrapiPseoPage, "slug" | "category">>(
    `/api/setara-pseo-pages?fields[0]=slug&fields[1]=category&pagination[limit]=2000`
  );
  return data;
}

// ---------------------------------------------------------------------------
// Glossary API
// ---------------------------------------------------------------------------

export async function fetchGlossaryTerms() {
  return fetchStrapi<StrapiGlossaryTerm>(
    `/api/setara-glossary-terms?sort=term:asc&pagination[limit]=500`
  );
}

export async function fetchGlossaryTermBySlug(slug: string) {
  const { data } = await fetchStrapi<StrapiGlossaryTerm>(
    `/api/setara-glossary-terms?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  return data[0] ?? null;
}

export async function fetchAllGlossarySlugs() {
  const { data } = await fetchStrapi<Pick<StrapiGlossaryTerm, "slug">>(
    `/api/setara-glossary-terms?fields[0]=slug&pagination[limit]=500`
  );
  return data.map((t) => t.slug);
}
