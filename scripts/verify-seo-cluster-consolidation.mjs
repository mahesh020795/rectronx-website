import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => readFileSync(path.join(root, relativePath), "utf8");

const config = read("next.config.mjs");
const redirectPairs = [
  ["/blog/projek-akhir-tahun-idea", "/blog/idea-projek-akhir-tahun-2026-malaysia"],
  ["/blog/top-esp32-project-titles-for-fyp-2026", "/blog/esp32-project-ideas"],
];

for (const [source, destination] of redirectPairs) {
  assert.match(config, new RegExp(`source:\\s*["']${source}["']`), `Missing redirect source ${source}`);
  assert.match(config, new RegExp(`destination:\\s*["']${destination}["']`), `Missing redirect destination ${destination}`);
}
assert.equal((config.match(/permanent:\s*true/g) ?? []).length >= 2, true, "Both redirects must be permanent");

for (const removed of [
  "content/blog/projek-akhir-tahun-idea.mdx",
  "content/blog/top-esp32-project-titles-for-fyp-2026.mdx",
]) {
  assert.equal(existsSync(path.join(root, removed)), false, `${removed} should be removed after merging`);
}

const contentFiles = readdirSync(path.join(root, "content", "blog"), { recursive: true })
  .filter((file) => file.endsWith(".mdx"));
for (const file of contentFiles) {
  const body = read(path.join("content", "blog", file));
  assert.doesNotMatch(body, /\/blog\/(projek-akhir-tahun-idea|top-esp32-project-titles-for-fyp-2026)(?:[)#?\s]|$)/, `${file} links to a redirected slug`);
}

for (const primary of [
  "content/blog/idea-projek-akhir-tahun-2026-malaysia.mdx",
  "content/blog/projek-iot-malaysia-idea-komponen-dashboard.mdx",
  "content/blog/esp32-project-ideas.mdx",
]) {
  assert.match(read(primary), /\/tools\/fyp-project-planner/, `${primary} must link to the FYP planner`);
}

const primaryMalay = read("content/blog/idea-projek-akhir-tahun-2026-malaysia.mdx");
for (const unsupportedClaim of [
  "pemeriksa suka skop yang luas",
  "selalu menang dengan pemeriksa",
  "pemeriksa jangkakan",
  "harganya bawah RM20",
]) {
  assert.equal(primaryMalay.includes(unsupportedClaim), false, `Unsupported claim remains: ${unsupportedClaim}`);
}

const triage = read("docs/seo/2026-10-20-index-coverage-triage.md");
for (const required of [
  "1,160 indexed",
  "45 discovered",
  "40 crawled",
  "Open Graph",
  "Do not request indexing",
  "34 blog posts",
]) {
  assert.match(triage, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `Triage is missing: ${required}`);
}

console.log("SEO cluster consolidation verification passed.");
