import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import families from '../const/families.json';
import styles from './ModalConfirmacion.module.css';

export default function ModalConfirmacion({
  isTeens,
  isConfirmationOpen,
  setIsConfirmationOpen,
  familia,
  miembros,
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const [seleccionados, setSeleccionados] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
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
  const previousBodyPosition = useRef('');
  const previousBodyTop = useRef('');
  const scrollYRef = useRef(0);

  const isControlled =
    typeof isConfirmationOpen === 'boolean' && typeof setIsConfirmationOpen === 'function';
  const isOpen = isControlled ? isConfirmationOpen : localOpen;
  const changeOpen = (v) => {
    if (isControlled) setIsConfirmationOpen(v);
    else setLocalOpen(v);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSeleccionados((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  useEffect(() => {
    if (!isOpen) return;

    if (Array.isArray(miembros)) {
      setSeleccionados(Object.fromEntries(miembros.map((miembro) => [miembro, true])));
    } else {
      setSeleccionados({});
    }

    // Empujamos un estado al historial para que el botón "Atrás" funcione
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      changeOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    previousBodyOverflow.current = document.body.style.overflow;
    previousBodyPosition.current = document.body.style.position;
    previousBodyTop.current = document.body.style.top;
    scrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Si el modal se cierra por UI (X o overlay), eliminamos el estado del historial
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
      document.body.style.position = previousBodyPosition.current || '';
      document.body.style.top = previousBodyTop.current || '';
      document.body.style.width = '';
      document.body.style.overflow = previousBodyOverflow.current || '';
      if (scrollYRef.current) {
        window.scrollTo(0, scrollYRef.current);
      }
    };
  }, [isOpen]); // changeOpen es estable

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const resetFormState = () => {
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
    setSeleccionados({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    const currentValues = {
      ...formData,
      seleccionados: Object.entries(seleccionados)
        .filter(([, checked]) => checked)
        .map(([name]) => name),
    };

    const googleFormData = new FormData();
    const payload = {
      nombre: currentValues.nombre || '',
      cedula: currentValues.cedula || '',
      nombreAdulto: currentValues.nombreAdulto || '',
      telefonoAdulto: currentValues.telefonoAdulto || '',
      asistencia: currentValues.asistencia || '',
      restricciones: currentValues.restricciones || '',
      restriccionesDetalle: currentValues.restriccionesDetalle || '',
      mensaje: currentValues.mensaje || '',
      seleccionados: currentValues.seleccionados,
    };

    googleFormData.append('entry.316980587', currentValues.nombre || '');
    googleFormData.append('entry.947593337', currentValues.cedula || '');
    googleFormData.append('entry.1733511234', currentValues.nombreAdulto || '');
    googleFormData.append('entry.198903852', currentValues.telefonoAdulto || '');
    googleFormData.append('entry.591682182', currentValues.seleccionados.join(', ') || '');
    googleFormData.append('entry.1265185030', currentValues.mensaje || '');
    googleFormData.append('entry.34795512', currentValues.asistencia || '');

    if (currentValues.restricciones === 'Otro') {
      googleFormData.append('entry.1002307023', '__other_option__');
      googleFormData.append(
        'entry.1002307023.other_option_response',
        currentValues.restriccionesDetalle || ''
      );
    } else {
      googleFormData.append('entry.1002307023', currentValues.restricciones || '');
    }

    const rsvpUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSfg6_keVDCfWZip02B3gGN0HfTDs6bYqV37GmsjWJjusBCrdg/formResponse';

    fetch(rsvpUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: googleFormData,
    })
      .then(() => {
        setEnviado(true);
        setEnviando(false);
        setTimeout(() => {
          changeOpen(false);
          setEnviado(false);
          resetFormState();
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al enviar:', err);
        setEnviando(false);
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
      {isOpen &&
        createPortal(
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
                    ¿Venís?
                  </h3>
                  <p className={styles.cardSub}>Por favor, completa los datos para tu asistencia</p>

                  <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        placeholder="Nombre y Apellido"
                        autoComplete="name"
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
                        onFocus={handleFocus}
                        placeholder="Cédula"
                        required
                        className={styles.modalInput}
                      />
                    </div>

                    {familia && miembros && (
                      <div className={styles.radioSection}>
                        <p className={styles.radioLabel}>Miembros de la familia:</p>
                        <div className={styles.radioGroup}>
                          {miembros.map((miembro, index) => (
                            <label key={index} className={styles.radioOption}>
                              <input
                                type="checkbox"
                                name={miembro}
                                checked={!!seleccionados[miembro]}
                                onChange={handleCheckboxChange}
                              />
                              {miembro}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {isTeens && (
                      <>
                        <div>
                          <input
                            type="text"
                            name="nombreAdulto"
                            value={formData.nombreAdulto}
                            onChange={handleChange}
                            onFocus={handleFocus}
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
                            onFocus={handleFocus}
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
                          onFocus={handleFocus}
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
                        onFocus={handleFocus}
                        placeholder="Mensaje especial"
                        className={styles.modalInput}
                        rows={2}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`${styles.btn} ${enviando ? styles.btnDisabled : ''}`}
                      style={{ marginTop: '0.5rem' }}
                      disabled={enviando}
                    >
                      {enviando ? 'Enviando...' : 'Confirmar'}
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
          </div>,
          document.body
        )}
    </>
  );
}
