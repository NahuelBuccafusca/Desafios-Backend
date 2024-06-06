import mongoose from "mongoose"

const cartCollection = "Carts"

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'completed'],
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel