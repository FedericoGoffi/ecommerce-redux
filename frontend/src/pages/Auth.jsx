import React, { useEffect, useState } from 'react'

import styles from '../styles/pages/Auth.module.css'

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const images = [
    '/images/authImg1.avif',
    '/images/authImg2.avif',
    '/images/authImg3.avif',
    '/images/authImg4.avif'
]

const Auth = () => {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((i) => (i + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    })

    return (
        <section className={styles.auth}>
            <div
                className={styles.imageBackground}
                style={{ backgroundImage: `url(${images[currentImage]})` }}
            ></div>

            <div className={styles.overlay}></div>

            <div className={styles.forms}>
                <LoginForm />
                <RegisterForm />
            </div>
        </section>
    )
}

export default Auth