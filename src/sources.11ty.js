import { layout } from "./components/layout.js";
import { sources } from "./content/sources.js";
import { people } from "./content/people.js";
export default class {
  data() {
    return { permalink: "/sources/index.html" };
  }
  render() {
    return layout(
      "Evidence, sources, and image credits",
      `<section class="section source-page"><p class="eyebrow">Facts with a paper trail</p><h1>The evidence.<br>The attribution.</h1><p class="lead">Verified November 25, 2026. Statistics are source-reported, with their original periods and scope. They are not live campaign results.</p><div class="source-list">${Object.entries(
        sources,
      )
        .map(
          ([id, s]) =>
            `<article id="${id}"><h2><a href="${s.url}">${s.title} ↗</a></h2><p>${s.scope}</p><p class="fine">${s.publishedAt ? `Published ${s.publishedAt} · ` : ""}Checked ${s.verifiedAt}</p></article>`,
        )
        .join(
          "",
        )}</div><h2>Profile images</h2><p>Original Drupal.org profile images reproduced under the site’s <a href="https://www.drupal.org/terms">CC BY-SA 2.0 content terms</a>. No retouching. Display crops use CSS. <a href="https://creativecommons.org/licenses/by-sa/2.0/">License</a>. Images do not imply endorsement.</p><ul>${people.map((p) => `<li><a href="${p.profileUrl}">${p.name}</a>: profile image from their official Drupal.org account. ${p.id === "xjm" ? "This is her chosen figurine avatar, not a photographic portrait." : ""}</li>`).join("")}</ul><h2>Typography and visual reference</h2><p>Palette and layout direction derived from new.drupal.org. Noto Sans is distributed under the <a href="/assets/fonts/OFL.txt">SIL Open Font License</a>. The original site uses ZT Gatha headings; this concept uses Noto Sans throughout. The droplet is an original geometric drawing rather than a copied official logo.</p><h2>What is illustrative?</h2><p>December 31, 2026 at 23:59:59 UTC is a proposed campaign deadline. No campaign total, donor count, target, matching sponsor, merchandise offer, or deadline-dependent funding outcome is claimed.</p><h2>Checkout verification</h2><p>The official security support page links to <a href="https://donorbox.org/drupal-security">the security-fund Donorbox page</a>. Its rendered description discusses support for the Security Team. Search-engine cached text still mentions Drupal 7. Confirm the final checkout wording with the Association before public campaign use. Donation processing and receipts belong to the recipient platform.</p><a class="button navy" href="/security/">View the evidence-first page →</a></section>`,
      "sources",
    );
  }
}
