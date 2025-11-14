import React from 'react'

import styles from '../styles/components/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.sections}>
                    <div className={styles.section}>
                        <h4>Sobre Nosotros</h4>
                        <p>Somos una tienda comprometida con la calidad y el buen servicio.</p>
                    </div>
                    <div className={styles.section}>
                        <h4>Enlaces</h4>
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Categorías</a></li>
                            <li><a href="#">Ofertas</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </div>
                    <div className={styles.section}>
                        <h4>Redes Sociales</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p> {new Date().getFullYear()} BazaarPoint.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;