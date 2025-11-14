import express from "express";
import axios from "axios";

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
        const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
});

export default router;