import React from 'react';
import styles from './Preloader.module.css';
import { SpiralAnimation } from '@/components/ui/spiral-animation';

export default function Preloader({ progress, visible }) {
  return (
    <div className={`${styles.preloader} ${!visible ? styles.exit : ''}`}>
      {/* Spiral Animation instead of Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpiralAnimation />
      </div>

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
