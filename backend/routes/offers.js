import axios from "axios";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=0');
        const products = response.data.products;

        const topOffers = products
            .sort((a, b) => b.discountPercentage - a.discountPercentage)
            .slice(0, 20);

        res.json(topOffers);
    } catch (error) {
        console.error('Error al obtener ofertas:', error);
        res.status(500).json({ error: 'Error al obtener ofertas' });
    }
})

export default router