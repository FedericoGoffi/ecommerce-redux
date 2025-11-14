import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../redux/slices/productDetailsSlice';
import styles from '../styles/pages/productDetails.module.css';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data: product, isLoading, error } = useFetchProductByIdQuery(id);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const isInCart = cartItems.some(item => item.id === product?.id);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: 1
        }));
    };

    if (isLoading) return <div className={styles.loading}>Cargando producto...</div>;
    if (error) return <div className={styles.error}>Error al cargar producto.</div>;

    const finalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

    return (
        <section className={styles.detailsContainer}>
            <div className={styles.topSection}>
                <div className={styles.imageContainer}>
                    <img src={product.images?.[0]} alt={product.title} loading="lazy" />
                </div>

                <div className={styles.headerInfo}>
                    <h2 className={styles.title}>{product.title}</h2>

                    <div className={styles.rating}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                                {i < Math.round(product.rating) ? '★' : '☆'}
                            </span>
                        ))}
                        <span className={styles.ratingNumber}>({product.rating})</span>
                    </div>

                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>

            <div className={styles.middleSection}>
                <div className={styles.metaData}>
                    <div>
                        <p><strong>Categoría:</strong> {product.category}</p>
                        <p><strong>Marca:</strong> {product.brand}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <p><strong>Peso:</strong> {product.weight}g</p>
                    </div>
                    <div>
                        <p><strong>Dimensiones:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
                        <p><strong>Envío:</strong> {product.shippingInformation}</p>
                        <p><strong>Garantía:</strong> {product.warrantyInformation}</p>
                        <p><strong>Política de devolución:</strong> {product.returnPolicy}</p>
                    </div>
                </div>

                <div className={styles.priceContainer}>
                    <div className={styles.priceSection}>
                        <div className={styles.originalPriceContainer}>
                            <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                            <span className={styles.discount}>-{product.discountPercentage}%</span>
                        </div>
                        <span className={styles.finalPrice}>${finalPrice}</span>
                    </div>

                    <button
                        className={styles.addToCartButton}
                        onClick={handleAddToCart}
                        disabled={isInCart}
                    >
                        {isInCart ? 'Agregado al carrito' : 'Añadir al carrito'}
                    </button>
                </div>
            </div>

            <div className={styles.reviewsSection}>
                <h3>Reseñas</h3>
                {product.reviews?.map((review, index) => (
                    <div key={index} className={styles.review}>
                        <div className={styles.reviewHeader}>
                            <strong>{review.reviewerName}</strong>
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.reviewRating}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>
                                    {i < review.rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductDetails;