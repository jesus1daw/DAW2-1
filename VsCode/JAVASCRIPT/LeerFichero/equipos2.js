async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
    
    
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);
    console.log(contenido);
    mostrarContenido(contenido);


    const lineas = contenido.split('\r\n');
    sinDuplicados=new Set(lineas);
    sinDuplicados.delete("");
    arraySin=[...sinDuplicados];
    console.log(sinDuplicados);
    
    arrayM=[];
    arrayF=[];
    arrayPM=[];
    arrayDefM=[];
    arrayCM=[];
    arrayDM=[];
    arrayEquiposM=[];
    arrayReservasM=[];

    arraySin.forEach(lineaSin => {
        arrayLinea=lineaSin.split(";");
        if(arrayLinea[1]=="M"){
            arrayM.push(arrayLinea);

        } else if(arrayLinea[1]=="F"){
            arrayF.push(arrayLinea);
        }  
    });

    arrayM.forEach(jugador=> {
        if(jugador[3]=="Portero"){
            arrayPM.push(jugador); 
        }
        if(jugador[3]=="Defensa"){
            arrayDefM.push(jugador); 
        }
        if(jugador[3]=="Centro"){
            arrayCM.push(jugador); 
        }
        if(jugador[3]=="Delantero"){
            arrayDM.push(jugador); 
        }
    })

    while(arrayPM.length>=1&&arrayDefM.length>=4&&arrayCM.length>=3&&arrayDM.length>=3){
        equipo=[];
        equipo.push(arrayPM.pop());
        for(i=1;i<=4;i++){
            equipo.push(arrayDefM.pop());
        }
        for(i=1;i<=3;i++){
            equipo.push(arrayCM.pop());
        }
        for(i=1;i<=3;i++){
            equipo.push(arrayDM.pop());
        }
        arrayEquiposM.push(equipo);

    }
    function reservas(array){
    array.push(arrayPM);
    array.push(arrayDefM);
    array.push(arrayCM);
    array.push(arrayDM);
    return array;
    }

    arrayReservasM=reservas(arrayReservasM);
    console.log(arrayEquiposM);
    console.log(arrayReservasM);

    document.getElementById('contSinDuplicar').innerHTML = Array.from(sinDuplicados).join("\n");


}, false);










