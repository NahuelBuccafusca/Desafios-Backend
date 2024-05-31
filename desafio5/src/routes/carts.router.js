import { Router } from "express"
import cartModel from "../dao/models/cartModel.js"

const router = Router()

router.get('/cart', async (req, res) => {
    try {
        let carts = await cartModel.find()
        res.send({ result: "success", payload: carts })
    } catch (error) {
        console.log(error)
    }
})

export default router