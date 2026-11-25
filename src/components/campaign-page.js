import { layout } from "./layout.js";
import { renderEvidence, renderResults } from "./evidence.js";
import { renderPeople, renderXjm } from "./people.js";
import { renderDonation } from "./donation.js";
import { campaign } from "../content/campaign.js";
import { metrics } from "../content/security.js";
const cta =
  '<a class="button primary" href="#support">Support Drupal security <span aria-hidden="true">↗</span></a>';
function hero(variant) {
  return variant === "evidence"
    ? `<section class="hero"><div class="hero-copy"><p class="eyebrow">Keep the response human</p><h1>AI finds the bugs.<br><span>People ship<br>the fixes.</span></h1><p class="hero-lead">Another advisory. Another round of testing. You know the work after an update. Help support the people doing the work before it.</p>${cta}<a class="hero-secondary" href="#evidence">See what’s changed <span aria-hidden="true">↓</span></a></div><div class="hero-art"><div class="stat-card"><span>June–October 2026</span><strong>${metrics[0].value}</strong><p>security advisories.<br>Five months. One shared responsibility.</p><a href="/sources/#results">Source: Drupal Association ↗</a></div><div class="hero-faces">${["mcdruid", "greggles", "mlhess"].map((p, i) => `<img src="/assets/images/${p}.jpg" width="280" height="280" alt="${["Drew Webber", "Greg Knaddison", "Michael Hess"][i]}" fetchpriority="${i === 0 ? "high" : "auto"}">`).join("")}<span>Real people.<br>Essential work.</span></div></div></section>`
    : `<section class="hero people-hero"><div class="hero-copy"><p class="eyebrow">Meet the people behind the patch</p><h1>Your next update<br><span>starts with<br>someone.</span></h1><p class="hero-lead">Someone investigates the report. Someone reviews the fix. Someone ships the release. Help sustain the people Drupal depends on.</p>${cta}<a class="hero-secondary" href="#team">Meet the team <span aria-hidden="true">↓</span></a></div><div class="portrait-mosaic">${["mcdruid", "greggles", "mlhess"].map((p, i) => `<figure><img src="/assets/images/${p}.jpg" width="280" height="280" alt="${["Drew Webber", "Greg Knaddison", "Michael Hess"][i]}" fetchpriority="${i === 0 ? "high" : "auto"}"><figcaption>${["Drew · fixes", "Greg · coordination", "Michael · review"][i]}</figcaption></figure>`).join("")}<a class="mosaic-label" href="#xjm">And xjm,<br>who helps get<br>core out the door. <span aria-hidden="true">↓</span></a></div></section>`;
}
function workload() {
  return `<section class="section workload"><div><p class="eyebrow">You’ve felt it on release day</p><h2>The update is urgent.<br>Your day was already full.</h2></div><div><p class="lead">You check the affected versions. Test the changes. Deploy. Explain to a client why something else has to wait.</p><p>The team upstream has a queue too. More reports mean more triage, more reviews, and more releases to coordinate. AI-assisted discovery has made finding existing vulnerabilities faster. It hasn’t removed the work of responding.</p><a class="source-link" href="/sources/#results">The DA’s account of the workload increase ↗</a></div></section>`;
}
function risk() {
  return `<section class="section risk"><p class="eyebrow">The pressure has consequences</p><h2>Capacity is already<br>changing the schedule.</h2><div class="risk-grid"><p class="lead">From 2027, most core minor versions receive eight months of overlapping security coverage instead of twelve.</p><div><p>The Security Team’s announcement says AI-driven reports created more work than current funding can sustain, with a risk of slower fixes. The change cuts backport work by 30%. Major versions still receive at least four years of support.</p><p>Funding this work matters. This proposed campaign does not promise to reverse that policy or guarantee a particular release.</p><a class="source-link" href="/sources/#coverage">Read the coverage policy and exceptions ↗</a></div></div></section>`;
}
function faq() {
  return `<section class="section faq"><div><p class="eyebrow">Before you give</p><h2>A clear ask.<br>A clear destination.</h2></div><div><details><summary>Where does my donation go?</summary><p>The main donation button takes you to the Drupal Association’s security-fund checkout. The official support page says contributions, less administrative fees, are restricted to security programs. This site does not process payments.</p></details><details><summary>Does giving to the DA directly fund xjm?</summary><p>We have no basis to promise that allocation. The separately labelled Patreon link supports xjm directly. Choose the recipient you want to support.</p></details><details><summary>What happens on December 31?</summary><p>This concept uses a proposed deadline of December 31, 2026 at 23:59:59 UTC. No matching gift, fundraising target, or funding cutoff has been confirmed. The timer ends without resetting; ongoing support remains available.</p></details><details><summary>Is this an official campaign?</summary><p>No. These pages are an independent community proposal for a stronger fundraising experience. The people pictured have not endorsed this page. All evidence and image credits are available on the <a href="/sources/">sources page</a>.</p></details><details><summary>Do more advisories mean Drupal got less secure?</summary><p>The Association attributes the increase to faster discovery of existing vulnerabilities and disclosure throughput. Finding, fixing, and disclosing real issues is useful work. Advisory counts alone do not measure underlying security.</p></details></div></section>`;
}
export function campaignPage(variant) {
  const peopleFirst = variant === "people";
  return layout(
    peopleFirst
      ? "The people behind your next update"
      : "AI finds the bugs. People ship the fixes.",
    hero(variant) +
      workload() +
      (peopleFirst
        ? renderPeople() +
          `<div id="xjm">${renderXjm()}</div>` +
          renderEvidence()
        : renderEvidence() +
          renderPeople() +
          `<div id="xjm">${renderXjm()}</div>`) +
      renderResults() +
      risk() +
      renderDonation(campaign) +
      faq(),
    variant,
  );
}
