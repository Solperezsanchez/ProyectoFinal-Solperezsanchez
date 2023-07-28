//Funciones
//capturar div productos
let productosDiv = document.getElementById("productos");
let productosCarrito = [];
let botonCarrito = document.getElementById("botonCarrito");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let precioTotal = document.getElementById("precioTotal");
let loader = document.getElementById ("loader")
let loaderTexto = document.getElementById("loaderTexto")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
//ordenar array por criterio
let selectOrden = document.getElementById("selectOrden");

//MIS PRODUCTOS
class Producto {
  constructor(id, nombre, precio, descripcion, imagen) {
    (this.id = id),
      (this.nombre = nombre),
      (this.precio = precio),
      (this.descripcion = descripcion),
      (this.imagen = imagen);
  }
}


let stock = [] 
//CREAR UN ARRAY DE OBJETOS
const cargarStock = async () =>{
 
  const res = await fetch("./productos.json")
  const data = await res.json()
  for(let producto of data){
      let productoData = new Producto (producto.id, producto.nombre, producto.precio, producto.descripcion, producto.imagen)
      stock.push(productoData)
  }
  localStorage.setItem("stock", JSON.stringify(stock))
  mostrarProductos(stock);
}

//CREAR UN ARRAY DE OBJETOS


if(localStorage.getItem("stock")){
 
  //cuando no es la primera vez, me traigo lo de storage
  stock = JSON.parse(localStorage.getItem("stock"))
}else{
  
cargarStock()
   
}


//Array de productos en el carrito

if (localStorage.getItem("carrito")) {
  productosCarrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  //no existe nada en el storage
  productosCarrito = [];
  localStorage.setItem("carrito", productosCarrito);
}

//recorrer stock para imprimir TOOODOS los elementos de mi array
function mostrarProductos(stock) {
  productosDiv.innerHTML = ``;
  for (let producto of stock) {
    let nuevoProductoDiv = document.createElement("div");
    //agregar class
    nuevoProductoDiv.className = "col-12 col-md-1 col-lg-4 my-2";
    nuevoProductoDiv.innerHTML = `<div id="${producto.id}    class="col">
     <div class="card h-100">
       <img
         src="../img/productos/${producto.imagen}"
         class="card-img-top"
         alt="${producto.imagen}"
       />
       <div class="card-body">
         <h5 class="card-title">${producto.nombre}</h5>
         <h6 class="card-2title">$ ${producto.precio}</h6>
         <p class="card-text">
          ${producto.descripcion}
         </p>
         <a id="agregarBtn ${producto.id}"   class="btn btn-primary">Añadir al carrito</a>
       </div>
     </div>
   </div>`;
    productosDiv.appendChild(nuevoProductoDiv);
    //evento para el boton de garegar al carrito
    let agregarBtn = document.getElementById(`agregarBtn ${producto.id}`);
    agregarBtn.addEventListener("click", () => {
      console.log(`se ha agregado ${producto.nombre} al carrito`);
      agregarAlCarrito(producto);
    });
  }
}
function agregarAlCarrito(producto) {
  //preguntar si existe el producto en el carrito
  let productoAgregado = productosCarrito.find(
    (elem) => elem.id == producto.id
  );
  if (productoAgregado == undefined) {
    //codigo que suma el array al carrito
    productosCarrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    // console.log(productosCarrito);
    //Sweet alert para avisar que se agrego un producto al carrito
    Swal.fire({
      icon: `success`,
      title: `El producto ${producto.nombre} ha sido añadido exitosamente!`,
      showConfirmButton: true,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: `warning`,
      title: ` ${producto.nombre} ya ha sido agregado al carrito`,
      width: 400,
      padding: "3em",
    });
    // console.log(`El producto ya fue agregado al carrito`);
  }
}


//DOM PARA EL ALERT DEL CARRITO

function agregarProductosAlCarrito(array) {
  modalBodyCarrito.innerHTML = ``;
  array.forEach((productoCarrito) => {
    modalBodyCarrito.innerHTML += `
    <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 300px;">
    <img class="card-img-top" width="100px" src="../img/productos/${productoCarrito.imagen}" alt="">
    <div class="card-body">
           <h4 class="card-title">${productoCarrito.nombre}</h4>
           <p class="card-text">$ ${productoCarrito.precio}</p>
            <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
    </div>    
  </div>
  `
})

//segundo forEach eliminar del carrito
array.forEach((productoCarrito) => {
  //manipular el dom sin una variable

  document
    .getElementById(`botonEliminar${productoCarrito.id}`)
    .addEventListener("click", () => {
      console.log(`Eliminar producto`);
      //borrar del dom
      let cardProducto = document.getElementById(
        `productoCarrito${productoCarrito.id}`
      );
      cardProducto.remove();
      let productoEliminar = array.find(
        (producto) => producto.id == productoCarrito.id
      );
      console.log(productoEliminar);
      //buscar indice
      let posicion = array.indexOf(productoEliminar)
      console.log(posicion)
      array.splice(posicion,1)
      //setear storage
      localStorage.setItem("carrito", JSON.stringify(array))
    });
});

  calcularTotal(array);
}

//agregamos el total
function calcularTotal(array) {
  let total = array.reduce(
    (acc, productoCarrito) => acc + productoCarrito.precio,
    0
  );
  // console.log(`El total es ${total}`)
  precioTotal.innerHTML = `<strong>El total es $ ${total}</strong>`;
}

selectOrden.addEventListener("click", () => {
  ordenarAlfabeticamenteTitulo(JSON.parse(localStorage.getItem("stock")));
});


// Eventos
function ordenarAlfabeticamenteTitulo(array) {
  const arrayAlfabetico = [].concat(array);
  arrayAlfabetico.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }

    return 0;
  });

  mostrarProductos(arrayAlfabetico);
}
botonCarrito.addEventListener("click", () => {
  agregarProductosAlCarrito(productosCarrito);
});
//Finalizar compra
function finalizarCompra(array){
  Swal.fire({
     title: '¿Quiere realizar la compra?',
     icon: 'info',
     showCancelButton: true,
     confirmButtonText: 'Si, quiero',
     cancelButtonText: 'No, no quiero',
     confirmButtonColor: 'green',
     cancelButtonColor: 'red',
 }).then((result) => {
     if(result.isConfirmed){
        //finalizar compra con todos sus detalles
        //a nivel DOM avisarle que se realizo la compra
        let totalFinal = calcularTotal(array)
        Swal.fire({
           title: 'Compra realizada con exito',
           icon: 'success',
           confirmButtonColor: 'green',
           text: `Gracias por comprar en CMK!. El monto a abonar es $ ${totalFinal} `,
           })
        //nivel arrays resear productosEnCarrito
        productosCarrito = []
        localStorage.removeItem("carrito")
     }else{
        Swal.fire({
           title: 'Su compra no pudo realizarse',
           icon: 'info',
           text: `Tenes productoen tu carrito <3`,
           confirmButtonColor: 'green',
           timer:3500
       })
     }
 } )
} 
//set timeout para imprimir nuestro carrito
setTimeout(() =>{ 
  loaderTexto.remove()
  loader.remove()
  mostrarProductos(stock)
},2500) 

//btn finalizar compra y su acción:
botonFinalizarCompra.addEventListener("click", () =>{
  finalizarCompra(productosCarrito)
})