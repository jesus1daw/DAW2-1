var boton = document.getElementById('calcular');
boton.addEventListener("click", calculo, false);

function calculo(){

 var radio = document.getElementById('radio').value;

 document.getElementById('area').innerHTML = Math.PI * radio * radio + " area";
 document.getElementById('longitud').innerHTML = 2 * Math.PI * radio + " longitud";

}
