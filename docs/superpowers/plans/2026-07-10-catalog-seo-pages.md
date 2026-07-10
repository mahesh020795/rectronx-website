# Catalog SEO Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build high-SEO detail pages for every current `/catalog` project title while leaving `/blog` untouched.

**Architecture:** Add catalog helper functions that derive safe project-page content from the existing `data/projects.ts` records. Add one reusable `app/catalog/[slug]/page.tsx` template, update catalog cards to link into detail pages, and include the detail pages in the sitemap.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, existing JSON-LD helpers, existing catalog/component data.

## Global Constraints

- Do not edit `/blog` routes, blog content, or blog metadata.
- Keep the public `500+ FYP Project Titles` catalog positioning because the catalog will expand later.
- Do not publish fixed project prices; use `Depends on scope` and quotation-focused wording.
- Every catalog detail page must have unique metadata, canonical URL, breadcrumb schema, FAQ schema, and a WhatsApp CTA.
- Link known tags to existing `/components/[slug]` component pages when available.

---

### Task 1: Catalog SEO Helpers

**Files:**
- Create: `lib/catalog.ts`

**Interfaces:**
- Consumes: `CatalogProject`, `allCatalogProjects` from `data/projects.ts`; `getComponentByTag` from `lib/components.ts`.
- Produces: `getCatalogProjectSlug(project)`, `getCatalogProjectBySlug(slug)`, `getCatalogProjectSeo(project)`, `getRelatedCatalogProjects(project)`, `catalogWhatsAppLink(project, source)`.

- [ ] Add slug, lookup, derived SEO copy, FAQ, scope, limitations, and related-project helpers.
- [ ] Keep all generated claims conservative and based on project title, category, and tags only.

### Task 2: Catalog Detail Route

**Files:**
- Create: `app/catalog/[slug]/page.tsx`

**Interfaces:**
- Consumes helpers from `lib/catalog.ts`.
- Produces static routes for all current catalog project slugs.

- [ ] Add `generateStaticParams`.
- [ ] Add `generateMetadata` with title, description, canonical, Open Graph, and Twitter metadata.
- [ ] Render hero, snapshot, outcome, how-it-works, components/technologies, scope options, limitations, common mistakes, report guide, upgrades, related projects, FAQ, and CTA.
- [ ] Add breadcrumb and FAQ JSON-LD.

### Task 3: Catalog Card Links

**Files:**
- Modify: `app/catalog/CatalogClient.tsx`

**Interfaces:**
- Consumes `getCatalogProjectSlug(project)`.

- [ ] Add a visible `View Details` link for each catalog card.
- [ ] Keep `Get This Project` WhatsApp CTA.

### Task 4: Sitemap

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes `allCatalogProjects` and `getCatalogProjectSlug`.

- [ ] Add `/catalog/[slug]` entries for every current catalog project.
- [ ] Use monthly change frequency and safe priority below the main catalog page.

### Task 5: Verification

**Files:**
- No source changes.

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Confirm the build includes `/catalog/[slug]` pages and `/blog` remains untouched.
