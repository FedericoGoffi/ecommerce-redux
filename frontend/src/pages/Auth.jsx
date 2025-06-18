import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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

    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((i) => (i + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    })

    //Evitar que usuario logeado pueda ir a /auth
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
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