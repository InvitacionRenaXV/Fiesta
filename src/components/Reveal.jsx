import React, { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

const SECTION_SPARKS = [
  { top: '15%', left: '8%', delay: '0s', size: '4px' },
  { top: '45%', left: '92%', delay: '0.4s', size: '5px' },
  { top: '75%', left: '4%', delay: '1.1s', size: '3px' },
  { top: '25%', left: '85%', delay: '0.7s', size: '4px' },
  { top: '85%', left: '78%', delay: '1.5s', size: '5px' },
  { top: '60%', left: '12%', delay: '0.2s', size: '3px' },
  { top: '35%', left: '20%', delay: '0.9s', size: '4px' },
  { top: '70%', left: '60%', delay: '1.2s', size: '3px' },
  { top: '10%', left: '45%', delay: '1.8s', size: '5px' },
  { top: '90%', left: '30%', delay: '0.5s', size: '4px' },
];

export default function Reveal({ children, excludeSparks = false }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px 250px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${isVisible ? styles.visible : ''}`}>
      {!excludeSparks && (
        <div className={styles.sparksLayer} aria-hidden="true">
          {SECTION_SPARKS.map((s, i) => (
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
      )}
      {children}
    </div>
  );
}
