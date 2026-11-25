import test from "node:test";
import assert from "node:assert/strict";
test("site checker catches broken files and fragment targets", async () => {
  const { checkHtml } = await import("../scripts/check-site.js");
  const pages = new Map([
    [
      "/index.html",
      '<h1 id="main">Hello</h1><a href="/missing/">Broken</a><a href="#wrong">Bad fragment</a>',
    ],
  ]);
  const errors = checkHtml(pages, new Set());
  assert.equal(errors.length, 2);
  const good = new Map([
    ["/index.html", '<h1 id="main">Hello</h1><a href="#main">Good</a>'],
  ]);
  assert.deepEqual(checkHtml(good, new Set()), []);
});
