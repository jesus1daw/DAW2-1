
productos=["36,66€","7,55€","12,56€","20,12€","6,5€","3,0€"];
productosN=[];
total=0;
fecha=new Date();
const letras="TRWAGMYFPDXBNJZSQVHLCKE";


nombre=prompt("Introduce tu nombre: ");
dni=prompt("Introduce el dni");
console.log(verificarDNI(dni));

function verificarDNI(dni){
    if(dni.length=8){

    resto=dni%23;
    letra=letras[resto];
    return dni+letra;

    } else if(dni.length=9){
        dniN=dni.pareseInt();
        resto=dniN%23;
        letra=letras[resto];
        if(letra=dniN[8]){
            console.log("dni valido");

        } else{
            console.log("dni no valido");

        }
        return 0;

    }

    
    
   




}












//BUCLE que recorre el array pasando los valores a numericos
//y sumandolos al precio total
for(i=0;i<productos.length;i++){

    numero=pasarNumero(productos[i]);
    productosN[i]=numero;
    total=total+numero;

}
 console.log(total);

//Aplicas descuento
total=total-descuento(productosN);
console.log(total);


//Muestras por pantalla
document.getElementById("fecha").innerHTML="Fecha "+fecha.getFullYear()+"-"+fecha.getDay()+"-"+fecha.getMonth()+"<br> Hora "+ fecha.getHours()+":"+fecha.getMinutes();
document.getElementById("total").innerHTML=pasarCadena(total);
document.getElementById("precio1").innerHTML=productos[0];
document.getElementById("precio2").innerHTML=productos[1];
document.getElementById("precio3").innerHTML=productos[2];
document.getElementById("precio4").innerHTML=productos[3];
document.getElementById("precio5").innerHTML=productos[4];
document.getElementById("precio6").innerHTML=productos[5];
if(descuento(productosN)==0){
    document.getElementById("descuento").innerHTML="No se aplica descuento";
} else{
    document.getElementById("descuento").innerHTML="Descuento aplicado de "+
    pasarCadena(descuento(productosN));
}






//FUNCIONES

//Funcion descuento: Recoge un array y devuelve el menor valor del array
function descuento(productosN){
    if(productosN.length>=5){
        minimo=Math.min(...productosN);
        return minimo;
    }
    else {
        return 0.0;
    }
}

//Funcion pasarNumero: Recoge una cadena y la pasa a numerico
function pasarNumero(cadena){
    numero=cadena.replace(',','.');
    numero=parseFloat(numero);
    return numero;
}

//Funcion pasarCadena: Recoge un numero y lo pasa a cadena
function pasarCadena(num){
    cadena=num+"€";
    cadena=cadena.replace('.',',');
    return cadena;
}




