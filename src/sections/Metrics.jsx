import { useEffect } from 'react';

const metrics = [
  { count: 5, sfx: '+', label: 'Projects Delivered', sub: 'across 18 industries' },
  { count: 3, sfx: '+', label: 'Enterprise Clients', sub: 'in 32 countries' },
  { count: 98, sfx: '%', label: 'Satisfaction Rate', sub: 'verified reviews' },
  { count: 1, sfx: 'yr', label: 'Years in Business', sub: 'since 2013' },
];

export default function Metrics({ animReady }) {
  useEffect(() => {
    if (!animReady || !window.gsap) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.create({
      trigger: '#metricsGrid', start: 'top 80%', once: true,
      onEnter: () => {
        document.querySelectorAll('.m-val').forEach(el => {
          const target = +el.getAttribute('data-count');
          const sfx = el.getAttribute('data-sfx');
          gsap.to({ v: 0 }, {
            v: target, duration: 2.2, ease: 'power2.out',
            onUpdate: function () { el.textContent = Math.round(this.targets()[0].v) + sfx; }
          });
        });
      }
    });
  }, [animReady]);

  return (
    <section id="metrics">
      <div className="metrics-inner">
        <div className="section-head">
          <span className="section-eyebrow">// By The Numbers</span>
          <h2 className="section-h2">Results That <em>Speak</em></h2>
        </div>
        <div className="metrics-grid" id="metricsGrid">
          {metrics.map((m, i) => (
            <div className="m-box" key={i}>
              <span className="m-val" data-count={m.count} data-sfx={m.sfx}>0</span>
              <div className="m-label">{m.label}</div>
              <div className="m-sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
