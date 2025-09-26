var productos = [
  {nombre: 'camisa', precio: 300},
  {nombre: 'pantalon', precio: 500},
  {nombre: 'zapatos', precio: 400},
  {nombre: 'sombrero', precio: 200}
];

var carrito = [];


function mostrarMenu() {
  var menu = "Seleccione una opción:\n";
  for (var i = 0; i < productos.length; i++) {
    menu += (i + 1) + ". Comprar " + productos[i].nombre + " - $" + productos[i].precio + "\n";
  }
  menu += (productos.length + 1) + ". Ver Carrito y Total\n";
  menu += (productos.length + 2) + ". Actualizar Carrito (eliminar producto)\n";
  menu += (productos.length + 3) + ". Menú Administrador (agregar producto al catálogo)\n";
  menu += (productos.length + 4) + ". Salir\n";
  return menu;
}

function agregarAlCarrito(index) {
  var productoSeleccionado = productos[index];
  carrito.push(productoSeleccionado);
  console.log('Producto "' + productoSeleccionado.nombre + '" agregado al carrito.');
}

function mostrarCarritoYTotal() {
  if (carrito.length === 0) {
    console.log("El carrito está vacío.");
  } else {
    var mensajeCarrito = "Carrito de compras:\n";
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
      mensajeCarrito += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
      total += carrito[i].precio;
    }
    mensajeCarrito += "\nTotal: $" + total;
    console.log(mensajeCarrito);
  }
}

function actualizarCarrito() {
  if (carrito.length === 0) {
    console.log("El carrito está vacío. No hay nada que actualizar.");
    return;
  }
  mostrarCarritoYTotal();
  var opcionEliminar = prompt("Ingrese el número del producto que desea eliminar del carrito (o 0 para cancelar):");
  opcionEliminar = Number(opcionEliminar);

  if (opcionEliminar > 0 && opcionEliminar <= carrito.length) {
    var eliminado = carrito.splice(opcionEliminar - 1, 1);
    console.log("Se eliminó: " + eliminado[0].nombre);
  } else {
    console.log("No se eliminó ningún producto.");
  }
}

function menuAdministrador() {
  var nombreNuevo = prompt("Ingrese el nombre del nuevo producto:");
  var precioNuevo = prompt("Ingrese el precio del producto:");
  precioNuevo = Number(precioNuevo);

  if (nombreNuevo && !isNaN(precioNuevo) && precioNuevo > 0) {
    productos.push({nombre: nombreNuevo, precio: precioNuevo});
    console.log("Producto agregado al catálogo: " + nombreNuevo + " - $" + precioNuevo);
  } else {
    console.log("Datos inválidos. No se agregó el producto.");
  }
}

function iniciarTienda() {
  var opcion = prompt(mostrarMenu());
  opcion = Number(opcion);

  if (isNaN(opcion) || opcion < 1 || opcion > productos.length + 4) {
    console.log("Opción no válida, por favor intenta de nuevo.");
    iniciarTienda();
  } else if (opcion >= 1 && opcion <= productos.length) {
    agregarAlCarrito(opcion - 1);
    iniciarTienda();
  } else if (opcion === productos.length + 1) {
    mostrarCarritoYTotal();
    iniciarTienda();
  } else if (opcion === productos.length + 2) {
    actualizarCarrito();
    iniciarTienda();
  } else if (opcion === productos.length + 3) {
    menuAdministrador();
    iniciarTienda();
  } else if (opcion === productos.length + 4) {
    console.log("Gracias por visitar la tienda.");
  }
}

iniciarTienda();
