# Search Console Index Coverage Triage

Date reviewed: 20 October 2026

## Baseline

Search Console reported **1,160 indexed** URLs and 111 excluded URLs. The excluded total contains both real content pages and URLs that should not be indexed as standalone pages.

| Search Console reason | Count | Decision |
|---|---:|---|
| Alternative page with proper canonical | 14 | Keep when the canonical destination is correct. Do not request indexing. |
| Page with redirect | 10 | Keep when the redirect has one final destination. Do not request indexing. |
| Not found (404) | 2 | Historical `www` examples now redirect to the non-`www` legal pages. Monitor after recrawl. |
| Discovered, currently not indexed | 45 | Prioritise real strategic pages and review content similarity. |
| Crawled, currently not indexed | 40 | Separate content pages from assets, manifest and old host variants. |

## Crawled URLs

The 40 crawled examples contain five generated Open Graph PNG URLs, one web manifest, two historical `www` variants, 19 catalog pages, 13 blog pages and one component page. Open Graph images, the manifest and redirected host variants are not missing articles and should not be forced into the web-page index.

The remaining HTML examples returned HTTP 200 and their current canonical URLs matched the final URL when checked on 20 October 2026. Review these pages by search demand and uniqueness rather than submitting all of them at once.

## Discovered URLs

All **45 discovered** URLs returned HTTP 200, were indexable, used self-referencing canonicals and appeared in the live sitemap. They contained **34 blog posts**, five service pages, three catalog pages, one component page, one topic page and the ESP32 Pinout Tool.

The 34 blog posts used only five distinct heading structures. The closest vocabulary-set comparisons exceeded 0.80 overlap. This is a prioritisation warning, not proof of a penalty. Bulk publishing is paused while each page is assigned a distinct intent and a unique practical contribution.

## Action Order

1. Preserve pages already earning clicks and impressions.
2. Consolidate only the two Search Console-supported overlaps documented in the approved SEO design.
3. Strengthen primary Projek Akhir Tahun, Projek IoT and ESP32 guides with unique decision and validation material.
4. Link strategic tools and services contextually from their owning topic pages.
5. Review the 34 discovered blog posts by intent; retain, substantially differentiate, merge or retire each one based on usefulness.
6. Validate affected Search Console groups only after deployment and a fresh response check.

## What Not to Do

- Do not request indexing for Open Graph image URLs, the web manifest, redirected hosts or intentional canonical alternatives.
- Do not submit every excluded URL manually.
- Do not add sitewide keyword blocks or publish replacement batches before the existing similar pages are resolved.
- Do not change successful URLs merely to insert a broader keyword.
