import { useState, useCallback } from 'react';
import Loader from '../components/Loader';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Process from '../sections/Process';
import Tech from '../sections/Tech';
import Metrics from '../sections/Metrics';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

export default function Home() {
  const [animReady, setAnimReady] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
    setAnimReady(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      <Cursor />
      <Navbar />
      <Hero animReady={animReady} />
      <Ticker />
      <About animReady={animReady} />
      <Services animReady={animReady} />
      <Process animReady={animReady} />
      <Tech animReady={animReady} />
      <Metrics animReady={animReady} />
      <Testimonials />
      <CTA animReady={animReady} />
      <Footer />
    </>
  );
}
