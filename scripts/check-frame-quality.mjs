/**
 * Measures WebP encode quality against the source PNGs across a quality sweep.
 * Usage: node scripts/check-frame-quality.mjs
 */

import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'assets-src', 'hero-frames-png');
const TMP = '/tmp/frame-quality';
mkdirSync(TMP, { recursive: true });

const srcName = (n) => `ezgif-frame-${String(n).padStart(3, '0')}.png`;

// Rebuild the same slot mapping the build script produces.
const seen = new Map();
const slotToSource = [];
for (let n = 26; n <= 216; n++) {
  const path = join(SRC_DIR, srcName(n));
  const hash = createHash('md5').update(readFileSync(path)).digest('hex');
  if (!seen.has(hash)) {
    seen.set(hash, slotToSource.length);
    slotToSource.push({ n, path });
  }
}

// ffmpeg reports filter stats on stderr, so spawnSync is used to read both streams.
const measure = (filter, pattern, a, b) => {
  const { stdout, stderr } = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-i', a, '-i', b, '-lavfi', filter, '-f', 'null', '-'],
    { encoding: 'utf8' }
  );
  return parseFloat(pattern.exec(`${stdout}${stderr}`)?.[1] ?? 'NaN');
};

const ssim = (a, b) => measure('ssim', /All:([0-9.]+)/, a, b);
const psnr = (a, b) => measure('psnr', /psnr_avg:([0-9.]+)/, a, b);

const samples = [0, 40, 76, 120, 152].map((slot) => slotToSource[slot]);

for (const q of [82, 88, 92, 95]) {
  let bytes = 0;
  let ssimSum = 0;
  let psnrSum = 0;

  for (const { n, path } of samples) {
    const webp = join(TMP, `q${q}_${n}.webp`);
    const back = join(TMP, `q${q}_${n}.png`);
    execFileSync('cwebp', ['-quiet', '-q', String(q), '-m', '6', path, '-o', webp]);
    execFileSync('dwebp', ['-quiet', webp, '-o', back]);
    bytes += statSync(webp).size;
    ssimSum += ssim(back, path);
    psnrSum += psnr(back, path);
  }

  const avgKb = bytes / samples.length / 1024;
  const projectedMb = (avgKb * slotToSource.length) / 1024;
  console.log(
    `q${q}: avg ${avgKb.toFixed(0)} KB/frame | SSIM ${(ssimSum / samples.length).toFixed(4)} | ` +
      `PSNR ${(psnrSum / samples.length).toFixed(1)} dB | projected total ${projectedMb.toFixed(1)} MB`
  );
}
