import { Link } from "react-router-dom";
import logoTextImg from '../assets/logo_text_transperant.png';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-grid">

          {/* Brand */}
          <div className="foot-brand">
            <span className="n-logo">
              <Link to="/" className="n-logo-text">
                <img className="n-logo-text-img" src={logoTextImg} alt="AURONIX" />
              </Link>
            </span>
            <div className="f-tag">Intelligence. Engineered. Elevated.</div>
            <p>
              We design and build high-performance software systems — from AI pipelines and web platforms
              to mobile apps and enterprise ERP solutions — engineered for ambitious businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="foot-h">Services</div>
            <ul className="foot-links">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>AI &amp; Machine Learning</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Web Development</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>App Development</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>ERP &amp; System Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="foot-h">Company</div>
            <ul className="foot-links">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About Auronix</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process'); }}>How We Work</a></li>
              <li><a href="#tech" onClick={(e) => { e.preventDefault(); scrollTo('tech'); }}>Tech Stack</a></li>
              <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Client Reviews</a></li>
              <li><a href="#cta" onClick={(e) => { e.preventDefault(); scrollTo('cta'); }}>Start a Project</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="foot-h">Connect</div>
            <ul className="foot-links">
              <li>
                <a href="https://wa.me/917028654498" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/auronix" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/auronix" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:hello@auronix.in">
                  Email Us
                </a>
              </li>
            </ul>
            <div className="soc-row" style={{ marginTop: '20px' }}>
              <a className="soc" href="https://wa.me/917028654498" target="_blank" rel="noreferrer" title="WhatsApp">wa</a>
              <a className="soc" href="https://www.linkedin.com/company/auronix" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
              <a className="soc" href="https://www.instagram.com/auronix" target="_blank" rel="noreferrer" title="Instagram">ig</a>
              <a className="soc" href="mailto:hello@auronix.in" title="Email">@</a>
            </div>
          </div>

        </div>

        <div className="foot-bottom">
          <p>© {new Date().getFullYear()} Auronix Technologies. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', color: 'rgba(207,207,214,.25)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', color: 'rgba(207,207,214,.25)', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', color: 'rgba(207,207,214,.25)', textDecoration: 'none' }}>Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
