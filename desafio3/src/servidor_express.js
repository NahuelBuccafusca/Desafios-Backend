const express = require('express')
const ProductManager = require('../../desafio4/src/manager/productManager')




const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const manager = new ProductManager


app.get('/products',async(req, res) => {

    const products = await(manager.getProducts())
    
    let limit = parseInt(req.query.limit)
    if (limit) {
        const limitedProducts = products.slice(0, limit)
         res.send(limitedProducts)
    } else {
         res.send(products)
    }
})


app.get('/products/:pid', (req, res) => {

    let pid = parseInt(req.params.pid)
    const productById = manager.getProductsById(pid)
    if (pid) {
        return res.send(productById)

    } else {
        console.log("producto no encontrado")

    }
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})