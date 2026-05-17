const tests = [
  { q: "Auronix transformed our data infrastructure. Their AI pipeline cut processing time by 80% and they delivered ahead of schedule. Absolutely elite engineering.", n: "Alexander Kim", r: "CTO, NexaFinance", i: "AK", s: "★★★★★" },
  { q: "The blockchain solution they built for our supply chain is nothing short of brilliant. Complete transparency, zero downtime since launch.", n: "Sarah Mitchell", r: "VP Engineering, LogiChain", i: "SM", s: "★★★★★" },
  { q: "From strategy to deployment, Auronix was a genuine partner. Our platform now handles 10x load at half the infrastructure cost.", n: "Raj Johansson", r: "Founder, ScaleOS", i: "RJ", s: "★★★★★" },
  { q: "Their cloud architecture work reduced our monthly AWS bill by 60% while tripling performance. I've never seen an engineering team this sharp.", n: "Elena Vasquez", r: "CEO, CloudPivot", i: "EV", s: "★★★★★" },
  { q: "We launched 3 months ahead of schedule. The team's ability to anticipate challenges before they become problems is remarkable.", n: "David Chen", r: "CTO, Momentum AI", i: "DC", s: "★★★★★" },
];

const doubled = [...tests, ...tests, ...tests, ...tests];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="test-inner">
        <div className="section-head">
          <span className="section-eyebrow">// Client Voices</span>
          <h2 className="section-h2">Trusted by <em>Leaders</em></h2>
        </div>
      </div>
      <div className="test-track-wrap">
        <div className="test-track" id="testTrack">
          {doubled.map((t, i) => (
            <div className="test-card" key={i}>
              <div className="test-score">{t.s}</div>
              <p className="test-quote">"{t.q}"</p>
              <div className="test-author">
                <div className="test-ava">{t.i}</div>
                <div>
                  <div className="test-name">{t.n}</div>
                  <div className="test-role">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
