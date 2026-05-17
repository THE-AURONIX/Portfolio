import { useEffect } from 'react';
import discover from '../assets/works/discovery.png';
import architecture from '../assets/works/architecture.png';
import development from '../assets/works/development.png';
import testing from '../assets/works/testing.png';
import launch from '../assets/works/launch.png';
import evolve from '../assets/works/evolve.png';
const steps = [
  { num: '01', icon: discover, title: 'Discovery', desc: 'Deep-dive workshops mapping goals, constraints, and the path to product-market fit.' },
  { num: '02', icon: architecture, title: 'Architecture', desc: 'System design, stack selection, and roadmapping by senior engineers.' },
  { num: '03', icon: development, title: 'Development', desc: 'Agile two-week sprints with continuous delivery and full visibility.' },
  { num: '04', icon: testing, title: 'Testing & QA', desc: 'Automated testing, load testing, and security audits before any deployment.' },
  { num: '05', icon: launch, title: 'Launch', desc: 'Zero-downtime deployment with monitoring, observability, and on-call support.' },
  { num: '06', icon: evolve, title: 'Scale & Evolve', desc: 'Continuous optimization, feature iteration, and growth engineering.' },
];

export default function Process({ animReady }) {
  useEffect(() => {
    if (!animReady || !window.gsap) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.utils.toArray('.ht-step').forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
      });
    });
  }, [animReady]);

  return (
    <section id="process">
      <div className="process-wrap">
        <div className="section-head">
          <span className="section-eyebrow">// How We Work</span>
          <h2 className="section-h2">Our <em>Precision</em> Framework</h2>
        </div>
        <div className="h-timeline" id="hTimeline">
          {steps.map((s) => (
            <div className="ht-step" key={s.num}>
              <div className="ht-node">
                <img src={s.icon} alt={s.title} />
                <div className="ht-num">{s.num}</div>
              </div>
              <h4 className="ht-title">{s.title}</h4>
              <p className="ht-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
