import express from 'express';
import {listaCategorias}  from '../Bdd/categorias.js';
import categoriesModel from '../schemas.js/categories-schema.js';

const ExpressApp = express();

ExpressApp.use(express.json());
ExpressApp.use(express.text());

export const categoriesRoutes = express.Router();

categoriesRoutes.get('/', async (req, res) =>{
    const categories = await categoriesModel.find().exec();
    res.send(categories);
})

categoriesRoutes.post('/cargar', (req, res) =>{

    //ATENCION: es solo la carga inicial. Para establecerlo como carga
    // a traves un archivo se debe refactorizar.
    // controlar la base de datos.
    const categories = listaCategorias;
    
    categories.forEach(item =>{
        const cat = new categoriesModel(item);
        cat.save();        
    })
    res.send("Categorias cargadas correctamente")
})

