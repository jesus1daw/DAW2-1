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

//BOTON "importar", evento "click"
 document.getElementById('importar-boton').addEventListener('click', async () => {
    
    //Borramos el mensaje de error/exito si ya hay alguno escrito
    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los dos CSV
    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const archivoLectores = document.getElementById('importar-input-lectores').files[0];
    
    //Si uno esta vacio el mensaje es de Error
    if (!archivoLibros || !archivoLectores) {
        texto="Error: Selecciona ambos archivos antes de importar.";
        return;

    //Sino leemos los dos CSV
    } else{
        const contenidoLibros = await leerArchivo(archivoLibros);
        const contenidoLectores = await leerArchivo(archivoLectores);
    
        //El mensaje es de exito
        texto="Importación exitosa.";
        
        //El primer CSV lo dividimos en lineas y lo limpiamos
        const lineas = contenidoLibros.split('\r\n');
        sinDuplicados=new Set(lineas);
        sinDuplicados.delete("");
        arraySin=[...sinDuplicados];
        console.log(sinDuplicados);

        //Separamos los campos y creamos objetos Libro de cada linea
        sinDuplicados.forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "codLibro") {
                let libro = new Libro(dato[0], dato[1], dato[2], dato[3], dato[4], parseInt(dato[5]), false, null);
                arrayLibros.push(libro); //Los metemos en el array de Libros
            }
        });
        
        //El segundo CSV lo dividimos en lineas y lo limpiamos
        const lineas2 = contenidoLectores.split('\r\n');
        sinDuplicados=new Set(lineas2);
        sinDuplicados.delete("");
        arraySin=[...sinDuplicados];
        console.log(sinDuplicados);

        //Separamos los campos y creamos objetos Lector de cada linea
        sinDuplicados.forEach(linea => {
            let dato = linea.split(",");
            if (dato[0] != "numSocio") {
                let lector = new Lector(dato[0], dato[1], dato[2], dato[3], dato[4], false, null);
                arrayLectores.push(lector); //Los metemos en el array de Lectores
            }
        });
    }
    
    //Creamos un elemento <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'importar-mensaje'; //Asignamos un ID para manejarlo más tarde
    
    //Asignamos el texto al párrafo
    mensajeDiv.textContent = texto;
    
    //Mensaje en rojo
    mensajeDiv.style.color = 'red'; 
     
    //Añadimos el mensaje debajo del boton
    document.getElementById('importar-boton').appendChild(mensajeDiv);
});


//FUNCIÓN para actualizar las tablas de libros
function actualizarTablaLibros() {

    //Nos posicionamos en el tbody de la tabla de libros
    const tablaLibros = document.getElementById('vista-libros-tabla').getElementsByTagName('tbody')[0];
    tablaLibros.innerHTML = ''; //Limpiamos la tabla antes de actualizar

    //Por cada libro creamos una fila
    arrayLibros.forEach(libro => {
        const fila = document.createElement('tr');
        
        //Añadir celdas con los valores de los libros
        fila.innerHTML = `
            <td>${libro.codLibro}</td>
            <td>${libro.isbn}</td>
            <td>${libro.autor}</td>
            <td>${libro.titulo}</td>
            <td>${libro.editorial}</td>
            <td>${libro.ejemplares}</td>
        `;
        
        //Añadir el estilo de las celdas
        fila.querySelectorAll('td').forEach((celda) => {
            celda.style.backgroundColor = '#C398EB'; 
            celda.style.borderRadius = '8px'; 
            celda.style.outline = '1px solid #D1D1D1'; 
            celda.style.padding = '12px 18px'; 
            celda.style.textAlign = 'center'; 
            celda.style.fontFamily = '"Arial", sans-serif'; 
            celda.style.fontSize = '14px'; 
        });

        // Añadir el estilo del encabezado
        const encabezados = document.querySelectorAll('#vista-libros-tabla th');
        encabezados.forEach((encabezado) => {
            encabezado.style.backgroundColor = '#BB61F0'; 
            encabezado.style.color = '#1B1B1B'; 
            encabezado.style.padding = '15px 20px'; 
            encabezado.style.textAlign = 'center'; 
            encabezado.style.fontFamily = '"Arial", sans-serif'; 
            encabezado.style.fontSize = '16px'; 
            encabezado.style.fontWeight = 'bold';
        });
        
        //Añadimos cada fila
        tablaLibros.appendChild(fila);
    });
}

