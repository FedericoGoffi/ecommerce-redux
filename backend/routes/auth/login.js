import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../db.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_dev";
const JWT_EXPIRES_IN = "2h";

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            // No revelar si el email existe → seguridad contra enumeración de usuarios
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user.id,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error("Error during login:", error);

        if (error.code === "ECONNREFUSED") {
            return res.status(503).json({ error: "Database connection failed." });
        }

        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

export default router;