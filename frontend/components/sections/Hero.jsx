import React, { useRef, useEffect, useCallback, useState } from 'react';
import LiveActivity from './LiveActivity';
import { useFrameLoader } from './useFrameLoader';
import { useScrollProgress } from './useScrollProgress';
import { TEXT_BLOCKS } from './textBlocks';
import styles from './HeroSequence.module.css';
import { FloatingPaths } from '../ui/background-paths';

export default function Hero({ isAppLoaded, onLoadProgress }) {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const lastFrame  = useRef(-1);
  // What the scroll position asks for, which may not be downloaded yet.
  const wantedFrame = useRef(0);

  const { frameAt, progress: loadProgress, firstFrameReady, ready, frameCount } = useFrameLoader();
  const scrollProgress = useScrollProgress(sectionRef);

  // ── Report load state to the preloader ───────────────────
  useEffect(() => {
    onLoadProgress?.(loadProgress);
  }, [loadProgress, onLoadProgress]);

  // ── Lock scroll only until something is paintable ────────
  // Remaining frames stream in behind the intro screen; drawFrame holds the
  // last good frame if the user outruns the download.
  useEffect(() => {
    document.body.style.overflow = firstFrameReady ? 'auto' : 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [firstFrameReady]);

  // ── Draw frame — SHARP, NO BLUR ──────────────────────────
  const drawFrame = useCallback((idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = frameAt(idx);
    // Not downloaded yet — leave the previous frame on screen rather than blanking.
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // For mobile portrait, we want to center the subject. For desktop, right-anchor works well.
    const isMobile = cw < 768;
    
    // Scale image to fill the canvas (cover)
    let scale = Math.max(cw / iw, ch / ih);
    // Add a small zoom to crop edges if desired
    scale *= isMobile ? 1.0 : 1.10; 

    const sw = iw * scale;
    const sh = ih * scale;

    // On mobile, center horizontally. On desktop, flush to right edge.
    const sx = isMobile ? (cw - sw) / 2 : (cw - sw);
    
    // Bottom-anchor or center vertically
    const sy = isMobile ? (ch - sh) / 2 : (ch - sh);

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
    lastFrame.current = idx;
  }, [frameAt]);

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
    if (!firstFrameReady) return;
    // The first 15% of scroll is dedicated to the black intro screen.
    // The image sequence starts advancing only after 0.15.
    const sequenceProgress = Math.max(0, (scrollProgress - 0.15) / 0.85);
    const idx = Math.min(frameCount - 1, Math.floor(sequenceProgress * frameCount));
    wantedFrame.current = idx;
    if (idx !== lastFrame.current) drawFrame(idx);
  }, [scrollProgress, firstFrameReady, drawFrame, frameCount]);

  // ── Paint the opening frame as soon as it arrives ────────
  useEffect(() => {
    if (firstFrameReady) drawFrame(0);
  }, [firstFrameReady, drawFrame]);

  // ── Catch up if the user outran the download ──────────────
  // Each newly arrived frame is a chance to satisfy a request drawFrame
  // had to skip because the image was still in flight.
  useEffect(() => {
    if (!firstFrameReady || ready) return;
    if (wantedFrame.current !== lastFrame.current) drawFrame(wantedFrame.current);
  }, [loadProgress, firstFrameReady, ready, drawFrame]);

  const [startVisible, setStartVisible] = useState(false);
  useEffect(() => {
    if (firstFrameReady) {
      const timer = setTimeout(() => {
        setStartVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [firstFrameReady]);

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
          <LiveActivity ready={firstFrameReady} scrollProgress={scrollProgress} />

          {/* Black Intro Screen */}
          <div 
            className="absolute inset-0 bg-black z-30 overflow-hidden"
            style={{ 
              opacity: Math.max(0, 1 - (scrollProgress * 7)), // Fades out fully by ~14% scroll
              transition: 'opacity 0.3s ease-out',
              pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto'
            }}
          >
            {/* Background Paths Animation - Mounts only after Preloader finishes */}
            {isAppLoaded && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
              </div>
            )}
            
            {/* Scroll to Interact Indicator */}
            <div 
              className={`
                absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-10
                transition-all duration-1000 ease-out flex flex-col items-center
                ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <span className="text-white tracking-[0.4em] uppercase text-sm mb-6 animate-pulse pointer-events-none drop-shadow-lg">
                Scroll to interact
              </span>
              
              <div className="w-[1px] h-24 bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
            </div>
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
