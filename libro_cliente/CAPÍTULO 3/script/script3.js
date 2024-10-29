var texto = document.getElementById('texto');


var btnEnviar = document.getElementById('btnEnviar');
btnEnviar.addEventListener("click", calculo, false);

function calculo(){

 var frase = document.getElementById('frase').value;
 var palabra = document.getElementById('palabra').value;


 if(frase.lastIndexOf(palabra) == -1){
     texto.innerHTML = "No hay Coincidencias";
 }else{
     texto.innerHTML = "Posicion " + (frase.lastIndexOf(palabra) +1);
   }

}