//FUNCIÓN para actualizar la tabla de lectores
function actualizarTablaLectores() {

    //Nos posicionamos en el tbody de la tabla lectores
    const tablaLectores = document.getElementById('comprobar-lectores-tabla').getElementsByTagName('tbody')[0];
    tablaLectores.innerHTML = ''; //Limpiar la tabla antes de actualizar

    //Por cada lector creamos una fila
    arrayLectores.forEach(lector => {
        const fila = document.createElement('tr');

        //Validación de formato de teléfono y email
        telefonoValido=validarTelefono(lector.telefono);
        emailValido=validarEmail(lector.email);

        //Creamos los campos de la fila
        fila.innerHTML = `
            <td>${lector.numSocio}</td>
            <td>${lector.nombre}</td>
            <td>${lector.apellido}</td>
            <td class="${telefonoValido ? '' : 'error'}">${lector.telefono}</td> 
            <td class="${emailValido ? '' : 'error'}">${lector.email}</td>
        `;//Si el telefono o el email no son validos, a esa celda se le asigna la clase .error

        //Añadir estilo a las celdas
        fila.querySelectorAll('td').forEach((celda, index) => {
            celda.style.backgroundColor = '#C398EB';
            celda.style.borderRadius = '8px'; 
            celda.style.outline = '1px solid #D1D1D1'; 
            celda.style.padding = '12px 18px'; 
            celda.style.textAlign = 'center'; 
            celda.style.fontFamily = '"Arial", sans-serif'; 
            celda.style.fontSize = '14px'; 
        });

        // Las celdas con la clase .error se ponen de diferente color de fondo 
        fila.querySelectorAll('.error').forEach(celda => {
            celda.style.backgroundColor = '#EA9E90';
        });

        //Añadir estilo a los encabezados
        const encabezados = document.querySelectorAll('#comprobar-lectores-tabla th');
        encabezados.forEach((encabezado, index) => {
            encabezado.style.backgroundColor = '#BB61F0';
            encabezado.style.color = '#1B1B1B'; 
            encabezado.style.padding = '15px 20px'; 
            encabezado.style.textAlign = 'center'; 
            encabezado.style.fontFamily = '"Arial", sans-serif'; 
            encabezado.style.fontSize = '16px'; 
            encabezado.style.fontWeight = 'bold';
            });
        tablaLectores.appendChild(fila); //Añadimos a la tabla la fila
    });
}

//BOTON "Actualizar Libros" evento "click" que llama a la funcion actualizarTablaLibros()
document.getElementById('vista-libros-boton').addEventListener('click', actualizarTablaLibros);

//BOTON "Actualizar Lectores" evento "click" que llama a la funcion actualizarTablaLectores()
document.getElementById('comprobar-lectores-boton').addEventListener('click', actualizarTablaLectores);

