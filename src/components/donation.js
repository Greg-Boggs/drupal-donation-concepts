import { campaignState } from "../lib/campaign.js";
import { escape as e } from "./html.js";
export function renderDeadline(
  campaign,
  nowEpochMs = Date.now(),
  className = "",
) {
  const state = campaignState(campaign, nowEpochMs);
  const p = campaign.progress;
  const progress = p?.enabled
    ? `<div class="verified-progress"><p>${p.current.toLocaleString("en-US")} of ${p.goal.toLocaleString("en-US")} ${e(p.units)}</p><progress value="${Math.min(p.current, p.goal)}" max="${p.goal}" aria-label="Verified campaign progress"></progress><a href="${e(p.sourceUrl)}">Progress source</a><p>Updated <time datetime="${e(p.updatedAt)}">${e(p.updatedAt)}</time></p></div>`
    : "";
  return `<div class="deadline-panel ${e(className)}">${progress}<p class="tag">Proposed campaign</p><time data-local-deadline datetime="${e(campaign.deadline)}">December 31, 2026 · 23:59:59 UTC</time>${state.expired ? '<p class="expired">This proposed campaign deadline has passed. Contributions remain available through ongoing support.</p>' : `<div data-countdown data-deadline="${e(campaign.deadline)}" aria-live="off"><p class="countdown-fallback">The fixed deadline above remains available without a live countdown.</p></div><p data-expiry-status role="status"></p>`}<p class="fine">Illustrative fundraising deadline. No match, donor target, or release commitment has been announced for this concept.</p></div>`;
}
export function renderDonation(campaign, nowEpochMs = Date.now()) {
  return `<section class="donation-panel" id="support"><div><h2>Free software.<br>Essential work.</h2><p>Your contribution supports the Drupal Association security fund. Its published terms restrict contributions, less administrative fees, to security programs.</p><a class="button primary" href="${e(campaign.donationUrl)}">Support Drupal security </a></div>${renderDeadline(campaign, nowEpochMs)}</section>`;
}
