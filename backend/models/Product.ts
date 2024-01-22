import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number,
    },
    description: {
        required: true,
        type: String
    },
    store:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    },
    category:{
        type: String,
        required: true
    }
});


const Product = mongoose.model("Product", ProductSchema);

export default Product