# Drupal security landing pages implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build two locally reviewable security fundraising landing pages with real team members, sourced evidence, Drupal styling, and a fixed countdown.

**Architecture:** Eleventy generates four static routes from shared content and components. Local CSS supplies the visual system. A small browser module updates the countdown; HTML carries the content and donation links without JavaScript.

**Tech stack:** Node 22.22.1 or later supported LTS, Eleventy 3, JavaScript ES modules, CSS, Node test runner. No application framework, payment backend, or analytics service.

**Spec:** `docs/superpowers/specs/2026-11-25-drupal-security-landing-pages-design.md`, approved November 25, 2026.

## Global constraints

- Routes: `/`, `/security/`, `/people/`, `/sources/`.
- Cloudflare Pages build command `npm run build`, output `_site`. No deployment in this plan.
- Real portraits and verified work attribution. No generated faces or fabricated endorsements.
- Shared fixed illustrative deadline `2026-12-31T23:59:59Z`, displayed with UTC timezone and 'Proposed campaign' label.
- No fabricated progress, donor totals, matches, or deadline consequences.
- Primary recipient is the DA security fund. Direct xjm sponsorship is explicitly separate.
- Content, navigation, source links, absolute deadline, donation links, and FAQs work without JavaScript.
- No analytics, email capture, or payment fields. Preserve the independent-proposal notice.
- Follow Modern Web Guidance search/retrieve before each relevant component implementation. Consulted responsive-design, accessibility, and calculate-event-differentials already; use documented browser fallbacks for Temporal.

## Review focus

- A visitor arrives after expiry with JavaScript unavailable. Deadline-based appeals must not remain active; Task 2 tests generated expired content as well as browser expiry.
- Invalid or incomplete progress configuration must fail the build rather than display plausible fake totals; Task 2 tests each missing provenance field.
- A cached donation description refers to Drupal 7. Record cached/live disagreement and verify the actual recipient and purpose without entering payment data; Task 1 owns the source check.
- A reader interprets xjm's October hours as her current funding after November sponsorship. Task 3 checks historical labelling and the later sponsor reference.
- A portrait fails to load or cannot be reused. The person's name, role, attribution, and official profile remain readable; Task 3 verifies text independently of images.

## File map

- `package.json`, `package-lock.json`, `.eleventy.js`: reproducible build, scripts, Node requirement, asset copying.
- `src/_data/site.js`: independent-proposal identity and metadata.
- `src/content/sources.js`: dated source records and image provenance.
- `src/content/security.js`: advisory metrics, selected monthly data, source IDs.
- `src/content/people.js`: xjm and other verified profiles, portraits, work references, sponsorship destinations.
- `src/content/campaign.js`: fixed deadline, donation URLs, optional disabled progress.
- `src/lib/campaign.js`: campaign validation and rendering state shared by generation and browser code.
- `src/assets/countdown.js`: browser updates and expiry transitions.
- `src/components/`: layout, hero variants, evidence, people, donation, FAQ, and source components. Keep their exports focused on HTML rendering.
- `src/index.11ty.js`, `src/security.11ty.js`, `src/people.11ty.js`, `src/sources.11ty.js`: page composition and permalinks.
- `src/assets/styles.css`, `src/assets/images/`, `src/assets/fonts/`: verified local presentation assets.
- `tests/campaign.test.js`, `tests/site.test.js`, `scripts/check-site.js`: behavior and built-output checks.
- `README.md`, `docs/verification.md`: local setup, Cloudflare settings, findings, and unresolved campaign terms.

## Task 1: Verify evidence and establish the static site

**Files:** package/configuration, shared content files, index route, base layout, asset directories, `tests/site.test.js`.

**Interfaces:** Content exports named `sources`, `metrics`, `monthlyAdvisories`, `people`, and `campaign`. Source records have `id`, `url`, `publishedAt`, `verifiedAt`, and `scope`. Person records have `id`, `name`, `handle`, `role`, `profileUrl`, `workSourceIds`, optional `portrait`, and optional `supportUrl`. Portrait records include local path, source URL, credit, reuse basis, width, height, and alt text. Unavailable portraits have a recorded reason, not a fictitious replacement.

- [x] Inspect current brand typography/colors and public asset terms on new.drupal.org. Inspect official profiles and linked portrait licenses for xjm, Drew Webber, Greg Knaddison, and Michael Hess. Record actual values and findings.
- [x] Verify the DA security-support page links to the chosen checkout. Compare its current rendered text to cached Drupal 7 text. Record any unresolved discrepancy. Check xjm's Patreon destination and November sponsor announcement without submitting forms.
- [x] Write `tests/site.test.js` assertions that all used source IDs resolve, security totals carry the June through October 2026 period, historical hours carry October attribution and a November sponsor source, and person text does not require a portrait.
- [x] Run `node --test tests/site.test.js`. Expect failure because shared content modules do not yet exist.
- [x] Create the shared content and provenance records. Use 256 total, 223 participating, and selected months June 28, September 74, October 106. Do not fill missing months. Put long source excerpts outside product copy; paraphrase and link.
- [x] Add Eleventy 3 with a lockfile, `build`, `dev`, `test`, and `check` scripts. Pin the resolved dependency version. Create the review index and base layout with language, unique titles, skip link, and independent-proposal notice.
- [x] Run `npm test` and `npm run build`. Expect passing data checks and `_site/index.html` with working route links once all routes are built. Until Task 3, route placeholders are explicitly unfinished local development pages.
- [x] Commit the static foundation and verified content.

## Task 2: Implement campaign validation and countdown behavior

