const fs = require("fs");
const path = require("path");

const baseUrl = "https://angular20-localization.vercel.app";
const pages = [
  { url: "", priority: "1.0", changefreq: "weekly" },
  { url: "/services", priority: "0.8", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
];

const languages = ["en", "de"];

// Generate main sitemap.xml
function generateMainSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${languages
  .map(
    (lang) => `  <sitemap>
    <loc>${baseUrl}/sitemap-${lang}.xml</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  fs.writeFileSync("src/sitemap.xml", xml);
  console.log("✅ Generated sitemap.xml");
}

// Generate language-specific sitemaps
function generateLanguageSitemaps() {
  languages.forEach((lang) => {
    const isDefault = lang === "en";
    const langPrefix = isDefault ? "/en" : `/${lang}`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${langPrefix}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    fs.writeFileSync(`src/sitemap-${lang}.xml`, xml);
    console.log(`✅ Generated sitemap-${lang}.xml`);
  });
}

// Generate robots.txt
function generateRobots() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-en.xml
Sitemap: ${baseUrl}/sitemap-de.xml

# Block access to source maps
Disallow: /*.map$
`;

  fs.writeFileSync("src/robots.txt", robotsTxt);
  console.log("✅ Generated robots.txt");
}

// Ensure dist directory exists
/* if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist", { recursive: true });
} */

// Generate all files
generateMainSitemap();
generateLanguageSitemaps();
generateRobots();

console.log("🎉 All SEO files generated successfully!");
