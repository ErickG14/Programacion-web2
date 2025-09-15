// arreglo vacio
let nombres = [];

// funcion para agregar un nombre al arreglo
function agregarNombre(){

    let nombre = prompt("Ingresa el nombre: ");
    
    if(nombre){
        nombres.push(nombre);
        alert(` El nombre es: ${nombre} - agregado exotosamente!`);    
            
    }else{
        alert(`El nombre esta vacio.`);
    }
}

function monstrarNombres(){

    if( nombres.length === 0 ){

        alert(`No hay nombres almacenados`);

    }else{

        let mensaje = "Nombres Almacenados: \n";
        
        nombres.forEach((nombre, index)=>{
            mensaje += `${index + 1}.  ${nombre}\n`;
        });
        alert(mensaje);
    }
}

function mostrarMenu(){
    let option;

    do{
        option=prompt(`
            Opciones disponibles:
            1.- Agregar Nombre
            2.- Mostrar Nombre
            3.- Salir
            "Elige una opcion"
            `);

            switch(option){
                case '1':
                    agregarNombre();
                    break;
                
                case '2':
                    monstrarNombres();
                    break;

                case '3':
                    alert(`Saliendo del programa ....`);
                    break;
                default:
                    alert(`Opcion no valida. Intente de nuevo`);
            }
    }while(option !== '3');

}

//iniciar programa
mostrarMenu();