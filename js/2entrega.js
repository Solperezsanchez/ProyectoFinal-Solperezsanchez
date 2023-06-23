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
  