import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    name:String,
    quantiti:Number,
    category:{type:Object, ref: 'categories'},
})
const orderSchema = mongoose.Schema({
    orderNumber:String,
    date: Date,
    client:String,
    note:String,
    state:String,
    total:Number,
    cart:[cartSchema]
},{
    timestamp:true
})

const orderModel = mongoose.model('Pedidos', orderSchema);

export default orderModel;