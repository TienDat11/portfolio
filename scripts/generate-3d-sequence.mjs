// Renders the 60-frame dual-device 3D sequence (MacBook Pro + iPhone 16 Pro)
// and encodes it to public/sequence as WebP frames, MP4 and WebM.
//
// Usage:
//   node scripts/generate-3d-sequence.mjs            # full render + encode
//   node scripts/generate-3d-sequence.mjs --preview  # render 1,20,21,40,41,60 to a temp dir only
//
// Requires: scripts/render-3d deps (npm install there), ffmpeg on PATH with
// libwebp, libx264 and libvpx-vp9, and a Chromium-based browser (Edge/Chrome).
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, writeFile, readdir, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const renderDir = join(here, 'render-3d');
const outDir = resolve(here, '..', 'public', 'sequence');
const require = createRequire(join(renderDir, 'package.json'));
const puppeteer = require('puppeteer-core');

const W = 1280;
const H = 800;
const FRAMES = 60;
const FPS = 60;
const WEBP_QUALITY = process.env.WEBP_QUALITY ?? '90';
const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const PREVIEW = process.argv.includes('--preview');

const BROWSER_CANDIDATES = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].filter(Boolean);

const pad2 = (n) => String(n).padStart(2, '0');

function findBrowser() {
  const hit = BROWSER_CANDIDATES.find((p) => existsSync(p));
  if (!hit) throw new Error('No Chromium-based browser found; set BROWSER_PATH');
  return hit;
}

function run(cmd, args) {
  return new Promise((ok, fail) => {
    execFile(cmd, args, { maxBuffer: 1 << 26 }, (err, _out, stderr) => {
      if (err) fail(new Error(`${cmd} failed: ${stderr || err.message}`));
      else ok();
    });
  });
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };

function startServer() {
  const server = createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const rel = pathname === '/' ? 'stage.html' : pathname.replace(/^\/+/, '');
    const file = resolve(renderDir, rel);
    if (!file.startsWith(renderDir)) {
      res.writeHead(403).end();
      return;
    }
    const stream = createReadStream(file);
    stream.on('error', () => res.writeHead(404).end());
    stream.on('open', () => res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' }));
    stream.pipe(res);
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

async function renderFrames(outPath, frameList) {
  const server = await startServer();
  const { port } = server.address();
  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: true,
    defaultViewport: { width: W, height: H },
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-first-run'],
  });
  try {
    const page = await browser.newPage();
    page.on('pageerror', (e) => console.error('[page error]', e.message));
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error('[page]', m.text()); });
    await page.goto(`http://127.0.0.1:${port}/stage.html`, { waitUntil: 'load' });
    await page.waitForFunction('window.__ready === true', { timeout: 120000 });
    for (const f of frameList) {
      const dataUrl = await page.evaluate((n) => window.renderFrame(n), f);
      await writeFile(join(outPath, `frame-${pad2(f)}.png`), Buffer.from(dataUrl.split(',')[1], 'base64'));
      process.stdout.write(`\rrendered frame ${f}/${FRAMES}   `);
    }
    process.stdout.write('\n');
  } finally {
    await browser.close();
    server.close();
  }
}

async function main() {
  const tmp = PREVIEW ? join(tmpdir(), 'stage3d-preview') : await mkdtemp(join(tmpdir(), 'stage3d-'));
  await mkdir(tmp, { recursive: true });
  try {
    if (PREVIEW) {
      const list = [1, 20, 21, 40, 41, 60];
      await renderFrames(tmp, list);
      console.log(`preview frames in ${tmp}`);
      return;
    }
    const all = Array.from({ length: FRAMES }, (_, i) => i + 1);
    await renderFrames(tmp, all);

    await mkdir(outDir, { recursive: true });
    const seqPattern = join(tmp, 'frame-%02d.png');

    console.log('encoding WebP frames…');
    await run(FFMPEG, [
      '-y', '-v', 'error', '-start_number', '1', '-i', seqPattern,
      '-c:v', 'libwebp', '-quality', WEBP_QUALITY, '-compression_level', '6', '-preset', 'picture',
      join(outDir, 'frame-%02d.webp'),
    ]);

    console.log('encoding MP4 (H.264, all-intra)…');
    await run(FFMPEG, [
      '-y', '-v', 'error', '-framerate', String(FPS), '-start_number', '1', '-i', seqPattern,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
      '-g', '1', '-keyint_min', '1', '-sc_threshold', '0', '-movflags', '+faststart', '-an',
      join(outDir, 'hero-showcase.mp4'),
    ]);

    console.log('encoding WebM (VP9, all-intra)…');
    await run(FFMPEG, [
      '-y', '-v', 'error', '-framerate', String(FPS), '-start_number', '1', '-i', seqPattern,
      '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-deadline', 'good', '-cpu-used', '2',
      '-row-mt', '1', '-g', '1', '-pix_fmt', 'yuv420p', '-an',
      join(outDir, 'hero-showcase.webm'),
    ]);

    const files = (await readdir(outDir)).filter((f) => /^frame-\d{2}\.webp$/.test(f)).sort();
    console.log(`done: ${files.length} WebP frames, MP4 + WebM in ${outDir}`);
    for (const f of [...files.slice(0, 1), ...files.slice(-1)]) {
      console.log(`  ${f} ${(await stat(join(outDir, f))).size} bytes`);
    }
  } finally {
    if (!PREVIEW) await rm(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
