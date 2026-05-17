import { useEffect } from 'react';
import BentoCard from '../components/BentoCard';
import ai from '../assets/services/ai_ml.png';
import web from '../assets/services/web_dev.png';
import app from '../assets/services/app_dev.png';
import erp from '../assets/services/erp_system.png';

export default function Services({ animReady }) {
  useEffect(() => {
    if (!animReady || !window.gsap) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.utils.toArray('[data-bento]').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0, y: 40, scale: 0.97, duration: 0.7, delay: i * 0.08, ease: 'power3.out'
      });
    });
  }, [animReady]);

  return (
    <section id="services">
      <div className="bento-wrap">
        <div className="section-head">
          <span className="section-eyebrow">// What We Build</span>
          <h2 className="section-h2">Solutions Built for <em>Scale</em></h2>
        </div>
        <div className="bento" id="bentoGrid">
          <BentoCard className="b1">
            <div className="gline"></div>
            <div className="bento-num">01</div>
            <img src={ai} alt="AI" className="ai-ml-bento-icon" />
            <h3 className="bento-h3">Artificial Intelligence &amp; Machine Learning</h3>
            <p className="bento-p">End-to-end AI systems — from data pipelines to production-grade model serving. We build intelligence that compounds over time.</p>
            <div className="bento-tag">
              <span className="btag">LLMs</span><span className="btag">Computer Vision</span><span className="btag">NLP</span><span className="btag">MLOps</span>
            </div>
          </BentoCard>
          <BentoCard className="b2">
            <div className="gline"></div>
            <div className="bento-num">02</div>
            <div className="bento-img-heading">
              <img src={web} alt="Web" className="web-bento-icon" />
              <h3 className="bento-h3">Web Development</h3>
            </div>
            <p className="bento-p">We craft high-performance, scalable web applications tailored to your unique business needs. We deliver seamless digital experiences that drive real results.</p>
            <div className="bento-tag"><span className="btag">AWS</span><span className="btag">GCP</span><span className="btag">K8s</span></div>
          </BentoCard>
          <BentoCard className="b3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="gline"></div>
            <div className="bento-big-num">5+</div>
            <div style={{ fontSize: '.75rem', color: 'rgba(183,156,255,.5)', marginTop: '8px', fontFamily: "'DM Mono',monospace", letterSpacing: '.1em' }}>PROJECTS SHIPPED</div>
          </BentoCard>
          <BentoCard className="b4">
            <div className="gline"></div>
            <div className="bento-num">03</div>
            <div className="bento-img-heading">
              <img src={app} alt="app" className="app-bento-icon" />
              <h3 className="bento-h3">App Development</h3>
            </div>
            <p className="bento-p">We build intuitive and feature-rich mobile applications for iOS and Android platforms. Our focus is on delivering seamless user experiences, high performance, and scalable architecture.</p>
            <div className="bento-tag"><span className="btag">iOS</span><span className="btag">Android</span><span className="btag">React Native</span><span className="btag">Flutter</span></div>
          </BentoCard>
          <BentoCard className="b5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="gline"></div>
            <div className="bento-big-num" style={{ fontSize: '2.5rem' }}>1yr</div>
            <div style={{ fontSize: '.7rem', color: 'rgba(183,156,255,.5)', marginTop: '8px', fontFamily: "'DM Mono',monospace", letterSpacing: '.1em' }}>EXCELLENCE</div>
          </BentoCard>
          <BentoCard className="b6">
            <div className="gline"></div>
            <div className="bento-num">04</div>
            <img className="erp-bento-icon" src={erp} alt="erp"></img>
            <h3 className="bento-h3">ERP &amp; System Design</h3>
            <p className="bento-p">Enterprise-grade ERP systems that streamline operations, enhance efficiency, and drive measurable business growth.</p>
            <div className="bento-tag"><span className="btag">ERP</span><span className="btag">Custom Systems</span><span className="btag">CRM</span><span className="btag">Workflow Automation</span></div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
