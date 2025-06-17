import React from 'react'
import styles from '../styles/pages/Categories.module.css'

import CategoriesCard from '../components/categoriesCard'

import { useFetchBestCategoriesQuery } from '../redux/slices/bestCategoriesSlice'

const Categories = () => {

    const { data: categories = [], isLoading, error } = useFetchBestCategoriesQuery();

    return (
        <section className={styles.categoriesContainer}>
            <h2>Best Categories</h2>
            <div className={styles.categories}>
                {categories.map((category, index) => (
                    <CategoriesCard key={index} product={category} />
                ))}
            </div>
        </section>
    )
}

export default Categories