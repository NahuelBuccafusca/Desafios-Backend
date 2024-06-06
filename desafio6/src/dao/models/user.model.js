import mongoose from "mongoose";

const usersCollection = "Users"
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        max: 100
    },
    userLastname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        max: 100
    },

})

const userModel = mongoose.model(usersCollection, userSchema)
export default userModel