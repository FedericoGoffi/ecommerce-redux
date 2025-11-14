import styles from "../styles/components/checkoutForm.module.css"
import { useCreatePaymentIntentMutation } from "../redux/slices/paymentsSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();

    const [amount] = useState(2000);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            const resp = await createPaymentIntent({ amount }).unwrap();
            const clientSecret = resp.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                toast.success("Payment successful");
            }
        } catch (err) {
            toast.error("Error creating payment intent");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Tarjeta de crédito</label>
                <CardElement id="card-element" />
            </div>

            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.payButton} disabled={!stripe}>
                    Pagar
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;