var blur = document.getElementById('blur')
var out = document.getElementById('out');
var over = document.getElementById('over');

blur.addEventListener("blur", function(){
 alert("Me has quitado el foco: blur");
});

out.addEventListener("mouseout", function(){
 alert("Ratón Fuera!: mouseout");
});

over.addEventListener("mouseover", function(){
 alert("Has entrado en mi campo de visión!: mouseover");
});
