import { useState, useEffect, useRef } from 'react'
import styles from './MusicPlayer.module.css'

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3L9 6v13a3 3 0 1 0 2 2.83V10.17l10-2.5V16a3 3 0 1 0 2 2.83V3h-2z"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
}

export default function MusicPlayer() {
  const [phase, setPhase] = useState('closed')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/invitacion-rena/music.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    return () => audioRef.current.pause()
  }, [])

  const handleOpen = () => {
    if (phase !== 'closed') return
    setPhase('opening')
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    setTimeout(() => setPhase('open'), 1200)
  }

  const toggle = (e) => {
    e.stopPropagation()
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <>
      {phase !== 'open' && (
        <div
          className={`${styles.overlay} ${phase === 'opening' ? styles.overlayFading : ''}`}
          onClick={handleOpen}
        >
          <div className={styles.envelope}>
            <div className={`${styles.flap} ${phase === 'opening' ? styles.flapOpen : ''}`} />
            <div className={styles.envBody}>
              <div className={styles.envLeft} />
              <div className={styles.envRight} />
              <div className={styles.envBottom} />
            </div>
            <div className={styles.seal}>
              <HeartIcon />
            </div>
          </div>
          <p className={styles.enterText}>¡Abrime!</p>
        </div>
      )}
      <button
        className={`${styles.btn} ${playing ? styles.playing : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      >
        <NoteIcon />
      </button>
    </>
  )
}
