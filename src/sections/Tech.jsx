import { useEffect } from 'react';
import python from '../assets/tech/python.png';
import mern from '../assets/tech/mern.png';
import aws from '../assets/tech/aws.png';
import ts from '../assets/tech/ts.png';
import angular from '../assets/tech/angular.png';
import node from '../assets/tech/node.png';
import nest from '../assets/tech/nest.png';
import next from '../assets/tech/next.png';
import mongodb from '../assets/tech/mongodb.png';
import mysql from '../assets/tech/mysql.png';
import flutter from '../assets/tech/flutter.png';
import react from '../assets/tech/react.png';
import web from '../assets/tech/web3.png';
import data_science from '../assets/tech/data_science.png';


const techs = [
  { emoji: python, label: 'Python' }, 
  { emoji: react, label: 'React' }, 
  { emoji: mern, label: 'MERN' },
  { emoji: angular, label: 'MEAN' }, 
  { emoji: aws, label: 'AWS' }, 
  { emoji: ts, label: 'TypeScript' },
  { emoji: angular, label: 'Angular' }, 
  { emoji: node, label: 'Nodejs' }, 
  { emoji: nest, label: 'Nestjs' },
  { emoji: next, label: 'Nextjs' }, 
  { emoji: mongodb, label: 'MongoDB' }, 
  { emoji: mysql, label: 'MySQL' },
  { emoji: flutter, label: 'Flutter' }, 
  { emoji: react, label: 'React Native' }, 
  { emoji: web, label: 'Web3.0' },
  { emoji: data_science, label: 'Data Science' },
];

export default function Tech({ animReady }) {
  useEffect(() => {
    if (!animReady || !window.gsap) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.utils.toArray('.hex-item').forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: { trigger: '#hexDisplay', start: 'top 85%' },
        opacity: 1, scale: 1, duration: 0.5, delay: i * 0.05, ease: 'back.out(1.7)'
      });
    });
    gsap.utils.toArray('.section-h2,.about-h2').forEach(el => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' });
    });
  }, [animReady]);

  return (
    <section id="tech">
      <div className="tech-bg-text">TECH</div>
      <div className="tech-inner">
        <div className="section-head">
          <span className="section-eyebrow">// Our Arsenal</span>
          <h2 className="section-h2">Technologies We <em>Master</em></h2>
        </div>
        <div className="hex-display" id="hexDisplay">
          {techs.map((t, i) => (
            <div className="hex-item" key={i}>
              <img src={t.emoji} alt={t.label} className="tech-icon" />
              <span className="hex-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
