import { useEffect } from 'react';

export default function About({ animReady }) {
  useEffect(() => {
    if (!animReady) return;

    // DNA helix canvas
    const canvas = document.getElementById('about-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w, h;
      function resize() {
        w = canvas.offsetWidth; h = canvas.offsetHeight;
        canvas.width = w; canvas.height = h;
      }
      resize();
      window.addEventListener('resize', resize);

      let t = 0, rafId;
      function draw() {
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2, rx = w * 0.3, ry = h * 0.4;
        const N = 60;
        for (let i = 0; i < N; i++) {
          const a = (i / N) * Math.PI * 4 + t;
          const x1 = cx + Math.cos(a) * rx;
          const y1 = cy + Math.sin(a * 0.5) * ry * 0.6 + Math.sin(a) * ry * 0.4;
          const x2 = cx - Math.cos(a) * rx;
          const y2 = cy + Math.sin(a * 0.5) * ry * 0.6 - Math.sin(a) * ry * 0.4;
          const alpha = 0.1 + 0.5 * (Math.sin(a) * 0.5 + 0.5);
          ctx.beginPath(); ctx.arc(x1, y1, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(183,156,255,${alpha})`; ctx.fill();
          ctx.beginPath(); ctx.arc(x2, y2, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196,138,138,${alpha * 0.8})`; ctx.fill();
          if (i % 4 === 0) {
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(123,77,255,${alpha * 0.3})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(cx, cy, Math.min(w, h) * 0.42, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(123,77,255,.08)'; ctx.lineWidth = 1; ctx.stroke();
        t += 0.012;
        rafId = requestAnimationFrame(draw);
      }
      draw();
    }

    // Stat strips via ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: '#statStrips', start: 'top 80%', once: true,
        onEnter: () => {
          document.querySelectorAll('.stat-strip').forEach((s, i) => {
            const pct = s.getAttribute('data-pct');
            setTimeout(() => {
              const fill = s.querySelector('.strip-fill');
              if (fill) fill.style.width = pct + '%';
            }, i * 200);
          });
        }
      });
    }
  }, [animReady]);

  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-visual" id="aboutVisual">
          <canvas id="about-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}></canvas>
        </div>
        <div className="about-text">
          <p className="about-label">// Who We Are</p>
          <h2 className="about-h2" id="aboutH2">
            Where Precision<br />Meets <span style={{ color: 'var(--lav)' }}>Possibility</span>
          </h2>
          <p className="about-p">
            Auronix is a software engineering firm built for the age of intelligence.
            We don't just write code — we design systems that think, scale, and evolve.
          </p>
          <p className="about-p">
            From founding startups to Fortune 500 enterprises, we partner with visionaries
            to engineer the technology that defines tomorrow.
          </p>
          <div className="stat-strips" id="statStrips">
            <div className="stat-strip" data-pct="96">
              <div className="strip-label">Client Retention Rate</div>
              <div className="strip-bar"><div className="strip-fill"></div></div>
              <div className="strip-val">96%</div>
            </div>
            <div className="stat-strip" data-pct="88">
              <div className="strip-label">On-Time Delivery</div>
              <div className="strip-bar"><div className="strip-fill"></div></div>
              <div className="strip-val">88%</div>
            </div>
            <div className="stat-strip" data-pct="74">
              <div className="strip-label">Performance Uplift avg.</div>
              <div className="strip-bar"><div className="strip-fill"></div></div>
              <div className="strip-val">74%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
