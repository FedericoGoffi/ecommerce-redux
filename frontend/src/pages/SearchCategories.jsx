"use client"

import { useParams } from "react-router-dom"
import { useFetchProductsByCategoryQuery } from "../redux/slices/productsSlice"
import ProductCard from "../components/productCard"
import styles from "../styles/pages/SearchCategories.module.css"

const SearchCategories = () => {
    const { id: categoryName } = useParams()
    const { data, error, isLoading } = useFetchProductsByCategoryQuery(categoryName)

    if (isLoading) return <p className={styles.statusText}>Cargando productos...</p>
    if (error) return <p className={styles.statusText}>Error al cargar productos</p>
    if (!data?.products?.length) return <p className={styles.statusText}>No hay productos en esta categoría</p>

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Categoría: {categoryName}</h2>
            <div className={styles.productsGrid}>
                {data.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SearchCategories
