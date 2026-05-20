import React, { useState, useEffect, useRef } from 'react';
import styles from './ModalRSVP.module.css';

export default function ModalRSVP({ isTeens, isModalOpen, setIsModalOpen }) {
  const [localOpen, setLocalOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    nombreAdulto: '',
    asistencia: '',
    restricciones: '',
    restriccionesDetalle: '',
    telefonoAdulto: '',
    mensaje: '',
  });
  const previousBodyOverflow = useRef('');

  const isControlled = typeof isModalOpen === 'boolean' && typeof setIsModalOpen === 'function';
  const isOpen = isControlled ? isModalOpen : localOpen;
  const changeOpen = (v) => {
    if (isControlled) setIsModalOpen(v);
    else setLocalOpen(v);
  };

  useEffect(() => {
    if (isOpen) {
      previousBodyOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousBodyOverflow.current || '';
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow.current || '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const googleFormData = new FormData();
    googleFormData.append('entry.316980587', formData.nombre);
    googleFormData.append('entry.947593337', formData.cedula);
    googleFormData.append('entry.1733511234', formData.nombreAdulto);
    googleFormData.append('entry.198903852', formData.telefonoAdulto);
    googleFormData.append('entry.34795512', formData.asistencia);
    const restriccionesValue =
      formData.restricciones === 'Otro' && formData.restriccionesDetalle
        ? `${formData.restricciones}: ${formData.restriccionesDetalle}`
        : formData.restricciones;
    googleFormData.append('entry.1002307023', restriccionesValue);
    googleFormData.append('entry.591682182', formData.mensaje);

    const rsvpUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSfg6_keVDCfWZip02B3gGN0HfTDs6bYqV37GmsjWJjusBCrdg/formResponse';

    fetch(rsvpUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: googleFormData,
    })
      .then(() => {
        setEnviado(true);
        setTimeout(() => {
          changeOpen(false);
          setEnviado(false);
          setFormData({
            nombre: '',
            cedula: '',
            nombreAdulto: '',
            asistencia: '',
            restricciones: '',
            restriccionesDetalle: '',
            telefonoAdulto: '',
            mensaje: '',
          });
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al enviar:', err);
        alert('Hubo un error al registrar tu asistencia. Inténtalo de nuevo.');
      });
  };

  return (
    <>
      {/* Botón de apertura con CSS Modules */}
      <button onClick={() => changeOpen(true)} className={styles.btn}>
        Confirmar Asistencia
      </button>

      {/* Ventana Modal */}
      {isOpen && (
        <div onClick={() => changeOpen(false)} className={styles.modalOverlay}>
          {/* Se utiliza la clase .confirm para dar la estructura visual de tarjeta */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.confirm}
            style={{ position: 'relative' }}
          >
            {/* Botón de cierre en cruz */}
            <span onClick={() => changeOpen(false)} className={styles.modalClose}>
              &times;
            </span>

            {!enviado ? (
              <>
                {/* Título elegante adaptado a tu CSS */}
                <h3 className={styles.heading} style={{ fontSize: '3.5rem' }}>
                  ¿Venis?
                </h3>
                <p className={styles.cardSub}>Por favor, completa los datos para tu asistencia</p>

                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div>
                    <textarea
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre y Apellido"
                      required
                      className={styles.modalInput}
                    />
                  </div>

                  <div className={styles.radioSection}>
                    <label className={styles.radioLabel}>¿Asistirás al evento?</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioOption}>
                        <input
                          type="radio"
                          name="asistencia"
                          value="Si, obvio!"
                          checked={formData.asistencia === 'Si, obvio!'}
                          onChange={handleChange}
                          required
                        />{' '}
                        Asistiré con gusto
                      </label>
                      <label className={styles.radioOption}>
                        <input
                          type="radio"
                          name="asistencia"
                          value="No =("
                          checked={formData.asistencia === 'No =('}
                          onChange={handleChange}
                        />{' '}
                        No podré asistir
                      </label>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={handleChange}
                      placeholder="Cédula"
                      required
                      className={styles.modalInput}
                    />
                  </div>
                  {isTeens && (
                    <>
                      <div>
                        <input
                          type="text"
                          name="nombreAdulto"
                          value={formData.nombreAdulto}
                          onChange={handleChange}
                          placeholder="Nombre de Madre, Padre o tutor"
                          required
                          className={styles.modalInput}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="telefonoAdulto"
                          value={formData.telefonoAdulto}
                          onChange={handleChange}
                          placeholder="Teléfono de Madre, Padre o tutor"
                          required
                          className={styles.modalInput}
                        />
                      </div>
                    </>
                  )}

                  <div className={styles.radioSection}>
                    <label className={styles.radioLabel}>Menú especial</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioOption}>
                        <input
                          type="radio"
                          name="restricciones"
                          value="Ninguna"
                          checked={formData.restricciones === 'Ninguna'}
                          onChange={handleChange}
                        />{' '}
                        Ninguna
                      </label>
                      <label className={styles.radioOption}>
                        <input
                          type="radio"
                          name="restricciones"
                          value="Celiac@"
                          checked={formData.restricciones === 'Celiac@'}
                          onChange={handleChange}
                        />{' '}
                        Celiac@
                      </label>
                      <label className={styles.radioOption}>
                        <input
                          type="radio"
                          name="restricciones"
                          value="Vegetarian@"
                          checked={formData.restricciones === 'Vegetarian@'}
                          onChange={handleChange}
                        />{' '}
                        Vegetarian@
                      </label>
                      <label className={styles.radioOption}>
                        <input
                          type="radio"
                          name="restricciones"
                          value="Otro"
                          checked={formData.restricciones === 'Otro'}
                          onChange={handleChange}
                        />{' '}
                        Otro
                      </label>
                    </div>
                  </div>
                  {formData.restricciones === 'Otro' && (
                    <div>
                      <textarea
                        name="restriccionesDetalle"
                        value={formData.restriccionesDetalle}
                        onChange={handleChange}
                        placeholder="Especificá (ej. 'No come pescado')"
                        className={styles.modalInput}
                        rows={2}
                      />
                    </div>
                  )}
                  <div>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Mensaje especial"
                      className={styles.modalInput}
                      rows={2}
                    />
                  </div>
                  <button type="submit" className={styles.btn} style={{ marginTop: '0.5rem' }}>
                    Confirmar
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.inner}>
                <h3 className={styles.heading} style={{ fontSize: '3rem' }}>
                  ¡Gracias!
                </h3>
                <p className={styles.confirmText}>
                  ✨<br />
                  Tu respuesta ha sido registrada con éxito.
                  <br />
                  Muchas gracias.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
