"use client"

import { useState, useEffect } from "react"
import styles from "../styles/pages/heroBanner.module.css"

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            id: 1,
            image: "Banners/heroBanner_img1.avif",
            title: "Mega Ofertas",
            subtitle: "Hasta 20% OFF en miles de productos de tecnología",
            buttonText: "Comprar Ahora",
            buttonLink: "/collection",
        },
        {
            id: 2,
            image: "Banners/heroBanner_img2.avif",
            title: "Renová tu Estilo",
            subtitle: "Ofertas en ropa, calzado y accesorios para toda la familia",
            buttonText: "Ver Moda",
            buttonLink: "/fashion",
        },
        {
            id: 3,
            image: "Banners/heroBanner_img3.avif",
            title: "Fragancias y Belleza",
            subtitle: "Perfumes, cosméticos y cuidado personal con descuentos exclusivos",
            buttonText: "Descubrir",
            buttonLink: "/beauty",
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [slides.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    return (
        <div className={styles.heroWrapper}>
            <div
                className={styles.carouselTrack}
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className={styles.slide}>
                        <img src={slide.image || "/placeholder.svg"} alt={slide.title} className={styles.slideImage} />
                        <div className={styles.gradientOverlay}></div>
                        <div className={styles.contentWrapper}>
                            <div className={styles.textContent}>
                                <h2 className={styles.title}>{slide.title}</h2>
                                <p className={styles.description}>{slide.subtitle}</p>
                                <div className={styles.buttonGroup}>
                                    <a href={slide.buttonLink} className={styles.primaryBtn}>
                                        {slide.buttonText}
                                    </a>
                                    <button className={styles.secondaryBtn}>Más Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.paginationDot} ${index === currentSlide ? styles.active : ""}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div >
    )
}

export default HeroBanner
