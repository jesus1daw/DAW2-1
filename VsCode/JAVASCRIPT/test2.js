let a =7;
console.log("a: vale " + a);
let b = 4;
console.log("Suma de a y b: "+ (a+b)); //11
console.log("Suma de a y b: ", a+b); //11
console.log("Suma de a y b: "+ a+b); // 74
console.log(typeof a);
h="pepe";
console.log(typeof h);
l=false;
console.log(typeof l);
a=0x27; //Hexadecimal
console.log(a);
a=0o27; //Octal
console.log(a);
a=0b1001101; //Binario
console.log(a);
color=0xFFFFFF;  //Hexadecimal color
console.log(color); 
console.log(color.toString(16)); //Color : FFFFFF
console.log(color.toString(2)); //Binario :111111...
console.log("7"==7); //TRUE Valor
console.log("7"===7); //FALSE Tipo
respuesta=prompt("Color: "); //Preguntar color
console.log(typeof respuesta); //tipo
console.log(respuesta);
respuestaInt=parseInt(respuesta,16); //Pasar string a numerico
console.log(respuestaInt);
console.log(respuestaInt.toString(2));
respuesta=prompt("escribe digitos");
console.log(typeof respuesta);
numero=parseInt(respuesta,10);
console.log(numero);
numero2=Number(respuesta);
console.log(numero2);
numero=parseInt(respuesta,16);
console.log(numero);
numero2=Number(respuesta);
console.log(numero2);
