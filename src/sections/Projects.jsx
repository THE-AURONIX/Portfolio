import { useEffect, useRef } from 'react';

export default function Projects({ animReady }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!animReady || !window.gsap) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    // Check if component is still mounted when doing heavy DOM ops
    if (!containerRef.current) return;

    /* ════ PROJECTS — CARD CANVAS ANIMATIONS ════ */
    const animIds = [];
    function initProjCanvas(id, type) {
      const canvas = document.getElementById(id);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let w, h, animId;

      function resize() {
        w = canvas.offsetWidth; h = canvas.offsetHeight;
        canvas.width = w; canvas.height = h;
      }
      resize();
      const onResize = () => resize();
      window.addEventListener('resize', onResize);

      let t = 0;

      if (type === 'neural') {
        const nodes = Array.from({length: 22}, () => ({
          x: Math.random() * 100, y: Math.random() * 100,
          vx: (Math.random()-.5)*.15, vy: (Math.random()-.5)*.15,
          r: 2 + Math.random()*3
        }));
        function drawNeural() {
          ctx.clearRect(0,0,w,h);
          const grd = ctx.createLinearGradient(0,0,w,h);
          grd.addColorStop(0,'rgba(123,77,255,.06)');
          grd.addColorStop(1,'rgba(196,138,138,.04)');
          ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

          nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if(n.x < 0||n.x > 100) n.vx*=-1;
            if(n.y < 0||n.y > 100) n.vy*=-1;
          });
          for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) {
            const a = nodes[i], b = nodes[j];
            const dx = (a.x-b.x)*(w/100), dy = (a.y-b.y)*(h/100);
            const dist = Math.sqrt(dx*dx+dy*dy);
            if(dist < 90) {
              ctx.beginPath();
              ctx.moveTo(a.x*(w/100), a.y*(h/100));
              ctx.lineTo(b.x*(w/100), b.y*(h/100));
              ctx.strokeStyle = `rgba(183,156,255,${(.5 - dist/180).toFixed(2)})`;
              ctx.lineWidth = .6; ctx.stroke();
            }
          }
          nodes.forEach((n,i) => {
            const pulse = .6 + .4*Math.sin(t*1.5 + i*.8);
            ctx.beginPath();
            ctx.arc(n.x*(w/100), n.y*(h/100), n.r * pulse, 0, Math.PI*2);
            ctx.fillStyle = i%3===0 ? `rgba(196,138,138,${pulse*.8})` : `rgba(183,156,255,${pulse*.9})`;
            ctx.fill();
          });
          t += .02; animId = requestAnimationFrame(drawNeural);
        }
        drawNeural();
        animIds.push(animId);

      } else if (type === 'blockchain') {
        function drawBlock() {
          ctx.clearRect(0,0,w,h);
          const grd = ctx.createLinearGradient(0,0,w,h);
          grd.addColorStop(0,'rgba(196,138,138,.06)');
          grd.addColorStop(1,'rgba(123,77,255,.04)');
          ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

          const hexR = 22, cols = Math.ceil(w/(hexR*1.8))+1, rows = Math.ceil(h/(hexR*1.55))+1;
          for(let row=0;row<rows;row++) {
            for(let col=0;col<cols;col++) {
              const cx = col*hexR*1.8 + (row%2?hexR*.9:0);
              const cy = row*hexR*1.35;
              const phase = Math.sin(t*.7 + col*.4 + row*.6);
              const alpha = .04 + .12*(phase*.5+.5);
              ctx.beginPath();
              for(let s=0;s<6;s++) {
                const a = (Math.PI/3)*s - Math.PI/6;
                const px = cx + hexR*.85*Math.cos(a), py = cy + hexR*.85*Math.sin(a);
                s===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
              }
              ctx.closePath();
              ctx.strokeStyle = `rgba(196,138,138,${alpha*2})`;
              ctx.lineWidth = .8; ctx.stroke();
              if(phase > .6) {
                ctx.fillStyle = `rgba(196,138,138,${alpha})`;
                ctx.fill();
              }
            }
          }
          t += .018; animId = requestAnimationFrame(drawBlock);
        }
        drawBlock();
        animIds.push(animId);

      } else if (type === 'cloud') {
        const streams = Array.from({length:12}, (_, i) => ({
          x: Math.random()*w, y: 0, speed: 1+Math.random()*2,
          len: 30+Math.random()*60, col: i%3===0?'196,138,138':'123,77,255',
        }));
        function drawCloud() {
          ctx.clearRect(0,0,w,h);
          const grd = ctx.createLinearGradient(0,0,0,h);
          grd.addColorStop(0,'rgba(74,222,128,.04)');
          grd.addColorStop(1,'rgba(123,77,255,.05)');
          ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

          ctx.strokeStyle='rgba(74,222,128,.04)'; ctx.lineWidth=.5;
          for(let xi=0;xi<w;xi+=24){ctx.beginPath();ctx.moveTo(xi,0);ctx.lineTo(xi,h);ctx.stroke();}
          for(let yi=0;yi<h;yi+=24){ctx.beginPath();ctx.moveTo(0,yi);ctx.lineTo(w,yi);ctx.stroke();}

          streams.forEach(s => {
            s.y += s.speed;
            if(s.y > h+s.len) { s.y=-s.len; s.x=Math.random()*w; }
            const grad = ctx.createLinearGradient(s.x,s.y-s.len,s.x,s.y);
            grad.addColorStop(0,'transparent');
            grad.addColorStop(1,`rgba(${s.col},.5)`);
            ctx.beginPath();
            ctx.moveTo(s.x,s.y-s.len); ctx.lineTo(s.x,s.y);
            ctx.strokeStyle=grad; ctx.lineWidth=1.5; ctx.stroke();
          });
          t += .02; animId = requestAnimationFrame(drawCloud);
        }
        drawCloud();
        animIds.push(animId);

      } else if (type === 'agent') {
        function drawAgent() {
          ctx.clearRect(0,0,w,h);
          const grd = ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*.5);
          grd.addColorStop(0,'rgba(183,156,255,.08)');
          grd.addColorStop(1,'rgba(8,6,18,0)');
          ctx.fillStyle=grd; ctx.fillRect(0,0,w,h);

          const rings = [
            {r:Math.min(w,h)*.38, speed:.4, col:'123,77,255', orbs:3},
            {r:Math.min(w,h)*.26, speed:-.6, col:'183,156,255', orbs:2},
            {r:Math.min(w,h)*.14, speed:.9, col:'196,138,138', orbs:2},
          ];
          rings.forEach((ring, ri) => {
            ctx.beginPath();
            ctx.arc(w/2,h/2,ring.r,0,Math.PI*2);
            ctx.strokeStyle=`rgba(${ring.col},.12)`; ctx.lineWidth=1; ctx.stroke();

            for(let o=0;o<ring.orbs;o++) {
              const angle = t*ring.speed + (o/ring.orbs)*Math.PI*2;
              const ox = w/2 + Math.cos(angle)*ring.r;
              const oy = h/2 + Math.sin(angle)*ring.r;
              const pulse = .6 + .4*Math.sin(t*2+o);
              ctx.beginPath();
              ctx.arc(ox,oy,3+ri,0,Math.PI*2);
              ctx.fillStyle=`rgba(${ring.col},${pulse})`; ctx.fill();
              ctx.shadowBlur=8; ctx.shadowColor=`rgba(${ring.col},.8)`; ctx.fill();
              ctx.shadowBlur=0;
            }
          });
          ctx.beginPath(); ctx.arc(w/2,h/2,4,0,Math.PI*2);
          ctx.fillStyle='rgba(183,156,255,.9)'; ctx.fill();
          t += .02; animId = requestAnimationFrame(drawAgent);
        }
        drawAgent();
        animIds.push(animId);
      }
      return onResize;
    }

    const resizeHandlers = [
      initProjCanvas('pvc1', 'neural'),
      initProjCanvas('pvc2', 'blockchain'),
      initProjCanvas('pvc3', 'cloud'),
      initProjCanvas('pvc4', 'agent')
    ];

    /* ════ PROJECTS — FILTER TABS ════ */
    const tabs = containerRef.current.querySelectorAll('.pf-tab');
    const cards = containerRef.current.querySelectorAll('.proj-card');
    
    const handleTabClick = (e) => {
      const tab = e.currentTarget;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const cats = (card.getAttribute('data-cats') || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        gsap.to(card, {
          opacity: show ? 1 : 0.15,
          scale: show ? 1 : .95,
          duration: .4,
          ease: 'power2.out'
        });
      });
    };
    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

    /* ════ PROJECTS — CARD MOUSE GLOW ════ */
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', x);
      card.style.setProperty('--my', y);
    };
    cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));

    /* ════ PROJECTS — SCROLL REVEAL ════ */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          setTimeout(() => card.classList.add('revealed'), parseFloat(card.style.transitionDelay||0)*1000);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(c => observer.observe(c));

    const h2 = containerRef.current.querySelector('.proj-h2');
    if (h2) {
      gsap.from(h2, {
        scrollTrigger: { trigger: h2, start: 'top 88%' },
        opacity: 0, y: 30, duration: .8, ease: 'power3.out'
      });
    }

    return () => {
      animIds.forEach(id => id && cancelAnimationFrame(id));
      resizeHandlers.forEach(handler => handler && window.removeEventListener('resize', handler));
      tabs.forEach(tab => tab.removeEventListener('click', handleTabClick));
      cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
      observer.disconnect();
    };
  }, [animReady]);

  const projPills = [
    'T & P Portal','Clinic World','Three Brothers Promotion Portfolio','Auronix - AI Assistant',
    'LogiChain','ScaleOS','Momentum CRM','CloudPivot','DataLens',
    'TrustChain','Orion ML','VaultSecure','PulseAnalytics'
  ];

  return (
    <section id="projects" ref={containerRef}>
      <div className="proj-orb" style={{ '--od': '14s', '--oddl': '0s', '--ox': '40px', '--oy': '-50px', width: '500px', height: '500px', background: 'rgba(123,77,255,.07)', top: '5%', left: '-10%' }}></div>
      <div className="proj-orb" style={{ '--od': '18s', '--oddl': '3s', '--ox': '-30px', '--oy': '40px', width: '400px', height: '400px', background: 'rgba(196,138,138,.05)', bottom: '10%', right: '-5%' }}></div>
      <div className="proj-orb" style={{ '--od': '12s', '--oddl': '6s', '--ox': '20px', '--oy': '30px', width: '300px', height: '300px', background: 'rgba(183,156,255,.04)', top: '50%', left: '40%' }}></div>

      <div className="proj-inner">
        <div className="proj-head">
          <div className="proj-head-left">
            <div className="proj-counter">// Our Work</div>
            <h2 className="proj-h2">Products We've <em>Engineered</em></h2>
          </div>
          {/* <a href="#projects" className="proj-view-all" onClick={(e) => { e.preventDefault(); }}>View All Case Studies <span className="arr">→</span></a> */}
        </div>

        <div className="proj-filters">
          <button className="pf-tab active" data-filter="all"><span>All Projects</span></button>
          <button className="pf-tab" data-filter="our-products"><span>Our Products</span></button>
          <button className="pf-tab" data-filter="business-portfolio"><span>Bussiness Portfolio</span></button>
          <button className="pf-tab" data-filter="web-development"><span>Web Development</span></button>
          <button className="pf-tab" data-filter="ai-ml"><span>AI &amp; ML</span></button>
          {/* <button className="pf-tab" data-filter="platform"><span>Platform</span></button> */}
        </div>

        <div className="proj-marquee-wrap">
          <div className="proj-marquee" id="projMarquee">
            {[...projPills, ...projPills].map((pill, i) => (
              <div key={i} className="proj-tag-pill">
                <span className="dot"></span>{pill}
              </div>
            ))}
          </div>
        </div>

        <div className="proj-grid" id="projGrid">
          {/* Card 1 */}
          <div className="proj-card pc-hero" data-cats="our-products web-development" style={{ transitionDelay: '.05s' }}>
            <div className="p-gline"></div>
            <div className="proj-arrow">↗</div>
            <div className="proj-visual">
              <canvas className="proj-visual-canvas" id="pvc1"></canvas>
              <div className="proj-ui-float">
                <div className="proj-screen">
                  <div className="proj-screen-bar">
                    <div className="psb-dot" style={{ background: '#f87171' }}></div>
                    <div className="psb-dot" style={{ background: '#facc15' }}></div>
                    <div className="psb-dot" style={{ background: '#4ade80' }}></div>
                  </div>
                  <div className="proj-screen-body">
                    <div className="psb-line w60 accent" style={{ animationDelay: '0s' }}></div>
                    <div className="psb-line w80" style={{ animationDelay: '.2s' }}></div>
                    <div className="psb-line w45" style={{ animationDelay: '.4s' }}></div>
                    <div className="psb-chart">
                      <div className="psb-bar" style={{ height: '60%', animationDelay: '0s' }}></div>
                      <div className="psb-bar" style={{ height: '80%', animationDelay: '.1s' }}></div>
                      <div className="psb-bar" style={{ height: '45%', animationDelay: '.2s' }}></div>
                      <div className="psb-bar" style={{ height: '90%', animationDelay: '.3s' }}></div>
                      <div className="psb-bar" style={{ height: '70%', animationDelay: '.4s' }}></div>
                      <div className="psb-bar" style={{ height: '55%', animationDelay: '.5s' }}></div>
                      <div className="psb-bar" style={{ height: '85%', animationDelay: '.6s' }}></div>
                    </div>
                    <div className="psb-line w70" style={{ marginTop: '12px', animationDelay: '.6s' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="proj-body">
              <div className="proj-meta">
                <span className="proj-type">Our Products</span>
                <span className="proj-year">2025</span>
              </div>
              <h3 className="proj-title">T &amp; P Portal</h3>
              <p className="proj-desc">End-to-end portal for a Tier-1 institution to handel Placement work digitally.</p>
              <div className="proj-stack">
                <span className="p-stag">React</span><span className="p-stag">Node</span>
                <span className="p-stag">MongoDB</span><span className="p-stag">Vercel</span><span className="p-stag">AWS</span>
              </div>
              <div className="proj-stat-row">
                <div className="proj-stat">
                  <div className="proj-stat-val">340%</div>
                  <div className="proj-stat-lbl">Perf Gain</div>
                </div>
                <div className="proj-stat">
                  <div className="proj-stat-val">500+</div>
                  <div className="proj-stat-lbl">Active User</div>
                </div>
                <div className="proj-stat">
                  <div className="proj-stat-val">12ms</div>
                  <div className="proj-stat-lbl">P99 Latency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="proj-card pc-tall" data-cats="our-products web-development" style={{ transitionDelay: '.12s' }}>
            <div className="p-gline"></div>
            <div className="proj-arrow">↗</div>
            <div className="proj-visual">
              <canvas className="proj-visual-canvas" id="pvc2"></canvas>
            </div>
            <div className="proj-body">
              <div className="proj-meta">
                <span className="proj-type" style={{ color: 'var(--rose)' }}>Clinic World</span>
                <span className="proj-year">2025</span>
              </div>
              <h3 className="proj-title">Clinic World</h3>
              <p className="proj-desc">Clinic World is a clinic work flow management app.</p>
              <div className="proj-stack">
                <span className="p-stag">React</span><span className="p-stag">Node</span>
                <span className="p-stag">MongoDB</span><span className="p-stag">Vercel</span><span className="p-stag">AWS</span>
              </div>
              <div className="proj-stat-row">
                <div className="proj-stat">
                  <div className="proj-stat-val">10+</div>
                  <div className="proj-stat-lbl">Clinics</div>
                </div>
                <div className="proj-stat">
                  <div className="proj-stat-val">99%</div>
                  <div className="proj-stat-lbl">Uptime</div>
                </div>
                <div className="proj-stat">
                  <div className="proj-stat-val">0</div>
                  <div className="proj-stat-lbl">Downtime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="proj-card pc-wide" data-cats="business-portfolio web-development" style={{ transitionDelay: '.18s' }}>
            <div className="p-gline"></div>
            <div className="proj-arrow">↗</div>
            <div className="proj-visual">
              <canvas className="proj-visual-canvas" id="pvc3"></canvas>
            </div>
            <div className="proj-body">
              <div className="proj-meta">
                <span className="proj-type" style={{ color: '#4ade80' }}>Bussiness Portfolio</span>
                <span className="proj-year">2026</span>
              </div>
              <h3 className="proj-title">Three Brothers Promotion Portfolio</h3>
              <p className="proj-desc">Multi-cloud orchestration for SaaS platform handling 10M daily active users. Infrastructure cost cut by 60% through intelligent workload distribution and spot-instance management.</p>
              <div className="proj-stack">
                <span className="p-stag">React</span><span className="p-stag">Vercel</span><span className="p-stag">Node</span>
                <span className="p-stag">Cloudinary</span><span className="p-stag">Vite</span>
              </div>
              <div className="proj-stat-row">
                <div className="proj-stat"><div className="proj-stat-val">60%</div><div className="proj-stat-lbl">Cost Reduction</div></div>
                <div className="proj-stat"><div className="proj-stat-val">50+</div><div className="proj-stat-lbl">Daily Users</div></div>
                <div className="proj-stat"><div className="proj-stat-val">3×</div><div className="proj-stat-lbl">Throughput</div></div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="proj-card pc-sm" data-cats="ai-ml our-products" style={{ transitionDelay: '.24s' }}>
            <div className="p-gline"></div>
            <div className="proj-arrow">↗</div>
            <div className="proj-visual">
              <canvas className="proj-visual-canvas" id="pvc4"></canvas>
            </div>
            <div className="proj-body">
              <div className="proj-meta">
                <span className="proj-type">AI Agents</span>
                <span className="proj-year">2026</span>
              </div>
              <h3 className="proj-title">Auronix - AI Assistant</h3>
              <p className="proj-desc">Auronix AI Assistant is a AI-powered assistant that helps you with your daily tasks. It is designed to be a helpful companion that can assist you with a variety of tasks.</p>
              <div className="proj-stack">
                <span className="p-stag">Python</span><span className="p-stag">n8n</span><span className="p-stag">OpenAI</span><span className="p-stag">Cloud</span>
              </div>
              <div className="proj-stat-row">
                <div className="proj-stat"><div className="proj-stat-val">3mo</div><div className="proj-stat-lbl">Ahead of Schedule</div></div>
                <div className="proj-stat"><div className="proj-stat-val">8×</div><div className="proj-stat-lbl">Lead Conversion</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="proj-cta-strip">
          <div>
            <div className="pcs-text">Have an ambitious product in mind?</div>
            <div className="pcs-sub">5+ projects shipped · 96% client retention · 1 years of excellence</div>
          </div>
          <button className="pcs-btn" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Your Project →
          </button>
        </div>
      </div>
    </section>
  );
}
