const carrito = document.querySelector('#carrito')
const template = document.querySelector('#template')
const botones = document.querySelectorAll('.card button')
const fragment = document.createDocumentFragment()
const footer = document.querySelector("#footer")
const templateFooter = document.querySelector("#templateFooter")
const header = document.querySelector("#header")
const templateHeader = document.querySelector("#templateHeader")

let carritoArray = []

document.addEventListener("click", (e) => {
    if (e.target.matches("article .card button")) {
        agregarCarrito(e)
    }

    if (e.target.matches("#btnAumentar")) {
        btnAumentar(e)
    }

    if (e.target.matches("#btnDisminuir")) {
        btnDisminuir(e)

    }    if(e.target.matches("#btnFinalizar")){
        finalizarCompra()
    }
})

const agregarCarrito = (e) => {
    const producto = {
        id: e.target.dataset.id,
        titulo: e.target.dataset.bebida,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    }

    const index = carritoArray.findIndex((item) => item.id === producto.id)

    if (index === -1) {
        carritoArray.push(producto)
    } else {
        carritoArray[index].cantidad++
    }

    mostrarCarrito()
}

const mostrarCarrito = (
) => {
    carrito.textContent = ''

    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true)
        clone.querySelector("#producto").textContent = item.titulo
        clone.querySelector("#cantidad").textContent = item.cantidad
        clone.querySelector("#total span").textContent = item.precio * item.cantidad
        clone.querySelector(".btn-success").dataset.id = item.id
        clone.querySelector(".btn-danger").dataset.id = item.id

        fragment.appendChild(clone)
    });

    carrito.appendChild(fragment)

    mostrarHeaderFooter()
}

const btnAumentar = (e) => {
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++
        }
        return item
    })
    mostrarCarrito()
};

const btnDisminuir = (e) => {
    carritoArray = carritoArray.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--
                if (item.cantidad === 0) return
                return item
            }
        } else {
            return item
        }
    })
    mostrarCarrito()
};

const mostrarHeaderFooter = (
) => {
    header.deleteTHead()
    footer.textContent = ""

    const total = carritoArray.reduce((acc,current) => acc + current.precio * current.cantidad, 0)

    const cloneHeader = templateHeader.content.cloneNode(true)
    const cloneFooter = templateFooter.content.cloneNode(true)
    cloneFooter.querySelector("p span").textContent = total
    header.appendChild(cloneHeader)
    footer.appendChild(cloneFooter)
}

const finalizarCompra = () =>{
    
    for(var i = 0; i < botones.length; i++)
    botones[i].className += " disabled";   const btnAumentarDisminuir = carrito.querySelectorAll("button")
    for(var i = 0; i < btnAumentarDisminuir.length; i++){
    btnAumentarDisminuir[i].className += " disabled";
    }

 const totalCompra = carritoArray.reduce((acc,current) => acc + current.precio * current.cantidad, 0)
    const cantidadCompra = carritoArray.reduce((acc,current) =>acc+current.cantidad ,0)


    const clone = template.content.cloneNode(true)
    clone.querySelector("#cantidad").textContent = cantidadCompra
    clone.querySelector("#total span").textContent = totalCompra

    fragment.appendChild(clone)

    carrito.appendChild(fragment)

    carrito.children[carrito.children.length-1].children[3].innerHTML=""
    
    document.getElementById("btnFinalizar").className+=" disabled"
}