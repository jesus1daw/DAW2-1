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

document.getElementById('file-inputLector').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);
    // console.log(contenido);
    // mostrarContenido(contenido);

    const lineas = contenido.split('\r\n');
    sinDuplicados=new Set(lineas);
    sinDuplicados.delete("");
    arraySin=[...sinDuplicados];
    console.log(sinDuplicados);

    arraySin.forEach(lineaSin => {
        arrayLinea=lineaSin.split(",");
        if(arrayLinea[0]!="numSocio"){
            let lector=new Lector(arrayLinea[0],arrayLinea[1],arrayLinea[2],arrayLinea[3],arrayLinea[4],false,null);
            arrayLectores.push(lector);
        }
    });

    document.getElementById('file-inputLibro').addEventListener('change', async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) {
            return;
        }
        const contenido = await leerArchivo(archivo);
        // console.log(contenido);
        // mostrarContenido(contenido);
    
        const lineas = contenido.split('\r\n');
        sinDuplicados=new Set(lineas);
        sinDuplicados.delete("");
        arraySin=[...sinDuplicados];
        console.log(sinDuplicados);
    
        arraySin.forEach(lineaSin => {
            arrayLinea=lineaSin.split(",");
            if(arrayLinea[0]!="codLibro"){
                let libro=new Libro(arrayLinea[0],arrayLinea[1],arrayLinea[2],arrayLinea[3],arrayLinea[4],arrayLinea[5],false,null);
                arrayLibros.push(libro);
            }
    
        });





        console.log(arrayLectores);
        console.log(arrayLibros);
        
        // comprobarEmails();
        // comprobarTelefonos();
        // solicitudPrestamo();
        // solicitudPrestamo();
        // devolucionPrestamo();

        // listadoTotalPrestamos();
        // listadoPrestamosVivos();
        



    }, false);

}, false);





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

function validarEmail(email){
    valido=false;
    let validacion = /^[^\s@]+@[^\s@]+\.(com|net|eu|org)$/i;
    if(validacion.test(email)){
        valido=true;
    }

    return valido;
}
function validarTelefono(telefono){
    valido=false;

    let validacion = /^\d{9}$/; 
    if(validacion.test(telefono)){
        valido=true;
    }

    return valido;
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
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            lector.bajaLector=true;
            lector.fechaBaja=new Date().toLocaleDateString();
            error=false;
        }
    });
    if(error==true){
        console.log("El socio no existe");
    }
}

//
function modifLector(){
    error=true;
    numSocio=prompt("Introduce el numero de socio del lector para modificar");
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");
            lector[atributo]=valor;
            error=false;
        }
    });
    if(error==true){
        console.log("El socio no existe");
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

//FUNCION altaLibro() recibe los parametros con prompt, crea un objeto Libro y lo mete en el arrayLibros
function altaLibro(){

    let codLibro=prompt("Introduce el codigo del libro: ");
    let isbn=prompt("Introduce el isbn: ");
    let autor=prompt("Introduce el autor: ");
    let titulo=prompt("Introduce el titulo: ");
    let editorial=prompt("Introduce la editorial: ");
    let ejemplares=prompt("Introduce el numero de ejemplares: ");
    let libro=new Libro(codLibro,isbn,autor,titulo,editorial,ejemplares,false,null);
    arrayLibros.push(libro);

}

//
function bajaLibro(){

    error=true;
    codLibro=prompt("Introduce el codigo del libro a dar de baja");
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            libro.bajaLibro=true;
            libro.fechaBaja=new Date().toLocaleDateString();
            error=false;
        }
    });
    if(error==true){
        console.log("El libro no existe");
    }

}

//
function modifLibro(){

    error=true;
    codLibro=prompt("Introduce el codigo del libro para modificar");
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");
            libro[atributo]=valor;
            error=false;
        }
    });
    if(error==true){
        console.log("El libro no existe");
    }
}

//
function hayLibro(){

    error=true;
    atributo=prompt("Indica si buscar por isbn, autor o titulo: ");
    valor=prompt("Introduce el valor:");
    arrayLibros.forEach(libro => {
        if(libro[atributo]==valor){
            console.log("ISBN: "+libro.isbn+" AUTOR: "+libro.autor+" TITULO: "+
                        libro.titulo+" EJEMPLARES: "+libro.ejemplares);
            error=false;
            
        }else{
            
        }
    });
    if(error==true){
    console.log("No se a encontrado ningun libro")
    }
}

//
function prestamoLibro(){
    
    error=true;
    codLibro=prompt("Introduce el codigo de libro para hacer un prestamo: ");
    
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro && libro.ejemplares>=1){
            
            libro.ejemplares=parseInt(libro.ejemplares)-1;
            console.log("Prestado");
            error=false;
        }
    });
    if(error==true){
        console.log("Libro no encontrado o no existe");
    }

    return [error,codLibro];
}

//
function devolucionLibro(codLibro){
    error=true;
    if(codLibro==null){
    codLibro=prompt("Introduce el codigo de libro para devolver un prestamo: ");
    }
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            
            libro.ejemplares=parseInt(libro.ejemplares)+1;
            console.log("Devuelto");
            error=false;
        }
    });
    if(error==true){
        console.log("Libro no encontrado o no existe");
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
function solicitudPrestamo(){
    
    let numSocio=prompt("Introduce tu numero de socio para hacer un prestamo");
    
    let verifPrestamo=prestamoLibro();
    if(verifPrestamo[0]==false){
        numPrestamo++;
        let prestamo=new Prestamo(numPrestamo,numSocio,verifPrestamo[1],new Date().toLocaleDateString(),null);
        arrayTotalPrestamos.push(prestamo);
        arrayPrestamosVivos.push(prestamo); 
    }else{
        console.log("Libro no existente o sin existencias");
    }
}

//
function devolucionPrestamo(){
    error=true;
    let numPrestamo=prompt("Introduce el numero de prestamo a devolver");

    arrayPrestamosVivos.forEach(prestamo =>{
        if(prestamo.numPrestamo==numPrestamo){

            prestamo.fechaDevolucion = new Date().toLocaleDateString();
            devolucionLibro(prestamo.codLibro);
            arrayPrestamosVivos = arrayPrestamosVivos.filter(prestamo => prestamo.numPrestamo != numPrestamo);
            error=false;

        } 
    });

    if(error==true){
            console.log("Número de préstamo no encontrado.");
    }

}

//
function listadoTotalPrestamos(){

    console.log(arrayTotalPrestamos);
}

//
function listadoPrestamosVivos(){

    console.log(arrayPrestamosVivos);
}
