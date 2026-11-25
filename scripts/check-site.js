import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
export function checkHtml(pages, assets) {
  const errors = [];
  for (const [file, html] of pages) {
    for (const m of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
      const raw = m[1];
      if (!raw.startsWith("/") && !raw.startsWith("#")) continue;
      const url = new URL(raw, "https://local.test" + file);
      let target = url.pathname;
      if (target.endsWith("/")) target += "index.html";
      if (!pages.has(target) && !assets.has(target)) {
        errors.push(`${file}: missing ${target}`);
        continue;
      }
      if (
        url.hash &&
        pages.has(target) &&
        !pages
          .get(target)
          .includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)
      )
        errors.push(`${file}: missing fragment ${raw}`);
    }
  }
  return errors;
}
async function check() {
  const pages = new Map(),
    assets = new Set();
  async function walk(dir) {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) await walk(full);
      else {
        const url =
          "/" + path.relative("_site", full).split(path.sep).join("/");
        if (full.endsWith(".html"))
          pages.set(url, await readFile(full, "utf8"));
        else assets.add(url);
      }
    }
  }
  await walk("_site");
  const errors = checkHtml(pages, assets);
  for (const route of [
    "/index.html",
    "/security/index.html",
    "/people/index.html",
    "/sources/index.html",
  ])
    if (!pages.has(route)) errors.push(`Missing route ${route}`);
  for (const route of ["/security/index.html", "/people/index.html"]) {
    const html = pages.get(route) || "";
    if (
      !html.includes("2026-12-31T23:59:59Z") ||
      !html.includes("https://donorbox.org/drupal-security")
    )
      errors.push(`Campaign mismatch ${route}`);
  }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(
    `Checked ${pages.size} routes and ${assets.size} assets: no broken internal links or campaign mismatches.`,
  );
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await check();
