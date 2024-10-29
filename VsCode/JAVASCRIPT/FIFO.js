fifo=[];

do {

operacion=prompt("Introduce 'a' para añadir, 'q' para quitar, o 'FIN' para finalizar ");

if(operacion=="a"){

    nuevo=(prompt("Introduce nuevo elemento"));
    fifo.unshift(nuevo);
    console.log(fifo);
    console.log("Numero de elementos: "+ fifo.length);
    console.log("Elemento añadido: "+nuevo);
    
}else if(operacion=="q"){

    console.log("Elemento quitado: " + fifo.pop());
    console.log(fifo);
    console.log("Numero de elementos: " + fifo.length);
    
} else if(operacion!="FIN"){

    console.log("Error: Solo puedes introducir 'q' 'a' 'FIN' ");

}

} while (operacion!="FIN");

document.getElementById("pila").innerHTML="La pila final es: ["+fifo+"]";
document.getElementById("tamano").innerHTML="El tamaño final es "+fifo.length;