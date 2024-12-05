import  express, { query }  from "express";
import { listaProductos } from "../Bdd/bbdd.js";
import productModel from "../schemas.js/productos-schema.js";
const ExpressApp = express();


ExpressApp.use(express.json());
ExpressApp.use(express.text());

const productRoutes = express.Router();
//trae Todos los productos
productRoutes.get("/", async (req, res) =>{
    const product = await productModel.find()
    .populate('categorie_id')
    .exec();
    res.send(product);
})
//Trae el prodcuto correspondiente al ID
productRoutes.get("/:_id", async (req, res) =>{
    
    const prod = await productModel.findById(req.params)
    .populate('categorie_id')
    .exec();

    if (!prod) return res.status(404).send("Producto No encontrado");

    res.send(prod);
});
//Crea nuevo producto. IMPORTANTE = Faltan validaciones
productRoutes.post("/",async (req, res) =>{
    const {guid,name,quantiti} = req.body;
    const newProduct = new productModel(req.body);
    await newProduct.save()
    res.send(req.body)
})
// Actualiza cantidad de producto
productRoutes.patch("/update-quantiti/:id", async (req, res)=>{
    const porduct_id = req.params.id;
    const dataModifi = req.body;

    const options = {
        new:true
    }
    const product = await productModel.findOneAndUpdate({_id:porduct_id},dataModifi, options);
    return res.send(
        {
            "message":"Producto modificado correctamente",
            "nota":"Flatan validaciones"
        });
    
    })
//Eliminar producto
productRoutes.delete("/:guid",(req, res)=>{
    const {guid} = req.params;

    const productIndex = PROD_ITEM.findIndex((data) => data.guid === guid);

    if (productIndex === -1) return res.status(400).send("El producto no existe");

    PROD_ITEM.splice(productIndex, 1);

    return res.send("Producto eliminado Correctamente")
})
productRoutes.post("/cargar",async (req, res) =>{
    const product = listaProductos;

    product.forEach(item => {
        const pd = new productModel(item);
        pd.save();

    });
    res.send(product)
})


export default productRoutes;