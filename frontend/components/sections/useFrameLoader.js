import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 191; // 216 - 26 + 1
const getFramePath = (i) => {
  const frameNum = i + 26;
  return `/ohhooo/ezgif-frame-${String(frameNum).padStart(3, '0')}.png`;
};

export function useFrameLoader() {
  const images = useRef([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    images.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setReady(true);
      };
      // In case of error, still count it so we don't hang forever
      img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setReady(true);
      };
      return img;
    });
  }, []);

  return { images: images.current, progress, ready, frameCount: FRAME_COUNT };
}
