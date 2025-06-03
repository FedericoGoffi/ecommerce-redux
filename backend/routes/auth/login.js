import express from "express";
import bcrypt from "bcrypt";
import pool from "../../db.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;