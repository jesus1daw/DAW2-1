var boton = document.getElementById('boton');
boton.addEventListener("click", operador, false);

function operador() {

 var texto = document.getElementById('texto').value;

 texto < 100 ? alert("Numero menor que 100"): alert("Numero Mayor que 100");

}
