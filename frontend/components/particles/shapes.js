// Particle shapes for the scroll story. Each builder returns, for every
// particle, a target position (p), a brightness (l) and a group id (g) used
// for hover highlighting. Builders are deterministic so the same seed always
// gives the same picture.

export function rng(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussFrom(r) {
  return () => {
    let u = 0, v = 0;
    while (!u) u = r();
    while (!v) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}

function alloc(n) {
  return { p: new Float32Array(n * 3), l: new Float32Array(n), g: new Float32Array(n).fill(-1) };
}

export function sphere(n) {
  const s = alloc(n), r = rng(1), g = gaussFrom(r);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.399963;
    const R = 2.1 + g() * 0.03;
    s.p.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
    s.l[i] = 0.35 + 0.4 * r();
  }
  return s;
}

// Embedding space: cluster 0 is the file that crowds out the rest; cluster 3
// is the one reranking lets through. Shared by the "clusters" and "reranked"
// shapes so the second is a pure brightness change.
const CENTERS = [[0.5, 0.35, 0], [-1.9, 1.1, -0.6], [1.6, -1.5, 0.8], [-1.3, -1.2, 0.6], [2.1, 1.3, 0.7], [-0.4, 1.9, -1.2], [0.6, -1.9, 1.1], [-2.4, -0.1, -1.5]];
export const OTHER_CLUSTER = 3;
export const RERANK_QUERY = [-0.1, -0.2, 2.4];
export const RERANK_PICKS = [[0.45, 0.55, 0.15], [0.75, 0.1, -0.1], [0.2, 0.3, 0.3], CENTERS[OTHER_CLUSTER]];

export function clusters(n, reranked) {
  const s = alloc(n), pick = rng(5), r = rng(11), g = gaussFrom(r);
  for (let i = 0; i < n; i++) {
    const c = pick() < 0.38 ? 0 : 1 + Math.floor(pick() * 7);
    const sd = c === 0 ? 0.42 : 0.3, C = CENTERS[c];
    s.p.set([C[0] + g() * sd, C[1] + g() * sd, C[2] + g() * sd], i * 3);
    if (!reranked) s.l[i] = c === 0 ? 0.95 : 0.16;
    else s.l[i] = c === 0 ? 0.62 : c === OTHER_CLUSTER ? 1 : 0.12;
  }
  return s;
}

// Six fanned PDF pages made of dotted text lines; page 4 carries a lit passage.
export function pages(n) {
  const s = alloc(n), r = rng(3), g = gaussFrom(r);
  // Page resolution scales with the particle budget (fewer on phones).
  const PAGES = 6, budget = Math.floor((n * 0.97) / PAGES);
  const COLS = Math.round(Math.sqrt(budget * (34 / 44))), ROWS = Math.floor(budget / COLS), per = COLS * ROWS;
  const citedFrom = Math.round(ROWS * 0.55), citedTo = Math.round(ROWS * 0.72);
  for (let i = 0; i < n; i++) {
    const k = Math.floor(i / per);
    if (k < PAGES) {
      const j = i % per, cx = j % COLS, cy = Math.floor(j / COLS);
      const x = (cx / (COLS - 1) - 0.5) * 2.2, y = (cy / (ROWS - 1) - 0.5) * 3.0;
      const ang = (k - (PAGES - 1) / 2) * 0.42, z0 = (k - (PAGES - 1) / 2) * 0.22;
      s.p.set([x * Math.cos(ang) + 0.9 * Math.sin(ang) + 0.4, y, -x * Math.sin(ang) + z0], i * 3);
      const isLine = cy % 3 !== 0 && cx > 2 && cx < COLS - 3;
      const cited = k === 3 && cy >= citedFrom && cy <= citedTo && isLine;
      s.l[i] = cited ? 1 : isLine ? (k === 3 ? 0.5 : 0.3) : 0.07;
    } else {
      s.p.set([g() * 3.2, g() * 2.2, g() * 2.2 - 1], i * 3);
      s.l[i] = 0.06;
    }
  }
  return s;
}

// One small cluster per project on a tilted ring; g = project index.
export function ring(n, count) {
  const s = alloc(n), r = rng(9), g = gaussFrom(r), R = 2.5;
  for (let i = 0; i < n; i++) {
    const k = i % count, a = (k / count) * Math.PI * 2;
    if (r() < 0.82) {
      const cx = Math.cos(a) * R, cz = Math.sin(a) * R, cy = Math.sin(a * 2) * 0.25, sd = 0.2;
      s.p.set([cx + g() * sd, cy + g() * sd, cz + g() * sd], i * 3);
      s.l[i] = 0.55 + 0.3 * r();
      s.g[i] = k;
    } else {
      const t = r() * Math.PI * 2;
      s.p.set([Math.cos(t) * R, Math.sin(t * 2) * 0.25, Math.sin(t) * R], i * 3);
      s.l[i] = 0.14;
    }
  }
  return s;
}

// A vertical thread with one bright knot per timeline entry, newest on top.
export function timeline(n, count) {
  const s = alloc(n), r = rng(13), g = gaussFrom(r), H = 4.4;
  for (let i = 0; i < n; i++) {
    if (r() < 0.55) {
      const k = Math.floor(r() * count), y = H / 2 - (k / Math.max(1, count - 1)) * H, sd = 0.16;
      s.p.set([g() * sd + 0.3, y + g() * sd * 0.6, g() * sd], i * 3);
      s.l[i] = 0.7 + 0.3 * r();
    } else {
      const y = (r() - 0.5) * (H + 1.2), twist = y * 1.3;
      s.p.set([Math.cos(twist) * 0.08 + 0.3 + g() * 0.02, y, Math.sin(twist) * 0.08], i * 3);
      s.l[i] = 0.22;
    }
  }
  return s;
}

// A loose cubic lattice — structure, for the toolkit.
export function lattice(n) {
  const s = alloc(n), r = rng(17), g = gaussFrom(r), SIDE = 9, STEP = 0.5;
  for (let i = 0; i < n; i++) {
    const a = Math.floor(r() * SIDE), b = Math.floor(r() * SIDE), c = Math.floor(r() * SIDE);
    const axis = i % 3, t = (r() - 0.5) * STEP;
    const base = [(a - (SIDE - 1) / 2) * STEP, (b - (SIDE - 1) / 2) * STEP, (c - (SIDE - 1) / 2) * STEP];
    base[axis] += t; // points run along lattice edges
    s.p.set([base[0] + g() * 0.01, base[1] + g() * 0.01, base[2] + g() * 0.01], i * 3);
    s.l[i] = 0.18 + 0.25 * r();
  }
  return s;
}

// Everything settles into one flat ring seen almost edge-on: a horizon, like
// the site's hairline rules. A ring looks the same from every yaw, so the
// field's slow spin never foreshortens it.
export function horizon(n) {
  const s = alloc(n), r = rng(19), g = gaussFrom(r), R = 2.0;
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, rr = R + g() * 0.04;
    s.p.set([Math.cos(a) * rr + 0.9, g() * 0.008, Math.sin(a) * rr], i * 3);
    s.l[i] = 0.3 + 0.35 * r();
  }
  return s;
}

// Shape name → [builder, tilt x, yaw, overall opacity]. Opacity is lower behind
// text-heavy sections so the copy stays readable.
export function buildShapes(n, { projectCount, timelineCount }) {
  return {
    sphere: { ...sphere(n), rot: [0.15, 0], dim: 1 },
    clusters: { ...clusters(n, false), rot: [0.05, 0.2], dim: 1 },
    reranked: { ...clusters(n, true), rot: [0.05, 0.2], dim: 1 },
    pages: { ...pages(n), rot: [0.12, -0.55], dim: 1 },
    ring: { ...ring(n, projectCount), rot: [0.42, 0], dim: 0.9 },
    timeline: { ...timeline(n, timelineCount), rot: [0, 0], dim: 0.55 },
    lattice: { ...lattice(n), rot: [0.5, 0.6], dim: 0.4 },
    horizon: { ...horizon(n), rot: [0.06, 0], dim: 0.6 },
  };
}
