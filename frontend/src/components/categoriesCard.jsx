import styles from "../styles/components/categoriesCard.module.css"
import categoryImages from "../constants/categoryImages"
import { Link } from "react-router-dom"

const categoriesCard = ({ product }) => {
    const imageSrc = categoryImages[product.category] || ""

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageWrapper}>
                <img
                    className={styles.cardImg}
                    src={imageSrc || "/placeholder.svg"}
                    alt={product.category}
                    loading="lazy"
                    width={200}
                    height={200}
                />
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.categoryName}>{product.category}</h3>
                <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`} className={styles.exploreButton}>Explorar categoría</Link>
            </div>
        </div>
    )
}

export default categoriesCard
