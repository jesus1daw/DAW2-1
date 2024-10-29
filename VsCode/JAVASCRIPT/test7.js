fechas=prompt("Introduce dias");
arrayFechas=fechas.split(",");
arrayFechas.sort(function(a, b){return a - b});
arrayOrdenadoR=arrayFechas.toReversed();
console.log(arrayFechas);
console.log(arrayOrdenadoR);
ahora=new Date();
console.log(typeof(ahora))
console.log(ahora.getDate());
console.log(typeof(ahora.getDate()));
console.log(typeof(arrayFechas[0]));

if(arrayFechas.includes(ahora.getDate().toString())){
    console.log("Es tu cumpleaños")
}else{
    console.log("No coincide")
}


