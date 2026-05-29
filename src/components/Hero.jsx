import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      {/* Disco sparkle particles */}
      <div
        className={styles.sparksLayer}
        aria-hidden="true"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
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

      {/* Smoke effect */}

      {/* Disco ball icon */}
      <div className={styles.discoBall} aria-hidden="true">
        🪩
      </div>

      <div className={styles.content}>
        <p className={styles.preTitle}>MIS XV AÑOS</p>

        <div className={styles.nameWrap}>
          <span className={styles.line} />
          <h1 className={styles.name}>Rena</h1>
          <span className={styles.line} />
        </div>

        <p className={styles.date}>05 · 09 · 2026</p>

        <div className={styles.florals} aria-hidden="true">
          <span>✦</span>
          <span className={styles.star}>✦</span>
          <span>✦</span>
        </div>

        <p className={styles.quote}>"Crecer es inevitable, brillar es una elección"</p>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
