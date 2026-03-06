import { chromium } from 'playwright';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('../../screenshots');
const BASE_URL = 'http://localhost:5175';

const viewports = [
  { name: 'desktop', width: 1920, height: 1080, dir: 'desktop' },
  { name: 'tablet', width: 768, height: 1024, dir: 'tablet' },
  { name: 'mobile', width: 375, height: 667, dir: 'mobile' },
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll through the entire page to trigger all whileInView animations
    await autoScroll(page);

    // Wait for animations to complete
    await page.waitForTimeout(2000);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const filename = `homepage_${vp.name}_20260220.png`;
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, vp.dir, filename),
      fullPage: true,
    });

    console.log(`Captured: ${vp.dir}/${filename}`);
    await context.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
})();
