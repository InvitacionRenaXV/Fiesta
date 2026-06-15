import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import styles from './Gallery.module.css';

import img1 from '../assets/gallery/1.jpeg';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import img4 from '../assets/gallery/4.jpeg';
import img5 from '../assets/gallery/5.jpeg';

const IMAGES = [img1, img2, img3, img4, img5];

export default function Gallery() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <Swiper
          modules={[Pagination, EffectFade, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          className={styles.mySwiper}
          data-lenis-prevent
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
        </Swiper>
      </div>
    </section>
  );
}
