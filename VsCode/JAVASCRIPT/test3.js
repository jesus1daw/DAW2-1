color=prompt("Cual es tu color preferido: ");

numero=parseInt(color,16);

console.log("Hexadecimal: " + numero.toString(16));
console.log("Decimal: " + numero.toString(10));
console.log("Octal: " + numero.toString(8));
console.log("Binario: " + numero.toString(2));

console.log(typeof numero);
