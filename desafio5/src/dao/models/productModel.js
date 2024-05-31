import mongoose from "mongoose"

const productCollection = "Products"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100 
    },
    description: {
        type: String,
        required: true,
        max: 100
    },
    code: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel