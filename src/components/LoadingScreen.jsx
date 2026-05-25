import React, { useEffect, useState } from 'react';
import Preloader from './Preloader';

export default function LoadingScreen({ onLoadingComplete }) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Smooth progress animation using requestAnimationFrame
        const duration = 3000; // 3 seconds
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(Math.round(newProgress));

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                setVisible(false);
                setTimeout(() => onLoadingComplete(), 900); // Allow fade out animation to complete
            }
        };

        requestAnimationFrame(updateProgress);
    }, [onLoadingComplete]);

    return <Preloader progress={progress} visible={visible} />;
}
