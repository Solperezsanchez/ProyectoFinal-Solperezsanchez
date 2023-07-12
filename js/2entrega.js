// Le damos la bienvenida al cliente con esta funcion
function pedirNombre() {
    let nombreIngresado = prompt(`Ingresa tu nombre`);
    saludarCliente(nombreIngresado);
  }
  function saludarCliente(nombre) {
    alert(`¡Bienvenidx ${nombre} a nuestra tienda!`);
  }
  pedirNombre()
//   Comenzamos con el menu para que puedan seleccionar lo que deseen
function menu() {
    let opcionMenu = parseInt(
      prompt(`
      1 -Seleccionar productos
      2 -Ver tu carrito
      3 -Eliminar productos del carrito
      4 -Pagar
      `)
    );
  
    switch (opcionMenu) {
      case 1:
        seleccionarProductos();
        break;
      case 2:
        verCarrito();
        break;
      case 3:
        eliminarProductos();
        break;
      case 4:
        pagar();
        break;
      default:
        alert(
          "¡UPSS eso no esta en nuestro menu! Por favor selecciona algo que si este."
        );
        menu();
    }
  }
//   Funcion para que seleccionen el producto que deseen 
function seleccionarProductos() {
    let productoIngresado =
      prompt(`Selecciona el numero que corresponda a tu HomeSpray deseado o en su defecto escribi "ESC" para regresar al menu anterior.
       1.  ${cocoVai.nombre}: ${cocoVai.descripcion} - $${cocoVai.precio}
       2. ${amour.nombre}: ${amour.descripcion} - $${amour.precio}
       3. ${floresBlancas.nombre}: ${floresBlancas.descripcion} - $${floresBlancas.precio}
       4. ${bamboo.nombre}: ${bamboo.descripcion} - $${bamboo.precio}
       5. ${bubblegum.nombre}: ${bubblegum.descripcion} - $${bubblegum.precio}`);
  
    productoIngresado = productoIngresado.toUpperCase();
  
    while (productoIngresado != "ESC") {
      switch (productoIngresado) {
        case "1":
          carrito.push(cocoVai);
          precio = precio + cocoVai.precio;
          alert(cocoVai.nombre + " se agrego al carrito de forma exitosa!");
          break;
  
        case "2":
          carrito.push(amour);
          precio = precio + amour.precio;
          alert(amour.nombre + " se agrego al carrito de forma exitosa!");
          break;
  
        case "3":
          carrito.push(floresBlancas);
          precio = precio + floresBlancas.precio;
          alert(floresBlancas.nombre + " se agrego al carrito de forma exitosa!");
          break;
  
        case "4":
          carrito.push(bamboo);
          precio = precio + bamboo.precio;
          alert(bamboo.nombre + " se agrego al carrito de forma exitosa!");
          break;
  
        case "5":
          carrito.push(bubblegum);
          precio = precio + bubblegum.precio;
          alert(bubblegum.nombre + " se agrego al carrito de forma exitosa!");
          break;
  
        default:
          alert(
            "Esta opcion no existe, por favor ingresa lo que esta en el menu."
          );
          break;
      }
  
      productoIngresado =
        prompt(`Selecciona el numero que corresponda a tu HomeSpray deseado o en su defecto escribi "ESC" para regresar al menu anterior.
          1.  ${cocoVai.nombre}: ${cocoVai.descripcion} - $${cocoVai.precio}
          2. ${amour.nombre}: ${amour.descripcion} - $${amour.precio}
          3. ${floresBlancas.nombre}: ${floresBlancas.descripcion} - $${floresBlancas.precio}
          4. ${bamboo.nombre}: ${bamboo.descripcion} - $${bamboo.precio}
          5. ${bubblegum.nombre}: ${bubblegum.descripcion} - $${bubblegum.precio}`);
      productoIngresado = productoIngresado.toUpperCase();
    }
    menu();
  }
//   Funcion para un nuevo pedido
function nuevoPedido() {
    pedido = [];
    for (const x of carrito) {
      pedido.push(x.nombre);
    }
  }
//   funcion para ver el carrito
function verCarrito() {
    nuevoPedido();
    alert(`${pedido}`);
    menu();
  }
//   funcion para eliminar producto
function eliminarProductos() {
    for (const x of carrito) {
      alert(x.nombre + x.descripcion + x.precio);
      let productoEliminar = prompt("Eliminar produto. Escribi SI o NO");
      productoEliminar = productoEliminar.toUpperCase();
      if (productoEliminar == "SI") {
        let posicion = carrito.indexOf(x);
        carrito.splice(posicion, 1);
        precio = precio - x.precio;
        alert(x.nombre + " Se elimino de forma exitosa!");
      }
    }
    menu();
  }
//   funcion para pagar 
function pagar() {
    nuevoPedido();
    alert(`Tu pedido ${pedido}. 
      Se cobrara $${precio}
      Gracias por comprar en nuestra tienda!`);
  }
//   productos
const cocoVai = {
    nombre: "Spray Coco Vai",
    precio: 680,
    descripcion:
      "Spray de 500ml. Notas de salida:Coco. Notas de corazon:Nota lactea, Durazno. Notas de fondo: Coco, Vainilla",
  };
  
  const amour = {
    nombre: "Spray Amour",
    precio: 680,
    descripcion:
      "Spray de 500ml. Notas de salida: Flores de anis acarameladas, Flores de cerezo. Notas de corazon: Jazmin, Sandalo, Gardenia. Notas de fondo: Amber gris, Incienso, Vainilla.",
  };
  
  const floresBlancas = {
    nombre: "Spray Flores Blancas.",
    precio: 680,
    descripcion: "Spray de 500ml. Notas de salida: Ciclamen, Gardenia, Flor de naranjo dulce. Notas de corazon: Jazmin, Orquidea, Ylang Ylang. Notas de fondo: Almizcle, Balsamico.",
  };
  
  const bamboo = {
    nombre: "Spray Bamboo",
    precio: 680,
    descripcion:
      "Spray de 500ml. Notas de salida:Notas verdes frutales, Anana, Frutilla. Notas de corazon: Jazmin, Muguet, Rosa, Anis. Notas de fondo: Almizcle, Sandalo, Bambu.",
  };
  
  const bubblegum = {
    nombre: " Spray Bubblegum",
    precio: 680,
    descripcion: "Spray de 500ml. Notas de salida:Cerezas, Naranja, Anana. Notas de corazon:Frutilla. Notas de fondo: Vinilla, Canela.",
  };
//   Variables

let carrito = [];
let pedido = [];
let precio = 0;
menu();