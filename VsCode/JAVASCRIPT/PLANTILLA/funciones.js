function sumar(...arg) {
    suma=0;
    for (args of arg){
        suma+=args;
    }
     
    return suma;
    
}

console.log(sumar(5,7));
console.log(sumar(5,7,1,1));


arrayN=[7,5,4,2,8,1];

function quitarNumeros(array,...args){
    for (arg of args) {
        for(i=0;i<=array.length;i++){
            if(arg==array[i]){
                array.splice(i,1);
            }
        
        }
        
    }
    return array;
}

console.log(quitarNumeros(arrayN,5,7));