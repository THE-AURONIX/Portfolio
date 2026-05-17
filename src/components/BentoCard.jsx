export default function BentoCard({ className, children, style }) {
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%';
    e.currentTarget.style.setProperty('--mx', x);
    e.currentTarget.style.setProperty('--my', y);
  };

  return (
    <div
      className={`bento-card ${className || ''}`}
      data-bento
      onMouseMove={handleMouseMove}
      style={style}
    >
      {children}
    </div>
  );
}
