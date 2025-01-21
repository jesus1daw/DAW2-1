function Lector(numSocio,nombre,apellido,telefono,email,bajaLector,fechaBaja){

    this.numSocio=numSocio;
    this.nombre=nombre;
    this.apellido=apellido;
    this.telefono=telefono;
    this.email=email;
    this.bajaLector=bajaLector;
    this.fechaBaja=fechaBaja;
    

};

function Libro(codLibro,isbn,autor,titulo,editorial,ejemplares){

    this.codLibro=codLibro;
    this.isbn=isbn;
    this.autor=autor;
    this.titulo=titulo;
    this.editorial=editorial;
    this.ejemplares=ejemplares;

};

function Prestamo(numPrestamo,numSocio,codLibro,fechaPrestamo,fechaDevolucion){

    this.numPrestamo=numPrestamo;
    this.numSocio=numSocio;
    this.codLibro=codLibro;
    this.fechaPrestamo=fechaPrestamo;
    this.fechaDevolucion=fechaDevolucion;

};

arrayLectores=[];

function altaLector(){

    let numSocio=prompt("Introduce numero de socio: ");
    let nombre=prompt("Introduce el nombre: ");
    let apellido=prompt("Introduce el apellido: ");
    let telefono=prompt("Introduce el telefono: ");
    let email=prompt("Introduce el email: ");
    let lector=new Lector(numSocio,nombre,apellido,telefono,email,false,null);
    arrayLectores.push(lector);

}

function bajaLector(){

    numSocio=prompt("Introduce el numero de socio del lector a dar de baja");
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            lector.bajaLector=true;
            lector.fechaBaja=Date.now();
        }
    });

}


function modifLector(){

    numSocio=prompt("Introduce el numero de socio del lector para modificar");
    arrayLectores.forEach(lector => {
        if(lector.numSocio==numSocio){
            atributo=prompt("Que dato desea modificar: ");
            valor=prompt("Que valor nuevo desea introducir: ");
            lector[`${atributo}`]==valor;
        }
    });
}

altaLector();

modifLector();

console.log(arrayLectores);



