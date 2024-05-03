class ProductManager {
    constructor() {
        this.products = []
    }
    getProducts() {
        return this.products
    }
    addProduct(product) {
        if(!this.isProductValid(product)){
            console.log("El producto no es valido")
            return
        }
        if(this.isCodeDuplicated(product.code)){
            console.log("Código de producto ya utilizado")
            return
        }
        product.id= this.products.length + 1
        this.products.push(product)

    }
    getProductById(id) {
        const product = this.products.find((p) => p.id === id)
        if (product) {
            return product
        } else{
            console.log("Producto no encontrado")
        }

    }
    isProductValid(product){
        return(
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }
    isCodeDuplicated(code){
      return this.products.some((p)=> p.code === code)  
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

const products= productManager.getProducts()
console.log(products)

const product= productManager.getProductById(2)
console.log(product)

// error2
productManager.addProduct({
    title:"carne",
    description:"",
    price: 900,
    thumbnail: 'ruta/imagen5.jpg',
    code: 'p010',
    stock:20
})