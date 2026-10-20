# SEO Clusters and FYP Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the three evidence-backed SEO overlaps, strengthen their primary pages, and add a deterministic FYP Project Planner that connects students to suitable Rectronx catalog pages.

**Architecture:** Keep blog pages as MDX and use permanent Next.js redirects for the two confirmed merge candidates. Put recommendation classification and scoring in a pure TypeScript module, precompute a compact catalog payload on the server, and render the interactive workflow in a client component without creating indexable result URLs.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, MDX, Node verification scripts, existing Google Analytics helper.

**Spec:** `docs/superpowers/specs/2026-10-20-seo-clusters-and-fyp-planner-design.md`

## Global Constraints

- Preserve successful URLs and distinct language, discipline, location, workflow-stage, hardware-focus, and build-intent pages.
- Redirect only `/blog/projek-akhir-tahun-idea` and `/blog/top-esp32-project-titles-for-fyp-2026`.
- Do not add fabricated prices, ranking promises, runtime AI, bulk articles, a new top-level navigation item, or hundreds of indexable planner-result URLs.
- Keep visible FAQ text identical to FAQ JSON-LD answers.
- Use the existing Rectronx design system, catalog data, analytics helper, and `Tools & Learning` dropdown.
- Keep all user-facing technical statements practical and bounded.

## Review Focus

- No-preference planner input must return a balanced starter set rather than three near-identical IoT titles; Task 2 tests this.
- Strict category input must never leak a project from the other category; Task 2 tests this.
- A sparse preference combination must still return three results and explain broadened matching; Task 2 tests this.
- Near-duplicate titles must not occupy multiple result positions; Task 2 tests this.
- The planner must remain useful and readable at 390px without horizontal overflow; Task 4 browser-checks this.

---

### Task 1: Consolidate Search Intent and Strengthen Primary Pages

**Files:**
- Create: `scripts/verify-seo-cluster-consolidation.mjs`
- Create: `docs/seo/2026-10-20-index-coverage-triage.md`
- Modify: `next.config.mjs`
- Modify: `content/blog/idea-projek-akhir-tahun-2026-malaysia.mdx`
- Modify: `content/blog/projek-iot-malaysia-idea-komponen-dashboard.mdx`
- Modify: `content/blog/esp32-project-ideas.mdx`
- Modify: `content/blog/sistem-pengesanan-jatuh-orang-tua-iot.mdx`
- Modify: `app/topics/[slug]/page.tsx`
- Delete: `content/blog/projek-akhir-tahun-idea.mdx`
- Delete: `content/blog/top-esp32-project-titles-for-fyp-2026.mdx`

**Interfaces:**
- Consumes: existing MDX blog discovery, `next.config.mjs`, topic-hub rendering.
- Produces: two permanent redirect rules; three strengthened primary guides; contextual planner links used by Task 3.

- [ ] **Step 1: Write the failing consolidation verifier**

Create a Node script that asserts both redirects are permanent, removed MDX files no longer exist, no production content links to redirected slugs, all three primary MDX files contain `/tools/fyp-project-planner`, and the index-triage document classifies the Search Console buckets.

- [ ] **Step 2: Run the verifier and confirm RED**

Run: `node scripts/verify-seo-cluster-consolidation.mjs`

Expected: FAIL because redirect rules, planner links, and the triage document do not exist yet.

- [ ] **Step 3: Implement the two merges and primary-page improvements**

Add permanent redirects, move useful title-selection material into the Malay PAT primary page and useful ESP32 title material into the evergreen ESP32 page, expand the Malay IoT page with an architecture table and validation matrix, replace the one stale internal link, add restrained topic-hub planner CTAs, and document the 111 exclusion records without treating non-page URLs as content failures.

- [ ] **Step 4: Run the verifier and confirm GREEN**

