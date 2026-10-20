import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");
const slugs = [
  "iot-system-architecture-sensor-gateway-cloud-dashboard",
  "iot-power-management-current-regulator-brownout",
  "iot-sensor-data-quality-timestamp-units-validation",
  "student-iot-security-api-keys-authentication-firebase-rules",
  "outdoor-iot-project-wifi-lora-4g",
  "measurable-electronics-fyp-objectives",
  "electronics-fyp-test-plan-test-cases-acceptance-criteria",
  "electronics-fyp-bill-of-materials-components-alternatives",
  "electronics-project-design-review-before-buying-components",
  "record-experiment-data-iot-final-year-project-report",
  "common-ground-esp32-sensors-relays-motors",
  "pull-up-pull-down-floating-digital-inputs",
  "choose-resistors-led-voltage-divider",
  "decoupling-capacitors-reduce-esp32-resets",
  "multimeter-troubleshooting-electronics-fyp-safely",
];

const titleFiles = new Map();
for (const file of fs.readdirSync(blogDir).filter((name) => name.endsWith(".mdx"))) {
  const { data } = matter(fs.readFileSync(path.join(blogDir, file), "utf8"));
  const key = String(data.title || "").trim().toLowerCase();
  if (!key) continue;
  titleFiles.set(key, [...(titleFiles.get(key) || []), file]);
}

const approvedSource = /\]\(https:\/\/(?:docs\.espressif\.com|www\.nist\.gov|csrc\.nist\.gov|pages\.nist\.gov|itl\.nist\.gov|firebase\.google\.com|lora-alliance\.org|docs\.oasis-open\.org|www\.rfc-editor\.org|www\.ti\.com|software-dl\.ti\.com|www\.fluke\.com)[^)]*\)/g;
const errors = [];

for (const slug of slugs) {
  const file = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    errors.push(`${slug}: missing file`);
    continue;
  }
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const words = content.replace(/\[[^\]]+\]\([^\)]+\)/g, " ").match(/[\p{L}\p{N}]+/gu)?.length || 0;
  const internalLinks = content.match(/\]\(\/(?:blog|components|catalog|topics|tools|contact)[^)]*\)/g) || [];
  const sources = content.match(approvedSource) || [];

  if (!data.title || !data.excerpt || !data.category || !data.date) errors.push(`${slug}: incomplete frontmatter`);
  if (data.language !== "en-MY") errors.push(`${slug}: language must be en-MY`);
  if (data.date !== "2026-10-20") errors.push(`${slug}: publication date must be 2026-10-20`);
  if (words < 650) errors.push(`${slug}: only ${words} words; expected at least 650`);
  if (!content.includes("## Quick Summary")) errors.push(`${slug}: missing Quick Summary`);
  if (!content.includes("## FAQ")) errors.push(`${slug}: missing FAQ`);
  if (!content.includes("## Technical References")) errors.push(`${slug}: missing Technical References`);
  if (internalLinks.length < 3) errors.push(`${slug}: needs at least 3 internal links`);
  if (sources.length < 1) errors.push(`${slug}: needs a primary technical source`);
  if ((titleFiles.get(String(data.title || "").trim().toLowerCase()) || []).length > 1) errors.push(`${slug}: duplicate title`);
}

if (errors.length) {
  console.error(`English blog batch verification failed (${errors.length} issues):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verified ${slugs.length} English articles: complete metadata, 650+ words, unique titles, internal links, FAQs, and primary references.`);
