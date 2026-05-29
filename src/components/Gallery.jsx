import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Gallery.module.css';

import img1 from '../assets/gallery/1.jpeg';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';

const IMAGES = [img1, img2, img3];

export default function Gallery() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{
            clickable: true,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          loop={true}
          className={styles.mySwiper}
        >
          {IMAGES.map((src, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <img
                src={src}
                alt={`Rena photo ${index + 1}`}
                className={styles.photo}
                loading="lazy"
                decoding="async"
              />
            </SwiperSlide>
          ))}

          {/* Controles laterales centrados */}
          <button
            ref={prevRef} // Asignamos la referencia al botón
            className={`${styles.navBtn} ${styles.prevBtn}`} // Mantenemos las clases CSS Modules
            aria-label="Anterior"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5" // Ajuste para consistencia con los iconos del Footer
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            ref={nextRef} // Asignamos la referencia al botón
            className={`${styles.navBtn} ${styles.nextBtn}`} // Mantenemos las clases CSS Modules
            aria-label="Siguiente"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5" // Ajuste para consistencia con los iconos del Footer
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </Swiper>
      </div>
    </section>
  );
}
