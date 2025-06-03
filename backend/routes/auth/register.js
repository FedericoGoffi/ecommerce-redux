import express from "express";
import bcrypt from "bcrypt";
import pool from "../../db.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'The passwords dont match' });
    }

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashPassword]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error registering user:', error);

        if (error.code === '23505') {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        res.status(500).json({ error: 'Database error' });
    }
});

export default router;