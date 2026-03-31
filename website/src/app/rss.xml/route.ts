import { fetchBlogs } from "@/lib/strapi";

export async function GET() {
  const baseUrl = "https://setara.network";
  const { data: blogs } = await fetchBlogs(1, 50);

  const items = blogs
    .map(
      (blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${baseUrl}/blog/${blog.slug}</link>
      <description><![CDATA[${blog.description}]]></description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${blog.slug}</guid>
      <category>${blog.category}</category>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Setara Network Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on blockchain document verification, Cosmos SDK development, and trust infrastructure in India.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