//BOTON "Alta" para dar de alta un libro, evento "click"
document.getElementById('alta-libro-boton').addEventListener('click', () => {

    //Limpiar cualquier mensaje previo
    const mensaje = document.getElementById('alta-libro-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los valores introducidos
    const isbn = document.getElementById('alta-libro-isbn').value;
    const autor = document.getElementById('alta-libro-autor').value;
    const titulo = document.getElementById('alta-libro-titulo').value;
    const editorial = document.getElementById('alta-libro-editorial').value;
    const ejemplares = document.getElementById('alta-libro-ejemplares').value;
    
    //Si la funcion altaLibro() devuelte false (no hay error)...
    if (!altaLibro(isbn,autor,titulo,editorial,ejemplares)) {

        //Limpiamos los campos
        document.getElementById('alta-libro-isbn').value = '';
        document.getElementById('alta-libro-autor').value = '';
        document.getElementById('alta-libro-titulo').value = '';
        document.getElementById('alta-libro-editorial').value = '';
        document.getElementById('alta-libro-ejemplares').value = '';
        texto="Añadido exitosamente"; //Asignamos mensaje de exito

    //Sino asignamos mensaje de error
    } else {
        texto="Error en los datos"; 
    }

    //Creamos elemento <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'alta-libro-mensaje';  //Asignamos un ID para manejarlo más tarde

    //Asignamos el texto al parrafo
    mensajeDiv.textContent = texto;

    //Color del mensaje
    mensajeDiv.style.color = 'red'; 

    //Añadimos el mensaje debajo del boton
    document.getElementById('alta-libro').appendChild(mensajeDiv);
});

//FUNCION para añadir un prestamo, evento "click"
document.getElementById('prestamo-boton').addEventListener('click', () => {
 
    //Limpiamos cualquier mensaje previo
    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los valores introducidos
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    //Si los valores no son nulos...
    if (numSocio && codLibro) {
        
        if(solicitudPrestamo(numSocio,codLibro)){ //Si la funcion solicitudPrestamo devuelve true
            texto="Solicitud realizada con exito"; //Asignamos mensaje de exito

        //Sino asignamos mensaje de error
        }else{
            texto="Solicitud erronea"; 
        }

    //Si los valores son nulos asignamos mensaje de error
    }else{
        texto="Solicitud erronea"; 
    }

    //Vaciamos los valores
    document.getElementById('devolucion-prestamo-socio').value = '';
    document.getElementById('devolucion-prestamo-libro').value = '';
    
    //Creamos un elemnto <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'prestamo-mensaje';  //Asignamos un ID para manejarlo más tarde

    //Asignamos el texto al párrafo
    mensajeDiv.textContent = texto;

    //Color del mensaje
    mensajeDiv.style.color = 'red'; 
 
    //Añadimos el mensaje debajo del boton
    document.getElementById('prestamo-boton').appendChild(mensajeDiv);
    
});

//BOTON para crear una devolucion, evento "click"
document.getElementById('devolucion-boton').addEventListener('click', () => {

    //Limpiar cualquier mensaje previo
    const mensaje = document.getElementById('prestamo-mensaje');
    if (mensaje) mensaje.remove();

    //Recogemos los valores introducidos
    const numSocio = document.getElementById('devolucion-prestamo-socio').value;
    const codLibro = document.getElementById('devolucion-prestamo-libro').value;

    //Si los valores no son nulos...
    if (numSocio && codLibro) {
        resultado=devolucionPrestamo(numSocio,codLibro);//Lamamos a la funcion devolucionPrestamo (devuelve un array)

        //Si resultado[0] (variable "error" tipo boolean) es falso
        if(!resultado[0]){ 
            texto="Solicitud realizada con exito: Numero de prestamo: "+resultado[1]+" Fecha devolucion: "+resultado[2]; //Asignamos mensaje de exito con resultado[1] ("numPrestamo") y resultado[2] ("fechaDevolucion")

        //Sino asignamos mensaje de error
        }else{
            texto="Solicitud erronea"; 
        }

    //Si los valores son nulos asignamos mensaje de error
    }else{
        texto="Solicitud erronea" 
    }

    //Limpiamos los campos
    document.getElementById('devolucion-prestamo-socio').value = '';
    document.getElementById('devolucion-prestamo-libro').value = '';

    //Creamos el elemeto <p>
    const mensajeDiv = document.createElement('p');
    mensajeDiv.id = 'prestamo-mensaje';  //Asignamos un ID para manejarlo más tarde

    //Asignamos el texto al párrafo
    mensajeDiv.textContent = texto;

    //Color del mensaje
    mensajeDiv.style.color = 'red'; 
   
    //Añadimos el mensaje debajo del boton
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

//OBJETO clasificacion
const clasificacion={
    pasillo : 7,
    estanteria : 4,
    estante : 6,

}

//Inicializamos los arrays de objetos Lector, Libro y Prestamos
arrayLectores=[];
arrayLibros=[];
arrayTotalPrestamos=[];
arrayPrestamosVivos=[];
numPrestamo=0;

//FUNCIÓN para validar el formato tanto del nombre como del apellido
function validarNombreApellido(texto) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(texto);
}

//FUNCIÓN para validar el teleéfono
function validarTelefono(telefono) {
    return /^[0-9]{9}$/.test(telefono);
}

//FUNCIÓN para validar el email
function validarEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|net|eu|org)$/.test(email);
}

//FUNCIÓN para valiadr el numero de socio
function validarNumSocio(numSocio){
    return /^[1-9][0-9]{2}$/.test(numSocio);
}

//FUNCION que da de alta un Lector, recibe los parametros con prompt, crea un objeto Lector y lo mete en el arrayLectores
function altaLector(){

    //Recibe los parametros
    let numSocio=prompt("Introduce numero de socio: ");
    let nombre=prompt("Introduce el nombre: ");
    let apellido=prompt("Introduce el apellido: ");
    let telefono=prompt("Introduce el telefono: ");
    let email=prompt("Introduce el email: ");

    //Si falta alguno muestra mensaje de error
    if(numSocio==null||nombre==null||apellido==null||telefono==null||email==null){
        console.log("F, falta algún dato");
    }else 
        //Si alguno no es valido muestra el mensaje de error pertinente
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
    }else 

    if(!validarTelefono(telefono)){
       console.log("V, el telefono tiene un formato incorrecto");
    }else{
    //Si todos son validos crea el objeto Lector y lo añade al arrayLectores
    let lector=new Lector(numSocio,nombre,apellido,telefono,email,false,null);
    arrayLectores.push(lector);
    console.log(numSocio);
    }
}


