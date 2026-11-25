# Landing-page verification

Date: November 25, 2026

## Automated checks

- Eight behavior tests passed with `npm test` before final review. Tests run in one process so assertion results remain visible in this environment.
- `npm run build` generated all four routes using Eleventy 3.1.8.
- `npm run check` found no broken internal route, fragment, or local asset targets and no deadline or primary-recipient disagreement between variants.
- axe-core found zero violations in both campaign pages for the WCAG 2 A, AA, and WCAG 2.1 AA rule tags. Each run reported 21 passing rule groups. This is not a full accessibility conformance assessment.
- npm reported no known dependency vulnerabilities during installation.

## Browser checks

- Inspected both desktop hero layouts and real-member image identity and cropping.
- Both pages fit a 320 CSS pixel viewport without horizontal overflow. A hidden line break initially joined words in the mobile headline; removing that rule restored readable breaks.
- All seven rendered image instances on the evidence-first page loaded. Each has meaningful alternate text. The xjm avatar is explicitly identified as a figurine.
- Keyboard Tab reached the skip link. Enter moved focus to `main`.
- Native FAQ disclosure opened and closed. Donation actions identify their external recipients.
- With JavaScript disabled, the people-first page retained headings, evidence, source links, profiles, direct sponsorship links, FAQs, donation links, and its absolute deadline. Scripting was restored afterward.
- Live countdown digits changed between observations. Simulating January 1, 2027 through the Temporal clock produced `00 : 00 : 00 : 00` and the expired-deadline message. The tab was reloaded to restore the real clock.
- Loaded the local Temporal fallback with native Temporal removed and verified a one-second interval. The tab was reloaded to restore native behavior.
- Temporary viewport overrides were reset after responsive checks.

## Evidence and asset limits

The official DA security-support page points to `donorbox.org/drupal-security`. Its current rendered text describes the Security Team. Search-engine cached text still refers to Drupal 7. Reconfirm the final checkout presentation with the Association before adoption.

xjm's eight-hour figure is her October 28 historical report. The page also states that Vardot announced sponsorship in November and does not claim eight hours is her current funding. Direct Patreon support is separate from the DA fund.

Portraits are the official profile images, reused under Drupal.org's published content terms with attribution and a CC BY-SA 2.0 link. The source manifest records the exact downloaded URLs. A photographic portrait of xjm was not substituted for her chosen avatar.

The chart uses three explicitly labelled selected months. It does not invent July or August data or present those samples as a complete monthly series.

## Remaining verification limits

Screen-reader testing with a human user and full 200% browser-zoom testing have not been performed. The responsive viewport and keyboard checks do not replace those checks. The preview has not been tested in Safari or Firefox. The local Temporal fallback check does not establish full cross-browser coverage.

No conversion improvement has been measured. There is no checkout reporting integration. The site is ready for local review and Cloudflare Pages configuration, but campaign target, deadline stakes, matching funds, and Association adoption remain unconfirmed.

## Preview images

- `docs/previews/evidence-desktop.png`
- `docs/previews/people-desktop.png`

Final independent review findings and fixes will be recorded below.
