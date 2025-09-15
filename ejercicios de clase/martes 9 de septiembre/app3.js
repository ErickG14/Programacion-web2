//var carrito = prompt("quieres agregar una fruta?")


let carrito = [];
let seguirComprando = true;

while (seguirComprando) {
  let fruta = prompt("¿Qué fruta deseas agregar al carrito?");
  
  if (fruta) {
    carrito.push(fruta);
    console.log(`${fruta} fue agregada al carrito.`);
  } else {
    console.log(" No ingresaste ninguna fruta.");
  }

  let respuesta = prompt("¿Quieres agregar otra fruta? (sí / no)");

// si la respuesta es diferente a si 

  if (respuesta !== "sí" && respuesta !== "si") {
    seguirComprando = false;
  }
}

console.log(" Carrito final:", carrito);


/*
0 0 0
0 1 0
1 0 0
1 1 1

*/