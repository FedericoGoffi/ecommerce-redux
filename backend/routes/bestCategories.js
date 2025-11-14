import axios from "axios";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=0');
        const products = response.data.products;

        const categoryMap = {};

        products.forEach((product) => {
            const { category, rating } = product

            if (!categoryMap[category]) {
                categoryMap[category] = {
                    rating: 0,
                    count: 0
                }
            }

            categoryMap[category].rating += rating;
            categoryMap[category].count += 1;
        });

        const categoryRating = Object.entries(categoryMap).map(([category, { rating, count }]) => ({
            category,
            avgRating: rating / count
        }));

        const topCategories = categoryRating
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(0, 6);

        res.json(topCategories);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
})

export default router