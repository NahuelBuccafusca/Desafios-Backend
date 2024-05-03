const express = require('express');
const router=express();
const Manager = require('../manager/cartManager.js');
const ProductManager = require('../manager/productManager.js');
const cartManager= new Manager('./carts.json');
const productManager=new ProductManager('./products.json');




router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});


router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;

    const product = productManager.getProductsById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const success = cartManager.addProductToCart(cartId, productId, quantity);
    if (success) {
        res.json({ message: 'Producto agregado al carrito exitosamente' });
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

module.exports = router;