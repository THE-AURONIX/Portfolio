import { useEffect, useRef, useState } from 'react';
import RadarWidget from '../components/RadarWidget';

const phrases = ['Software Engineering Studio', 'AI & Cloud Specialists', 'Building the Future', 'Intelligence Elevated'];

export default function Hero({ animReady }) {
  const typeRef = useRef(null);
  const piRef = useRef(0);
  const ciRef = useRef(0);
  const delRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!animReady) return;

    // Typewriter
    function type() {
      const phrase = phrases[piRef.current];
      if (!delRef.current) {
        ciRef.current++;
        if (typeRef.current) typeRef.current.textContent = phrase.slice(0, ciRef.current);
        if (ciRef.current === phrase.length) {
          delRef.current = true;
          timerRef.current = setTimeout(type, 2000);
          return;
        }
      } else {
        ciRef.current--;
        if (typeRef.current) typeRef.current.textContent = phrase.slice(0, ciRef.current);
        if (ciRef.current === 0) {
          delRef.current = false;
          piRef.current = (piRef.current + 1) % phrases.length;
        }
      }
      timerRef.current = setTimeout(type, delRef.current ? 40 : 80);
    }
    type();

    // Three.js
    const canvas = document.getElementById('hero-bg');
    if (canvas && window.THREE) {
      const THREE = window.THREE;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, 2, 0.1, 100);
      camera.position.z = 5;

      const igeo = new THREE.IcosahedronGeometry(2.5, 2);
      const imat = new THREE.MeshBasicMaterial({ color: 0x7B4DFF, wireframe: true, transparent: true, opacity: 0.07 });
      const ico = new THREE.Mesh(igeo, imat);
      scene.add(ico);

      const N = 8000;
      const pp = new Float32Array(N * 3);
      const pc = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const r = 4 + Math.random() * 6;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pp[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pp[i * 3 + 2] = r * Math.cos(ph);
        const t = Math.random();
        pc[i * 3] = 0.48 + t * 0.3; pc[i * 3 + 1] = 0.3 + t * 0.25; pc[i * 3 + 2] = 1;
      }
      const pgeo = new THREE.BufferGeometry();
      pgeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
      pgeo.setAttribute('color', new THREE.BufferAttribute(pc, 3));
      const pts = new THREE.Points(pgeo, new THREE.PointsMaterial({ size: 0.018, vertexColors: true, transparent: true, opacity: 0.7 }));
      scene.add(pts);

      function resize() {
        const parent = canvas.parentElement;
        if (!parent) return;
        const w = parent.clientWidth, h = parent.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener('resize', resize);

      let t = 0, rafId;
      function loop() {
        t += 0.003;
        ico.rotation.x = t * 0.3; ico.rotation.y = t * 0.5;
        pts.rotation.y = t * 0.08; pts.rotation.x = Math.sin(t * 0.2) * 0.15;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(loop);
      }
      loop();
    }

    // GSAP hero timeline
    if (window.gsap) {
      const gsap = window.gsap;
      gsap.timeline({ delay: 0.2 })
        .to('#termTag', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to('#h1', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=.3')
        .to('#hp', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=.4')
        .to('#hb1', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=.3')
        .to('#hb2', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=.4')
        .to('#heroRight', { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=.6')
        .to('#heroScroll', { opacity: 1, duration: 0.5 }, '-=.2');
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [animReady]);

  return (
    <section id="hero">
      <canvas id="hero-bg"></canvas>
      <div className="blob" style={{ '--bs': '14s', width: '700px', height: '700px', background: 'rgba(123,77,255,.09)', top: '-200px', right: '-200px' }}></div>
      <div className="blob" style={{ '--bs': '18s', width: '500px', height: '500px', background: 'rgba(196,138,138,.05)', bottom: '-100px', left: '100px', animationDirection: 'alternate-reverse' }}></div>

      <div className="hero-inner">
        <div className="hero-left">
          <div className="term-tag" id="termTag">
            <span className="blink"></span>
            <span id="typeText" ref={typeRef}></span>
          </div>
          <h1 className="hero-h1" id="h1">
            <span className="w1 d-block">Intelligence</span>
            <span className="w2 d-block">Engineered.</span>
            <span className="w3 glitch d-block" data-text="Elevated.">Elevated.</span>
          </h1>
          <p className="hero-p" id="hp">
            We architect advanced software systems that power ambitious businesses —
            turning complex challenges into scalable, performant realities.
          </p>
          <div className="hero-btns">
            <button className="btn-liquid" id="hb1" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Explore Our Work</span>
              <div className="liquid"></div>
            </button>
            <button className="btn-ghost" id="hb2">View Case Studies</button>
          </div>
        </div>

        <div className="hero-right" id="heroRight">
          <RadarWidget />
        </div>
      </div>

      <div className="hero-scroll" id="heroScroll">
        <span>SCROLL</span>
        <div className="scroll-track">
          <div className="scroll-fill"></div>
        </div>
      </div>
    </section>
  );
}
