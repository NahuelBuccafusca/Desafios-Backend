
import { Router } from 'express'
import productModel from '../dao/models/productModel.js'

const router = Router()

router.get('/api/products', async (req, res) => {
    try {
        const products = await productModel.find().lean()
        res.render('products',{
            products: products
        })
    } catch (error) {
        console.error('Error al cargar los productos:', error)
        res.status(500).render('error', { message: 'Error al cargar los productos.' })
    }
})

router.get('/api/products/:pid', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).lean()

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        res.render('searchedProduct', { product })
    } catch (error) {
        console.error('Error al cargar la página de detalle del producto:', error)
        res.status(500).render('error', { message: 'Error al cargar la página de detalle del producto.' })
    }
})

router.post('/api/products', async (req, res) => {
    let { title, description, code, price, stock, category, } = req.body
    console.log(req.body)

    if (!title || !description || !code || !price || !stock || !category ) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await productModel.create({ title, description, code, price, stock, status:true, category })
    console.log(result)
    res.send({ result: "success", payload: result })
})

router.get('/api/addProduct', (req, res) => {
    res.render('addProduct')
})

router.post('/api/addProduct', async (req, res) => {
    try {
        let { title, description, code, price, stock, category,  } = req.body

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Faltan parámetros' })
        }

        let newProduct = await productModel.create({
            title,
            description,
            code,
            price,
            stock,
            category,
            status: true
        })

        res.render('addProduct')
    } catch (error) {
        console.error('Error al agregar  producto:', error)
        res.status(500).json({ error: 'Error del servidor' })
    }
})


router.put('/api/products/:pid', async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body

    if (!productToReplace.title || !productToReplace.description  || !productToReplace.code || !productToReplace.price || !productToReplace.stock || !productToReplace.category || !productToReplace.thumbnail) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await productModel.updateOne({ _id: pid }, productToReplace)
    res.send({ result: "success", payload: result })
})

router.get('/api/products/update/:pid', async (req, res) => {
    try {
        const productById = await productModel.findByIdAndUpdate(req.params.pid).lean()
        res.render('updateProduct', { productById })
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/api/products/update/:pid', async (req, res) => {
    try {
        let { pid } = req.params
        console.log('Datos recibidos para actualizar:', req.body)
        await productModel.findByIdAndUpdate(pid, req.body)
        res.redirect('/api/products')
    } catch (error) {
        console.error('Error al actualizar el producto:', error)
        res.status(500).render('error', { message: 'Error al actualizar el producto.' })
    }
})


router.delete('/api/products/:pid', async (req, res) => {
    let { pid } = req.params
    let result = await productModel.deleteOne({ _id: pid })
    res.send({ result: "success", payload: result })
})

router.get('/api/products/delete/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        await productModel.findByIdAndDelete(pid)
        
        res.redirect('/api/products')
    } catch (error) {
        console.error('Error al eliminar el producto:', error)
        res.status(500).render('error', { message: 'Error al eliminar el producto.' })
    }
})

export default router