Run: `node scripts/verify-seo-cluster-consolidation.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `seo: consolidate primary FYP content clusters`

### Task 2: Build the Deterministic Planner Engine

**Files:**
- Create: `lib/fyp-planner.ts`
- Create: `scripts/test-fyp-project-planner.mjs`

**Interfaces:**
- Consumes: `CatalogProject`, `getCatalogProjectSeo()`, `getProjectLearningLinks()`, and `getCatalogProjectSlug()`.
- Produces: `PlannerPreferences`, `PlannerProject`, `PlannerRecommendation`, `buildPlannerCatalog()`, and `recommendProjects()` for Task 3.

- [ ] **Step 1: Write failing behavior tests**

Test stable ordering, required category filtering, technology/difficulty/duration/outcome scoring, balanced no-preference results, three-result fallback, and near-duplicate suppression using real catalog-shaped objects.

- [ ] **Step 2: Run tests and confirm RED**

Run: `node scripts/test-fyp-project-planner.mjs`

Expected: FAIL because `lib/fyp-planner.ts` does not exist.

- [ ] **Step 3: Implement the pure recommendation engine**

Classify project outcomes from title and tags, derive duration from existing difficulty guidance, score controlled preferences, select varied results using token similarity, and attach three testing priorities plus up to three existing learning links.

- [ ] **Step 4: Run tests and confirm GREEN**

Run: `node scripts/test-fyp-project-planner.mjs`

Expected: PASS with all planner cases.

- [ ] **Step 5: Commit**

Commit message: `feat: add deterministic FYP planner engine`

### Task 3: Build the Planner Page, SEO, Navigation, and Analytics

**Files:**
- Create: `app/tools/fyp-project-planner/page.tsx`
- Create: `app/tools/fyp-project-planner/FypProjectPlanner.tsx`
- Create: `scripts/verify-fyp-project-planner.mjs`
- Modify: `components/Navbar.tsx`
- Modify: `lib/analytics.ts`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `buildPlannerCatalog()` and `recommendProjects()` from Task 2.
- Produces: indexable `/tools/fyp-project-planner`, controlled client interactions, catalog links, learning links, and WhatsApp enquiry links.

- [ ] **Step 1: Write the failing page verifier**

Assert the route files, canonical metadata, breadcrumb schema, WebApplication schema, visible FAQ/schema parity, sitemap entry, navbar submenu item, controlled preference labels, results region, reset control, WhatsApp action, and five analytics event names.

- [ ] **Step 2: Run the verifier and confirm RED**

Run: `node scripts/verify-fyp-project-planner.mjs`

Expected: FAIL because the route does not exist.

- [ ] **Step 3: Implement the server page and interactive client**

Build a responsive light-theme workflow with compact segmented controls, three accessible recommendation cards, broadened-result messaging, reset, direct project and learning links, and WhatsApp context. Add factual supporting copy, visible FAQ, breadcrumb and WebApplication JSON-LD, canonical metadata, sitemap entry, and the `Tools & Learning` submenu link.

- [ ] **Step 4: Run the verifier and confirm GREEN**

Run: `node scripts/verify-fyp-project-planner.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `feat: add FYP project planner`

### Task 4: Integration, Rendering, and Responsive Verification

**Files:**
- Modify as required by verified defects only.

**Interfaces:**
- Consumes: all outputs from Tasks 1-3.
- Produces: deployment-ready branch with verified redirects, rendering, interactions, and indexability.

- [ ] **Step 1: Run static and behavioral verification**

Run: `node scripts/verify-seo-cluster-consolidation.mjs && node scripts/test-fyp-project-planner.mjs && node scripts/verify-fyp-project-planner.mjs && npm run lint && npm run verify:hardening && npm run test:contact`

Expected: all commands PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: build completes and generates `/tools/fyp-project-planner` while removed source slugs are absent from generated blog paths.

- [ ] **Step 3: Run server-backed checks**

Start the production server on an unused port, verify the IoT hub script, confirm both source URLs return one permanent redirect to the intended destinations, and confirm the planner, canonical, sitemap entry, project links, and WhatsApp URL render correctly.

- [ ] **Step 4: Browser-check desktop and mobile**

At desktop and 390px mobile widths, verify no horizontal overflow, readable controls and result cards, keyboard-focusable controls, reset behavior, category filtering, direct project links, and a usable first viewport.

- [ ] **Step 5: Commit verified fixes**

Commit message: `test: verify SEO consolidation and planner flow`
