import React, { useEffect, useRef, useState } from 'react';
import Preloader from './Preloader';

// Long enough for the monogram to register, short enough that it never stands
// between a visitor and the page. The rest of the hero frames stream in behind
// the first screen, so only the opening frame is waited on.
const MIN_DURATION = 1000;
// Matches the .exit opacity transition in Preloader.module.css.
const EXIT_MS = 450;
// A timer rather than requestAnimationFrame, so dismissal never waits on a
// tab that isn't painting (background tabs, throttled webviews).
const TICK_MS = 50;

export default function LoadingScreen({ heroReady = false, onLoadingComplete }) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const heroReadyRef = useRef(heroReady);

    useEffect(() => {
        heroReadyRef.current = heroReady;
    }, [heroReady]);

    useEffect(() => {
        const startedAt = Date.now();
        let timer;

        const tick = () => {
            const elapsed = Date.now() - startedAt;
            const timePct = Math.min((elapsed / MIN_DURATION) * 100, 100);

            // Hold just short of full until the opening frame has arrived.
            const next = heroReadyRef.current ? timePct : Math.min(timePct, 90);
            setProgress(Math.round(next));

            if (next >= 100) {
                clearInterval(timer);
                setVisible(false);
                setTimeout(() => onLoadingComplete(), EXIT_MS);
            }
        };

        timer = setInterval(tick, TICK_MS);
        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return <Preloader progress={progress} visible={visible} />;
}
