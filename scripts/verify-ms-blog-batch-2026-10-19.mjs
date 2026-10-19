import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");
const slugs = [
  "seni-bina-projek-iot-sensor-gateway-cloud-dashboard",
  "pengurusan-kuasa-projek-iot-kira-arus-regulator-brownout",
  "data-sensor-iot-timestamp-unit-validasi",
  "keselamatan-projek-iot-api-key-authentication-firebase-rules",
  "projek-iot-luar-bangunan-wifi-lora-4g",
  "objektif-projek-akhir-tahun-elektronik-boleh-diukur",
  "pelan-ujian-projek-akhir-tahun-elektronik",
  "bill-of-materials-projek-akhir-tahun-elektronik",
  "design-review-projek-elektronik-sebelum-beli-komponen",
  "rekod-data-eksperimen-laporan-projek-akhir-tahun-iot",
  "common-ground-esp32-sensor-relay-motor",
  "pull-up-pull-down-floating-input-elektronik",
  "pilih-resistor-led-pembahagi-voltan-elektronik",
  "kapasitor-decoupling-kurangkan-reset-esp32",
  "guna-multimeter-troubleshooting-projek-elektronik-fyp",
];

const allTitles = new Map();
for (const file of fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"))) {
  const parsed = matter(fs.readFileSync(path.join(blogDir, file), "utf8"));
  const title = String(parsed.data.title || "").trim().toLowerCase();
  if (!title) continue;
  const files = allTitles.get(title) || [];
  files.push(file);
  allTitles.set(title, files);
}

const errors = [];
for (const slug of slugs) {
  const file = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    errors.push(`${slug}: missing file`);
    continue;
  }

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const words = content.replace(/\[[^\]]+\]\([^\)]+\)/g, " ").match(/[\p{L}\p{N}]+/gu)?.length || 0;
  const internalLinks = content.match(/\]\(\/(?:blog|components|catalog|topics|tools|contact)[^)]*\)/g) || [];
  const externalLinks = content.match(/\]\(https:\/\/(?:docs\.espressif\.com|www\.nist\.gov|csrc\.nist\.gov|pages\.nist\.gov|itl\.nist\.gov|firebase\.google\.com|lora-alliance\.org|docs\.oasis-open\.org|www\.rfc-editor\.org|www\.ti\.com|software-dl\.ti\.com|www\.fluke\.com)[^)]*\)/g) || [];

  if (!data.title || !data.excerpt || !data.category || !data.date) errors.push(`${slug}: incomplete frontmatter`);
  if (data.language !== "ms-MY") errors.push(`${slug}: language must be ms-MY`);
  if (data.date !== "2026-10-19") errors.push(`${slug}: date must reflect the publication date`);
  if (words < 650) errors.push(`${slug}: only ${words} words; expected at least 650`);
  if (!content.includes("## Ringkasan Pantas")) errors.push(`${slug}: missing Ringkasan Pantas`);
  if (!content.includes("## FAQ")) errors.push(`${slug}: missing FAQ`);
  if (!content.includes("## Rujukan Teknikal")) errors.push(`${slug}: missing Rujukan Teknikal`);
  if (internalLinks.length < 3) errors.push(`${slug}: needs at least 3 internal links`);
  if (externalLinks.length < 1) errors.push(`${slug}: needs at least 1 approved primary technical source`);
  if ((allTitles.get(String(data.title || "").trim().toLowerCase()) || []).length > 1) errors.push(`${slug}: duplicate title`);
}

if (errors.length) {
  console.error(`Malay blog batch verification failed (${errors.length} issues):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verified ${slugs.length} Malay articles: complete metadata, 650+ words, unique titles, internal links, FAQs, and primary technical references.`);
