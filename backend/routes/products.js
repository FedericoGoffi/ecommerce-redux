import express from "express";
import axios from "axios";

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

export default router;