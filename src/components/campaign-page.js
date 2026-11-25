import { layout } from "./layout.js";
import { renderEvidence, renderResults } from "./evidence.js";
import { renderXjm } from "./people.js";
import { renderDonation } from "./donation.js";
import { campaign } from "../content/campaign.js";
import { metrics } from "../content/security.js";
const cta = `<a class="button primary" href="${campaign.donationUrl}">Donate to the security fund </a>`;
function hero(variant) {
  return variant === "evidence"
    ? `<section class="hero"><div class="hero-copy"><h1>People find the bugs.<br><span>Help fund<br>the fixes.</span></h1><p class="hero-lead">AI helps researchers find vulnerabilities faster. People still investigate the reports, review the fixes, and prepare the updates your sites depend on.</p>${cta}</div><div class="hero-art"><div class="stat-card"><span>June–October 2026</span><strong>${metrics[0].value}</strong><p>security advisories.<br>Five months. One shared responsibility.</p><a href="/sources/#results">Source: Drupal Association</a></div><div class="hero-faces">${["mcdruid", "greggles", "mlhess"].map((p, i) => `<img src="/assets/images/${p}.jpg" width="280" height="280" alt="${["Drew Webber", "Greg Knaddison", "Michael Hess"][i]}" fetchpriority="${i === 0 ? "high" : "auto"}">`).join("")}</div></div></section>`
    : `<section class="hero people-hero"><div class="hero-copy"><h1>Your next update<br><span>depends on<br>people.</span></h1><p class="hero-lead">Jess, known as xjm, is one of the people behind Drupal’s releases. Help the Drupal Association fund the security work your sites depend on.</p>${cta}</div><div class="portrait-mosaic">${["mcdruid", "greggles", "mlhess"].map((p, i) => `<figure><img src="/assets/images/${p}.jpg" width="280" height="280" alt="${["Drew Webber", "Greg Knaddison", "Michael Hess"][i]}" fetchpriority="${i === 0 ? "high" : "auto"}"><figcaption>${["Drew · fixes", "Greg · coordination", "Michael · review"][i]}</figcaption></figure>`).join("")}</div></section>`;
}
function workload() {
  return `<section class="section workload"><div><h2>The update is urgent.<br>Your day was already full.</h2></div><div><p class="lead">You check the affected versions. Test the changes. Deploy. Explain to a client why something else has to wait.</p><p>The team upstream has a queue too. More reports mean more triage, more reviews, and more releases to coordinate. AI-assisted discovery has made finding existing vulnerabilities faster. It hasn’t removed the work of responding.</p><a class="source-link" href="/sources/#results">The DA’s account of the workload increase</a></div></section>`;
}
function risk() {
  return `<section class="section risk"><h2>Capacity is already<br>changing the schedule.</h2><div class="risk-grid"><p class="lead">From 2027, most core minor versions receive eight months of overlapping security coverage instead of twelve.</p><div><p>The Security Team’s announcement says AI-driven reports created more work than current funding can sustain, with a risk of slower fixes. The change cuts backport work by 30%. Major versions still receive at least four years of support.</p><p>Funding this work matters. This proposed campaign does not promise to reverse that policy or guarantee a particular release.</p><a class="source-link" href="/sources/#coverage">Read the coverage policy and exceptions</a></div></div></section>`;
}
export function campaignPage(variant) {
  const peopleFirst = variant === "people";
  return layout(
    peopleFirst
      ? "The people behind your next Drupal update"
      : "People find the bugs. Help fund the fixes.",
    hero(variant) +
      `<div id="xjm">${renderXjm()}</div>` +
      renderDonation(campaign) +
      workload() +
      renderEvidence() +
      renderResults() +
      risk() +
      `<div class="team-link"><a href="https://www.drupal.org/drupal-security-team/security-team-members">Meet all Drupal Security Team members</a></div>`,
    variant,
  );
}
