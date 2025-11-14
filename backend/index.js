import express from "express";
import cors from "cors";
import compression from "compression";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(compression());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");

    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

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

//Ruta Productos
import productsRoute from './routes/products.js'
app.use('/api/products', productsRoute)

//Ruta buscar Categorias
import searchCategoriesRoute from './routes/searchCategories.js'
app.use('/api/searchCategories', searchCategoriesRoute)

//Ruta pagos
import paymentsRoute from './routes/payments.js'
app.use('/api/payments', paymentsRoute)

app.listen(port, () => {
    console.log('Backend corriendo en el puerto', port)
})