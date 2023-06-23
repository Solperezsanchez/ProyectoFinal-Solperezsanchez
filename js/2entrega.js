// Le damos la bienvenida al cliente con esta funcion
function pedirNombre() {
    let nombreIngresado = prompt(`Ingresa tu nombre`);
    saludarCliente(nombreIngresado);
  }
  function saludarCliente(nombre) {
    alert(`¡Bienvenidx ${nombre} a nuestra tienda!`);
  }
//   Comenzamos con el menu para que puedan seleccionar lo que deseen