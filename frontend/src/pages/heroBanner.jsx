import React from 'react';
import styles from '../styles/pages/heroBanner.module.css';

import heroBannerImg1 from '../assets/webp/heroBanner_img1.webp';
import heroBannerImg2 from '../assets/webp/heroBanner_img2.webp';

const HeroBanner = () => {
    return (
        <section className={styles.heroWrapper}>
            <div className={styles.heroBanner1}>
                <div className={styles.heroBanner1Content}>
                    <div className={styles.textBox}>
                        <h1>Día de la madre</h1>
                        <p>Regalá belleza, estilo y amor. Descubrí opciones pensadas para mamá.</p>
                    </div>
                    <div className={styles.imageBox}></div>
                </div>
            </div>

            <div className={styles.heroBanner2}>
                <div className={styles.bannerContentBottomLeft}>
                    <h1>Joyas con Estilo</h1>
                    <p>Descubre piezas únicas que brillan con elegancia y personalidad.</p>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;