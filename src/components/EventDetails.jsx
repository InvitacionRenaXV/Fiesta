import styles from './EventDetails.module.css';
import CalendarIcon from '../assets/CalendarIcon';
import LocationIcon from '../assets/LocationIcon';
import RSVPIcon from '../assets/RSVPIcon';
import ModalRSVP from './ModalRSVP';
import { ShootingStarDivider } from './Divider';
import { handleCalendar } from '../utils/handleCalendar';

export default function EventDetails({ isTeens, isConfirmationlOpen, setisConfirmationlOpen }) {
  return (
    <section id="evento" className={styles.section}>
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
            <p className={styles.cardSub}>20:00 hs. a 04:00 hs.</p>
            <button onClick={handleCalendar} className={styles.mapBtn}>
              Agregar al calendario
            </button>
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
            Prepárate para disfrutar de una noche inolvidable y llena de sorpresas.
            <br />
            Es importante para nosotros que confirmes tu asistencia antes de el{' '}
            <strong>20 de agosto</strong>, para poder organizar todo de la mejor manera y
            asegurarnos de que tengas una experiencia increíble
          </p>
          <ModalRSVP
            isTeens={isTeens}
            isConfirmationlOpen={isConfirmationlOpen}
            setisConfirmationlOpen={setisConfirmationlOpen}
          />
        </div>
      </div>
    </section>
  );
}
