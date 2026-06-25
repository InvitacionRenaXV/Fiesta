import styles from './Reveal.module.css';

const SPARKS = [
  { top: '12%', left: '10%', delay: '0s', size: '4px' },
  { top: '18%', left: '82%', delay: '0.7s', size: '3px' },
  { top: '33%', left: '25%', delay: '1.2s', size: '5px' },
  { top: '46%', left: '68%', delay: '0.4s', size: '4px' },
  { top: '60%', left: '12%', delay: '1.8s', size: '3px' },
  { top: '72%', left: '84%', delay: '0.9s', size: '4px' },
  { top: '30%', left: '50%', delay: '1.4s', size: '3px' },
  { top: '78%', left: '38%', delay: '0.2s', size: '5px' },
  { top: '54%', left: '92%', delay: '1.1s', size: '3px' },
  { top: '88%', left: '18%', delay: '0.6s', size: '4px' },
];

export default function Reveal({ children, excludeSparks = false }) {
  return (
    <div className={styles.reveal}>
      {!excludeSparks && (
        <div className={styles.sparksLayer} aria-hidden="true">
          {SPARKS.map((spark, index) => (
            <span
              key={index}
              className={styles.spark}
              style={{
                top: spark.top,
                left: spark.left,
                width: spark.size,
                height: spark.size,
                animationDelay: spark.delay,
              }}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
