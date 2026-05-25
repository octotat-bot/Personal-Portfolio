import React, { useRef, useEffect, useCallback, useState } from 'react';
import LiveActivity from './LiveActivity';
import { useFrameLoader } from './useFrameLoader';
import { useScrollProgress } from './useScrollProgress';
import { TEXT_BLOCKS } from './textBlocks';
import styles from './HeroSequence.module.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const lastFrame  = useRef(-1);

  const { images, progress: loadProgress, ready, frameCount } = useFrameLoader();
  const scrollProgress = useScrollProgress(sectionRef);

  // ── Lock scroll until all frames loaded ──────────────────
  useEffect(() => {
    document.body.style.overflow = ready ? 'auto' : 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [ready]);

  // ── Draw frame — SHARP, NO BLUR ──────────────────────────
  const drawFrame = useCallback((idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = images[idx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Scale image to fill the canvas height, plus a 10% zoom to crop the top headroom
    let scale = (ch / ih) * 1.10; 

    const sw = iw * scale;
    const sh = ih * scale;

    // Right-anchor: flush to right edge
    const sx = cw - sw;
    
    // Bottom-anchor: flush to bottom edge to eliminate the thick gap underneath
    const sy = ch - sh;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
    lastFrame.current = idx;
  }, [images]);

  // ── Resize canvas to container — prevents blur from CSS scaling ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      // Removed ctx.scale(dpr, dpr) to prevent double-scaling
      drawFrame(lastFrame.current >= 0 ? lastFrame.current : 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // ── Drive frame from scroll ───────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const idx = Math.min(frameCount - 1, Math.floor(scrollProgress * frameCount));
    if (idx !== lastFrame.current) drawFrame(idx);
  }, [scrollProgress, ready, drawFrame, frameCount]);

  // ── Draw first frame once loaded ─────────────────────────
  useEffect(() => {
    if (ready) drawFrame(0);
  }, [ready, drawFrame]);

  return (
    <>
      {/* ── Preloader is now globally managed in LoadingScreen.jsx ── */}

      {/* ── Hero section — tall enough for scroll room ── */}
      <section ref={sectionRef} id="home" className={styles.section}>
        <div className={styles.sticky}>

          {/* Canvas — photo sequence renders here */}
          <canvas
            ref={canvasRef}
            className={styles.canvas}
          />

          {/* Grain texture overlay */}
          <div className={styles.grain} aria-hidden />

          {/* Vignette for depth */}
          <div className={styles.vignette} aria-hidden />

          {/* Text reveals */}
          <div className={styles.textLayer}>
            {TEXT_BLOCKS.map(block => (
              <TextReveal
                key={block.id}
                block={block}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>

          {/* ── Live Activity Widget ── */}
          <LiveActivity ready={ready} scrollProgress={scrollProgress} />

          {/* Scroll hint — disappears after first scroll */}
          <div
            className={`${styles.scrollHint} ${scrollProgress > 0.04 ? styles.hidden : ''}`}
            aria-hidden
          >
            <span className={styles.scrollLabel}>scroll</span>
            <div className={styles.scrollLine} />
          </div>

          {/* Frame counter — subtle dev detail */}
          <div className={styles.frameCounter} aria-hidden>
            {String(Math.floor(scrollProgress * frameCount) + 1).padStart(3, '0')} / {frameCount}
          </div>



        </div>
      </section>
    </>
  );
}

// ── Word-by-word fade-up reveal ───────────────────────────────────────────────
function TextReveal({ block, scrollProgress }) {
  const visible = scrollProgress >= block.revealAt;

  return (
    <div className={`${styles.revealBlock} ${styles[block.style]}`}>
      {block.words.map((word, i) => (
        <span
          key={i}
          className={`${styles.word} ${visible ? styles.wordUp : ''}`}
          style={{
            transitionDelay: visible ? `${i * block.staggerMs}ms` : '0ms',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
