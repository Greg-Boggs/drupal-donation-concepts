# Drupal security landing-page concepts

Two independent fundraising concepts for Drupal developers, builders, and service businesses. Both use the visual direction of new.drupal.org, source-reported security results, actual Security Team profiles, and a proposed campaign countdown.

## Run locally

Use Node 22 or a later supported LTS release.

```sh
npm ci
npm run dev
```

Open [the concept index](http://localhost:8080/), [the evidence-first page](http://localhost:8080/security/), or [the people-first page](http://localhost:8080/people/).

```sh
npm test
npm run build
npm run check
```

Eleventy writes the static site to `_site/`. `npm run check` checks internal links, fragments, assets, routes, and campaign consistency in the generated output. The tests exercise source references, missing-image rendering, shared metrics, campaign validation, progress provenance, and countdown boundaries.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `_site`
- Root directory: repository root
- Node version: 22 or a later supported LTS release
- No Functions, secrets, bindings, or server runtime required

This work has not been deployed. The visible independent-proposal labels and `noindex` metadata are intentional. Recheck campaign terms and content before public fundraising use.

## Content and campaign changes

Shared source records, metrics, people, and campaign configuration are in `src/content/`. Components are in `src/components/`. Page composition is in the four `.11ty.js` route files. Styles are local, and the only browser script updates countdowns.

The proposed deadline is December 31, 2026 at 23:59:59 UTC. It is not an Association commitment or a security release forecast. No donor total, goal, matching gift, shirt offer, or conditional funding outcome has been invented. Progress remains disabled. Enabling it requires a positive goal, nonnegative current total, units, an HTTPS source, and a timestamp with a timezone.

The main donation link goes to the official DA security-fund checkout. xjm's Patreon is separately labelled as direct maintainer support. Neither page takes payment or collects personal data. No analytics or tracking pixels are included.

## Images and attribution

Profile images come from each member's official Drupal.org account. xjm's chosen profile image is a figurine avatar, not a photograph. Source URLs and reuse notes are recorded in `src/content/portrait-provenance.json`. Credits and licensing links appear on `/sources/`. Noto Sans font files include their SIL Open Font License. Temporal's locally served fallback includes its MIT license.

The illustration of a droplet is an original geometric drawing. Drupal is a trademark of Dries Buytaert. These pages do not imply endorsement by the Association or the people featured.

See `docs/verification.md` for test results, browser checks, and remaining limits.
