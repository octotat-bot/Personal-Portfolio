import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildShapes, rng, RERANK_QUERY, RERANK_PICKS } from './shapes';

// A WebGL particle field that fills its parent (a sticky "stage" card in the
// Work section). Any element with data-shape="<name>" is an anchor: as it
// scrolls past the middle of the viewport the field holds that shape, then
// morphs into the next anchor's shape — the same scrubbed-frame feel as the
// hero sequence. Particles are drawn as dark ink on the light card.
//
// Hover highlighting: dispatch `particles:highlight` with { detail: index }
// (or null) to brighten one group in the ring shape.

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function ParticleField({ projectCount, timelineCount, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined; // No WebGL: the page works without the field.
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;
    const N = small ? 4200 : 7000;
    const shapes = buildShapes(N, { projectCount, timelineCount });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const group = new THREE.Group();
    scene.add(group);

    const first = shapes.sphere;
    const pos = new Float32Array(first.p);
    const lum = new Float32Array(first.l);
    const grp = new Float32Array(first.g);
    const seed = new Float32Array(N);
    const r = rng(7);
    for (let i = 0; i < N; i++) seed[i] = r();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aLum', new THREE.BufferAttribute(lum, 1));
    geo.setAttribute('aGroup', new THREE.BufferAttribute(grp, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPx: { value: renderer.getPixelRatio() },
      uDim: { value: 1 },
      uHi: { value: -10 },
    };
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms,
      vertexShader: `
        attribute float aLum; attribute float aGroup; attribute float aSeed;
        uniform float uTime; uniform float uPx; uniform float uHi;
        varying float vL;
        void main(){
          vec3 p = position + 0.012 * vec3(sin(uTime*.7 + aSeed*40.), cos(uTime*.6 + aSeed*31.), sin(uTime*.5 + aSeed*17.));
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_Position = projectionMatrix * mv;
          float hi = (aGroup >= 0. && abs(aGroup - uHi) < .5) ? 1. : 0.;
          float l = mix(aLum, 1., hi);
          gl_PointSize = (1.6 + l * 2.0 + hi * 1.4) * uPx * (7.5 / -mv.z);
          vL = l;
        }`,
      fragmentShader: `
        uniform float uDim; varying float vL;
        void main(){
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          // Bright particles shift from ink toward the cobalt accent.
          vec3 ink = vec3(.08, .08, .08), accent = vec3(.184, .271, .91);
          vec3 c = mix(ink, accent, smoothstep(.85, 1., vL));
          gl_FragColor = vec4(c, smoothstep(.5, .15, d) * (.15 + vL * .75) * uDim);
        }`,
    });
    group.add(new THREE.Points(geo, material));

    // Query point and its four retrieved chunks, shown around the reranked shape.
    const q = new THREE.Vector3(...RERANK_QUERY);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x2f45e8, transparent: true, opacity: 0 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints(RERANK_PICKS.flatMap((p) => [q.clone(), new THREE.Vector3(...p)]));
    group.add(new THREE.LineSegments(lineGeo, lineMat));
    const qMat = new THREE.PointsMaterial({ color: 0x2f45e8, size: 0.16, transparent: true, opacity: 0 });
    const qGeo = new THREE.BufferGeometry().setFromPoints([q]);
    group.add(new THREE.Points(qGeo, qMat));

    const host = canvas.parentElement;
    const resize = () => {
      const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull back on narrow or short stages so shapes are never cropped.
      const aspect = w / h;
      // Taller-than-wide stages pull back so the widest shape (the ring) still fits.
      camera.position.set(0, 0, aspect >= 1 ? 8.6 : Math.min(16, 9.2 / aspect));
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let mx = 0, my = 0;
    const onPointer = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    if (!reduce) window.addEventListener('pointermove', onPointer, { passive: true });

    const onHighlight = (e) => { uniforms.uHi.value = e.detail == null ? -10 : e.detail; };
    window.addEventListener('particles:highlight', onHighlight);

    // Scroll position → (anchor index, progress to next anchor).
    let anchors = [];
    const collect = () => { anchors = [...document.querySelectorAll('[data-shape]')]; };
    collect();
    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });

    const readTarget = () => {
      if (!anchors.length) return { idx: 0 };
      const ref = window.innerHeight * 0.5;
      const tops = anchors.map((a) => a.getBoundingClientRect().top);
      let i = 0;
      while (i < tops.length - 1 && tops[i + 1] <= ref) i++;
      const span = i < tops.length - 1 ? tops[i + 1] - tops[i] : 1;
      const frac = i < tops.length - 1 ? clamp01((ref - tops[i]) / span) : 0;
      return { idx: i + frac };
    };

    let current = readTarget().idx;
    let raf = 0;
    const clock = new THREE.Clock();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const { idx } = readTarget();
      // Off-screen stage: skip the work.
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      current += reduce ? idx - current : (idx - current) * 0.08;
      const names = anchors.map((a) => a.dataset.shape);
      const i = Math.min(names.length - 2, Math.max(0, Math.floor(current)));
      const A = shapes[names[i]] ?? shapes.sphere;
      const B = shapes[names[i + 1]] ?? A;
      // Hold each shape while its text is on screen, then morph as the next
      // scene's text scrolls in (the last ~45% of the distance between anchors).
      const f = names.length < 2 ? 0 : ease(clamp01((current - i - 0.55) / 0.4));

      for (let k = 0; k < N; k++) {
        // Seed-staggered so the morph ripples through the field.
        const s = reduce ? f : clamp01(f * 1.35 - seed[k] * 0.35);
        const k3 = k * 3;
        pos[k3] = A.p[k3] + (B.p[k3] - A.p[k3]) * s;
        pos[k3 + 1] = A.p[k3 + 1] + (B.p[k3 + 1] - A.p[k3 + 1]) * s;
        pos[k3 + 2] = A.p[k3 + 2] + (B.p[k3 + 2] - A.p[k3 + 2]) * s;
        lum[k] = A.l[k] + (B.l[k] - A.l[k]) * s;
        grp[k] = s < 0.5 ? A.g[k] : B.g[k];
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aLum.needsUpdate = true;
      geo.attributes.aGroup.needsUpdate = true;

      const t = clock.getElapsedTime();
      group.rotation.x = A.rot[0] + (B.rot[0] - A.rot[0]) * f + my * 0.12;
      group.rotation.y = (reduce ? 0 : t * 0.06) + A.rot[1] + (B.rot[1] - A.rot[1]) * f + mx * 0.25;
      uniforms.uDim.value = A.dim + (B.dim - A.dim) * f;
      uniforms.uTime.value = reduce ? 0 : t;

      // Query lines belong to the reranked shape only, so they fade with its morph.
      const near = (names[i] === 'reranked' ? 1 - f : 0) + (names[i + 1] === 'reranked' ? f : 0);
      lineMat.opacity = 0.55 * near;
      qMat.opacity = near;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('particles:highlight', onHighlight);
      geo.dispose(); material.dispose(); lineGeo.dispose(); lineMat.dispose(); qGeo.dispose(); qMat.dispose();
      renderer.dispose();
    };
  }, [projectCount, timelineCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full pointer-events-none ${className}`}
    />
  );
}
