const carrito = document.querySelector("#carrito")
const template = document.querySelector("#template")
const fragment = document.createDocumentFragment()
const agregar = document.querySelectorAll(".card button")

const carritoObjeto = {}

const agregarCarrito = (e) => {

    const producto = {
        titulo: e.target.dataset.bebida,
        id: e.target.dataset.id,
        cantidad: 1,
    }

    if (carritoObjeto.hasOwnProperty(producto.id)) {
        producto.cantidad = carritoObjeto[producto.id].cantidad + 1
    }

    carritoObjeto[producto.id] = producto
    console.log(carritoObjeto)
    
    mostrarCarrito()
}

agregar.forEach((boton) => boton.addEventListener("click", agregarCarrito))

const mostrarCarrito = () => {
    carrito.textContent = ""

    Object.values(carritoObjeto).forEach((item) => {
        const clone = template.content.cloneNode(true)
        clone.querySelector(".lead").textContent = item.titulo
        clone.querySelector(".rounded-pill").textContent = item.cantidad
        fragment.appendChild(clone)
    });
    carrito.appendChild(fragment)
}