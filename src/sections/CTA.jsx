import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = '917028654498'; // Replace with actual WhatsApp number

export default function CTA({ animReady }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!animReady || !window.gsap) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.from('#ctaH2', { scrollTrigger: { trigger: '#ctaH2', start: 'top 85%' }, opacity: 0, y: 40, duration: 1, ease: 'power3.out' });

    // Magnetic buttons
    document.querySelectorAll('.btn-liquid,.btn-ghost,.n-cta').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.18}px,${dy * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // Click ripple
    const handleClick = (e) => {
      const rip = document.createElement('div');
      rip.style.cssText = `position:fixed;border-radius:50%;pointer-events:none;z-index:9997;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;background:rgba(183,156,255,.6);transform:translate(-50%,-50%);`;
      document.body.appendChild(rip);
      window.gsap.to(rip, { width: 120, height: 120, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => rip.remove() });
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [animReady]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (!email.trim() && !phone.trim()) errs.contact = 'Please provide at least an email or phone number.';
    return errs;
  };

  const buildMessage = () => {
    let msg = `Hello Auronix Team,\n\n`;
    msg += `I hope this message finds you well. I would like to get in touch with your team.\n\n`;
    msg += `*Name:* ${name.trim()}\n`;
    if (email.trim()) msg += `*Email:* ${email.trim()}\n`;
    if (phone.trim()) msg += `*Phone:* ${phone.trim()}\n`;
    if (query.trim()) {
      msg += `\n*Message:*\n${query.trim()}\n`;
    }
    msg += `\nLooking forward to hearing from you.\n\nBest regards,\n${name.trim()}`;
    return msg;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const message = buildMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  // Dynamic contact validation: if phone filled → email optional, if email filled → phone optional
  const phoneRequired = !email.trim();
  const emailRequired = !phone.trim();

  return (
    <section id="cta">
      <div className="cta-bg"></div>
      <div className="ping-ring" style={{ '--pd': '5s', '--pdd': '0s' }}></div>
      <div className="ping-ring" style={{ '--pd': '5s', '--pdd': '1.5s' }}></div>
      <div className="ping-ring" style={{ '--pd': '5s', '--pdd': '3s' }}></div>
      <div className="cta-inner">
        <h2 className="cta-h2" id="ctaH2">
          Build Something<br /><span style={{ color: 'var(--lav)' }}>Extraordinary</span>
        </h2>
        <p className="cta-sub">5+ companies have chosen Auronix to engineer their most ambitious products. Ready to be next?</p>

        <form className="cta-wa-form" onSubmit={handleSubmit} noValidate>
          <div className="cta-form-grid">

            {/* LEFT — contact fields */}
            <div className="cta-form-left">

              {/* Name */}
              <div className="cta-field-wrap">
                <input
                  type="text"
                  className={`cta-field-input${errors.name ? ' cta-field-error' : ''}`}
                  placeholder="Your Name *"
                  value={name}
                  onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
                />
                {errors.name && <span className="cta-err-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="cta-field-wrap">
                <input
                  type="email"
                  className={`cta-field-input${errors.contact && emailRequired ? ' cta-field-error' : ''}`}
                  placeholder={`Email Address${emailRequired ? ' *' : ' (optional)'}`}
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (errors.contact) setErrors(p => ({ ...p, contact: '' })); }}
                />
              </div>

              {/* Phone */}
              <div className="cta-field-wrap">
                <input
                  type="tel"
                  className={`cta-field-input${errors.contact && phoneRequired ? ' cta-field-error' : ''}`}
                  placeholder={`Phone Number${phoneRequired ? ' *' : ' (optional)'}`}
                  value={phone}
                  onChange={e => { setPhone(e.target.value); if (errors.contact) setErrors(p => ({ ...p, contact: '' })); }}
                />
                {errors.contact && <span className="cta-err-msg">{errors.contact}</span>}
              </div>

            </div>

            {/* RIGHT — message + submit */}
            <div className="cta-form-right">
              <div className="cta-field-wrap" style={{ flex: 1 }}>
                <textarea
                  className="cta-field-input cta-field-textarea cta-field-textarea-full"
                  placeholder="Your Query or Message (optional)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="cta-submit cta-wa-submit">
                <span>Send via WhatsApp →</span>
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}
