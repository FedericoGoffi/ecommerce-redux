import express from "express";
import cors from "cors";
import compression from "compression";

const app = express();
const port = 3000;

app.use(compression());
app.use(express.json());
app.use(cors());

// Middleware para headers de seguridad
app.use((req, res, next) => {
    // Content Security Policy básico
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");

    // HSTS (para producción con HTTPS)
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    // Cross-Origin-Opener-Policy
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    // Clickjacking protection
    res.setHeader("X-Frame-Options", "DENY");

    next();
});

//Ruta categorías
import categoriesRoute from './routes/categories.js'

app.use('/api/categories', categoriesRoute)

//Ruta sugerencias
import suggestionsRoute from './routes/search.js'

app.use('/api/suggestions', suggestionsRoute)

//Ruta ofertas
import offersRoute from './routes/offers.js'

app.use('/api/offers', offersRoute)

//Ruta categorias
import bestCategoriesRoute from './routes/bestCategories.js'

app.use('/api/bestCategories', bestCategoriesRoute)

//Ruta Auth
import authRoutes from './routes/auth/index.js'

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log('Backend corriendo en el puerto', port)
})