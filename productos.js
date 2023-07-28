//Funciones
//capturar div productos
let productosDiv = document.getElementById("productos");
let productosCarrito = [];
let botonCarrito = document.getElementById("botonCarrito");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let precioTotal = document.getElementById("precioTotal");
let loader = document.getElementById ("loader")
let loaderTexto = document.getElementById("loaderTexto")
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
//Instanciación de objetos:
// const producto1 = new producto(
//   1,
//   "Coco Vai",
//   710,
//   "Spray de 250ml. Notas de salida:Coco. Notas de corazon:Nota lactea, Durazno. Notas de fondo: Coco, Vainilla",
//   "textilCocoVai.jpg"
// );

// const producto2 = new producto(
//   2,
//   "Amour",
//   710,
//   "Spray de 250ml. Notas de salida: Flores de anis acarameladas, Flores de cerezo. Notas de corazon: Jazmin, Sandalo, Gardenia. Notas de fondo: Amber gris, Incienso, Vainilla.",
//   "textilAmour.jpg"
// );

// const producto3 = new producto(
//   3,
//   "Flores blancas",
//   710,
//   "Spray de 250ml. Notas de salida: Ciclamen, Gardenia, Flor de naranjo dulce. Notas de corazon: Jazmin, Orquidea, Ylang Ylang. Notas de fondo: Almizcle, Balsamico.",
//   "textilFloresBlancas.jpg"
// );

// const producto4 = new producto(
//   4,
//   "Bamboo",
//   710,
//   "Spray de 250ml. Notas de salida:Notas verdes frutales, Anana, Frutilla. Notas de corazon: Jazmin, Muguet, Rosa, Anis. Notas de fondo: Almizcle, Sandalo, Bambu.",
//   "textilBamboo.jpg"
// );

// const producto5 = new producto(
//   5,
//   "Bubblegum",
//   710,
//   "Spray de 250ml. Notas de salida:Cerezas, Naranja, Anana. Notas de corazon:Frutilla. Notas de fondo: Vinilla, Canela.",
//   "textilBubblegum.jpg"
// );

let stock = [] 
//CREAR UN ARRAY DE OBJETOS
const cargarStock = async () =>{
  const res = await fetch("productos.json")
  const data = await res.json()
  
  for(let producto of data){
      let productoData = new Producto (producto.id, producto.nombre, producto.precio, producto.descripcion, producto.imagen)
      estanteria.push(productoData)
      
  }
  localStorage.setItem("stock", JSON.stringify(stock))
}

//CREAR UN ARRAY DE OBJETOS


if(localStorage.getItem("stock")){
 
  //cuando no es la primera vez, me traigo lo de storage
  stock = JSON.parse(localStorage.getItem("stock"))
}else{
  
  cargarStock()
   localStorage.setItem("stock", JSON.stringify(stock))
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
mostrarProductos(JSON.parse(localStorage.getItem("stock")));

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

//set timeout para imprimir nuestro carrito
setTimeout(() =>{ 
  loaderTexto.remove()
  loader.remove()
  mostrarProductos(stock)
},2500) 
