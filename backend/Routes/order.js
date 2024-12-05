import  express  from "express";
import orderModel from "../schemas.js/order-schema.js";

const ExpressApp = express();

ExpressApp.use(express.json());
ExpressApp.use(express.text());

const orderRoutes = express.Router();

orderRoutes.get("/", async (req, res) =>{
    
    const order = await orderModel.find().exec();
    res.send(order)
});

orderRoutes.post("/",async (req, res) =>{
    console.log(req.body);
    
    const newOrder = new orderModel(req.body);
    await newOrder.save()
    res.send({name:"Prodcuto Enviadocon exito"})
});
orderRoutes.put("/recibidos/:id",async (req, res) =>{

         const {id} =req.params;
         const {state} = req.body;

         try {
            const pedidoActualizado = await orderModel.findByIdAndUpdate(
                id,
                { state },
                { new: true, runValidators: true }
            );
    
            if (!pedidoActualizado) {
                return res.status(404).send('Usuario no encontrado');
            }    
            res.send(pedidoActualizado);
        } catch (error) {
            res.status(500).send('Error al actualizar el usuario: ' + error.message);
        }
})
//trae Todos los pedidos recibidos
orderRoutes.get("/recibidos", async (req, res) =>{
    
    const order = await orderModel.find({state:'recibido'},'orderNumber date client note state').exec();
    res.send(order)
});
orderRoutes.get("/recibidos/:id", async (req, res) =>{
    
    const order = await orderModel.find({state:'recibido'},'orderNumber note cart').exec();
    res.send(order)
});
//trae Todos los pedidos en proceso
orderRoutes.get("/en-proceso", async (req, res) =>{
    
    const order = await orderModel.find({state:'en proceso'},'orderNumber date client note state').exec();
    res.send(order)
});
orderRoutes.get("/en-proceso/:id", async (req, res) =>{
    const id = req.params.id;
    
    const order = await orderModel.find({_id:id},'orderNumber note cart').exec();
    res.send(order)
});
//trae Todos los pedidos finalizados
orderRoutes.get("/finalizados", async (req, res) =>{
    
    const order = await orderModel.find({state:'finalizado'},'orderNumber date client note state').exec();
    res.send(order)
});
//imprime pedidos
orderRoutes.get("/print", async (req, res)=>{

    const pedidos = await orderModel.find()
    .populate('cart.category')
    .exec();

    const comandaPorCategoria = {};

    pedidos.forEach(data => {
        if (data.state === 'en proceso') {
            data.cart.forEach( item => {
            const keyValue =`${item.name}`;
            if (!comandaPorCategoria[keyValue]) {
                comandaPorCategoria[keyValue] ={
                    name:item.name,
                    total:0,
                    category:item.category.name
                    
                };
            } 
            comandaPorCategoria[keyValue].total += item.quantiti;
        })
        }
        
    });
    res.send(comandaPorCategoria)
})
//Crea nuevo producto. IMPORTANTE = Faltan validaciones



export default orderRoutes;