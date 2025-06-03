import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

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