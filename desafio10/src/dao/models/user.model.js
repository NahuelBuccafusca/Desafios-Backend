import mongoose from "mongoose";

const usersCollection = "Users"
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique:true,
    },
    age:{
        type: Number
    },
    password:{
        type: String,
        required:true,
    },
    role:{type:String,
        default:'user'
    },
    cart:{type: mongoose.Schema.Types.ObjectId, ref:'Cart'}

})
const userModel = mongoose.model(usersCollection, userSchema)
export default userModel