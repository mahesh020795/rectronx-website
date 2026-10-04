import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const schema = read("lib/schema.ts");
const footer = read("components/Footer.tsx");
const contactRoute = read("app/api/contact/route.ts");
const contactPage = read("app/contact/page.tsx");
const contactSecurity = read("lib/contact-security.ts");
const componentClient = read("app/components/ComponentsClient.tsx");
const componentPage = read("app/components/[slug]/page.tsx");
const componentsPage = read("app/components/ComponentsClient.tsx");
const catalogClient = read("app/catalog/CatalogClient.tsx");
const blogClient = read("app/blog/BlogClient.tsx");
const blogPage = read("app/blog/[slug]/page.tsx");
const blogLibrary = read("lib/blog.ts");
const packageJson = JSON.parse(read("package.json"));

check(exists("app/privacy/page.tsx"), "Privacy page is missing");
check(exists("app/terms/page.tsx"), "Terms page is missing");
check(exists("proxy.ts"), "Canonical host proxy is missing");
check(footer.includes('href: "/privacy"') && footer.includes('href: "/terms"'), "Legal links are missing from the footer");

check(!schema.includes("aggregateRating"), "Self-serving aggregate rating remains in business schema");
check(!schema.includes('contactOption: "TollFree"'), "Mobile number is incorrectly marked toll-free");
check(!schema.includes('"Saturday"'), "Schema hours still conflict with visible Monday-Friday hours");

check(!componentClient.includes("component.rating"), "Component list still displays unsupported ratings");
check(!componentPage.includes("component.rating"), "Component page still displays unsupported ratings");
check(componentPage.includes("Connection overview"), "Generated component connection data is still presented as an exact pinout");
check(componentsPage.includes("/components/${item.slug}"), "Component category hubs are not crawlably linked");

check(catalogClient.includes("visibleCount"), "Catalog still renders every result at once");
check(!schema.includes('"@type": "SearchAction"'), "Obsolete sitelinks SearchAction remains in WebSite schema");
check(blogClient.includes("visibleCount"), "Blog still renders every article card at once");
check(blogClient.includes("Load more"), "Blog has no progressive article loading control");

check(contactRoute.includes("validateContactSubmission"), "Contact API does not use centralized validation");
check(contactRoute.includes("escapeHtml"), "Contact API does not escape user-controlled HTML");
check(contactRoute.includes("isRateLimited"), "Contact API has no rate-limit guard");
check(contactPage.includes('name="website"') && contactSecurity.includes("value.website"), "Contact form has no bot honeypot handling");

check(blogPage.includes("getShareLinks"), "Blog share controls are still non-functional");
check(blogLibrary.includes("language:"), "Blog records do not expose document language");
check(schema.includes("inLanguage: post.language"), "Article schema does not use the article language");

const forbiddenLinks = [
  "/topics/ai\"",
  "/topics/web-development",
  "/blog/iot-water-monitoring-project-esp32-dht11",
  "/blog/lcd-16x2-i2c",
];

for (const file of walk(path.join(root, "app"), path.join(root, "components"), path.join(root, "content"), path.join(root, "data"), path.join(root, "lib"))) {
  if (!/\.(?:ts|tsx|mdx)$/.test(file)) continue;
  const source = fs.readFileSync(file, "utf8");
  for (const badLink of forbiddenLinks) {
    check(!source.includes(badLink), `Broken internal link ${badLink} remains in ${path.relative(root, file)}`);
  }
}

for (const file of fs.readdirSync(path.join(root, "content/blog")).filter((name) => name.endsWith(".mdx"))) {
  const source = read(`content/blog/${file}`);
  const body = source.replace(/^---[\s\S]*?---\s*/, "");
  const withoutFences = body.replace(/```[\s\S]*?```/g, "");
  check(!/^#\s+/m.test(withoutFences), `Blog body contains a second H1: ${file}`);
}

const nextVersion = packageJson.dependencies?.next ?? "0.0.0";
check(compareVersions(nextVersion.replace(/^[^0-9]*/, ""), "16.3.8") >= 0, `Next.js ${nextVersion} is below the audited security baseline 16.3.8`);

const nextConfig = read("next.config.mjs");
for (const header of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
  check(nextConfig.includes(header), `Security header is missing: ${header}`);
}

if (failures.length) {
  console.error(`Site hardening verification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Site hardening verification passed.");

function walk(...roots) {
  const files = [];
  for (const current of roots) {
    if (!fs.existsSync(current)) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) files.push(...walk(fullPath));
      else files.push(fullPath);
    }
  }
  return files;
}

function compareVersions(left, right) {
  const a = left.split(".").map(Number);
  const b = right.split(".").map(Number);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const delta = (a[index] ?? 0) - (b[index] ?? 0);
    if (delta) return delta;
  }
  return 0;
}
