import React from 'react';
import styles from './Preloader.module.css';

export default function Preloader({ fadeOut }) {
  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.name}>Rena</h1>
        <div className={styles.loaderLine}>
          <div className={styles.progress} />
        </div>
      </div>
    </div>
  );
}
