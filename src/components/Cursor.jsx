import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cur = curRef.current;
    const trail = trailRef.current;
    let tx = 0, ty = 0, rx = 0, ry = 0;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let rafId;
    function animCur() {
      rx += (tx - rx) * 0.1;
      ry += (ty - ry) * 0.1;
      if (cur) { cur.style.left = tx + 'px'; cur.style.top = ty + 'px'; }
      if (trail) { trail.style.left = rx + 'px'; trail.style.top = ry + 'px'; }
      rafId = requestAnimationFrame(animCur);
    }
    animCur();

    const addHover = () => {
      document.querySelectorAll('a, button, .bento-card, .hex-item, .ht-step').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
      });
    };
    addHover();
    const mo = new MutationObserver(addHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur-trail" ref={trailRef}></div>
    </>
  );
}
