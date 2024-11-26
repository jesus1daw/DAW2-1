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
    console.log(arraySin);

    nombre=prompt("Introduce el nombre del perro");
  
    padres=ascendencia(nombre);
    console.log("Nombre del perro: "+nombre)
    console.log("Padre: " + (padres[0] ?? "desconocido"));
    console.log("Madre: "+ (padres[1] ?? "desconocido"));
    
    padres2=ascendencia(padre);
    console.log("AbueloP: "+ (padres2[0] ?? "desconocido"));
    console.log("AbuelaP: "+ (padres2[1] ?? "desconocido"));
    
    padres3=ascendencia(padres[1]);
    console.log("AbueloM: "+ (padres3[0] ?? "desconocido"));
    console.log("AbuelaM: "+ (padres3[1] ?? "desconocido"));

    console.log("Hijos: " + padres[2]);
    
    function ascendencia(perro){
        padre=null;
        madre=null;
        hijos=[];
        arraySin.forEach(linea => {
            arrayLinea=linea.split(";");
            indice=arrayLinea.indexOf(perro);
            if(indice>=2){
                padre=arrayLinea[0];
                madre=arrayLinea[1];
            }
            if(indice<2&&indice>=0){
                for(i=2;i<arrayLinea.length;i++){
                    hijos.push(arrayLinea[i]);
                }
                hijosLimpio=new Set(hijos);
                hijosLimpio.delete("");
                hijos2=[...hijosLimpio];
            }
        });

        return [padre,madre,hijos2];
    }





    // arraySin.forEach(linea => {
    //     arrayLinea=linea.split(";");
    //     if(arrayLinea[3]==nombre||arrayLinea[4]==nombre||arrayLinea[5]==nombre||arrayLinea[6]==nombre){
    //         padre=arrayLinea[0];
    //         madre=arrayLinea[1];
    //     }
    // });
    //     arraySin.forEach(linea => {
    //         arrayLinea=linea.split(";");
    //     if(arrayLinea[2]==padre||arrayLinea[3]==padre||arrayLinea[4]==padre||arrayLinea[5]==padre||arrayLinea[6]==padre){
    //         abueloP=arrayLinea[0];
    //         abuelaP=arrayLinea[1];
    //     }
    //     if(arrayLinea[2]==madre||arrayLinea[3]==madre||arrayLinea[4]==madre||arrayLinea[5]==madre||arrayLinea[6]==madre){
    //         abueloM=arrayLinea[0];
    //         abuelaM=arrayLinea[1];
    //     }
    // });
            

            
        

    


    

    // console.log("Nombre del perrro: " + nombre);
    // console.log("Padre: " + padre);
    // console.log("Madre: " + madre);
    // console.log("Abuelo Paterno: " + abueloP);
    // console.log("Abuela Paterna: " + abuelaP);
    // console.log("Abuelo Materno: " + abueloM);
    // console.log("Abuela Materna: " + abuelaM);








}, false);