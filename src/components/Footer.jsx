import styles from './Footer.module.css';
import { GlowDivider } from './Divider';
import HeartHandsIcon from '../assets/HeartHandsIcon';
import { handleCalendar } from '../utils/handleCalendar';

const Icons = {
  Confirm: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  Music: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Map: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function Footer({ setisConfirmationlOpen, setisPlaylistlOpen }) {
  const handleMap = () => {
    window.open(
      'https://www.google.com/maps/place/Sede+C.S.+y+D.+Los+Zorzales/@-34.7761905,-56.0519258,20.46z/data=!4m14!1m7!3m6!1s0x95a028f18e20f1c7:0x8864908dfa19525!2sLos+Zorzales!8m2!3d-34.7759977!4d-56.0535621!16s%2Fg%2F11b7w6bhyy!3m5!1s0x95a0294921ff7a93:0xda5555c9e448f50b!8m2!3d-34.7762505!4d-56.051766!16s%2Fg%2F11pyk3cz5k?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D',
      '_blank'
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.flourish} aria-hidden="true">
          <HeartHandsIcon className={styles.heartHands} />
        </div>

        <h2 className={styles.name}>Rena</h2>

        <p className={styles.tagline}>¡Te espero!</p>

        <GlowDivider />

        <p className={styles.date}>05 · 09 · 2026</p>
        <p className={styles.location}>Los Zorzales, Ruta 8</p>

        <div className={styles.actions}>
          <button onClick={() => setisConfirmationlOpen(true)} className={styles.actionBtn}>
            <Icons.Confirm />
            <span>Confirmar</span>
          </button>
          <button onClick={() => setisPlaylistlOpen(true)} className={styles.actionBtn}>
            <Icons.Music />
            <span>Sugerir canción</span>
          </button>
          <button onClick={handleCalendar} className={styles.actionBtn}>
            <Icons.Calendar />
            <span>Agendar evento</span>
          </button>
          <button onClick={handleMap} className={styles.actionBtn}>
            <Icons.Map />
            <span>Cómo llegar</span>
          </button>
        </div>

        <p className={styles.copy}>Hecho con ❤️ para Rena</p>
      </div>
    </footer>
  );
}
