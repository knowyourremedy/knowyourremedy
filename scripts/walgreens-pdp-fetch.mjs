import { chromium } from 'playwright';

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('usage: node walgreens-pdp-fetch.mjs <url>...');
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const url of urls) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(4000);
    const title = await page.title();
    const text = await page.locator('body').innerText();
    const snippet = text.replace(/\s+/g, ' ').slice(0, 2500);
    console.log('URL:', url);
    console.log('TITLE:', title);
    console.log('BODY_SNIP:', snippet);
    console.log('---');
  } catch (e) {
    console.log('URL:', url);
    console.log('ERROR:', String(e));
    console.log('---');
  }
}
await browser.close();
