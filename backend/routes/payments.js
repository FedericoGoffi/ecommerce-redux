import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//POST
router.post("/create-payment-intent", async (req, res) => {
    try {
        const { items } = req.body;

        const amountCents = items
            ? items.reduce(
                (sum, it) => sum + Math.round(Number(it.price) * 100) * (it.quantity || 1),
                0
            )
            : Math.round((Number(req.body.amount) || 0) * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountCents,
            currency: "usd",
            metadata: {
                integration_check: "accept_a_payment",
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Error creating payment intent:", err);
        res.status(500).json({ error: "Error creating payment intent" });
    }
})

export default router;