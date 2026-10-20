# Rectronx SEO Clusters and FYP Planner Design

## Objective

Increase qualified organic traffic without adding another large batch of overlapping articles. The work will use actual Google Search Console evidence to assign one primary page to each important search intent, preserve genuinely distinct supporting pages, and add a deterministic FYP Project Planner that turns the existing project catalog into a useful student tool.

## Scope

This programme covers four connected deliverables:

1. Preserve the complete available Search Console baseline.
2. Assign keyword ownership and identify pages competing for the same intent.
3. Consolidate the Projek Akhir Tahun, Projek IoT, and ESP32 FYP clusters conservatively.
4. Build `/tools/fyp-project-planner` and connect it to the existing catalog, learning content, and contact journey.

It does not include bulk blog creation, a new main navigation category, paid advertising, fabricated pricing, AI-generated recommendations at runtime, or mass deletion of indexed pages.

## Measured Baseline

Search Console was exported on 20 October 2026 with the `Last 16 months` setting. Rectronx only has recorded data from 13 June 2026 to 17 October 2026, so that period is the complete available history.

- Total clicks: 786
- Total impressions: 22,844
- Average CTR: 3.4%
- Average position: 9.5
- Indexed pages shown on the Search Console overview: 1,160
- Not-indexed pages shown on the Search Console overview: 111
- Country leader: Malaysia with 581 clicks and 7,334 impressions
- Device split: mobile 418 clicks; desktop 355 clicks; tablet 13 clicks

The repository currently contains 375 blog posts and 781 catalog project titles. A title-level similarity check found 19 pairs with Jaccard similarity of at least 0.60 after removing broad stop terms. Similar titles are a review signal, not proof of cannibalisation; Search Console query-to-page evidence controls consolidation decisions.

## Search Console Findings

### Projek Akhir Tahun

The broad cluster regex produced 327 impressions and 21 clicks across 37 pages. Most of those pages serve valid narrower intents such as mechanical engineering, proposal planning, timelines, and institution-specific ideas.

The exact query `projek akhir tahun` produced 31 impressions, one click, 3.2% CTR, and average position 4.1. Four pages appeared:

1. `/blog/idea-projek-akhir-tahun-2026-malaysia`: 24 impressions, one click
2. `/blog/projek-akhir-tahun-panduan-lengkap-pelajar-malaysia`: six impressions
3. `/blog/projek-akhir-tahun-idea`: one impression
4. `/topics/projek-akhir-tahun`: one impression

This is a contained ownership problem. The primary idea page already wins most impressions, while the guide and topic hub can serve different purposes after their intent is made explicit.

### Projek IoT

The project-intent regex produced 29 impressions and three clicks across ten pages. The exact query `projek iot` produced 14 impressions, two clicks, 14.3% CTR, and average position 6.2.

The exact query currently lands mostly on `/blog/idea-projek-akhir-tahun-2026-malaysia` with 12 impressions. The dedicated `/blog/projek-iot-malaysia-idea-komponen-dashboard` page did not appear for that exact query in the exported period. This means the dedicated page needs stronger content and internal ownership signals; the successful broad FYP page should remain live and link to it.

### ESP32 FYP

The ESP32 project-intent regex produced 30 impressions and one click across six pages. The exact query `esp32 project ideas 2026` produced two impressions split equally between:

- `/blog/esp32-project-ideas`
- `/blog/top-esp32-project-titles-for-fyp-2026`

The evergreen page is longer and structurally stronger. The dated title page is thin and overlaps the same intent, so it is the clearest supported merge candidate.

## Keyword Ownership Map

| Intent | Primary page | Supporting pages | Required action |
| --- | --- | --- | --- |
| Projek Akhir Tahun ideas | `/blog/idea-projek-akhir-tahun-2026-malaysia` | discipline, region, budget, and institution-specific pages | Keep as the Malay ideas authority and add curated links to narrower guides |
| How to plan a Projek Akhir Tahun | `/blog/projek-akhir-tahun-panduan-lengkap-pelajar-malaysia` | proposal, Gantt chart, testing, and viva guides | Retain as a process guide; rewrite title, introduction, and anchors so it does not present itself as the main ideas list |
| Old broad Projek Akhir Tahun ideas | `/blog/projek-akhir-tahun-idea` | none | Merge unique useful sections into the primary Malay ideas page, then issue a permanent redirect |
| English FYP ideas | `/blog/fyp-project-ideas-2026-malaysia` | English discipline-specific pages | Keep separate by language; pair with the Malay ideas page only after reciprocal language metadata is implemented |
| Projek IoT in Malay | `/blog/projek-iot-malaysia-idea-komponen-dashboard` | budget, testing, dashboard, and individual build guides | Expand into the primary Malay IoT guide and point relevant broad pages to it |
| English IoT ideas | `/blog/iot-project-ideas-2025` | English IoT build guides | Keep the existing URL because it already has visibility; update stale title/content without changing the slug |
| IoT topic directory | `/topics/iot` | all IoT guides, components, projects, and tools | Keep as a navigational hub, not the main informational article |
| ESP32 project ideas | `/blog/esp32-project-ideas` | ESP32-CAM, sensor, pinout, and comparison guides | Expand as the evergreen English authority page |
| Dated ESP32 FYP titles | `/blog/top-esp32-project-titles-for-fyp-2026` | none | Merge unique title suggestions into the evergreen page, then issue a permanent redirect |
| ESP32-CAM projects | `/blog/esp32-cam-projects-that-are-realistic-for-students` | camera and AI implementation guides | Keep because camera projects are a distinct intent |
| Malay ESP32 project titles | `/blog/tajuk-projek-esp32-terbaik-untuk-pat-2026` | Malay ESP32 guides | Keep by language; add reciprocal `hreflang` only after its content is equivalent to the English primary page |

