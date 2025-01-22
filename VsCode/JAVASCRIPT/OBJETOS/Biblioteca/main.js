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
            let lector=new Lector(arrayLinea[0],arrayLinea[1],arrayLinea[2],arrayLinea[3],arrayLinea[4],false,null);
            arrayLectores.push(lector);

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
                let libro=new Libro(arrayLinea[0],arrayLinea[1],arrayLinea[2],arrayLinea[3],arrayLinea[4],arrayLinea[5],false,null);
                arrayLibros.push(libro);
    
        });





        console.log(arrayLectores);
        console.log(arrayLibros);

        









    }, false);

}, false);






function Lector(numSocio,nombre,apellido,telefono,email,bajaLector,fechaBaja){

    this.numSocio=numSocio;
    this.nombre=nombre;
    this.apellido=apellido;
    this.telefono=telefono;
    this.email=email;
    this.bajaLector=bajaLector;
    this.fechaBaja=fechaBaja;
    

};

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

function Prestamo(numPrestamo,numSocio,codLibro,fechaPrestamo,fechaDevolucion){

    this.numPrestamo=numPrestamo;
    this.numSocio=numSocio;
    this.codLibro=codLibro;
    this.fechaPrestamo=fechaPrestamo;
    this.fechaDevolucion=fechaDevolucion;

};

arrayLectores=[];
arrayLibros=[];

//
function altaLector(){

    let numSocio=prompt("Introduce numero de socio: ");
    let nombre=prompt("Introduce el nombre: ");
    let apellido=prompt("Introduce el apellido: ");
    let telefono=prompt("Introduce el telefono: ");
    let email=prompt("Introduce el email: ");
    let lector=new Lector(numSocio,nombre,apellido,telefono,email,false,null);
    arrayLectores.push(lector);

}
//
function bajaLector(){

    numSocio=prompt("Introduce el numero de socio del lector a dar de baja");
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            lector.bajaLector=true;
            lector.fechaBaja=Date.now();
        }
    });

}
//
function modifLector(){

    numSocio=prompt("Introduce el numero de socio del lector para modificar");
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");
            lector[atributo]=valor;
        }
    });
}
//
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

    codLibro=prompt("Introduce el codigo del libro a dar de baja");
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            libro.bajaLibro=true;
            libro.fechaBaja=Date.now();
        }
    });

}
//
function modifLibro(){

    codLibro=prompt("Introduce el codigo del libro para modificar");
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");
            libro[atributo]=valor;
        }
    });
}
//
function hayLibro(){
    atributo=prompt("Indica si buscar por isbn, autor o titulo: ");
    valor=prompt("Introduce el valor:");
    arrayLibros.forEach(libro => {
        if(libro[atributo]==valor){
            console.log("ISBN: "+libro.isbn+" AUTOR: "+libro.autor+" TITULO: "+
                        libro.titulo+" EJEMPLARES: "+libro.ejemplares);

            
        }else{
            console.log("No se a encontrado ningun libro")
        }
    });

}

function prestamoLibro(){

    codLibro=prompt("Introduce el codigo de libro para hacer un prestamo: ");
    arrayLibros.forEach(libro => {
        if(libro.codLibro==codLibro && libro.ejemplares>=1){
            

            
        }else{
           console.log("Libro no existente o no disponible");
        }
    });

}







