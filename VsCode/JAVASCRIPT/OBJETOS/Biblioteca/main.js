async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivoLector');
    elemento.innerHTML = contenido;
}


    document.getElementById('importar-boton').addEventListener('click', async () => {


        const mensaje = document.getElementById('prestamo-mensaje');
        if (mensaje) mensaje.remove();


        const archivoLibros = document.getElementById('importar-input-libros').files[0];
        const archivoLectores = document.getElementById('importar-input-lectores').files[0];
    
        if (!archivoLibros || !archivoLectores) {
            console.log("Error: Selecciona ambos archivos antes de importar.");
            return;
        } else{
    
            const contenidoLibros = await leerArchivo(archivoLibros);
            const contenidoLectores = await leerArchivo(archivoLectores);
    
            console.log("Importación exitosa.");
            
            const lineas = contenidoLibros.split('\r\n');
            sinDuplicados=new Set(lineas);
            sinDuplicados.delete("");
            arraySin=[...sinDuplicados];
            console.log(sinDuplicados);


            // Convertir CSV en objetos y agregarlos a los arrays
            sinDuplicados.forEach(linea => {
                let dato = linea.split(",");
                if (dato[0] != "codLibro") {
                    let libro = new Libro(dato[0], dato[1], dato[2],
                        dato[3], dato[4], parseInt(dato[5]), false, null);
                    arrayLibros.push(libro);
                }
            });
            
            const lineas2 = contenidoLectores.split('\r\n');
            sinDuplicados=new Set(lineas2);
            sinDuplicados.delete("");
            arraySin=[...sinDuplicados];
            console.log(sinDuplicados);

            sinDuplicados.forEach(linea => {
                let dato = linea.split(",");
                if (dato[0] != "numSocio") {
                    let lector = new Lector(dato[0], dato[1], dato[2], dato[3], dato[4], false, null);
                    arrayLectores.push(lector);
                }
            });
        }
           
           
        
    });

