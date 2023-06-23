// Le damos la bienvenida al cliente con esta funcion
function pedirNombre() {
    let nombreIngresado = prompt(`Ingresa tu nombre`);
    saludarCliente(nombreIngresado);
  }
  function saludarCliente(nombre) {
    alert(`¡Bienvenidx ${nombre} a nuestra tienda!`);
  }
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