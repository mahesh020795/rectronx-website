import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => readFileSync(path.join(root, relativePath), "utf8");
const pagePath = "app/tools/fyp-project-planner/page.tsx";
const clientPath = "app/tools/fyp-project-planner/FypProjectPlanner.tsx";

assert.equal(existsSync(path.join(root, pagePath)), true, "Planner server page is missing");
assert.equal(existsSync(path.join(root, clientPath)), true, "Planner client component is missing");

const page = read(pagePath);
const client = read(clientPath);
const nav = read("components/Navbar.tsx");
const sitemap = read("app/sitemap.ts");
const analytics = read("lib/analytics.ts");

assert.match(page, /alternates:\s*\{\s*canonical:\s*["']\/tools\/fyp-project-planner["']/, "Canonical metadata is missing");
assert.match(page, /breadcrumbSchema\(/, "Breadcrumb schema is missing");
assert.match(page, /"@type":\s*"WebApplication"/, "WebApplication schema is missing");
assert.match(page, /faqSchema\(plannerFaqs\)/, "FAQ schema must use the visible FAQ source");
assert.match(page, /plannerFaqs\.map/, "FAQ answers must be visibly rendered from the schema source");
assert.match(page, /Quick Summary/, "Supporting summary content is missing");
assert.match(page, /No fixed price/, "The page must state its cost limitation");

for (const label of ["Category", "Technology", "Difficulty", "Available duration", "Preferred outcome"]) {
  assert.match(client, new RegExp(label, "i"), `Missing planner control: ${label}`);
}
assert.match(client, /aria-live=["']polite["']/, "Results need an accessible live region");
assert.match(client, /Reset/, "Reset control is missing");
assert.match(client, /\/catalog\//, "Recommendations must link to catalog details");
assert.match(client, /wa\.me\/60148600454/, "Planner WhatsApp action is missing");
assert.match(client, /broadened/i, "Planner must explain broadened matches");
assert.match(client, /change one of those selections/, "Planner must distinguish full scope relaxation");
assert.match(client, /project\.tags\.slice\(0, 3\)/, "Recommendation cards must show core technology tags");

assert.doesNotMatch(page, /timeRequired:\s*seo\.timeRequired/, "Repeated time guidance must not be serialized per project");
assert.doesNotMatch(page, /testingPriorities:\s*seo\.testingPlan/, "Repeated testing guidance must not be serialized per project");
assert.doesNotMatch(page, /learningLinks:\s*getProjectLearningLinks/, "Repeated learning links must not be serialized per project");

assert.match(nav, /href:\s*["']\/tools\/fyp-project-planner["']/, "Navbar submenu link is missing");
assert.match(nav, /Match projects to your scope/, "Navbar planner description is missing");
assert.match(sitemap, /\/tools\/fyp-project-planner/, "Sitemap planner entry is missing");

for (const event of [
  "planner_started",
  "planner_completed",
  "recommendation_opened",
  "learning_link_opened",
  "whatsapp_enquiry_opened",
]) {
  assert.match(analytics, new RegExp(event), `Missing analytics event: ${event}`);
}

console.log("FYP project planner page verification passed.");
