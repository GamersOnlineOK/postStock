import mongoose from 'mongoose';
import Schema from 'mongoose';
//defino el esquema de procutos
const productSchema = mongoose.Schema({
    id:String,
    name:String,//Nombre del producto
    partNo:String, //Codigo de producto
    categorie_id:{type:Object, ref:'categories' }, //Categoria
    media_id:String, //URL a la imagen del producto
    buy_price:Number, //precio de compra
    sale_price:Number, //Precio de venta
    quantity:Number //Stock
});

//Defino el modelo para crear productos. 

const productModel = mongoose.model('Products', productSchema);

export default productModel;