# Rectronx Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an SEO-focused electronics component database to Rectronx that drives student traffic into FYP WhatsApp leads.

**Architecture:** Store the first component set as typed local data, render a searchable directory at `/components`, and generate static SEO pages at `/components/[slug]`. Component pages link into existing catalog/blog content and expose optional marketplace fields without displaying a shop.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, existing JSON-LD helpers, existing WhatsApp analytics.

## Global Constraints

- Do not add marketplace checkout, login, reviews, 3D viewer, or database migrations in the MVP.
- Use structured TypeScript data, matching the current `data/projects.ts` pattern.
- Add sitemap entries for every component page.
- Add metadata, canonical URLs, breadcrumbs, and article-style JSON-LD for component detail pages.
- Use WhatsApp CTAs for lead conversion.

---

### Task 1: Component Data And Helpers

**Files:**
- Create: `data/components.ts`
- Create: `lib/components.ts`
- Modify: `lib/schema.ts`

**Deliverable:** Typed component records, lookup helpers, related project matching, and schema helpers.

### Task 2: Component Directory

**Files:**
- Create: `app/components/page.tsx`
- Create: `app/components/ComponentsClient.tsx`

**Deliverable:** Searchable/filterable directory with category cards, component cards, and WhatsApp CTA.

### Task 3: Component Detail Pages

**Files:**
- Create: `app/components/[slug]/page.tsx`

**Deliverable:** Static component pages with specs, pinout, wiring, code, mistakes, use cases, alternatives, related projects, FAQ, metadata, and JSON-LD.

### Task 4: Site Integration

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/catalog/CatalogClient.tsx`

**Deliverable:** Components nav link, sitemap URLs, and project tag links to matching component pages.

### Task 5: Verification

**Commands:**
- `npm run lint`
- `npm run build`

**Deliverable:** Confirm the app compiles and component routes are generated successfully.
