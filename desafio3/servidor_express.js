const express = require('express')
const ProductManager = require('../desafio2/productManager.js')




const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const manager = new ProductManager
manager.addProduct("Queso", "queso la paulina", 10, "img/queso.jpg", "A003", 15);
manager.addProduct("cafe", "cafe cabrales", 20, "img/cafe.jpg", "A001", 20);
manager.addProduct("Leche", "Leche la serenisima", 30, "img/leche.jpg", "A007", 12);
manager.addProduct("Off", "Off repelente", 70, "img/off.jpg", "A005", 20);

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