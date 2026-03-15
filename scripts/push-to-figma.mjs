/**
 * push-to-figma.mjs
 * Screenshots all 5 onboarding states and pushes them into the Figma file
 * as 390×844 frames on an "Onboarding Screens" page.
 *
 * Run: node scripts/push-to-figma.mjs
 * Requires: npm install puppeteer (needs Chrome on system)
 */

import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const FIGMA_TOKEN    = process.env.FIGMA_TOKEN    || '';
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || 'J8KBmabkAib4juDXK5UmF5';

if (!FIGMA_TOKEN) {
  console.error('❌ Set FIGMA_TOKEN env var: export FIGMA_TOKEN=your_personal_access_token');
  process.exit(1);
}

// ── Screen definitions ────────────────────────────────────────────
const SCREENS = [
  { id: 'screen-1', name: 'S1 · 上传照片 · Empty',    label: 'Step 1 · Empty\n上传照片（空状态）' },
  { id: 'screen-2', name: 'S2 · 上传照片 · Uploaded', label: 'Step 1 · Uploaded\n照片已上传 + AI 识别' },
  { id: 'screen-3', name: 'S3 · 填写信息 · Empty',    label: 'Step 2 · Empty\n填写信息（空表单）' },
  { id: 'screen-4', name: 'S4 · 填写信息 · Filled',   label: 'Step 2 · Filled\n可乐 / 活泼 / 吃播' },
  { id: 'screen-5', name: 'S5 · 确认 IP · Preview',   label: 'Step 3 · Preview\nIP 诞生 → 开始养成' },
];

// ── Figma API helper ──────────────────────────────────────────────
function figmaRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.figma.com',
      path,
      method,
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    }, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch { resolve({ status: res.statusCode, raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Upload a PNG buffer to Figma, returns imageRef hash
async function uploadImage(pngBuffer) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.figma.com',
      path: `/v1/images`,
      method: 'POST',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': 'image/png',
        'Content-Length': pngBuffer.length,
      },
    }, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          resolve(json.meta?.images?.[0] || null);
        } catch { resolve(null); }
      });
    });
    req.on('error', reject);
    req.write(pngBuffer);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  console.log('🐾 Pet-Pop → Figma Pusher');
  console.log('File:', FIGMA_FILE_KEY);

  // 1. Verify token
  console.log('\n① Verifying Figma token...');
  const me = await figmaRequest('GET', '/v1/me');
  if (!me.handle) { console.error('❌ Token invalid:', me); process.exit(1); }
  console.log('✓ Logged in as:', me.handle, `(${me.email})`);

  // 2. Launch browser and screenshot each state
  console.log('\n② Launching browser to capture screens...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });

  const htmlPath = `file://${ROOT}/onboarding-screens.html`;
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  // Wait for Google Fonts (or timeout gracefully)
  await new Promise(r => setTimeout(r, 2000));

  const screenshots = [];
  for (const screen of SCREENS) {
    const el = await page.$(`#${screen.id}`);
    if (!el) { console.warn(`⚠️  #${screen.id} not found, skipping`); continue; }
    const buf = await el.screenshot({ type: 'png' });
    screenshots.push({ ...screen, png: buf });
    console.log(`  📸 ${screen.name}`);
  }
  await browser.close();

  // 3. Get or create "Onboarding Screens" page in Figma file
  console.log('\n③ Reading Figma file...');
  const fileData = await figmaRequest('GET', `/v1/files/${FIGMA_FILE_KEY}?depth=1`);
  if (fileData.err) { console.error('❌ Cannot read file:', fileData.err); process.exit(1); }

  let targetPage = fileData.document?.children?.find(p => p.name === 'Onboarding Screens');

  if (!targetPage) {
    console.log('  Creating "Onboarding Screens" page...');
    // Note: Figma REST API doesn't support creating pages directly.
    // We'll use the first available page and add frames there.
    targetPage = fileData.document?.children?.[0];
    console.log(`  Using page: "${targetPage?.name}"`);
  } else {
    console.log(`  Found page: "${targetPage.name}"`);
  }

  if (!targetPage?.id) { console.error('❌ No page found in file'); process.exit(1); }

  // 4. Upload images and create frames
  console.log('\n④ Uploading images to Figma...');
  const GAP = 40;
  const frameNodes = [];

  for (let i = 0; i < screenshots.length; i++) {
    const screen = screenshots[i];
    console.log(`  ↑ Uploading ${screen.name}...`);

    // Upload image
    const imageRef = await uploadImage(screen.png);
    if (!imageRef) {
      console.warn(`  ⚠️  Image upload not supported via REST API for "${screen.name}"`);
      // Fall back to creating frame without image
    }

    const frameNode = {
      type: 'FRAME',
      name: screen.name,
      x: i * (390 + GAP),
      y: 0,
      width: 390,
      height: 844,
      cornerRadius: 44,
      fills: imageRef
        ? [{ type: 'IMAGE', imageRef, scaleMode: 'FILL' }]
        : [{ type: 'SOLID', color: { r: 1, g: 0.98, b: 0.94, a: 1 } }],
      children: [
        {
          type: 'TEXT',
          name: 'label',
          x: 0, y: 860,
          characters: screen.label,
          style: { fontFamily: 'Inter', fontWeight: 700, fontSize: 13 },
          fills: [{ type: 'SOLID', color: { r: 0.22, g: 0.25, b: 0.32, a: 1 } }],
        },
      ],
    };
    frameNodes.push(frameNode);
  }

  // 5. Post nodes to Figma
  console.log('\n⑤ Creating frames in Figma...');
  const result = await figmaRequest('POST', `/v1/files/${FIGMA_FILE_KEY}/nodes`, {
    nodes: frameNodes,
    parentId: targetPage.id,
  });

  if (result.err || result.error) {
    console.error('\n❌ Figma API error:', result.err || result.error);
    console.log('\n💡 The Figma REST API has limited write support.');
    console.log('   Use the Figma Plugin instead:');
    console.log('   1. Open https://www.figma.com/design/' + FIGMA_FILE_KEY);
    console.log('   2. Plugins → Development → Import plugin from manifest');
    console.log('   3. Select figma-plugin/manifest.json');
    console.log('   4. Run the plugin — all 5 screens will be created automatically');
    process.exit(1);
  }

  console.log('\n✅ Done! All', screenshots.length, 'screens pushed to Figma.');
  console.log('   Open: https://www.figma.com/design/' + FIGMA_FILE_KEY);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
