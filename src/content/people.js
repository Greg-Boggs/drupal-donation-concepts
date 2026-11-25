const member = (id, name, role, work, sourceIds) => ({
  id,
  name,
  handle: id,
  role,
  work,
  sourceIds,
  workSourceIds: sourceIds,
  profileUrl: `https://www.drupal.org/u/${id}`,
  portrait: {
    path: `/assets/images/${id}.jpg`,
    width: 280,
    height: 280,
    alt: name,
    credit: `${name}, via their Drupal.org profile`,
    sourceUrl: `https://www.drupal.org/u/${id}`,
    reuseBasis:
      "Drupal.org content terms, CC BY-SA 2.0. Original profile image, no retouching.",
  },
});
export const people = [
  {
    ...member(
      "xjm",
      "Jess (xjm)",
      "Core release manager · Security Team",
      "Creates core releases and helps coordinate security updates. Her October appeal describes the funding needed to keep doing this work.",
      ["xjm", "vardot", "roster"],
    ),
    supportUrl: "https://www.patreon.com/xjm",
    historicalFunding: {
      hours: 8,
      previousHours: 40,
      asOf: "2026-10-28",
      currentStatusSourceId: "vardot",
    },
  },
  member(
    "mcdruid",
    "Drew Webber",
    "Security engineer · Security Team",
    "Finds vulnerabilities, writes patches, and builds tools as the funded initiative’s fixer.",
    ["initiative", "results", "roster"],
  ),
  member(
    "greggles",
    "Greg Knaddison",
    "Reviewer · Security Team",
    "Triages reports and reviews fixes. Credited with coordinating 203 advisories in June–October 2026.",
    ["results", "roster"],
  ),
  member(
    "mlhess",
    "Michael Hess",
    "Reviewer · Security Team",
    "Triages submissions and reviews patches alongside the volunteer team.",
    ["initiative", "roster"],
  ),
];
