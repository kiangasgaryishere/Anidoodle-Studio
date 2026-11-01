import { chromium } from '../engine/anidoodle/engine/node_modules/playwright-core/index.mjs';
import { findBrowser } from '../engine/anidoodle/engine/tools/detect.mjs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

process.env.PLAYWRIGHT_BROWSERS_PATH = fileURLToPath(new URL('../.cache/browsers', import.meta.url));
const found = findBrowser({ chromium });
if (!found.ok) throw new Error(found.why);
const browser = await chromium.launch({ executablePath: found.executablePath });
try {
  const page = await browser.newPage();
  const pixel = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 2;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f08030';
    ctx.fillRect(0, 0, 2, 2);
    return [...ctx.getImageData(0, 0, 1, 1).data];
  });
  if (pixel.join(',') !== '240,128,48,255') throw new Error('Canvas failed');
  console.log(`Chromium ${browser.version()}: Canvas draw/read passed`);
} finally {
  await browser.close();
}
for (const cmd of ['ffmpeg', 'ffprobe']) {
  console.log(execFileSync(cmd, ['-version'], { encoding: 'utf8' }).split('\n')[0]);
}
