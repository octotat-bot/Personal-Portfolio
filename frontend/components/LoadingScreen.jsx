import React, { useEffect, useRef, useState } from 'react';
import Preloader from './Preloader';

// The preloader's own reveal is choreographed in CSS: the monogram rises at
// 5.0s and the label at 5.4s. Dismissing earlier than that would cut off the
// intro, so this is the floor even when the frames are already cached.
const MIN_DURATION = 6200;

export default function LoadingScreen({ frameProgress = 0, onLoadingComplete }) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const startedAt = useRef(Date.now());
    const frameProgressRef = useRef(frameProgress);

    frameProgressRef.current = frameProgress;

    useEffect(() => {
        let raf;
        let done = false;

        const tick = () => {
            const elapsed = Date.now() - startedAt.current;
            const timePct = Math.min((elapsed / MIN_DURATION) * 100, 100);

            // Readiness is limited by whichever condition is further behind, so
            // the bar only reaches 100 once the intro has played *and* the
            // frames have arrived.
            const next = Math.min(timePct, frameProgressRef.current);
            setProgress(Math.round(next));

            if (next >= 100) {
                done = true;
                setVisible(false);
                setTimeout(() => onLoadingComplete(), 900);
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => {
            if (!done) cancelAnimationFrame(raf);
        };
    }, [onLoadingComplete]);

    return <Preloader progress={progress} visible={visible} />;
}