//FUNCIÓN para dar de baja un Lector
function bajaLector(){

    error=true; //Gestión de errores: No existe el usuario (true) || Se encuentra la relacion numSocio con un Lector (false)

    //Solicitamos el numero de socio
    numSocio=prompt("Introduce el numero de socio del lector a dar de baja");

    //Validamos que sea correcto el formato
    if(validarNumSocio(numSocio)){
        
        //Recorremos el array de Lectores
        arrayLectores.forEach(lector => {
            if(lector.numSocio==numSocio){ //Si coincide el numSocio introducido con el numSocio de algun Lector...
                lector.bajaLector=true; //Damos de baja
                lector.fechaBaja=new Date().toLocaleDateString(); //Asignamos fecha de baja
                error=false;
                console.log("Fecha de baja: "+lector.fechaBaja); 
            }
        });

    }else{ //Si no es valido el formato mostramos el error
        console.log("E, el numSocio no cumple con la validación")
    }
    if(error==true){ //Si el formato de numSocio es valido pero no existe mostramos el error
        console.log("E, el socio no existe");
    }
}

//FUNCION para modificar un atributo de un Lector
function modifLector(){

    error=true; //Gestión de errores: Si no existe el Lector (true) || Si el formato es valido pero no se encuentra relacion (false)

    //Solicitamos el numSocio del Lector
    numSocio=prompt("Introduce el numero de socio del lector para modificar");

    //Si es valido...
    if(validarNumSocio(numSocio)){
        //Recorremos el array de Lectores
        arrayLectores.forEach(lector => { 
             //Si encontramos relacion entre el numero solicitado y el numSocio de algun Lector...
            if(lector.numSocio==numSocio){

                atributo=prompt("Que dato desea modificar: "); //Solicitamos el atributo a modificar
                valor=prompt("Que valor nuevo desea introducir: "); //Solicitamos el nuevo valor

                //Si el atributo es "nombre" y el valor cumple con la validacion
                if(atributo=="nombre" && validarNombreApellido(valor)) { 

                    lector[atributo]=valor; //Asignamos nuevo valor

                //Si el atributo es "apellido" y el valor cumple con la validacion
                } else if(atributo=="apellido" && validarNombreApellido(valor)) {

                    lector[atributo]=valor; //Asignamos nuevo valor
                
                //Si el atributo es "telefono" y el valor cumple con la validacion
                } else if(atributo=="telefono" && validarTelefono(valor)) {

                    lector[atributo]=valor; //Asignamos nuevo valor

                //Si el atributo es "email" y el valor cumple con la validacion
                } else if(atributo=="email" && validarEmail(valor)) {

                    lector[atributo]=valor; //Asignamos nuevo valor

                //Si es otro atributo o no cumple la validacion mostramos mensaje de error
                }else{
                    console.log("El valor del "+atributo+" no cumple la validación")
                    error=false;
                }
            }
        });

    }else{ //Si el numero de socio no cumple la validacion muestra mensaje de error
        console.log("Numero de socio no cumple con la validación")
        error=false;
    }
    if(error==true){ //Si el fomato es valido pero no se encuentra la relacion con un Lector
        console.log("El numero de socio no existe");
    }
}


//FUNCIÓN que comprueba el formato de los email y devuelve un listado con los incorrectos
function comprobarEmails() {
    
    //Creamos el array de emails invalidos
    let emailsInvalidos = [];

    //Recorremos los lectores
    arrayLectores.forEach(lector => {
        
        let validacion = /^[^\s@]+@[^\s@]+\.(com|net|eu|org)$/i; //Patrón de validacion del email

        //Si no es valido
        if (!validacion.test(lector.email)) { 
            emailsInvalidos.push({ lector: lector.nombre, email: lector.email }); //Añadimos al array de invalidos
        }
    });

    //Si alguno es invalido los mostramos
    if (emailsInvalidos.length > 0) {
        console.log("Correos electrónicos no válidos:");
        console.log(emailsInvalidos);

    //Si todos son validos
    } else {
        console.log("Todos los correos electrónicos son válidos.");
    }
}


//FUNCIÓN que comprueba el formato de los telefonos y devuelve un listado con los incorrectos
function comprobarTelefonos(){
  
        //Creamos el array de emails invalidos
        let telefonosInvalidos = [];
    
        //Recorremos los lectores
        arrayLectores.forEach(lector => {
            
            let validacion = /^\d{9}$/; //Patrón de validacion del telefono
            
            //Si no es valido
            if (!validacion.test(lector.telefono)) {
                telefonosInvalidos.push({lector: lector.nombre, telefono: lector.telefono}); //Añadimos al array de invalidos
            }
        });
    
        //Si alguno es invalido los mostramos
        if (telefonosInvalidos.length > 0) {
            console.log("Teléfonos no válidos:");
            console.log(telefonosInvalidos);
            
        //Si todos son validos
        } else {
            console.log("Todos los teléfonos son válidos.");
        }
}

