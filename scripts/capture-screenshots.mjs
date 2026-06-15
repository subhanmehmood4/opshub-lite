import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE = process.env.SCREENSHOT_BASE ?? "http://localhost:3456";
const OUT = path.resolve(__dirname, "../../public/images");

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT, "opshub-landing.png"), fullPage: false });

  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Try OpsHub free" }).click();
  await page.waitForURL("**/dashboard**", { timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, "opshub-dashboard.png"), fullPage: false });

  await page.goto(`${BASE}/dashboard/revenue`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT, "opshub-revenue.png"), fullPage: false });

  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /AI Copilot/i }).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "opshub-copilot.png"), fullPage: false });

  await browser.close();
  console.log("Screenshots saved to", OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
