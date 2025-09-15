//uno de los mayoyes problemas de las variables es que se pueden rescribir


/*
var estado = true;

if(estado){
    var estado=false;                // se va ir con el segundo ESTADO POR LA ESTRUCTURA DE VAR
}
console.log(estado);

*/



/*
-------------------------------------------------------------------------

let estado = true;
if(estado){
    let estado = false;                           //  SE VA IR CON EL PRIMER ESTADO POR LA ESTRUCTURA DE LET 
}
console.log(estado);


for(let i = 0; i<10 ; i++){
    console.log(i)
}



console.log(i);


*/


/*
const Array= [];
Array = ["HOLA, ESTO ES UN ARREGLO"];  // no se ve nada en terminal
console.log(Array);

*/

const miarray= [];
miarray[0] = ["hola un arreglo"];               // array que funciona
console.log(miarray);