# Drupal security fundraising landing pages

Date: 2026-11-25
Status: Approved by the user on 2026-11-25. Local implementation and review completed on 2026-11-25.

## Intent

Build a family of persuasive donation landing pages for developers, site builders, and small businesses that earn money with Drupal. Use the visual style of new.drupal.org. Build for Cloudflare Pages, independent of Drupal installation or Association adoption. The first deliverable is a locally reviewable site ready for a later Cloudflare deployment.

Developers recognize the disruption of testing and installing urgent updates. Connect that experience to the people who investigate reports, write and review patches, coordinate disclosures, and create releases. Use documented workload, results, and funding constraints to make the ask concrete.

The user wants urgency, a concrete deadline, a countdown that updates every second, visible stakes, hard facts, real team members, and multiple pages. Fear of losing security capacity is part of the argument. Claims about what happens without funding must reflect published evidence rather than invented release cancellations.

## Approaches

We explored an evidence-first page and a people-first page in the visual companion. The user selected both and explicitly welcomed multiple pages.

The evidence-first opening makes the workload increase immediately visible. The people-first opening makes the maintainers and their work tangible before presenting the trend. Neither replaces the other. Both share evidence, people, funding, and campaign components so future pages do not duplicate facts and behavior.

Builder proposal: use Eleventy with JavaScript templates, shared data, CSS, and a small client-side countdown module. It produces static files for Cloudflare Pages without a frontend application runtime. Individual handwritten pages would be easy initially but duplicate campaign logic and sources. An application framework adds little to these content-led pages. Eleventy is an implementation recommendation, not a preference the user previously stated.

## Initial pages

- `/`: a compact concept index linking to the page variants, with a clear independent-proposal label. This is a review tool rather than a fundraising homepage.
- `/security/`: evidence-first campaign. Open with AI-assisted discovery and the human work required to deliver fixes. Show the documented increase, then the team and funded results.
- `/people/`: people-first campaign. Feature Jess, known as xjm, then other verified members. Connect specific responsibilities to the security response and funding need.
- `/sources/`: source notes for facts, photographs, dates, attribution, and campaign assumptions.

Each campaign page is independently understandable and has one primary DA security-fund action. A clearly separate section links to direct maintainer sponsorship, including xjm's Patreon. An Association contribution does not imply money goes directly to any featured person. These links are secondary on the DA campaign pages. Future direct-sponsorship campaign pages can change the primary recipient explicitly.

## Narrative and content

1. Recognize the visitor's update workload without inventing hours, financial losses, or personal testimonials.
2. Show dated evidence that AI-assisted discovery has increased reported issues and disclosure workload. More advisories do not by themselves mean Drupal's code became less secure. Attribute OpenAI, Trail of Bits, Anthropic, and Alpha-Omega only to the activities documented in sources.
3. Explain investigation, triage, patching, review, and release work in concrete language.
4. Introduce actual Security Team members with portraits, names, roles, profile links, and specific credited work. Start with xjm, Drew Webber, Greg Knaddison, and Michael Hess; verify each against the current roster and profiles during implementation. Include the broader volunteer team through a roster link.
5. Present funded results and capacity constraints, with compact citations near claims.
6. Ask for support, repeat the donation action after substantive sections, answer recipient and campaign questions, and finish with the same primary action.

No invented quotes, donors, matching sponsors, impact-per-dollar claims, promised benefits, or claims of guaranteed site protection. No implication that donating replaces installing updates.

## Evidence available

These are source-reported figures, not a new independent statistical study. Keep dates and scope attached. Maintain structured records with value, period, source URL, publication date, and verification date.

- The DA's October 29 report records 256 core and contributed-project advisories in June through October 2026, compared with 250 in the preceding 30 months. It records 223 advisories with participation from SEIR team members. Participation is not sole authorship or proof that the grant alone caused every result.
- The same report lists selected monthly counts of 28 in June, 74 in September, and 106 in October. Do not invent July or August values. Show selected-month bars with explicit month labels, or obtain the complete monthly dataset before drawing a continuous monthly trend. Supply an equivalent HTML data table and a zero baseline for bars.
- The November 2 PSA announces reduced minor-version security overlap from 12 months to 8 months beginning in 2027, with exceptions described in the source, to reduce backport work by 30%. This is an observed policy response, not a promise that campaign donations will reverse it.
- In her October 28 appeal, xjm reported eight funded hours per week since May 2026 versus forty in 2022. She described needing further funding for 2027 to continue funded contribution work. Date and attribute this statement. Vardot announced sponsorship in November; the October figure cannot be presented as her verified current funded capacity. Her support includes sponsorship and Patreon, rather than Patreon alone.

For copy, prefer a few strong claims with readable citations over a wall of statistics. Detailed evidence belongs on the sources page.

## Campaign deadline and progress

Builder proposal for the preview: December 31, 2026 at 23:59:59 UTC, a fixed illustrative campaign deadline. It is a proposed fundraising cutoff, not a forecast of a security release, funding expiration, or a promise by the Association or xjm. The existing general-support campaign runs through December 31, but that does not establish this security campaign's cutoff or stakes.

Show a visible 'Proposed campaign' label beside the deadline and countdown, as well as the independent-concept notice. Use a shared campaign configuration so both pages agree. Dates must include a timezone and an absolute timestamp.

