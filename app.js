class ProductManager {
    constructor() {
        this.productos = []
        this.nextId=1

    }
    getProducts() {
        return this.productos
    }
    addProduct(producto) {
        if(!this.productoValido(producto)){
            console.log("El producto no es valido")
            return
        }
        if(this.codigoDuplicado(producto.code)){
            console.log("Código de producto ya utilizado")
            return
        }
        producto.id=this.nextId++
        this.productos.push(producto)

    }
    getProductById(id) {
        const producto = this.productos.find((p) => p.id === id)
        if (producto) {
            return producto
        } else{
            console.log("Producto no encontrado")
        }

    }
    productoValido(producto){
        return(
            producto.title &&
            producto.description &&
            producto.price &&
            producto.thumbnail &&
            producto.code &&
            producto.stock !== undefined
        )
    }
    codigoDuplicado(code){
      return this.productos.some((p)=> p.code === code)  
    }
}


const productManager = new ProductManager()
productManager.addProduct({
    title:"Gaseosa",
    description:"descripcion gaseosa",
    price: 1000,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'p004',
    stock:10
})

productManager.addProduct({
    title:"Cafe",
    description:"descripcion Cafe",
    price: 1200,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'p007',
    stock:15
})

productManager.addProduct({
    title:"Leche",
    description:"descripcion Leche",
    price: 800,
    thumbnail: 'ruta/imagen3.jpg',
    code: 'p009',
    stock:20
})

// error1
productManager.addProduct({
    title:"carne",
    description:"descripcion carne",
    price: 900,
    thumbnail: 'ruta/imagen4.jpg',
    code: 'p009',
    stock:20
})

const productos= productManager.getProducts()
console.log(productos)

const producto= productManager.getProductById(2)
console.log(producto)

// error2
productManager.addProduct({
    title:"carne",
    description:"",
    price: 900,
    thumbnail: 'ruta/imagen5.jpg',
    code: 'p010',
    stock:20
})