import React from 'react'
import styles from '../styles/components/productCard.module.css'

const ProductCard = ({ product }) => {
    const { title, images, price, discountPercentage, rating } = product

    const discountAmount = (price * (discountPercentage / 100))
    const discountedPrice = (price - discountAmount).toFixed(2)
    const roundedRating = Math.round(rating)

    const maxCaracter = 24;
    const truncatedTitle = title.length > maxCaracter ? `${title.slice(0, maxCaracter)}...` : title

    return (
        <section className={styles.cardSection}>
            <img className={styles.cardImg} src={images[0]} alt={title} loading="lazy" />
            <h3 className={styles.cardTitle}>{title ? truncatedTitle : 'No title'}</h3>

            <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < roundedRating ? styles.filledStar : styles.emptyStar}>★</span>
                ))}
            </div>

            <div className={styles.priceContainer}>
                <p className={styles.originalPrice}>${price.toFixed(2)}</p>
                <p className={styles.discountedPrice}>${discountedPrice}</p>
            </div>
        </section>
    )
}

export default ProductCard