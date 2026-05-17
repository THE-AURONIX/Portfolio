const tickData = [
  { k: 'AI_PERF', v: '↑ 340%', c: 'up' }, { k: 'CLOUD_OPS', v: '99.99%', c: 'up' },
  { k: 'LATENCY', v: '↓ 12ms', c: 'up' }, { k: 'SEC_SCORE', v: 'A+', c: 'up' },
  { k: 'THROUGHPUT', v: '10M/s', c: 'up' }, { k: 'DATA_ACY', v: '99.8%', c: 'up' },
  { k: 'UPTIME', v: '100%', c: 'up' }, { k: 'DEPLOY', v: '<2min', c: 'up' },
];

const doubled = [...tickData, ...tickData, ...tickData, ...tickData];

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-inner" id="ticker">
        {doubled.map((d, i) => (
          <div className="ticker-item" key={i}>
            <span className="ticker-key">{d.k}</span>
            <span className="ticker-sep">│</span>
            <span className={`ticker-val ticker-change ${d.c}`}>{d.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
