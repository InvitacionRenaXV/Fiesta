import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const EVENT_DATE = new Date('2026-09-05T21:00:00');

function getTimeLeft() {
  const diff = EVENT_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

function Pad({ value, label }) {
  return (
    <div className={styles.unit}>
      <span className={styles.number}>{String(value).padStart(2, '0')}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Faltan solamente</p>
        <div className={styles.timer}>
          <Pad value={time.days} label="Días" />
          <span className={styles.colon}>:</span>
          <Pad value={time.hours} label="Horas" />
          <span className={styles.colon}>:</span>
          <Pad value={time.minutes} label="Minutos" />
        </div>
        <p className={styles.sub}>para la noche más especial</p>
      </div>{' '}
      <img
        className={styles.miniDisco}
        src={`${import.meta.env.BASE_URL}apple-touch-icon.png`}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
