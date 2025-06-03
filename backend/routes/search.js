import axios from "axios";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    const { q } = req.query;

    try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${q}`);
        const suggestions = response.data.products.slice(0, 5).map(product => ({
            id: product.id,
            title: product.title
        }));
        res.json(suggestions);
    } catch (error) {
        console.error('Error al obtener sugerencias:', error);
        res.status(500).json({ error: 'Error al obtener sugerencias' });
    }
})

export default router