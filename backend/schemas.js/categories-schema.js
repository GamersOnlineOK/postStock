import mongoose from 'mongoose'

const categorieSchema = mongoose.Schema({
    _id:String,
    name:String,
    descripcion:String
});


const categoriesModel = mongoose.model('categories', categorieSchema);

export default categoriesModel;