// Función para actualizar las tablas de libros
function actualizarTablaLibros() {
    const tablaLibros = document.getElementById('vista-libros-tabla').getElementsByTagName('tbody')[0];
    tablaLibros.innerHTML = ''; // Limpiar la tabla antes de actualizar

    arrayLibros.forEach(libro => {
        const fila = document.createElement('tr');
        
        // Añadir celdas con los valores de los libros
        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
        `;
        
        // Añadir el estilo de fondo para la fila
        fila.querySelectorAll('td').forEach((celda, index) => {
            celda.style.backgroundColor = '#C398EB'; // Fondo suave
            celda.style.borderRadius = '8px'; // Bordes redondeados
            celda.style.outline = '1px solid #D1D1D1'; // Borde claro
            celda.style.padding = '12px 18px'; // Padding más amplio
            celda.style.textAlign = 'center'; // Centrar texto
            celda.style.fontFamily = '"Arial", sans-serif'; // Fuente moderna
            celda.style.fontSize = '14px'; // Tamaño de fuente agradable
            celda.style.transition = 'all 0.3s ease';
        });

        // Añadir fondo color #BB61F0 para la fila de encabezados
        if (tablaLibros.children.length === 0) {
            const encabezados = document.querySelectorAll('#vista-libros-tabla th');
            encabezados.forEach((encabezado, index) => {
                encabezado.style.backgroundColor = '#BB61F0'; // Fondo de encabezado
                encabezado.style.color = '#1B1B1B'; // Texto blanco
                encabezado.style.padding = '15px 20px'; // Padding más grande
                encabezado.style.textAlign = 'center'; // Alineación centrada
                encabezado.style.fontFamily = '"Arial", sans-serif'; // Fuente moderna
                encabezado.style.fontSize = '16px'; // Tamaño de fuente de encabezado
                encabezado.style.fontWeight = 'bold';
            });
        }

        tablaLibros.appendChild(fila);
    });
}

// Función para actualizar la tabla de lectores
function actualizarTablaLectores() {
    const tablaLectores = document.getElementById('comprobar-lectores-tabla').getElementsByTagName('tbody')[0];
    tablaLectores.innerHTML = ''; // Limpiar la tabla antes de actualizar

    arrayLectores.forEach(lector => {
        const fila = document.createElement('tr');

        // Validación de formato de teléfono y email
        const telefonoValido = /^[0-9]{9}$/.test(lector.telefono); // Ejemplo de validación simple para teléfono
        const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(lector.email); // Validación de email

        fila.innerHTML = `
            <td>${lector.numSocio}</td>
            <td>${lector.nombre}</td>
            <td>${lector.apellido}</td>
            <td class="${telefonoValido ? '' : 'error'}">${lector.telefono}</td>
            <td class="${emailValido ? '' : 'error'}">${lector.email}</td>
        `;

        // Añadir estilo a las celdas
        fila.querySelectorAll('td').forEach((celda, index) => {
            celda.style.backgroundColor = '#C398EB';
            celda.style.borderRadius = '8px'; // Bordes redondeados
            celda.style.outline = '1px solid #D1D1D1'; // Borde claro
            celda.style.padding = '12px 18px'; // Padding más amplio
            celda.style.textAlign = 'center'; // Centrado de texto
            celda.style.fontFamily = '"Arial", sans-serif'; // Fuente moderna
            celda.style.fontSize = '14px'; // Tamaño de fuente más cómodo
            
        });

        // Si el teléfono o email es incorrecto, resaltar con color #EA9E90
        fila.querySelectorAll('.error').forEach(celda => {
            celda.style.backgroundColor = '#EA9E90';
        });

        // Añadir fondo color #BB61F0 para la fila de encabezados
        if (tablaLectores.children.length === 0) {
            const encabezados = document.querySelectorAll('#comprobar-lectores-tabla th');
            encabezados.forEach((encabezado, index) => {
                encabezado.style.backgroundColor = '#BB61F0'; // Fondo de encabezado
                encabezado.style.color = '#1B1B1B'; // Texto blanco
                encabezado.style.padding = '15px 20px'; // Padding más grande
                encabezado.style.textAlign = 'center'; // Alineación centrada
                encabezado.style.fontFamily = '"Arial", sans-serif'; // Fuente moderna
                encabezado.style.fontSize = '16px'; // Tamaño de fuente de encabezado
                encabezado.style.fontWeight = 'bold';
            });
        }

        tablaLectores.appendChild(fila);
    });
}






// Botón de "Actualizar libros"
document.getElementById('vista-libros-boton').addEventListener('click', actualizarTablaLibros);

// Botón de "Actualizar lectores"
document.getElementById('comprobar-lectores-boton').addEventListener('click', actualizarTablaLectores);

// Función para dar de alta un libro
document.getElementById('alta-libro-boton').addEventListener('click', () => {
    // Limpiar cualquier mensaje previo
    const mensaje = document.getElementById('alta-libro-mensaje');
    if (mensaje) mensaje.remove();

    const isbn = document.getElementById('alta-libro-isbn').value;
    const autor = document.getElementById('alta-libro-autor').value;
    const titulo = document.getElementById('alta-libro-titulo').value;
    const editorial = document.getElementById('alta-libro-editorial').value;
    const ejemplares = document.getElementById('alta-libro-ejemplares').value;
        
   
    if (!altaLibro(isbn,autor,titulo,editorial,ejemplares)) {
       
       
        // Limpiar campos
        document.getElementById('alta-libro-isbn').value = '';
        document.getElementById('alta-libro-autor').value = '';
        document.getElementById('alta-libro-titulo').value = '';
        document.getElementById('alta-libro-editorial').value = '';
        document.getElementById('alta-libro-ejemplares').value = '';
        texto="Añadido exitosamente";

    } else {
        texto="Error en los datos";
    }

    
        const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'alta-libro-mensaje';  // Asignar un ID para manejarlo más tarde

    // Asignar el texto al párrafo
    mensajeDiv.textContent = texto;

    // Cambiar color según el tipo de mensaje
   
        mensajeDiv.style.color = 'red'; // Mensaje de error en rojo
   
      
 
    // Añadir el mensaje a la sección correspondiente (debajo del botón)
    document.getElementById('alta-libro').appendChild(mensajeDiv);
    
});

// Función para gestionar préstamos
document.getElementById('prestamo-boton').addEventListener('click', () => {

    
    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    if (numSocio && codLibro) {
        error=solicitudPrestamo(numSocio,codLibro);
       
        if(error){
            texto="Solicitud realizada con exito";
        }else{
            texto="Solicitud erronea";
        }

    }else{
        texto="Solicitud erronea"
    }
    document.getElementById('devolucion-prestamo-socio').value = '';
    document.getElementById('devolucion-prestamo-libro').value = '';
    

    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'prestamo-mensaje';  // Asignar un ID para manejarlo más tarde

    // Asignar el texto al párrafo
    mensajeDiv.textContent = texto;

    // Cambiar color según el tipo de mensaje
   
        mensajeDiv.style.color = 'red'; // Mensaje de error en rojo
   
      
 
    // Añadir el mensaje a la sección correspondiente (debajo del botón)
    document.getElementById('prestamo-boton').appendChild(mensajeDiv);
    
    
});

// Función para gestionar devoluciones
document.getElementById('devolucion-boton').addEventListener('click', () => {

    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    if (numSocio && codLibro) {
        resultado=devolucionPrestamo(numSocio,codLibro);
       
        if(!resultado[0]){
            texto="Solicitud realizada con exito: Numero de prestamo: "+resultado[1]+" Fecha devolucion: "+resultado[2];
        }else{
            texto="Solicitud erronea";
        }

    }else{
        texto="Solicitud erronea"
    }
    document.getElementById('devolucion-prestamo-socio').value = '';
    document.getElementById('devolucion-prestamo-libro').value = '';



    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'prestamo-mensaje';  // Asignar un ID para manejarlo más tarde

    // Asignar el texto al párrafo
    mensajeDiv.textContent = texto;

    // Cambiar color según el tipo de mensaje
   
        mensajeDiv.style.color = 'red'; // Mensaje de error en rojo
   
    // Añadir el mensaje a la sección correspondiente (debajo del botón)
    document.getElementById('devolucion-boton').appendChild(mensajeDiv);


});



//CONSTRUCTOR de objetos Lector
function Lector(numSocio,nombre,apellido,telefono,email,bajaLector,fechaBaja){

    this.numSocio=numSocio;
    this.nombre=nombre;
    this.apellido=apellido;
    this.telefono=telefono;
    this.email=email;
    this.bajaLector=bajaLector;
    this.fechaBaja=fechaBaja;
    

};

//CONSTRUCTOR de objetos Libro
function Libro(codLibro,isbn,autor,titulo,editorial,ejemplares,bajaLibro,fechaBaja){

    this.codLibro=codLibro;
    this.isbn=isbn;
    this.autor=autor;
    this.titulo=titulo;
    this.editorial=editorial;
    this.ejemplares=ejemplares;
    this.bajaLibro=bajaLibro;
    this.fechaBaja=fechaBaja;

};

//CONSTRUCTOR de objetos Prestamo
function Prestamo(numPrestamo,numSocio,codLibro,fechaPrestamo,fechaDevolucion){

    this.numPrestamo=numPrestamo;
    this.numSocio=numSocio;
    this.codLibro=codLibro;
    this.fechaPrestamo=fechaPrestamo;
    this.fechaDevolucion=fechaDevolucion;

};

const clasificacion={
    pasillo : 7,
    estanteria : 4,
    estante : 6,


}

//Inicializamos los arrays de objetos Lector y Libro
arrayLectores=[];
arrayLibros=[];
arrayTotalPrestamos=[];
arrayPrestamosVivos=[];
numPrestamo=0;

// Validaciones
function validarNombreApellido(texto) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(texto);
}

function validarTelefono(telefono) {
    return /^[0-9]{9}$/.test(telefono);
}

function validarEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|net|eu|org)$/.test(email);
}

function validarNumSocio(numSocio){
    return /^[1-9][0-9]{2}$/.test(numSocio);
}


//FUNCION altaLector() recibe los parametros con prompt, crea un objeto Lector y lo mete en el arrayLectores

function altaLector(){

    let numSocio=prompt("Introduce numero de socio: ");
    let nombre=prompt("Introduce el nombre: ");
    let apellido=prompt("Introduce el apellido: ");
    let telefono=prompt("Introduce el telefono: ");
    let email=prompt("Introduce el email: ");

    if(numSocio==null||nombre==null||apellido==null||telefono==null||email==null){
        console.log("F, falta algún dato");
    }else 

    if(!validarNumSocio(numSocio)){
        console.log("V, el numSocio tiene un formato incorrecto")
    }else

    if(!validarNombreApellido(nombre)){
        console.log("V, el nombre tiene un formato incorrecto")
    }else
    
    
    if(!validarNombreApellido(apellido)){
        console.log("V, el apellido tiene un formato incorrecto")
    }else
    
    if(!validarEmail(email)){
       console.log("V, el email tiene un formato incorrecto");
    } else 

    if(!validarTelefono(telefono)){
       console.log("V, el telefono tiene un formato incorrecto");
    } else{


    let lector=new Lector(numSocio,nombre,apellido,telefono,email,false,null);
    arrayLectores.push(lector);
    console.log(numSocio);
    }

}

//
function bajaLector(){
    error=true;
    numSocio=prompt("Introduce el numero de socio del lector a dar de baja");
    if(validarNumSocio(numSocio)){
        
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            lector.bajaLector=true;
            lector.fechaBaja=new Date().toLocaleDateString();
            error=false;
            console.log("Fecha de baja: "+lector.fechaBaja);
        }
    });
    } else{
        console.log("E, el numSocio no cumple con la validación")
    }

    if(error==true){
        console.log("E, el socio no existe");
    }
}

//
function modifLector(){
    error=true;
    numSocio=prompt("Introduce el numero de socio del lector para modificar");
    if(validarNumSocio(numSocio)){
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");

            if(atributo=="nombre" && validarNombreApellido(valor)) {

            lector[atributo]=valor;
            error=false;
            } else if(atributo=="apellido" && validarNombreApellido(valor)) {

                lector[atributo]=valor;
                error=false;
                } else if(atributo=="telefono" && validarTelefono(valor)) {

                    lector[atributo]=valor;
                    error=false;
                    } else if(atributo=="email" && validarEmail(valor)) {

                        lector[atributo]=valor;
                        error=false;
                        }else{
                            console.log("El valor del "+atributo+" no cumple la validación")
                        }
        }
    });

    }else{
        console.log("Numero de socio no cumple con la validación")
    }
    if(error==true){
        console.log("El numero de socio no existe");
    }
}

//
function comprobarEmails() {
    
    let emailsInvalidos = [];
    arrayLectores.forEach(lector => {
        
        let validacion = /^[^\s@]+@[^\s@]+\.(com|net|eu|org)$/i;

        if (!validacion.test(lector.email)) {
            emailsInvalidos.push({ lector: lector.nombre, email: lector.email });
        }
    });

    if (emailsInvalidos.length > 0) {
        console.log("Correos electrónicos no válidos:");
      
            console.log(emailsInvalidos);
        
    } else {
        console.log("Todos los correos electrónicos son válidos.");
    }
}

//
function comprobarTelefonos(){
  
        let telefonosInvalidos = [];
    
        arrayLectores.forEach(lector => {
            
            let validacion = /^\d{9}$/; 
    
            if (!validacion.test(lector.telefono)) {
                telefonosInvalidos.push({lector: lector.nombre, telefono: lector.telefono});
            }
        });
    
        if (telefonosInvalidos.length > 0) {
            console.log("Teléfonos no válidos:");
           
                console.log(telefonosInvalidos);
            
        } else {
            console.log("Todos los teléfonos son válidos.");
        }
}

function validarAutor(autor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(autor);
}

function validarTitulo(titulo) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9_\-¡!@#$%&/()¿?€.:,; ]+$/.test(titulo);
}

function validarEditorial(editorial) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(editorial);
}

function validarEjemplares(ejemplares) {
    return /^[0-9]$/.test(ejemplares);
}

function validarIsbn(isbn) {
    return /^\d{13}$/.test(isbn);
}

function validarCodLibro(codLibro){
    return /^[1-9][0-9]{3}$/.test(codLibro);
}
//FUNCION altaLibro() recibe los parametros con prompt, crea un objeto Libro y lo mete en el arrayLibros
function altaLibro(isbn,autor,titulo,editorial,ejemplares){

    error=true;
    if(isbn==''||autor==''||titulo==''||editorial==''||ejemplares==''){
        console.log("F, falta algún dato");
    }else 

    if(!validarIsbn(isbn)){
        console.log("V, el isbn tiene un formato incorrecto")
    }else
    
    
    if(!validarAutor(autor)){
        console.log("V, el autor tiene un formato incorrecto")
    }else
    
    if(!validarTitulo(titulo)){
       console.log("V, el titulo tiene un formato incorrecto");
    } else 

    if(!validarEditorial(editorial)){
       console.log("V, el editorial tiene un formato incorrecto");
    } else

    if(!validarEjemplares(ejemplares)){
        console.log("V, los ejemplares tiene un formato incorrecto");
    } else{
    
    error=false;
    codLibro = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    let libro=new Libro(codLibro,isbn,autor,titulo,editorial,ejemplares,false,null);
    arrayLibros.push(libro);
    console.log("Añadido con exito");

}

    return error;
};

//
function bajaLibro(){

    error=true;
    codLibro=prompt("Introduce el codigo del libro a dar de baja");
    if(validarCodLibro(codLibro)){
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            libro.bajaLibro=true;
            libro.fechaBaja=new Date().toLocaleDateString();
            error=false;
            console.log("El libro se ha dado de baja con exito");
        }
    });

    }else{
        console.log("El codLibro no cumple con la validación")
    }
    if(error==true){
        console.log("El libro no existe");
    }

}

//
function modifLibro(){

    error=true;
    codLibro=prompt("Introduce el codigo del libro para modificar");
    if(validarCodLibro(codLibro)){
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");
            if(atributo=="isbn" && validarIsbn(valor)) {

                libro[atributo]=valor;
                error=false;
                } else if(atributo=="autor" && validarAutor(valor)) {
    
                    libro[atributo]=valor;
                    error=false;
                    } else if(atributo=="titulo" && validarTitulo(valor)) {
    
                        libro[atributo]=valor;
                        error=false;
                        } else if(atributo=="editorial" && validarEditorial(valor)) {
    
                            libro[atributo]=valor;
                            error=false;
                            }else if(atributo==ejemplares && validarEjemplares(valor)){
                                
                                libro[atributo]=valor;
                                error=false;
                            }else{
                                console.log("El valor del "+atributo+" no cumple la validación")
                            }
        }
    });

    }else{
        console.log("El codLibro no cumple con la validación")
    }
    if(error==true){
        console.log("El libro no existe");
    }
}

//
function hayLibro(atributo,valor){

    error=true;
    arrayLibros.forEach(libro => {
        if(libro[atributo]==valor && libro.bajaLibro==false){
            error=false;
            
        }
    });

    return error;
    
}

//
function prestamoLibro(codLibro,numSocio){
    
//     if(validarCodLibro(codLibro) && !hayLibro("codLibro",codLibro)){
    
//     arrayLibros.forEach(libro => {
//         if(libro.codLibro==codLibro && libro.ejemplares>=1){
            
//             libro.ejemplares=parseInt(libro.ejemplares)-1;
//             console.log("Prestado");
//             error=false;
//         }
//         else{
//             error=true;
//         }
//     });

//  }else{
//    error=true;

// }

if (!validarCodLibro(codLibro) || hayLibro("codLibro", codLibro)) {
    console.log("El libro no existe o está dado de baja.");
    return false; // No se puede realizar el préstamo
}

let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
if (lector && libro && libro.ejemplares > 0) {
    libro.ejemplares = libro.ejemplares - 1;
    console.log("Libro prestado con éxito.");
    return true;
} else {
    console.log("No hay ejemplares disponibles.");
    return false;
}
}

//
function devolucionLibro(codLibro){
    
    if(validarCodLibro(codLibro)){
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            
            libro.ejemplares=parseInt(libro.ejemplares)+1;
            console.log("Devuelto");
            return false;
        }
    });

    }else{
        return true;
    }
}

//
function dondeLibro(){
    error=true;
    let isbn=prompt("Introduce el isbm del libro para localizar");

    arrayLibros.forEach(libro =>{
        if(libro.isbn==isbn){

            libro.__proto__=clasificacion;
            console.log("Pasillo: "+libro.pasillo+" Estanteria: "+libro.estanteria+" Estante: "+libro.estante);
            error=false;
        }
    });
    if(error==true){
        console.log("Libro no localizado")
    }
}

//
function solicitudPrestamo(numSocio,codLibro){
    
    const exitoPrestamo = prestamoLibro(codLibro,numSocio);
    if (exitoPrestamo) {
        let numPrestamo = arrayTotalPrestamos.length + 1; // Número de préstamo
        let prestamo = new Prestamo(numPrestamo, numSocio, codLibro, new Date().toLocaleDateString(), null);
        arrayTotalPrestamos.push(prestamo);
        arrayPrestamosVivos.push(prestamo);
        console.log(`Préstamo realizado: ${numPrestamo} para el socio ${numSocio}`);
        return true;
    } else {
        console.log("No se pudo realizar el préstamo.");
        return false;
}
}

//
function devolucionPrestamo(numSocio,codLibro){
    error=true;
    num='';
    fecha='';
    arrayPrestamosVivos.forEach(prestamo =>{
        if(prestamo.numSocio==numSocio && prestamo.codLibro==codLibro){

            prestamo.fechaDevolucion = new Date().toLocaleDateString();
            num=prestamo.numPrestamo;
            fecha=prestamo.fechaDevolucion
            devolucionLibro(prestamo.codLibro);
            arrayPrestamosVivos = arrayPrestamosVivos.filter(prestamo => prestamo.numPrestamo != num);
            error=false;
        } 
    });

    if(error==true){
            console.log("Prestamo no encontrado ");
    }

    return [error,num,fecha];
}

//
function listadoTotalPrestamos(){
    console.log(arrayTotalPrestamos);
}

//
function listadoPrestamosVivos(){
    console.log(arrayPrestamosVivos);
}
