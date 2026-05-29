import ModalRSVP from './ModalRSVP';
import styles from './Playlist.module.css';
import ModalPlaylist from './ModalPlaylist';
const NOTES = [
  // izquierda
  { top: '15%', left: '3%', delay: '0s', symbol: '♩', size: '1.5rem' },
  { top: '48%', left: '5%', delay: '1.3s', symbol: '♫', size: '1.7rem' },
  { top: '80%', left: '2%', delay: '0.6s', symbol: '♬', size: '1.3rem' },
  // derecha
  { top: '20%', left: '91%', delay: '0.7s', symbol: '♪', size: '1.4rem' },
  { top: '52%', left: '89%', delay: '1.5s', symbol: '♩', size: '1.6rem' },
  { top: '83%', left: '92%', delay: '0.4s', symbol: '♫', size: '1.2rem' },
  // arriba
  { top: '2%', left: '25%', delay: '1.0s', symbol: '♬', size: '1.3rem' },
  { top: '3%', left: '50%', delay: '0.4s', symbol: '♪', size: '1.1rem' },
  { top: '2%', left: '75%', delay: '1.6s', symbol: '♩', size: '1.4rem' },
  // abajo
  { top: '95%', left: '25%', delay: '1.2s', symbol: '♪', size: '1.3rem' },
  { top: '96%', left: '50%', delay: '0.2s', symbol: '♬', size: '1.1rem' },
  { top: '95%', left: '75%', delay: '1.9s', symbol: '♫', size: '1.4rem' },
];

export default function Playlist({ isPlaylistlOpen, setisPlaylistlOpen }) {
  return (
    <section className={styles.section}>
      <div className={styles.notesLayer} aria-hidden="true">
        {NOTES.map((n, i) => (
          <span
            key={i}
            className={styles.note}
            style={{ top: n.top, left: n.left, animationDelay: n.delay, fontSize: n.size }}
          >
            {n.symbol}
          </span>
        ))}
      </div>
      <div className={styles.inner}>
        <h2 className={styles.heading}>La Playlist </h2>

        <p className={styles.text}>
          ¿Creamos la Playlist juntos?
          <br />
          ¿Qué canción o cantante no puede faltar?
        </p>

        <ModalPlaylist isPlaylistlOpen={isPlaylistlOpen} setisPlaylistlOpen={setisPlaylistlOpen} />
      </div>
    </section>
  );
}
