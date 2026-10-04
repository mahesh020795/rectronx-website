import assert from "node:assert/strict";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const response = await fetch(`${baseUrl}/topics/iot`);

assert.equal(response.status, 200, "IoT topic hub must return HTTP 200");

const html = await response.text();

assert.match(
  html,
  /<title>Projek IoT Malaysia: Idea ESP32, Arduino &amp; Sistem Pintar<\/title>/,
  "The broad IoT hub needs a concise Malay-first search title",
);
assert.match(
  html,
  /<h1[^>]*>\s*Projek IoT Malaysia untuk Projek Akhir Tahun\s*<\/h1>/,
  "The visible H1 must clearly target Projek IoT Malaysia",
);
assert.match(html, /Idea Projek Smart Mengikut Kategori/, "The hub must cover projek smart intent");
assert.match(html, /Cara Sistem IoT Berfungsi/, "The hub must explain the IoT workflow");
assert.match(html, /Cara Uji Projek IoT/, "The hub must include a practical testing section");
assert.match(html, /Kesilapan Biasa Projek IoT/, "The hub must include common mistakes");
assert.match(html, /Soalan Lazim Projek IoT/, "FAQ schema content must also be visible to users");
assert.match(html, /Apa beza projek smart dengan projek IoT\?/, "The visible FAQ must cover smart-project intent");
assert.equal(
  (html.match(/data-project-group=/g) ?? []).length,
  6,
  "The hub must balance ideas across six project categories",
);
assert.equal(
  (html.match(/data-curated-project="true"/g) ?? []).length,
  36,
  "The hub must show exactly 36 curated project links",
);
assert.match(html, /Contoh Produk &amp; Sistem Rectronx/, "Product evidence must use neutral, supportable wording");
for (const productPath of [
  "/products/smart-parking",
  "/products/smart-plant-monitor",
  "/products/fleet-tracking",
  "/products/attendance-access-control",
]) {
  assert.match(html, new RegExp(`href="${productPath}"`), `The hub must link to ${productPath}`);
}
assert.match(
  html,
  /href="\/services\/iot-project-malaysia"[^>]*>Bantuan membina projek IoT di Malaysia<\/a>/,
  "The hub must separate the service intent with descriptive anchor text",
);
assert.match(
  html,
  /<link rel="canonical" href="https:\/\/rectronx\.com\/topics\/iot"/,
  "The hub must keep its self-referencing canonical",
);

for (const blogPath of [
  "/blog/projek-iot-malaysia-idea-komponen-dashboard",
  "/blog/top-10-iot-projects-malaysia-fyp",
]) {
  const blogResponse = await fetch(`${baseUrl}${blogPath}`);
  assert.equal(blogResponse.status, 200, `${blogPath} must return HTTP 200`);
  const blogHtml = await blogResponse.text();
  assert.match(
    blogHtml,
    /href="\/topics\/iot"/,
    `${blogPath} must link contextually to the broad IoT hub`,
  );
}

console.log("Verified the rendered Projek IoT topic hub.");
