const socket = io();
const listaProductos = document.getElementById('listaProductos');
const mensaje = document.createElement('p');
const btnEnviar = document.getElementById('btnEnviar');

btnEnviar.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    socket.emit('addProduct', {title, description, price, code, stock});
})

socket.on('products', products => {
    listaProductos.innerHTML = ``;
    products.forEach(product => {
        const p = document.createElement('p');
        const btnDelete = document.createElement('button');

        btnDelete.innerHTML = 'Eliminar';
        btnDelete.addEventListener('click', () => {socket.emit('deleteProduct', product.id)});
        p.innerHTML = `Title: ${product.title}, Description: ${product.description},
        Price: ${product.price}, Code: ${product.code},
        Stock: ${product.stock}`;
        listaProductos.appendChild(btnDelete);
        listaProductos.appendChild(p);
    });
})

socket.on('resAdd', mensajeRespuesta => {
    mensaje.innerHTML = `${mensajeRespuesta}`;
    listaProductos.appendChild(mensaje);
})

socket.on('resDelete', mensajeRespuesta => {
    mensaje.innerHTML = `${mensajeRespuesta}`;
    listaProductos.appendChild(mensaje);
})