const frutas = ["Banana"];
//frutas.push("sandia");  //  push para agregarlo al final 
frutas.unshift("sandia"); //unshift para agregarlo al principio
frutas.push("mango");
frutas.push("guayaba");
frutas.unshift("melon");
frutas.unshift("uva");
console.log(frutas);


for(let fruta of frutas){
    console.log(fruta);
}


//eliminar  con POP 
console.log ("ELIMINAMOS EL ULTIMO -------------------------------------------------------------");

frutas.pop();

for(let fruta of frutas){
    console.log(fruta);
}




console.log ("ELIMINAMOS EL PRIMERO -------------------------------------------------------------");

frutas.shift();

for(let fruta of frutas){
    console.log(fruta);
}


/*
const puerto=3306;
puerto = 3308;                                // esto esta MAL
console.log(puerto);
*/


