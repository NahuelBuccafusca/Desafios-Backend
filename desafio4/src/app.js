const express = require('express')
const app = express();
const PORT = 8080
const productsRouter = require("./routes/products.router.js")
const cartsRouter = require("./routes/carts.router.js")
const viewsRouter = require('./routes/views.router.js')
const Server = require('socket.io')
const httpServer = app.listen(PORT, () => console.log(`server running on port ${PORT}`));
const socketServer = Server(httpServer);
const ProductManager = require('./manager/productManager.js')
const productManager = new ProductManager('./products.json');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter);
app.use('/', viewsRouter);
app.use(express.static(__dirname + '/public'));

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado')

    productManager.getProducts()
        .then((products) => {
            socket.emit('products', products);
        })
    socket.on('addProduct', product => {
        productManager.addProduct(product.code, product.title, product.description, product.price, [], product.stock)
            .then(() => {
                productManager.getProducts()
                    .then((products) => {
                        socket.emit('products', products);
                        socket.emit('resAdd', "producto agregado exitosamente");
                    })
            })
            .catch((error) => socket.emit('resAdd', "error" + error.message))
    })
    socket.on('deleteProduct', pid => {
        productManager.deleteProduct(pid)
            .then(() => {
                productManager.getProducts()
                    .then((products) => {
                        socket.emit('products', products);
                        socket.emit('resDelete', "el producto fue eliminado");
                    })
            })
            .catch((error) => socket.emit('resDelete', "error al eliminar" + error.message))
    })
})