Do not publish fictitious donor or revenue progress. For the initial preview, omit progress and an invented financial target. Provide the component and configuration fields for a later verified goal, current value, units, source, and update timestamp. The build must reject enabled progress lacking those fields. Target and exact funded outcome remain a campaign decision for a later revision.

The countdown computes remaining time from the fixed timestamp every second. It never resets on reload, never goes negative, and ends with 'This proposed campaign deadline has passed.' Do not claim the target was reached or missed without results. After expiry, replace deadline-based asks with a neutral link to ongoing support. Keep a readable absolute deadline without JavaScript. No per-second screen-reader announcements or flashing animation.

The page can describe sourced risks of underfunding. It cannot claim that missing this prototype's arbitrary deadline cancels a security release. A real target, matching gift, merchandise reward, or conditional project commitment requires a documented offer before public fundraising use.

## Visual design

Reference inspected on November 25: https://new.drupal.org/

Use its navy-to-cyan gradient hero, generous white type, pale-blue rectangular buttons, rounded white panels, spacious section rhythm, and people-focused imagery. Inspect rendered styles during implementation to derive actual font families, weights, colors, spacing, and radii. Record those decisions as CSS custom properties. Use readable dark text on light sections and verify contrast on gradient backgrounds.

Keep campaign navigation sparse. Show the independent-proposal notice clearly so use of Drupal styling does not imply DA endorsement. Use actual licensed Drupal marks only after inspecting asset terms; a text wordmark can carry the preview if needed.

Use real portraits from official profiles or publicly licensed photography with source and credit records. Verify identity and reuse terms before copying assets. Never use generated faces or stock substitutes for named members. If a portrait cannot be reused, keep the truthful text profile and link to the official photo while recording the missing local asset. Do not invent personal endorsements.

## Donation behavior

Use ordinary external links to official donation and sponsorship destinations. No personal or payment information is collected by this site. Start with the DA security fund destination linked from its official security-program support page. Verify that the rendered destination still matches that purpose; record the discrepancy if cached text mentions obsolete Drupal 7 support.

Show the recipient before a visitor leaves. Do not simulate taking payment. Do not add suggested-amount controls unless amount and currency can be passed to the real checkout through a documented, verified interface. Direct xjm support links identify Patreon as her sponsorship destination and avoid DA tax or membership claims.

No automatic analytics, tracking pixels, randomized variants, email capture, or embedded payment scripts in the initial build. The variants have separate URLs for later controlled measurement. Click-throughs alone are not evidence of donation conversion.

## Technical and accessibility requirements

Generate each route as semantic HTML. Shared data owns claims, people, sources, campaign dates, and donation destinations. Use progressive enhancement. Links, sources, navigation, and FAQs work without JavaScript.

Use one main heading, landmarks, a skip link, visible keyboard focus, labelled controls, native disclosures, and accessible chart data. Layouts must reflow at 320 CSS pixels and at 200% zoom without lost content. Respect reduced motion and avoid decorative motion in the first version. Portrait dimensions reserve layout space; below-fold images load lazily. Keep CSS and JavaScript local and small. Feature-detect any newer API and follow Modern Web Guidance fallbacks for unsupported browsers.

## Verification and delivery

Verify build output and internal links. Write focused tests for countdown behavior at, before, and after the deadline, invalid timestamps, shared campaign consistency, and campaign/progress validation. Check that cited metrics and recipients match shared source data. Do not write tests that only repeat layout markup.

Review both pages in desktop and mobile browser views, with keyboard navigation and JavaScript disabled. Check contrast, image identity, meaningful alt text, chart labels, and countdown expiry. Automated accessibility checks supplement manual review and do not establish complete accessibility conformance.

Deliver source, static build, local previews, verification results, and Cloudflare Pages build instructions. No deployment, domain changes, donor outreach, or messages to the Association are part of this stage. The user can authorize publication later with a concrete preview in hand.

## Remaining decisions and builder discretion

The user approves this design before implementation. Builder may choose precise typography, module boundaries, dependency versions, and crop compositions from verified assets. Builder may refine copy while preserving facts and the agreed narrative. Builder must surface any unavailable portrait, conflicting source, or donation destination mismatch.

Unconfirmed campaign target, current totals, budget allocation, and deadline consequence stay visibly unconfirmed or absent. They do not block a clearly identified local concept build. They do block presenting those details as a real campaign offer.

## Sources

- https://www.drupal.org/blog/256-advisories-in-five-months-results-from-the-drupal-ai-security-initiative
- https://www.drupal.org/association/blog/introducing-the-drupal-ai-security-initiative-the-first-six-weeks
- https://www.drupal.org/psa-2026-11-02
- https://www.drupal.org/drupal-security-team/security-team-members
- https://www.drupal.org/user/65776
- https://xjmdrupal.org/index.php/blog/core-security-funding
- https://www.patreon.com/cw/xjm
- https://www.vardot.com/insights/blog/why-vardot-sponsors-drupal-core-release-manager
- https://www.drupal.org/security-team/donate
- https://donorbox.org/drupal-security
- https://donorbox.org/support-drupal-2026
- https://new.drupal.org/

## Workflow status

- Research and visual directions reviewed with the user.
- User chose both directions and new.drupal.org styling.
- Written design drafted. A fresh frontend builder reviewed the document and reported 'nothing important left'.
- User approved the design on 2026-11-25.
- User approved native execution. Local implementation, verification, and independent review completed.
- See `docs/verification.md` for results, the mobile-heading fix, and a deferred deadline-maintenance issue.
