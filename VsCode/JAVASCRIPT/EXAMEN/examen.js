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
    // mostrarContenido(contenido);


     textoTotal = contenido.split('&&&&&;;;;;\r\n');
    console.log(textoTotal);


    lista1=textoTotal[0];
    console.log(lista1);
    lista2=textoTotal[1];
    console.log(lista2);
    lista3=textoTotal[2];
    console.log(lista3);

    // lista3N = lista3.split('\r\n');
    // sinDuplicados=new Set(lista3N);
    // sinDuplicados.delete("");
    // arrayLista3=[...sinDuplicados];
    // console.log(arrayLista3);

    lista1N = lista1.split('\r\n');
    sinDuplicados=new Set(lista1N);
    sinDuplicados.delete("");
    arrayLista1=[...sinDuplicados];
    console.log(arrayLista1);

    // listaNueva=[];
    // fecha=new Date();
    // dia=fecha.getDate();
    // mes=fecha.getMonth();

    listaSeparada=[];
    arrayLista1.forEach(linea =>{

        arrayLinea=linea.split(",");
        arrayLinea2=arrayLinea[0].split("–");
        
        listaSeparada.push(arrayLinea2.concat(arrayLinea));


    });
    console.log(listaSeparada);



    
//    arrayLista3.forEach(linea => {

//         diasResult=0;

//         arrayLinea=linea.split(";");
//         fechaCompra=arrayLinea[2].toString();
//         diaCompra=fechaCompra.slice(0,2);
//         mesCompra=fechaCompra.slice(3,5);
//         diaCompraN=parseInt(diaCompra);
//         mesCompraN=parseInt(mesCompra);
//         if(mesCompraN==mes+1){
//             diasResult=10-diaCompraN;
            
//         }else{
//             diasResult=(31-diaCompraN)+10;
            
//         }
//         arrayLinea.push(diasResult);
//         listaNueva.push(arrayLinea);
        
//    });


//    console.log(listaNueva);








}, false);