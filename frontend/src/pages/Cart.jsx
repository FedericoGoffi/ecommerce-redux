import styles from '../styles/pages/Cart.module.css';
import { useSelector } from 'react-redux';
import ProductCart from '../components/productCart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const navigate = useNavigate();

    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    if (cartItems.length === 0) {
        return <div className={styles.emptyCart}>Tu carrito está vacío</div>;
    }

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.title}>Carrito de Compras</h2>
            <ul className={styles.cartList}>
                {cartItems.map(item => (
                    <ProductCart key={item.id} item={item} />
                ))}
            </ul>
            <div className={styles.total}>
                <h3>Total: ${totalPrice}</h3>
                <button
                    onClick={() => navigate('/checkout')}
                    className={styles.checkoutBtn}>
                    Finalizar compra
                </button>
            </div>
        </div>
    );
};

export default Cart;
