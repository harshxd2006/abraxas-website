import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Contact from './components/Contact/Contact';
import Starfield from './components/star/Starfield';
import Projects from './components/Project/Project';
import Timeline from './components/Timeline/Timeline';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import Events from './components/Events/Events';
import IntroAnimation from './components/intro/IntroAnimation';

const Team = lazy(() => import('./components/team/Team'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <p
      style={{ fontFamily: "'Syne', sans-serif" }}
      className="text-white/40 tracking-widest text-sm animate-pulse"
    >
      Loading...
    </p>
  </div>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      const galleryContainer = document.querySelector('.h-screen.overflow-y-auto');
      if (galleryContainer) {
        galleryContainer.scrollTop = 0;
      }
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <div style={{ width: '100vw' }}>
          <Router>
            <ScrollToTop />
            <section id="Navbar">
              <Navbar />
            </section>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={
                  <>
                    <Starfield
                      starCount={window.innerWidth < 768 ? 1000 : 2500}
                      starColor={[255, 255, 255]}
                      speedFactor={0.15}
                      backgroundColor="black"
                    />
                    <Hero />
                    <section id="About" className="relative z-10 bg-black">
                      <About />
                    </section>

                    <div
                      id="Projects"
                      style={{ height: 'auto', overflow: 'visible', position: 'relative' }}
                    >
                      <Projects />
                    </div>

                    <section id="Events">
                      <Events />
                    </section>
                    <section id="Timeline">
                      <Timeline />
                    </section>
                    <section id="Contact">
                      <Contact />
                    </section>
                    <section id="Footer">
                      <Footer />
                    </section>
                  </>
                } />
                <Route path="/Team" element={
                  <div style={{ height: 'auto', overflow: 'visible', background: '#000' }}>
                    <Team />
                  </div>
                } />
                <Route path="/Gallery" element={<Gallery />} />
              </Routes>
            </Suspense>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;