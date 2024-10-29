palabras=prompt("Introduce varias palabras");
arrayPal=palabras.split(",");
console.log(arrayPal.sort((a,b) => a.localeCompare(b)));
console.log(arrayPal.reverse());
