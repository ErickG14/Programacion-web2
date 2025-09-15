
//arreglo vacio
let nombre = [];


// funcion para agragar un nombre a un arreglo 
function agragarNombre(){

    let nombre = prompt("Ingresa el nombre: ");

    if(nombre){
        nombres.push(nombre);
        alert(`El nombre es: ${nombre} agragado exitosamente!`);

    }else{
        alert(`El nombre esta vacio.`);
    }
}

function MostrarNombres(){
    if(nombre.length === 0){
        alert(`No hay nombres almacenados`);

    }else{
        let mensaje = "Nombres alamcendados: \n";

        nombres.forEach((nombre, index)=>{
            mensaje += `${index + 1}. ${nombre}\n`;
        });
        alert(mensaje);
    }
}


//------------------------------FOR NORMAL----------------------------------

/*
for (let i = 0; i < nombres.length; i++) {
   mensaje += `${i + 1}. ${nombres[i]}\n`;
}
    */