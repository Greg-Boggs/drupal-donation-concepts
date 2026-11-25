import test from "node:test";
import assert from "node:assert/strict";
import { campaign } from "../src/content/campaign.js";

test("countdown expires at its fixed instant and never becomes negative", async () => {
  const { campaignState } = await import("../src/lib/campaign.js");
  const end = Date.parse("2026-12-31T23:59:59Z");
  assert.deepEqual(campaignState(campaign, end - 1000), {
    expired: false,
    remainingSeconds: 1,
    deadlineISO: "2026-12-31T23:59:59Z",
  });
  assert.equal(campaignState(campaign, end).expired, true);
  assert.equal(campaignState(campaign, end + 60000).remainingSeconds, 0);
  assert.deepEqual(
    campaignState(campaign, end - 1000),
    campaignState(campaign, end - 1000),
  );
});
test("invalid campaign and unverified progress are rejected", async () => {
  const { validateCampaign } = await import("../src/lib/campaign.js");
  for (const deadline of [
    "garbage",
    "2026-12-31T23:59:59",
    "2026-02-30T12:00:00Z",
  ])
    assert.throws(() => validateCampaign({ ...campaign, deadline }));
  const progress = {
    enabled: true,
    goal: 1000,
    current: 4,
    units: "donors",
    sourceUrl: "https://example.org/results",
    updatedAt: "2026-11-25T12:00:00Z",
  };
  for (const key of ["goal", "current", "units", "sourceUrl", "updatedAt"]) {
    const p = { ...progress };
    delete p[key];
    assert.throws(() => validateCampaign({ ...campaign, progress: p }));
  }
  for (const p of [
    { goal: 0 },
    { current: -1 },
    { goal: Infinity },
    { units: "people" },
    { sourceUrl: "http://example.org" },
    { updatedAt: "tomorrow" },
  ])
    assert.throws(() =>
      validateCampaign({ ...campaign, progress: { ...progress, ...p } }),
    );
  assert.doesNotThrow(() => validateCampaign({ ...campaign, progress }));
});
test("donation rendering distinguishes deadline from ongoing support", async () => {
  const { renderDonation } = await import("../src/components/donation.js");
  const active = renderDonation(campaign, Date.parse("2026-11-25T12:00:00Z"));
  assert.match(active, /Proposed campaign/);
  assert.match(active, /UTC/);
  assert.doesNotMatch(active, /progressbar/);
  const expired = renderDonation(campaign, Date.parse("2027-01-01T00:00:00Z"));
  assert.match(expired, /deadline has passed/);
  assert.match(expired, /ongoing support/);
  assert.doesNotMatch(expired, /data-countdown/);
});
test("verified progress is rendered with source and last update", async () => {
  const { renderDonation } = await import("../src/components/donation.js");
  const html = renderDonation(
    {
      ...campaign,
      progress: {
        enabled: true,
        goal: 1000,
        current: 25,
        units: "donors",
        sourceUrl: "https://example.org/results",
        updatedAt: "2026-11-25T12:00:00Z",
      },
    },
    Date.parse("2026-11-25T12:00:00Z"),
  );
  assert.match(html, /25 of 1,000 donors/);
  assert.match(html, /https:\/\/example.org\/results/);
  assert.match(html, /2026-11-25T12:00:00Z/);
});
