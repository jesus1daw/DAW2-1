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
    arrayA=[];
    arrayB=[];
    arrayC=[];

    arraySin.forEach(lineaSin => {
        arrayLinea=lineaSin.split(";");
        if(arrayLinea[1]=="M"){
            arrayM.push(
                arrayLinea);

        } else if(arrayLinea[1]=="F"){
            arrayF.push(arrayLinea);
        }
        if(arrayLinea[4]=="A"){
            arrayA.push(arrayLinea);

        } else if(arrayLinea[4]=="B"){
            arrayB.push(arrayLinea);
        
        } else if(arrayLinea[4]=="C"){
            arrayC.push(arrayLinea);
        }
        
    });


    arrayA.forEach(linea => {
        //arrayLinea=linea.split(";");
        if(arrayLinea[1]=="F"){
            arrayA.pop(linea);
        }


    });

    console.log(arrayM);
    console.log(arrayF);
    console.log(arrayA);
    console.log(arrayB);
    console.log(arrayC);
    document.getElementById('contSinDuplicar').innerHTML = Array.from(sinDuplicados).join("\n");


}, false);