**Files:** `src/lib/campaign.js`, `src/content/campaign.js`, `src/components/donation.js`, `src/assets/countdown.js`, `tests/campaign.test.js`.

**Interfaces:** `validateCampaign(config)` returns valid config or throws a descriptive error. `campaignState(config, nowEpochMs)` returns `{expired, remainingSeconds, deadlineISO}`. Both build rendering and browser code consume the same functions. Enabled progress requires `{goal, current, units, sourceUrl, updatedAt}`; goal is positive, current is nonnegative, values finite, units are `donors` or `USD`, URL is HTTPS, and timestamp includes an offset. The default progress is disabled. `renderDonation(campaign, nowEpochMs)` produces HTML with a marked countdown, readable deadline, recipient, and a neutral support link.

- [x] Write tests for deadline `2026-12-31T23:59:59Z`: at 1 second before return 1 second and active, at deadline return 0 and expired, afterward remain expired. Assert invalid/offset-free dates throw, counts never become negative, and repeated calls with the same time yield the same state.
- [x] Test enabled progress with each missing field, nonfinite/negative values, zero goal, invalid URL, and invalid date. Assert rejection. Test disabled progress renders no implied count or goal.
- [x] Test `renderDonation` with an expired clock: no 'give before' appeal or running countdown, an expired notice and ongoing-support link remain. Test the active output includes the full UTC deadline and visible proposed-campaign label.
- [x] Run `node --test tests/campaign.test.js`. Expect failure until the implementation exists.
- [x] Implement validation, state, donation HTML, and browser enhancement. Follow retrieved Temporal guidance with a local conditional polyfill if needed; preserve a native HTML deadline if enhancement cannot load. Recompute from the fixed instant every second, not from decremented local storage or visit time. Keep per-second updates out of live announcements; announce expiry once. Replace deadline-based text on expiry without moving focus.
- [x] Ensure the static HTML uses the generation clock for an already-expired build. For previously generated HTML viewed later without JavaScript, retain only evergreen donation wording around the absolute deadline; do not make an active temporal promise that can become false.
- [x] Run `node --test tests/campaign.test.js`. Expect all boundary, invalid-input, progress, and expiry cases to pass.
- [x] Commit campaign behavior.

## Task 3: Build both complete campaign pages and verify delivery

**Files:** page routes, remaining components, local styles and verified images/fonts, `scripts/check-site.js`, output tests, README, verification record.

**Interfaces:** Page templates consume Task 1 content and Task 2 donation rendering. `renderEvidence(metrics, monthlyAdvisories, sources)` includes labelled zero-baseline bars and an equivalent HTML table. `renderPeople(people, sources)` preserves names and official links when portraits are absent. Pages identify their variant through a stable body data attribute. `check-site.js` checks built internal links/fragments, required local assets, source references, and identical shared deadline/recipient configuration across both campaign pages.

- [x] Extend output checks for both variants, missing local assets, unresolved source IDs, broken fragments, differing deadlines/recipients, portrait-independent names, and historical funding attribution. Use a deliberately broken fixture to establish that link checking catches failures.
- [x] Run the added tests before implementation. Expect failure for incomplete campaign pages and output checks.
- [x] Build the shared Drupal visual system from inspected reference styles. Make the evidence-first and people-first heroes distinct. Compose the agreed narrative, real-member profiles with xjm prominent, sourced results, repeated primary donation links, separate direct sponsorship section, native FAQ disclosures, sources page, and review index.
- [x] Supply all available verified portraits locally with dimensions and credits. Any unavailable portrait remains a documented exception with a truthful text profile and official photo link. Check that logo and font reuse terms are recorded before copying. Avoid CSS that depends on portraits loading.
- [x] Add native semantic landmarks and headings, visible keyboard focus, accessible chart labels/table, compact citations, responsive layouts down to 320 CSS pixels, and reduced-motion support. Avoid sticky elements that hide reading content or focus targets.
- [x] Run `npm test`, `npm run build`, and `npm run check`. Expect all checks passing, all four output routes present, and no broken internal targets or missing local assets.
- [x] Serve and inspect both campaign pages at desktop and mobile widths. Verify tab order, skip link, FAQs, portrait identity/cropping, chart readability, contrast, donation recipient labels, 200% zoom, JavaScript-disabled content, countdown tick and expiry. Use documented browser capabilities; report any check the available browser cannot perform.
- [x] Run available automated accessibility checks and fix actionable issues. Do not claim full accessibility from automated scores.
- [x] Write `README.md` with install/dev/build commands and Cloudflare Pages settings. Document that progress, funding target, and real deadline terms remain unconfirmed. Record source and portrait limitations, verification commands/results, and browser findings in `docs/verification.md`.
- [x] Commit the complete site, obtain whole-change review, address supported findings, and rerun checks affected by fixes.
- [x] Present both local page URLs and a visual preview. Leave deployment for later authorization.

## Plan self-review

The three tasks cover shared evidence, real members and image provenance, campaign behavior, both visual narratives, sources, accessibility, static hosting, and verification. Date and recipient interfaces are shared rather than copied. Each review-focus condition has a check or source-verification step in its owning task. The first deliverable remains a labelled concept; no invented target or funding guarantee is required to finish it.

## Workflow status

- [x] Design approved.
- [x] Implementation plan written and self-reviewed.
- [x] User reviews plan and chooses native or subagent-driven execution.
- [x] Execute tasks and whole-change review.

Completed November 25, 2026. Native execution, eight behavior tests, four generated routes, browser checks, independent review, and the mobile-heading fix are recorded in `docs/verification.md`. The real campaign offer remains unconfirmed as designed.
