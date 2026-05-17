import { useEffect, useRef } from 'react';

export default function Loader({ onComplete }) {
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18;
      if (pct >= 100) { pct = 100; clearInterval(iv); }
      if (barRef.current) barRef.current.style.width = pct + '%';
      if (pctRef.current) pctRef.current.textContent = Math.floor(pct) + '%';
      if (pct === 100) {
        setTimeout(() => {
          if (window.gsap && loaderRef.current) {
            window.gsap.to(loaderRef.current, {
              opacity: 0, duration: 0.6, onComplete: () => {
                if (loaderRef.current) loaderRef.current.style.display = 'none';
                if (onComplete) onComplete();
              }
            });
          } else {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
            if (onComplete) onComplete();
          }
        }, 300);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <div id="loader" ref={loaderRef}>
      <div className="load-logo">AURONIX</div>
      <div className="load-bar-wrap">
        <div className="load-bar" ref={barRef}></div>
      </div>
      <div className="load-pct" ref={pctRef}>0%</div>
    </div>
  );
}
