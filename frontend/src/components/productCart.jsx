import React from 'react';
import styles from '../styles/components/productCart.module.css';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

const ProductCart = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    const handleQuantityChange = (e) => {
        const quantity = Number(e.target.value);
        if (quantity > 0) {
            dispatch(updateQuantity({ id: item.id, quantity }));
        }
    };

    return (
        <li className={styles.cartItem}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.details}>
                <h3>{item.title}</h3>
                <p>Precio: ${item.price.toFixed(2)}</p>
                <div className={styles.quantity}>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
            </div>
            <button
                className={styles.removeButton}
                onClick={handleRemove}
                title="Eliminar producto"
            >
                ❌
            </button>
        </li>
    );
};

export default ProductCart;