## Consolidation Rules

- Do not redirect a page merely because its title contains the same broad keyword.
- Preserve pages with a distinct language, discipline, location, workflow stage, hardware focus, or build intent.
- Before redirecting, move any unique and accurate material into the selected primary page.
- Use permanent Next.js redirects for confirmed merge candidates.
- Remove redirected slugs from generated blog output and sitemap naturally by removing their MDX files after content transfer.
- Replace internal links to redirected URLs with direct links to the destination; do not rely on redirect chains.
- Use descriptive anchors that match the destination's purpose.
- Keep page titles factual. Avoid unsupported terms such as `best`, `impress your examiner`, fixed cost promises, and claims about what examiners universally prefer.
- Technical claims must be checked against official documentation or a clearly named primary source.
- Do not add FAQ structured data unless the same questions and answers are visible on the page.

## FYP Project Planner

### Placement

- URL: `/tools/fyp-project-planner`
- Navigation: one item inside the existing `Tools & Learning` dropdown
- Dropdown label: `FYP Project Planner`
- Description: `Match projects to your scope`
- No new top-level navigation item and no `/tools` index page

### User Inputs

The planner will ask only questions supported by existing structured data or deterministic classification:

- Project category: IoT and embedded, software and AI, or either
- Preferred platform or technology: ESP32, Arduino, Raspberry Pi, Python, PHP, AI/ML, RFID, GSM, GPS, or no preference
- Difficulty: beginner, intermediate, advanced, or no preference
- Available duration: 2-4, 4-8, or 8-12 weeks
- Preferred outcome: monitoring, alerting, automation, tracking, access control, dashboard, computer vision, or application workflow

The first release will not ask for a monetary budget because the catalog does not contain verified component prices. It will describe cost drivers without presenting fabricated RM totals.

### Recommendation Engine

Recommendations will be calculated locally from `allCatalogProjects`, project tags, category, and the existing `getCatalogProjectSeo()` difficulty and time guidance.

The scoring order is:

1. Reject projects outside a required category.
2. Add points for a requested platform or technology match.
3. Add points for outcome-tag and title matches.
4. Add points for matching difficulty and duration.
5. Prefer varied results by avoiding three near-identical titles.
6. Use project ID only as a stable tie-breaker.

The output will show three recommendations. Each recommendation includes:

- Project title linked to its existing catalog detail page
- Why it matches the selected scope
- Difficulty and realistic time guidance
- Core technologies already present in the project data
- Expected demonstrable outcome
- First three testing priorities
- Relevant learning links from `getProjectLearningLinks()`
- A WhatsApp action carrying the selected title and planner context

The planner will not claim that a result is guaranteed to score well, be commercially ready, or fit a fixed budget.

### Page Content and SEO

The server-rendered page will contain useful content even before JavaScript interaction:

- Clear H1 and concise explanation
- How to choose an achievable FYP
- What the planner evaluates
- Scope and cost limitations
- Visible FAQ
- Links to the catalog, Projek Akhir Tahun guide, Projek IoT guide, ESP32 ideas, and ESP32 Pinout Tool
- Breadcrumb schema
- WebApplication schema describing the actual interactive tool
- FAQ schema matching the visible FAQ exactly
- Canonical URL and sitemap entry

Recommendation combinations will remain client state and will not create hundreds of thin indexable URLs.

### Analytics

Use the existing analytics helper to record anonymous interaction events only:

- planner started
- planner completed
- recommendation opened
- learning link opened
- WhatsApp enquiry opened

Do not send free-text user input because the first release uses controlled selections only.

## Information Architecture

The intended journey is:

`Topic or blog landing page -> FYP Project Planner -> catalog project detail -> component/tool/guide -> contact`

The planner supplements the catalog rather than replacing it. Topic hubs remain directories. Blog posts retain informational intent. Catalog detail pages remain the canonical destination for individual project titles.

## Error and Empty States

- With no preferences selected, show a balanced starter set rather than an error.
- If strict filters return fewer than three projects, relax only optional outcome matching and explain that the results were broadened.
- Never return an empty page when projects exist in the selected category.
- Keep all results usable without a WhatsApp action.
- Provide a reset control that restores the initial state.

## Verification

- Add focused deterministic checks for scoring, stable ordering, category exclusion, difficulty matching, and fallback behaviour.
- Add a verification script for redirect destinations, internal links, canonical URLs, sitemap inclusion, and visible FAQ/schema parity.
- Run `npm run lint`.
- Run `npm run build`.
- Run existing hardening and IoT hub verification scripts.
- Browser-test the planner on desktop and mobile.
- Confirm keyboard operation, labels, focus order, empty/fallback states, project links, learning links, reset, and WhatsApp URL.
- Confirm the two merged source URLs return one permanent redirect each and no redirect chain.
- Confirm unchanged supporting pages remain indexable.

## Success Measurement

Use Search Console comparisons after release, allowing enough time for recrawl and normal ranking volatility.

- Non-brand clicks and impressions to the three target clusters
- CTR and average position for exact primary queries
- Number of queries where two Rectronx pages compete for the same exact intent
- Planner sessions, completion rate, project-detail clicks, and WhatsApp enquiries
- Indexed destination URLs and Google-selected canonicals

No traffic or ranking increase is guaranteed. The decision to expand the approach will be based on measured Search Console and analytics results, not publication volume.
