import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    // store:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Store'
    //     },
})

const User = mongoose.model("User", UserSchema);

export default User