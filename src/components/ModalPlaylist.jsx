import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalRSVP.module.css';

export default function ModalPlaylist({ isPlaylistlOpen, setisPlaylistlOpen }) {
  const [localOpen, setLocalOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cancion: '',
  });
  const previousBodyOverflow = useRef('');

  const isControlled =
    typeof isPlaylistlOpen === 'boolean' && typeof setisPlaylistlOpen === 'function';
  const isOpen = isControlled ? isPlaylistlOpen : localOpen;
  const changeOpen = (v) => {
    if (isControlled) setisPlaylistlOpen(v);
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
                      <textarea
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Quien la pide?"
                        required
                        className={styles.modalInput}
                      />
                    </div>
                    <div>
                      <textarea
                        type="text"
                        name="cancion"
                        value={formData.cancion}
                        onChange={handleChange}
                        placeholder=" Qué canción o cantante no debe faltar?"
                        required
                        className={styles.modalInput}
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
          </div>,
          document.body
        )}
    </>
  );
}
