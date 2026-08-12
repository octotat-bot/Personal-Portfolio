import { useEffect, useRef, useState, useCallback } from 'react';
import { FRAME_SEQUENCE, UNIQUE_FRAME_COUNT, framePath } from './frameManifest';

// Slot order matches first appearance in the timeline, so loading slots in
// ascending order means frames arrive in the order the user scrolls through them.
const CONCURRENCY = 8;

export function useFrameLoader() {
  const slots = useRef(null);
  const [progress, setProgress] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [ready, setReady] = useState(false);

  if (slots.current === null) {
    slots.current = new Array(UNIQUE_FRAME_COUNT).fill(null);
  }

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    const loadSlot = (slot) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        slots.current[slot] = img;

        const settle = () => {
          loaded++;
          if (!cancelled) setProgress(Math.round((loaded / UNIQUE_FRAME_COUNT) * 100));
          resolve();
        };

        img.onload = settle;
        img.onerror = settle;
        img.src = framePath(slot);
      });

    (async () => {
      // Give the first frame the network to itself so the canvas can paint early.
      await loadSlot(0);
      if (cancelled) return;
      setFirstFrameReady(true);

      let next = 1;
      const worker = async () => {
        while (!cancelled) {
          const slot = next++;
          if (slot >= UNIQUE_FRAME_COUNT) return;
          await loadSlot(slot);
        }
      };

      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Repeated slots are held frames, so several timeline steps share one Image.
  const frameAt = useCallback((step) => {
    const slot = FRAME_SEQUENCE[step];
    return slot === undefined ? null : slots.current[slot];
  }, []);

  return {
    frameAt,
    progress,
    firstFrameReady,
    ready,
    frameCount: FRAME_SEQUENCE.length,
  };
}
