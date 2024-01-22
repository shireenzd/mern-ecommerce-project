import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    // Store:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Store'
    // },
    name: {
        type: String,
        required: true
    },
    comment:{
        type:String,
        required:true
    }
    
})

const Review = mongoose.model("Review", ReviewSchema);

export default Review