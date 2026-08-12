/**
 * Confirms the WebP sequence reproduces the original timeline step for step:
 * step N must resolve to an image matching source frame 26+N.
 *
 * Usage: node scripts/verify-hero-frames.mjs
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'public', 'ohhooo');
const OUT_DIR = join(ROOT, 'public', 'hero-frames');
const TMP = '/tmp/verify-hero';
mkdirSync(TMP, { recursive: true });

const { FRAME_SEQUENCE, UNIQUE_FRAME_COUNT } = await import(
  join(ROOT, 'frontend', 'components', 'sections', 'frameManifest.js')
);

const FIRST = 26;
const srcPath = (n) => join(SRC_DIR, `ezgif-frame-${String(n).padStart(3, '0')}.png`);
const webpPath = (slot) => join(OUT_DIR, `f${String(slot).padStart(3, '0')}.webp`);

let fail = 0;

if (FRAME_SEQUENCE.length !== 191) {
  console.error(`FAIL: sequence has ${FRAME_SEQUENCE.length} steps, expected 191`);
  fail++;
}

const maxSlot = Math.max(...FRAME_SEQUENCE);
if (maxSlot !== UNIQUE_FRAME_COUNT - 1) {
  console.error(`FAIL: max slot ${maxSlot} but UNIQUE_FRAME_COUNT ${UNIQUE_FRAME_COUNT}`);
  fail++;
}

for (let slot = 0; slot < UNIQUE_FRAME_COUNT; slot++) {
  if (!existsSync(webpPath(slot))) {
    console.error(`FAIL: missing ${webpPath(slot)}`);
    fail++;
  }
}

const ssim = (a, b) => {
  const { stdout, stderr } = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-i', a, '-i', b, '-lavfi', 'ssim', '-f', 'null', '-'],
    { encoding: 'utf8' }
  );
  return parseFloat(/All:([0-9.]+)/.exec(`${stdout}${stderr}`)?.[1] ?? 'NaN');
};

// Sample across the whole timeline, including held-frame boundaries.
const steps = [0, 1, 2, 47, 95, 100, 143, 189, 190];
let worst = 1;

for (const step of steps) {
  const slot = FRAME_SEQUENCE[step];
  const original = srcPath(FIRST + step);
  const decoded = join(TMP, `step${step}.png`);
  execFileSync('dwebp', ['-quiet', webpPath(slot), '-o', decoded]);

  const score = ssim(decoded, original);
  worst = Math.min(worst, score);
  const ok = score > 0.9;
  if (!ok) fail++;
  console.log(
    `step ${String(step).padStart(3)} -> slot ${String(slot).padStart(3)} ` +
      `vs frame ${FIRST + step}: SSIM ${score.toFixed(4)} ${ok ? 'ok' : 'MISMATCH'}`
  );
}

console.log(`\nheld frames: ${FRAME_SEQUENCE.length - UNIQUE_FRAME_COUNT} steps reuse an earlier image`);
console.log(`worst sampled SSIM: ${worst.toFixed(4)}`);
console.log(fail === 0 ? 'PASS' : `FAIL (${fail} problems)`);
process.exit(fail === 0 ? 0 : 1);
