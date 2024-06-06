import mongoose from "mongoose";

const messagesCollection = "Messages"
const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        max: 100
    },
    message: {
        type: String,
        required: true,
        max: 500
    },
})

const messageModel = mongoose.model(messagesCollection, messageSchema)
export default messageModel