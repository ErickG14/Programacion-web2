/*
function saludar(nombre){
    console.log("hola " + nombre);
}
*/




function sumar ( n1, n2){
    return parseInt(n1) + parseInt(n2);
}

let numero1 =  prompt("numero 1: ");
let numero2 = prompt("numero 2: ");

let resultado = sumar(numero1,numero2);

console.log("El total de la suma es : " + resultado);



function restar ( n1, n2){
    return parseInt(n1) - parseInt(n2);
}

let numero3 =  prompt("numero 1: ");
let numero4 = prompt("numero 2: ");

let resultadoresta = restar(numero3,numero4);

console.log("El total de la resta es : " + resultadoresta);



function multiplicacion ( n1, n2){
    return parseInt(n1) * parseInt(n2);
}

let numero5 =  prompt("numero 1: ");
let numero6 = prompt("numero 2: ");

let resultamul = restar(numero5,numero6);

console.log("El total de la multiplicacion es : " + resultamul);



function division ( n1, n2){
    return parseInt(n1) / parseInt(n2);
}

let numero7 =  prompt("numero 1: ");
let numero8 = prompt("numero 2: ");

let resultadodiv = restar(numero7,numero8);

console.log("El total de la division es : " + resultadodiv);


