import test from "node:test";
import assert from "node:assert/strict";

test("source references resolve for every metric and team member", async () => {
  const { sources } = await import("../src/content/sources.js");
  const { metrics } = await import("../src/content/security.js");
  const { people } = await import("../src/content/people.js");
  for (const item of [...metrics, ...people])
    for (const id of item.sourceIds) assert.ok(sources[id], id);
  assert.ok(people.find((p) => p.id === "xjm").profileUrl);
});
test("evidence rendering consumes supplied metrics rather than copied counts", async () => {
  const { renderEvidence } = await import("../src/components/evidence.js");
  const html = renderEvidence([{ value: 300 }, { value: 270 }], []);
  assert.match(html, />300</);
  assert.match(html, /combined: 270/);
  assert.doesNotMatch(html, />256</);
});
test("historical funding is dated and includes subsequent sponsorship", async () => {
  const { people } = await import("../src/content/people.js");
  const xjm = people.find((p) => p.id === "xjm");
  assert.equal(xjm.historicalFunding.asOf, "2026-10-28");
  assert.equal(xjm.historicalFunding.currentStatusSourceId, "vardot");
  const withoutImage = { ...xjm, portrait: undefined };
  const { renderPeople } = await import("../src/components/people.js");
  const html = renderPeople([withoutImage]);
  assert.match(html, /Jess \(xjm\)/);
  assert.match(html, /Core release manager/);
  assert.match(html, /https:\/\/www.drupal.org\/u\/xjm/);
  assert.doesNotMatch(html, /<img/);
});
