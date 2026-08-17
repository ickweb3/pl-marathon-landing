/**
 * Render `scripts/og-template.html` to `public/og.jpg` — the social preview.
 *
 *   node scripts/make-og.mjs
 *
 * Run it whenever the start date or the card copy changes. The date is read
 * from `src/UI/pages/Proyavys/shared/config.ts`, so the card cannot drift from
 * the page: change `startDateLabel`, run this, done.
 *
 * This is an authoring tool, not part of the build — the Docker image never
 * runs it. Playwright is therefore an optional dependency; install it with
 * `npm i -D playwright && npx playwright install chromium` if it is missing.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "playwright is not installed.\n" +
      "  npm i -D playwright && npx playwright install chromium",
  );
  process.exit(1);
}

// Single source of truth for the date: the page's own config.
const config = await readFile(
  resolve(root, "src/UI/pages/Proyavys/shared/config.ts"),
  "utf8",
);
const match = config.match(/startDateLabel:\s*"([^"]+)"/);
if (!match) {
  console.error("startDateLabel not found in shared/config.ts");
  process.exit(1);
}
const startDate = match[1];
console.log(`start date: ${startDate}`);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  // 2x, then down to 1200 x 630 — text and the portrait stay crisp.
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(`file://${resolve(here, "og-template.html")}`, {
  waitUntil: "networkidle",
});
await page.evaluate((d) => {
  document.getElementById("date").textContent = d;
}, startDate);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

const png = await page.screenshot({ type: "png" });
await browser.close();

// Encode as JPEG at the card's own size. sharp is not a dependency here, so the
// resize happens in the browser instead: the screenshot is already 2400 x 1260,
// and a JPEG at that size is heavier than the 300 KB most crawlers will fetch.
const ctx2 = await (await chromium.launch()).newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
const shrink = await ctx2.newPage();
const b64 = png.toString("base64");
await shrink.setContent(
  `<style>*{margin:0;padding:0}img{width:1200px;height:630px;display:block}</style>` +
    `<img src="data:image/png;base64,${b64}">`,
);
await shrink.waitForTimeout(200);
const jpg = await shrink.screenshot({ type: "jpeg", quality: 88 });
await shrink.context().browser().close();

const out = resolve(root, "public/og.jpg");
await writeFile(out, jpg);
console.log(`wrote ${out} — ${(jpg.length / 1024).toFixed(0)} KB, 1200x630`);
