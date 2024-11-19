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
    // console.log(contenido);
    // mostrarContenido(contenido);


    tiempo=Date.now();
    console.log(tiempo);

    contador=0;
    
    //Limpiamos contenido duplicado y lineas vacias\\
    const lineas = contenido.split('\r\n');
    sinDuplicados=new Set(lineas);
    sinDuplicados.delete("");
    arraySin=[...sinDuplicados];
    console.log(sinDuplicados);
    
    while(contador<10000){
    //Declaramos los arrays necesarios
    arrayM=[];
    arrayF=[];
    arrayP=[];
    arrayDef=[];
    arrayC=[];
    arrayD=[];
    arrayEquipos=[];
    arrayReservas=[];

    //Separamos el contenido total en dos arrays Masculino y Femenino\\
    arraySin.forEach(lineaSin => {
        arrayLinea=lineaSin.split(";");
            if(arrayLinea[1]=="M"){
                arrayM.push(arrayLinea);

            } else if(arrayLinea[1]=="F"){
                arrayF.push(arrayLinea);
            }  
    });

    //Ejecutamos las funciones y visualizamos el resultado\\
    dividirPosiciones(arrayM);
    crearEquipos();
    arrayReservas=reservas(arrayReservas);
    dividirPosiciones(arrayF);
    crearEquipos();
    arrayReservas=reservas(arrayReservas);
    // console.log(arrayEquipos);
    // console.log(arrayReservas);
    
    //FUNCION que divide un array que de jugadores que introduzcamos por posiciones.
    //Rellena los arrays y no devuelve nada.
    function dividirPosiciones(array){
        array.forEach(jugador=> {
            if(jugador[3]=="Portero"){
                arrayP.push(jugador); 
            }
            if(jugador[3]=="Defensa"){
                arrayDef.push(jugador); 
            }
            if(jugador[3]=="Centro"){
                arrayC.push(jugador); 
            }
            if(jugador[3]=="Delantero"){
                arrayD.push(jugador); 
            }
        })
    }

    //FUNCION que crea los equipos con las especificaciones indicadas
    //Ni parametros de entrada ni de salida. 
    function crearEquipos(){
        while(arrayP.length>=1&&arrayDef.length>=4&&arrayC.length>=3&&arrayD.length>=3){
            equipo=[];
            equipo.push(arrayP.pop());
                for(i=1;i<=4;i++){
                    equipo.push(arrayDef.pop());
                }
                for(i=1;i<=3;i++){
                    equipo.push(arrayC.pop());
                }
                for(i=1;i<=3;i++){
                    equipo.push(arrayD.pop());
                }
            arrayEquipos.push(equipo);
        }
    }   

    //FUNCION que rellena el array de reservas con los jugadores sobrantes.
    function reservas(array){
        while((arrayP.length>0)||(arrayDef.length>0)||(arrayC.length>0)||(arrayD.length>0)){
            if(arrayP.length>0){
                array.push(arrayP.pop());
            }
            if(arrayDef.length>0){
                array.push(arrayDef.pop());
            }
            if(arrayC.length>0){
                array.push(arrayC.pop());
            }
            if(arrayD.length>0){
                array.push(arrayD.pop());
            }
        }
        return array;
    }


    contador=contador+1;
}

    tiempo2=Date.now();
    console.log(tiempo2);
    console.log("Diferencia de tiempo en segundos: " +(tiempo2-tiempo)*0.001);
    

}, false);