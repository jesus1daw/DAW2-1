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


    console.log(sinDuplicados);
    console.log(lineas);
    console.log(contenido);
    document.getElementById('contSinDuplicar').innerHTML = Array.from(sinDuplicados).join("\n");


}, false);













/*const lineas = contenido.split('\n');
sinD=new Set([]);
lineas.forEach(linea => {
    sinD.add(linea);
});

console.log(sinD);
console.log(lineas);*/
