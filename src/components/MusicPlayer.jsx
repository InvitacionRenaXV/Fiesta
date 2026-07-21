import { useState, useEffect, useRef } from 'react';
import styles from './MusicPlayer.module.css';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function MusicPlayer({ isTeens, isConfirmationlOpen }) {
  const isHidden = !!isConfirmationlOpen;
  const [phase, setPhase] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('success') ? 'open' : 'closed';
  });
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/fiesta/audio.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    });
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    audioRef.current.currentTime = clamped * audioRef.current.duration;
    setProgress(clamped);
  };

  const handleOpen = () => {
    if (phase !== 'closed') return;

    // Intentar activar Pantalla Completa para máxima inmersión
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) {
      /* Safari / iOS */
      docEl.webkitRequestFullscreen();
    }

    setPhase('opening');
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
    setTimeout(() => setPhase('open'), 1200);
  };

  const toggle = (e) => {
    e.stopPropagation();
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className={`${styles.mainContainer} ${isHidden ? styles.hiddenContainer : ''}`}>
      {phase !== 'open' && (
        <div
          className={`${styles.overlay} ${phase === 'opening' ? styles.overlayFading : ''}`}
          onClick={handleOpen}
        >
          <div className={`${styles.envelope} ${phase === 'opening' ? styles.envelopeZoom : ''}`}>
            <div className={`${styles.flap} ${phase === 'opening' ? styles.flapOpen : ''}`} />
            <div className={styles.envBody}>
              <div className={styles.envLeft} />
              <div className={styles.envRight} />
              <div className={styles.envBottom} />
            </div>
            <div className={styles.seal}>
              <HeartIcon />
            </div>
            {phase === 'opening' && (
              <div className={styles.burst}>
                {[...Array(12)].map((_, i) => (
                  <span key={i} className={styles.particle} style={{ '--i': i }} />
                ))}
              </div>
            )}
          </div>
          <p className={styles.enterText}>¡Abrime!</p>
        </div>
      )}
      <div className={`${styles.player} ${phase === 'open' ? styles.playerVisible : ''}`}>
        <div className={styles.notesArc} aria-hidden="true">
          {['♩', '♪', '♫', '♪'].map((n, i) => (
            <span key={i} className={styles.floatNote} style={{ '--ni': i }}>
              {n}
            </span>
          ))}
        </div>
        <button
          className={`${styles.btn} ${playing ? styles.playing : ''}`}
          onClick={toggle}
          aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        {phase === 'open' && (
          <div
            className={styles.progressBar}
            onClick={seek}
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
