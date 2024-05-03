const express = require('express');
const router=express();
const uploader= require('../utils.js');
const ProductManager = require('../manager/productManager.js');
const productManager= new ProductManager('./products.json');
const handlebars= require('express-handlebars');

router.engine("handlebars",handlebars.engine());
router.set("views", __dirname + "/../views");
router.set("view engine", "handlebars");

 
router.get('/realTimeProducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', {products, length : products.length > 0 ? true : false});
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });   
    }
})

router.get('/', async(req, res) => {
   try{
       const limit = req.query.limit;
       let products= await productManager.getProducts();
       if (limit>0) {
           products = products.slice(0, limit);
           res.status(200).json(products);
        } else {
            res.status(200).json(products);

        }
   }
   catch(error){
    res.status(500).json({error:"server error"})
   }
});


router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductsById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});


router.post('/', uploader.single('file'), (req, res) => {
    const { title, description, price, code, stock, category, thumbnails } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    productManager.addProduct(title, description, price, code, stock, category, thumbnails);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
});


router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const success = productManager.updateProduct(productId, updatedFields);
    if (success) {
        res.json({ message: 'Producto actualizado exitosamente' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});


router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const success = productManager.deleteProduct(productId);
    if (success) {
        res.json({ message: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

module.exports = router;