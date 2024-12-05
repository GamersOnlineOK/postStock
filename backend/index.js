import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import productRoutes from "./Routes/productos.js";
const ExpressApp= express();
import mongoose from 'mongoose';
import orderRoutes from "./Routes/order.js";
import { categoriesRoutes } from "./Routes/categories.js";
import cors from 'cors';

const puerto =  process.env.PORT || 4000 ;
const URL_BDD = "mongodb://localhost:27017";
// archivos estaticos
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Servir los archivos estáticos de la carpeta build


ExpressApp.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001','http://www.belucatering.com.ar','http://www.c1942290.ferozo.com/'], // Permite solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite estos métodos HTTP
    allowedHeaders: ['Content-Type'], // Permite estos encabezados
}));
ExpressApp.use(express.json());
ExpressApp.use(express.text());
ExpressApp.use("/productos",productRoutes);
ExpressApp.use("/pedidos", orderRoutes);
ExpressApp.use('/categorias', categoriesRoutes);
ExpressApp.use('/dashboard', express.static(path.join(__dirname, './dashboard')));

ExpressApp.get('/dashboard/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dashboard', 'index.html'), (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

const bootstrap = async () =>{
    mongoose.connect(URL_BDD+"/sistema-fabrica" );

ExpressApp.listen(puerto, () => {
    console.log("Puerto ejecutandose en puerto "+ puerto);
})
}

bootstrap();
