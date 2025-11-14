import styles from "../styles/pages/Categories.module.css"
import CategoriesCard from "../components/categoriesCard"
import { useFetchBestCategoriesQuery } from "../redux/slices/bestCategoriesSlice"

const Categories = () => {
    const { data: categories = [], isLoading, error } = useFetchBestCategoriesQuery()

    return (
        <section className={styles.categoriesContainer}>
            <div className={styles.headerSection}>
                <h2 className={styles.mainTitle}>Explora nuestras categorías</h2>
                <p className={styles.subtitle}>Descubre productos únicos en cada una de nuestras categorías seleccionadas</p>
            </div>
            <div className={styles.categoriesGrid}>
                {categories.map((category, index) => (
                    <CategoriesCard key={index} product={category} />
                ))}
            </div>
        </section>
    )
}

export default Categories
