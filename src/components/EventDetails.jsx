import styles from './EventDetails.module.css'
import CalendarIcon from '../assets/CalendarIcon'
import LocationIcon from '../assets/LocationIcon'
import RSVPIcon from '../assets/RSVPIcon'
import { ShootingStarDivider } from './Divider'

const SPARKS = [
  { top: '10%', left: '4%',  delay: '0s',   size: '5px' },
  { top: '20%', left: '93%', delay: '0.6s',  size: '4px' },
  { top: '55%', left: '2%',  delay: '1.1s',  size: '3px' },
  { top: '70%', left: '96%', delay: '0.3s',  size: '5px' },
  { top: '30%', left: '88%', delay: '1.4s',  size: '4px' },
  { top: '80%', left: '7%',  delay: '0.8s',  size: '3px' },
  { top: '45%', left: '91%', delay: '1.9s',  size: '4px' },
  { top: '15%', left: '10%', delay: '0.5s',  size: '3px' },
]

export default function EventDetails({ isTeens }) {
  return (
    <section id="evento" className={styles.section}>
      <div className={styles.sparksLayer} aria-hidden="true">
        {SPARKS.map((s, i) => (
          <span key={i} className={styles.spark}
            style={{ top: s.top, left: s.left, animationDelay: s.delay, width: s.size, height: s.size }}
          />
        ))}
      </div>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Te invito a celebrar</p>
        <h2 className={styles.heading}>Mis XV Años</h2>

        <ShootingStarDivider />

        <div className={styles.cards}>
          {/* Date & Time */}
          <div className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              <CalendarIcon />
            </span>
            <h3 className={styles.cardTitle}>Fecha &amp; Hora</h3>
            <p className={styles.cardMain}>Sábado 5 de Septiembre, 2026</p>
            <p className={styles.cardSub}>21:00 hs. (puntual) a 04:00 hs.</p>
          </div>

          {/* Location */}
          <div className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              <LocationIcon style={{ width: '2.6rem', height: '2.6rem' }} />
            </span>
            <h3 className={styles.cardTitle}>Lugar</h3>
            <p className={styles.cardMain}>LOS ZORZALES</p>
            <p className={styles.cardSub}>Ruta 8 Km 20.200</p>
            <a
              href="https://www.google.com/maps/place/Sede+C.S.+y+D.+Los+Zorzales/@-34.7761905,-56.0519258,20.46z/data=!4m14!1m7!3m6!1s0x95a028f18e20f1c7:0x8864908dfa19525!2sLos+Zorzales!8m2!3d-34.7759977!4d-56.0535621!16s%2Fg%2F11b7w6bhyy!3m5!1s0x95a0294921ff7a93:0xda5555c9e448f50b!8m2!3d-34.7762505!4d-56.051766!16s%2Fg%2F11pyk3cz5k?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}
            >
              ¿Cómo llegar?
            </a>
          </div>
        </div>

        <div className={styles.confirm}>
          <span className={styles.icon} aria-hidden="true">
            <RSVPIcon />
          </span>
          <h3 className={styles.cardTitle}>¿Venís?</h3>
          <p className={styles.confirmText}>
            Prepárate para disfrutar de una noche inolvidable y llena de sorpresas.<br />
            Es importante para nosotros que confirmes tu asistencia antes de el <strong>20 de agosto</strong>, para poder organizar todo de la mejor manera y asegurarnos de que tengas una experiencia increíble

          </p>
          <a
            href={isTeens ? "https://forms.gle/3sSgUS3pWPM83kgD7" : "https://forms.gle/YgsD2SUcfGDEaCyF6"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.rsvpBtn}
          >
            Confirmar asistencia
          </a>
        </div>
      </div>
    </section>
  )
}
