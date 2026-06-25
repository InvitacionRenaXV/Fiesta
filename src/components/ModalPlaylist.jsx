import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalRSVP.module.css';

export default function ModalPlaylist({ isPlaylistOpen, setIsPlaylistOpen }) {
  const [localOpen, setLocalOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cancion: '',
  });
  const previousBodyOverflow = useRef('');

  const isControlled =
    typeof isPlaylistOpen === 'boolean' && typeof setIsPlaylistOpen === 'function';
  const isOpen = isControlled ? isPlaylistOpen : localOpen;
  const changeOpen = (v) => {
    if (isControlled) setIsPlaylistOpen(v);
    else setLocalOpen(v);
  };

  useEffect(() => {
    if (!isOpen) return;

    // Sincronización con el botón atrás del dispositivo
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      changeOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Limpiamos el historial si se cierra manualmente
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
      document.body.style.overflow = previousBodyOverflow.current || '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    // Un pequeño delay para que el scroll ocurra mientras el teclado se despliega
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    const googleFormData = new FormData();
    googleFormData.append('entry.1674695982', formData.nombre);
    googleFormData.append('entry.536167965', formData.cancion);

    const rsvpUrl =
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfmTzzwzrKZfONfoiMOxXMEl9YPXbcNDTG8b2kcEG7NK5GSyw/formResponse';

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
          setFormData({
            nombre: '',
            cancion: '',
          });
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al enviar:', err);
        setEnviando(false);
        alert('Hubo un error al registrar tu sugerencia. Inténtalo de nuevo.');
      });
  };

  return (
    <>
      {/* Botón de apertura con CSS Modules */}
      <button onClick={() => changeOpen(true)} className={styles.btn}>
        Sugerir canción
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
                    ¿Creamos la Playlist?
                  </h3>

                  <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        placeholder="Quien la pide?"
                        autoComplete="name"
                        required
                        className={styles.modalInput}
                      />
                    </div>
                    <div>
                      <textarea
                        name="cancion"
                        value={formData.cancion}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        placeholder=" Qué canción o cantante no debe faltar?"
                        required
                        className={styles.modalInput}
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
