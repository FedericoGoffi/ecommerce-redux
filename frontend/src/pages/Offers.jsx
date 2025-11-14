import styles from "../styles/pages/offers.module.css"
import ProductCard from "../components/productCard"

import { useFetchOffersQuery } from "../redux/slices/offersSlice"

const Offers = () => {
    const { data: offers = [], isLoading, error } = useFetchOffersQuery()

    return (
        <section className={styles.offersSection}>
            <div className={styles.offersHeader}>
                <h2 className={styles.mainTitle}>Ofertas Especiales</h2>
                <p className={styles.subtitle}>Descubre los mejores descuentos en productos seleccionados</p>
            </div>

            <div className={styles.gridContainer}>
                {offers.map((offer) => (
                    <ProductCard key={offer.id} product={offer} />
                ))}
            </div>
        </section>
    )
}

export default Offers
