import fs from "fs";
import path from "path";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const catalogLib = read("lib/catalog.ts");
const catalogPage = read("app/catalog/[slug]/page.tsx");
const componentsLib = read("lib/components.ts");
const componentPage = read("app/components/[slug]/page.tsx");
const sitemap = read("app/sitemap.ts");

assert(
  catalogLib.includes("getProjectLearningLinks"),
  "lib/catalog.ts must expose getProjectLearningLinks for project-to-blog/tool internal links."
);

assert(
  catalogPage.includes("Learning Resources"),
  "Catalog detail pages must render a Learning Resources section."
);

assert(
  catalogLib.includes("/tools/esp32-pinout"),
  "ESP32 projects must have a direct internal link to the ESP32 Pinout Tool."
);

assert(
  componentsLib.includes("getComponentCategoryBySlug"),
  "lib/components.ts must expose getComponentCategoryBySlug for /components/sensors style hubs."
);

assert(
  componentPage.includes("ComponentCategoryHub") && componentPage.includes("getComponentsByCategory"),
  "Component slug route must render category hub pages for component category slugs."
);

assert(
  sitemap.includes("componentCategoryPages"),
  "Sitemap must include component category hub pages."
);

console.log("SEO link structure checks passed.");
