import axios from "axios";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
})

export default router