import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import SortingBackground from './components/SortingBackground';
import AICloneWidget from './components/AICloneWidget';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent browser from remembering scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading"
            onLoadingComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative bg-black text-white overflow-x-clip">
        {/* Sorting Visualizer Background - Full App */}
        <div className="fixed inset-0 z-0 flex items-end pb-0">
          <SortingBackground />
        </div>

        {/* Minimal Grid Overlay */}
        <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navigation />

          <main>
            <Hero isAppLoaded={!isLoading} />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <Footer />

          <BackToTop />
          <AICloneWidget />
        </div>
      </div>
    </>
  );
}

export default App;
