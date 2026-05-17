import logoTransparent from '../assets/logo_transperent.png';

export default function RadarWidget() {
  return (
    <div className="radar-wrap">
      <div className="radar-ring" style={{ width: '380px', height: '380px' }}></div>
      <div className="radar-ring" style={{ width: '280px', height: '280px', borderColor: 'rgba(123,77,255,.15)' }}></div>
      <div className="radar-ring" style={{ width: '180px', height: '180px', borderColor: 'rgba(123,77,255,.1)' }}></div>
      <div className="radar-ring" style={{ width: '80px', height: '80px', borderColor: 'rgba(183,156,255,.2)' }}></div>
      <div className="radar-sweep"></div>
      <div className="radar-dot" style={{ width: '10px', height: '10px', top: '22%', left: '65%' }}></div>
      <div className="radar-dot" style={{ width: '7px', height: '7px', top: '60%', left: '28%', animationDelay: '.5s' }}></div>
      <div className="radar-dot" style={{ width: '8px', height: '8px', top: '75%', left: '70%', animationDelay: '1s' }}></div>
      <div className="radar-dot" style={{ width: '6px', height: '6px', top: '35%', left: '15%', animationDelay: '1.5s' }}></div>
      <div className="radar-dot" style={{ width: '9px', height: '9px', top: '50%', left: '82%', animationDelay: '.7s' }}></div>
      <div className="radar-center">
        <img className="n-logo-img" src={logoTransparent} alt="Auronix Logo" />
      </div>
      <div className="radar-label" style={{ top: '8px', left: '50%', transform: 'translateX(-50%)' }}>AI CORE</div>
      <div className="radar-label" style={{ bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}>SECURE</div>
      <div className="radar-label" style={{ left: '8px', top: '50%', transform: 'translateY(-50%)' }}>CLOUD</div>
      <div className="radar-label" style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}>DATA</div>
    </div>
  );
}