//FUNCION que valida el formato del autor
function validarAutor(autor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(autor);
}

//FUNCION que valida el formato del titulo
function validarTitulo(titulo) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9_\-¡!@#$%&/()¿?€.:,; ]+$/.test(titulo);
}

//FUNCION que valida el formato de la editorial
function validarEditorial(editorial) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30}( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]{1,30})?$/.test(editorial);
}

//FUNCION que valida el formato de los ejemplares (y maximo y minimo)
function validarEjemplares(ejemplares) {
    return /^[0-9]$/.test(ejemplares);
}

//FUNCION que valida el formato del isbn
function validarIsbn(isbn) {
    return /^\d{13}$/.test(isbn);
}

//FUNCIÓN que valida el codigo del libro
function validarCodLibro(codLibro){
    return /^[1-9][0-9]{3}$/.test(codLibro);
}


//FUNCION para dar de alta un Libro, recibe los parametros con prompt, crea un objeto Libro y lo mete en el arrayLibros
function altaLibro(isbn,autor,titulo,editorial,ejemplares){

    error=true;

    //Si ninguno de los parametros es null mostramos el error
    if(isbn==null||autor==null||titulo==null||editorial==null||ejemplares==null){
        console.log("F, falta algún dato");
    }else 
        //Si alguno no es valido muestra el mensaje de error pertinente
    if(!validarIsbn(isbn)){
        console.log("V, el isbn tiene un formato incorrecto")
    }else
    
    if(!validarAutor(autor)){
        console.log("V, el autor tiene un formato incorrecto")
    }else
    
    if(!validarTitulo(titulo)){
       console.log("V, el titulo tiene un formato incorrecto");
    }else 

    if(!validarEditorial(editorial)){
       console.log("V, el editorial tiene un formato incorrecto");
    }else

    if(!validarEjemplares(ejemplares)){
        console.log("V, los ejemplares tiene un formato incorrecto");
    }else{
    
    //Si todos son validos crea el objeto Lector y lo añade al arrayLectores
    error=false;
    codLibro = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    let libro=new Libro(codLibro,isbn,autor,titulo,editorial,ejemplares,false,null);
    arrayLibros.push(libro);
    console.log("Añadido con exito");
}
    return error; //Devolvemos error: (true) si se a realizado con exito || (false) Si hay algún error
};


//FUNCIÓN para dar de baja un libro
function bajaLibro(){

    error=true; //Gestion de errores: 
    codLibro=prompt("Introduce el codigo del libro a dar de baja"); //Solicitamos el codigo del Libro

    //Si el formato es valido...
    if(validarCodLibro(codLibro)){
        //Recorremos el array de Libros
    arrayLibros.forEach(libro => {
        //Si se encuentra relación entre el codigo del lector y el codigo solicitado...
        if(libro.codLibro==codLibro){
            libro.bajaLibro=true; //Se da de baja
            libro.fechaBaja=new Date().toLocaleDateString(); //Se asigna una fecha de baja
            error=false;
            console.log("El libro se ha dado de baja con exito");
        }
    });
    //Si el formato es invalido, mostramos mensaje de error
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

                    }else if(atributo=="autor" && validarAutor(valor)) {
    
                        libro[atributo]=valor;
                        error=false;

                        }else if(atributo=="titulo" && validarTitulo(valor)) {
    
                            libro[atributo]=valor;
                            error=false;

                            }else if(atributo=="editorial" && validarEditorial(valor)) {
    
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
    }else{
        console.log("No se pudo realizar el préstamo.");
        return false;
}
}

//
function devolucionPrestamo(numSocio,codLibro){
    error=true;
    num='';
    fecha='';
    for (const prestamo of arrayPrestamosVivos) {
        if(prestamo.numSocio==numSocio && prestamo.codLibro==codLibro){

            prestamo.fechaDevolucion = new Date().toLocaleDateString();
            num=prestamo.numPrestamo;
            fecha=prestamo.fechaDevolucion
            devolucionLibro(prestamo.codLibro);
            arrayPrestamosVivos = arrayPrestamosVivos.filter(prestamo => prestamo.numPrestamo != num);
            error=false;
            break;
        } 
    };

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