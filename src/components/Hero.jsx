import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import exteriores from '../assets/exteriores.jpg';

const SPARKS = [
  { top: '12%', left: '8%', delay: '0s', size: '6px' },
  { top: '22%', left: '88%', delay: '0.4s', size: '4px' },
  { top: '65%', left: '5%', delay: '0.9s', size: '5px' },
  { top: '75%', left: '92%', delay: '0.2s', size: '7px' },
  { top: '40%', left: '95%', delay: '1.1s', size: '4px' },
  { top: '55%', left: '3%', delay: '0.6s', size: '5px' },
  { top: '85%', left: '18%', delay: '1.4s', size: '4px' },
  { top: '10%', left: '72%', delay: '0.8s', size: '6px' },
  { top: '30%', left: '15%', delay: '1.7s', size: '3px' },
  { top: '90%', left: '80%', delay: '0.3s', size: '5px' },
  { top: '48%', left: '82%', delay: '2s', size: '4px' },
  { top: '70%', left: '50%', delay: '1.2s', size: '3px' },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth > 1024) {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true">
        <img
          src={exteriores}
          className={styles.bgImage}
          alt=""
          fetchPriority="high"
          style={{
            transform: `scale(calc(1.05 + var(--scroll-y, 0) * 0.0002)) translateY(calc(var(--scroll-y, 0) * 0.15 * 1px))`,
          }}
        />
      </div>

      {/* Disco sparkle particles */}
      <div
        className={styles.sparksLayer}
        aria-hidden="true"
        style={{
          transform: `translateY(calc(var(--scroll-y, 0) * 0.4 * 1px)) translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {SPARKS.map((s, i) => (
          <span
            key={i}
            className={styles.spark}
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>

      <div className={styles.overlay} />

      {/* Smoke effect */}

      <div className={styles.content}>
        <p
          className={styles.preTitle}
          style={{
            letterSpacing: `calc(0.4em + var(--scroll-y, 0) * 0.001em)`,
            opacity: `calc(0.7 - var(--scroll-y, 0) * 0.002)`,
          }}
        >
          MIS XV AÑOS
        </p>

        <div className={styles.nameWrap}>
          <span className={styles.line} />
          <h1
            className={styles.name}
            style={{
              letterSpacing: `calc(-0.02em + var(--scroll-y, 0) * 0.00005em)`,
              opacity: `calc(1 - var(--scroll-y, 0) * 0.0015)`,
            }}
          >
            Rena
          </h1>
          <span className={styles.line} />
        </div>

        <p
          className={styles.date}
          style={{
            letterSpacing: `calc(0.35em + var(--scroll-y, 0) * 0.0005em)`,
            opacity: `calc(1 - var(--scroll-y, 0) * 0.002)`,
          }}
        >
          05 · 09 · 2026
        </p>

        <div className={styles.florals} aria-hidden="true">
          <span>✦</span>
          <span className={styles.star}>✦</span>
          <span>✦</span>
        </div>

        <p
          className={styles.quote}
          style={{
            letterSpacing: `calc(0.02em + var(--scroll-y, 0) * 0.0002em)`,
            opacity: `calc(1 - var(--scroll-y, 0) * 0.0025)`,
          }}
        >
          "Crecer es inevitable, brillar es una elección"
        </p>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
