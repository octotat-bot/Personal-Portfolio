import React, { useEffect, useRef } from 'react';
import styles from './Preloader.module.css';

export default function Preloader({ progress, visible }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(0);
  const stateRef  = useRef({
    drops: [],
    tendrils: [],
    spawnTimer: 0,
    spawnInterval: 3,
    totalSpawned: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    // ── Ink Drop ──────────────────────────────────────────
    class InkDrop {
      constructor(x, y, size, speed, opacity){
        this.x = x; this.y = y; this.maxR = size; this.speed = speed; this.opacity = opacity;
        this.r = 0;
        this.done = false;
        this.branches = [];
        this.branchTimer = 0;
        this.branchInterval = 6 + Math.random() * 8;
      }

      update(){
        if(this.r < this.maxR){
          this.r += this.speed;
          this.branchTimer++;
          if(this.branchTimer > this.branchInterval && this.branches.length < 4 && this.r > 10){
            this.branchTimer = 0;
            const angle = Math.random() * Math.PI * 2;
            const dist  = this.r * (0.5 + Math.random() * 0.4);
            this.branches.push({
              x: this.x + Math.cos(angle) * dist,
              y: this.y + Math.sin(angle) * dist,
              r: 0,
              maxR: this.r * (0.2 + Math.random() * 0.35),
              speed: this.speed * 0.7,
            });
          }
        } else { this.done = true; }
        this.branches.forEach(b => { if(b.r < b.maxR) b.r += b.speed; });
      }

      draw(ctx){
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0,   `rgba(255,255,255,${this.opacity})`);
        grad.addColorStop(0.6, `rgba(255,255,255,${this.opacity * 0.7})`);
        grad.addColorStop(1,   `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        this.branches.forEach(b => {
          if(b.r <= 0) return;
          const bg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          bg.addColorStop(0, `rgba(255,255,255,${this.opacity * 0.5})`);
          bg.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = bg;
          ctx.fill();
        });
      }
    }

    // ── Ink Tendril ───────────────────────────────────────
    class InkTendril {
      constructor(x, y){
        this.points = [{x, y}];
        this.angle  = Math.random() * Math.PI * 2;
        this.maxLen = 30 + Math.random() * 80;
        this.speed  = 1.5 + Math.random() * 2;
        this.opacity= 0.04 + Math.random() * 0.1;
        this.wobble = (Math.random() - 0.5) * 0.3;
        this.len = 0;
        this.done = false;
      }

      update(){
        if(this.len < this.maxLen){
          this.angle += this.wobble * (Math.random() - 0.5);
          const last = this.points[this.points.length - 1];
          this.points.push({
            x: last.x + Math.cos(this.angle) * this.speed,
            y: last.y + Math.sin(this.angle) * this.speed,
          });
          this.len += this.speed;
        } else { this.done = true; }
      }

      draw(ctx){
        if(this.points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        this.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.lineWidth   = 0.5 + Math.random() * 0.5;
        ctx.stroke();
      }
    }

    const MAX_DROPS = 38;
    const s = stateRef.current;

    const spawnDrop = () => {
      const cx = W() / 2, cy = H() / 2;
      const spread = Math.min(W(), H()) * 0.42;
      const angle  = Math.random() * Math.PI * 2;
      const dist   = Math.random() * spread;
      s.drops.push(new InkDrop(
        cx + Math.cos(angle) * dist,
        cy + Math.sin(angle) * dist,
        20 + Math.random() * 80,
        0.4 + Math.random() * 0.8,
        0.015 + Math.random() * 0.06,
      ));
      for(let i=0; i<3; i++){
        s.tendrils.push(new InkTendril(
          cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 30,
          cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 30,
        ));
      }
      s.totalSpawned++;
      if(s.totalSpawned > MAX_DROPS * 0.3) s.spawnInterval = 2;
      if(s.totalSpawned > MAX_DROPS * 0.6) s.spawnInterval = 1;
    };

    // Seed immediately
    for(let i=0; i<4; i++) spawnDrop();

    const loop = () => {
      ctx.clearRect(0, 0, W(), H());

      s.spawnTimer++;
      if(s.spawnTimer >= s.spawnInterval && s.totalSpawned < MAX_DROPS){
        s.spawnTimer = 0;
        spawnDrop();
      }

      s.drops.forEach(d => { d.update(); d.draw(ctx); });
      s.tendrils.forEach(t => { t.update(); t.draw(ctx); });

      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`${styles.preloader} ${!visible ? styles.exit : ''}`}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        <div className={styles.monogram}>MM</div>
        <div className={styles.divider} />
        <div className={styles.name}>Mukund Mangla</div>

        <div className={styles.barWrap}>
          <div className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.pct}>{progress}%</div>
      </div>

      <div className={styles.label}>Loading experience</div>
    </div>
  );
}
