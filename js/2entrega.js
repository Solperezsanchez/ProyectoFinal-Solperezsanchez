
//ORDENAR PRODUCTOS
let selectOrden = document.getElementById("selectOrden")

function ordenarAlfabeticamente(estanteria){
  const arrayAlfabetico = [].concat(estanteria)
  arrayAlfabetico.sort( (a,b) =>{
     if (a.nombre > b.nombre) {
        return 1
      }
      if (a.nombre < b.nombre) {
        return -1
      }
      return 0
  })
  selectOrden.addEventListener("click", ()=>{
    ordenarAlfabeticamente(estanteria)
  }) 
}
let enviada = document.getElementById("enviarDuda")
enviada.addEventListener("click", enviada)
function enviada (){
  alert(`Tu consulta fue enviada`)
}



//MIS PRODUCTOS
class producto{
  constructor(id, nombre, precio, descripcion, imagen){
     this.id = id,
     this.nombre = nombre,
     this.precio = precio,
     this.descripcion = descripcion,
     this.imagen = imagen

  }
 
}
//Instanciación de objetos: 
const producto1 = new producto(1,"Spray textil Coco Vai",710,"Spray de 250ml. Notas de salida:Coco. Notas de corazon:Nota lactea, Durazno. Notas de fondo: Coco, Vainilla", "textilCocoVai.jpg")

const producto2 = new producto(2,"Spray textil Amour",710,"Spray de 250ml. Notas de salida: Flores de anis acarameladas, Flores de cerezo. Notas de corazon: Jazmin, Sandalo, Gardenia. Notas de fondo: Amber gris, Incienso, Vainilla." , "textilAmour.jpg")

const producto3 = new producto(3,"Spray textil Flores blancas", 710,"Spray de 250ml. Notas de salida: Ciclamen, Gardenia, Flor de naranjo dulce. Notas de corazon: Jazmin, Orquidea, Ylang Ylang. Notas de fondo: Almizcle, Balsamico." , "textilFloresBlancas.jpg")

const producto4 = new producto(4,"Spray textil Bamboo",710, "Spray de 250ml. Notas de salida:Notas verdes frutales, Anana, Frutilla. Notas de corazon: Jazmin, Muguet, Rosa, Anis. Notas de fondo: Almizcle, Sandalo, Bambu." , "textilBamboo.jpg")

const producto5 = new producto(5,"Spray textil Bubblegum", 710, "Spray de 250ml. Notas de salida:Cerezas, Naranja, Anana. Notas de corazon:Frutilla. Notas de fondo: Vinilla, Canela." , "textilBubblegum.jpg")

//CREAR UN ARRAY DE OBJETOS
const estanteria = []
estanteria.push(producto1, producto2, producto3, producto4, producto5)

//capturar div productos
let productosDiv = document.getElementById("productos")

//recorrer estanteria para imprimir TOOODOS los elementos de mi array
function mostrarProductos(estanteria){
  for(let producto of estanteria ){
     let nuevoProductoDiv = document.createElement("div")
     //agregar class
     nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
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
         <a href="#" class="btn btn-primary">Añadir al carrito</a>
       </div>
     </div>
   </div>`
     productosDiv.appendChild(nuevoProductoDiv)
  }

}
mostrarProductos(estanteria)