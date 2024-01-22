import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    // product: { type: Schema.Types.ObjectId, required: true, ref:Product},
    quantity: {type: Number, default: 1},
    
})

const Order = mongoose.model("Order", OrderSchema);

export default Order