
// Esperamos a que toda la página esté completamente cargada
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES PRINCIPALES =====
    // Obtenemos referencias a los elementos importantes de la página
    
    // La ventana emergente completa (fondo oscuro + contenido)
    const ventanaEmergente = document.getElementById('editModal');
    
    // Todos los botones que pueden cerrar la ventana (X y Cancelar)
    const botonesCerrar = document.querySelectorAll('.close-modal');
    
    // El formulario que está dentro de la ventana emergente
    const formularioEdicion = document.getElementById('editForm');

    // ===== FUNCIÓN PARA ABRIR LA VENTANA DE EDICIÓN =====
    // Esta función se ejecuta cuando se hace clic en "Editar" en algún carro
    function abrirVentanaEdicion(botonEditar) {
        console.log('Abriendo ventana de edición...');
        
        // Obtenemos todos los datos del carro desde los atributos del botón
        // Estos datos se guardaron en el HTML cuando se generó la tabla
        const id = botonEditar.getAttribute('data-id');
        const marca = botonEditar.getAttribute('data-marca');
        const modelo = botonEditar.getAttribute('data-modelo');
        const año = botonEditar.getAttribute('data-año');
        const color = botonEditar.getAttribute('data-color');
        const precio = botonEditar.getAttribute('data-precio');
        
        // Llenamos el formulario de edición con los datos actuales del carro
        document.getElementById('editMarca').value = marca;
        document.getElementById('editModelo').value = modelo;
        document.getElementById('editAño').value = año;
        document.getElementById('editColor').value = color;
        document.getElementById('editPrecio').value = precio;
        
        // Guardamos los datos originales para poder comparar después
        // Esto nos permite saber qué campos realmente cambiaron
        formularioEdicion.setAttribute('data-original-marca', marca);
        formularioEdicion.setAttribute('data-original-modelo', modelo);
        formularioEdicion.setAttribute('data-original-año', año);
        formularioEdicion.setAttribute('data-original-color', color);
        formularioEdicion.setAttribute('data-original-precio', precio);
        
        // Actualizamos la acción del formulario con el ID correcto
        // Esto hace que cuando se envíe, sepa qué carro actualizar
        formularioEdicion.action = `/update-car/${id}`;
        
        // Finalmente, mostramos la ventana emergente
        ventanaEmergente.style.display = 'block';
        
        console.log('Ventana de edición abierta para el carro ID:', id);
    }

    // ===== FUNCIÓN PARA CERRAR LA VENTANA =====
    function cerrarVentana() {
        console.log('Cerrando ventana de edición...');
        
        // Ocultamos la ventana
        ventanaEmergente.style.display = 'none';
        
        // Limpiamos el formulario para la próxima vez que se abra
        formularioEdicion.reset();
        
        console.log('Ventana cerrada correctamente');
    }

    // ===== CONFIGURACIÓN DE EVENTOS PARA CERRAR LA VENTANA =====
    
    // 1. Botones de cierre (X y Cancelar)
    // Agregamos el evento de clic a todos los botones que cierran la ventana
    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', cerrarVentana);
    });

    // 2. Clic fuera del contenido
    // Si el usuario hace clic en el fondo oscuro (fuera del formulario), se cierra
    window.addEventListener('click', (evento) => {
        if (evento.target === ventanaEmergente) {
            cerrarVentana();
        }
    });

    // 3. Tecla ESC
    // Si el usuario presiona la tecla ESC, también se cierra la ventana
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && ventanaEmergente.style.display === 'block') {
            cerrarVentana();
        }
    });

    // ===== CONFIGURACIÓN DE BOTONES DE EDITAR =====
    // Buscamos todos los botones de "Editar" en la tabla
    const botonesEditar = document.querySelectorAll('.edit-btn');
    
    // A cada botón le agregamos el evento para abrir la ventana
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function() {
            // 'this' se refiere al botón que se clickeó
            abrirVentanaEdicion(this);
        });
    });

    // ===== MANEJO DEL ENVÍO DEL FORMULARIO =====
    // Cuando el usuario intenta enviar el formulario (hace clic en "Actualizar")
    formularioEdicion.addEventListener('submit', function(evento) {
        // Prevenimos el envío inmediato para primero validar los cambios
        evento.preventDefault();
        
        console.log('Usuario intenta actualizar carro...');
        
        // ===== VERIFICACIÓN DE CAMBIOS =====
        // Obtenemos los datos originales (antes de editar)
        const marcaOriginal = this.getAttribute('data-original-marca');
        const modeloOriginal = this.getAttribute('data-original-modelo');
        const añoOriginal = this.getAttribute('data-original-año');
        const colorOriginal = this.getAttribute('data-original-color');
        const precioOriginal = this.getAttribute('data-original-precio');
        
        // Obtenemos los nuevos datos (lo que el usuario escribió)
        const nuevaMarca = document.getElementById('editMarca').value;
        const nuevoModelo = document.getElementById('editModelo').value;
        const nuevoAño = document.getElementById('editAño').value;
        const nuevoColor = document.getElementById('editColor').value;
        const nuevoPrecio = document.getElementById('editPrecio').value;
        
        // ===== DETECCIÓN DE CAMBIOS =====
        // Comparamos campo por campo para ver qué realmente cambió
        const cambiosDetectados = [];
        
        if (marcaOriginal !== nuevaMarca) {
            cambiosDetectados.push(`Marca: "${marcaOriginal}" → "${nuevaMarca}"`);
        }
        if (modeloOriginal !== nuevoModelo) {
            cambiosDetectados.push(`Modelo: "${modeloOriginal}" → "${nuevoModelo}"`);
        }
        if (añoOriginal !== nuevoAño) {
            cambiosDetectados.push(`Año: ${añoOriginal} → ${nuevoAño}`);
        }
        if (colorOriginal !== nuevoColor) {
            cambiosDetectados.push(`Color: "${colorOriginal}" → "${nuevoColor}"`);
        }
        if (precioOriginal !== nuevoPrecio) {
            cambiosDetectados.push(`Precio: $${precioOriginal} → $${nuevoPrecio}`);
        }
        
        // ===== MANEJO DE RESULTADOS =====
        if (cambiosDetectados.length > 0) {
            // Si hay cambios, mostramos confirmación al usuario
            const mensajeConfirmacion = 
                "Se modificarán los siguientes campos:\n\n" + 
                cambiosDetectados.join('\n') + 
                "\n\n¿Confirmas los cambios?";
            
            console.log('Cambios detectados:', cambiosDetectados);
            
            // Preguntamos al usuario si realmente quiere guardar
            if (confirm(mensajeConfirmacion)) {
                console.log('Usuario confirmó los cambios. Enviando formulario...');
                
                // Si confirma, enviamos el formulario normalmente
                this.submit();
            } else {
                console.log('Usuario canceló la operación');
                // Si cancela, no hacemos nada y la ventana sigue abierta
            }
        } else {
            // Si no hay cambios, informamos al usuario y cerramos
            console.log('No se detectaron cambios en los campos');
            alert('No se detectaron cambios en los campos.');
            cerrarVentana();
        }
    });

    console.log('Ventana de edición - JavaScript cargado correctamente');
});

