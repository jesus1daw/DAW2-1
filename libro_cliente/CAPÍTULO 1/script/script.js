var btn = document.getElementById('miimagen');
btn.addEventListener("click", cambiaIMG, false);

function cambiaIMG(){

 var imagen = document.getElementById('imagen');

 if(imagen.src.match("a.jpg")){
   imagen.src = "./img/b.jpg";
 }else if(imagen.src.match("b.jpg")){
   imagen.src = "./img/c.jpg"
 }else if(imagen.src.match("c.jpg")){
   imagen.src = "./img/d.jpg"
 }else{
   imagen.src = "./img/a.jpg"
 }

}
