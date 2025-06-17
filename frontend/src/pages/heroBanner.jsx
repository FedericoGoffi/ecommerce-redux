import React from 'react';
import styles from '../styles/pages/heroBanner.module.css';

import heroBannerImg1 from '../assets/avif/Banners/heroBanner_img1.avif';
import heroBannerImg2 from '../assets/avif/Banners/heroBanner_img2.avif';

const HeroBanner = () => {
    return (
        <section className={styles.heroWrapper}>
            {/* Banner 1 */}
            <div className={styles.heroBanner1}>
                <div className={styles.heroBanner1Content}>
                    <div className={styles.textBox}>
                        <h1>Día de la madre</h1>
                        <p>Regalá belleza, estilo y amor. Descubrí opciones pensadas para mamá.</p>
                    </div>
                    <div className={styles.imageBox}>
                        <img
                            src={heroBannerImg1}
                            alt="Día de la madre"
                            loading="eager"
                            width="400"
                            height="400"
                        />
                    </div>
                </div>
            </div>

            {/* Banner 2 */}
            <div className={styles.heroBanner2}>
                <img
                    src={heroBannerImg2}
                    alt="Joyas con Estilo"
                    loading="eager"
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                        borderRadius: '20px'
                    }}
                />
                <div className={styles.bannerContentBottomLeft}>
                    <h1>Joyas con Estilo</h1>
                    <p>Descubre piezas únicas que brillan con elegancia y personalidad.</p>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;