import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import AICloneWidget from './components/AICloneWidget';


const INTRO_SEEN_KEY = 'mm:intro-seen';

// Repeat visitors and reduced-motion users go straight to the page.
function shouldSkipIntro() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(() => !shouldSkipIntro());
  // Hero owns the frame sequence, so it tells the preloader when the opening frame is paintable.
  const [heroReady, setHeroReady] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    try {
      localStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Storage blocked (private mode etc.) — the intro just plays again next time.
    }
  }, []);

  useEffect(() => {
    // Prevent browser from remembering scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    // "user" makes every Framer Motion animation honour prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading"
            heroReady={heroReady}
            onLoadingComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      <div className="relative bg-bg text-ink overflow-x-clip">
        <Navigation />

        <main className="relative z-10">
          <Hero isAppLoaded={!isLoading} onFirstFrameReady={setHeroReady} />
          <Projects />
          <About />
          <Skills />
          <Contact />
        </main>

        <div className="relative z-10"><Footer /></div>
        <AICloneWidget />
      </div>
    </MotionConfig>
  );
}

export default App;
