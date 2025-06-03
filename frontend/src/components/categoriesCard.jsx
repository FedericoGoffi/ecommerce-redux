import React from 'react'

import styles from '../styles/components/categoriesCard.module.css'

import categoryImages from '../constants/categoryImages'

const categoriesCard = ({ product }) => {

    const imageSrc = categoryImages[product.category] || '';

    return (
        <section className={styles.cardSection}>
            <img className={styles.cardImg} src={imageSrc} alt={product.category} loading="lazy" width={150} height={150} />
            <p>{product.category}</p>
        </section>
    )
}

export default categoriesCard