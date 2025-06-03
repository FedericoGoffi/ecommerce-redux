import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/pages/offers.module.css'
import ProductCard from '../components/productCard'

import { useFetchOffersQuery } from '../redux/slices/offersSlice';

const Offers = () => {

    const { data: offers = [], isLoading, error } = useFetchOffersQuery();
    const containerRef = useRef(null);

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const checkScroll = () => {
        const { current } = containerRef;
        if (current) {
            const scrollLeft = current.scrollLeft;
            const scrollWidth = current.scrollWidth;
            const clientWidth = current.clientWidth;

            setAtStart(scrollLeft <= 0);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        }
    };

    useEffect(() => {
        const { current } = containerRef;
        if (current && offers.length > 0) {
            checkScroll();
            current.addEventListener('scroll', checkScroll);
            return () => current.removeEventListener('scroll', checkScroll);
        }
    }, [offers]);

    const scroll = (direction) => {
        const { current } = containerRef;
        if (current) {
            const scrollAmount = 1110;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });

            setTimeout(checkScroll, 400);
        }
    };

    return (
        <section className={styles.offersSection}>
            <div className={styles.offersHeader}>
                <h3>Mejores Ofertas</h3>
                <div className={styles.buttons}>
                    <button
                        className={`${styles.scrollButton} ${atStart ? styles.disabled : ''}`}
                        onClick={() => scroll('left')}
                        disabled={atStart}
                    >
                        <img src='https://cdn-icons-png.flaticon.com/512/271/271220.png' alt="Scroll left" />
                    </button>
                    <button
                        className={`${styles.scrollButton} ${atEnd ? styles.disabled : ''}`}
                        onClick={() => scroll('right')}
                        disabled={atEnd}
                    >
                        <img src='https://cdn-icons-png.flaticon.com/512/271/271228.png' alt="Scroll right" />
                    </button>
                </div>
            </div>

            <div ref={containerRef} className={styles.scrollContainer}>
                {offers.map((offer) => (
                    <ProductCard key={offer.id} product={offer} />
                ))}
            </div>
        </section>
    )
}

export default Offers