//iniciamos con un arreglo para almacenar tareas
let tareas = [];


// funcion paaara mostrar el menu de opciones

function mostrarMenu(){
    return parseInt(prompt(`
        Opciones Disponibles:
        1; Agragar tareas 
        2; vVer todas las tareas
        3; Marcar tareas como completadas
        4; Salir
        "Elige una opcion"
        
        `));

}


//funcion para agregar tarea

function agragartarea(){
    let nombre = prompt("Introduce el nombre de la tarea");
    if(nombre){
        //agregar una tarea
        let tarea = {
            nombre: nombre,
            completado: false
        };
        tareas.push(tarea);
        alert("La tarea se agrego de manera exitosa!")


    }else{
        alert("El nombre de la tarea no puede estar vacia");
    }
}

// funcion para ver todas las tareas

function verTareas(){
    if(tareas.length === 0){
        alert("No hay tareas en la lista");
    }else{
        let mensaje = "Lista de tareas\n";
        tareas.forEach((tarea,index)=>{
            mensaje += `${index + 1}.-${tarea.nombre}[${tarea.completado ? "completado" : "pendiente"}]\n`;
        });
        alert(mensaje);
    }
}

function marcarTareaCompletada(){
    let numero = parseInt(prompt("Introduce el numero de la tarea que se decea marcar como completada"));
    if(numero > 0 && numero <= tareas.length){
        tareas[numero - 1].completado=true;
        alert(`La tarea"${tarea[numero-1].nombre}" ha sido marcada como completada.`);
    }else{
        alert("Nuemero de tarea invalido");
    }
}


//function para manejar el flujo de nuestro pragrama

function iniciarPrograma(){
    let continuar = true;
    while(continuar){
        let opcion = mostrarMenu();
        switch(opcion){
            case 1:
                agragartarea();
                break;
            case 2:
                verTareas();
                break
             case 3:
                marcarTareaCompletada();
                break;
             case 4:
                alert("saliendo del programa");
                break;

        }         
    
            }

}