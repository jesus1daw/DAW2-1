
let promesa=new Promise(function(resolve,reject){

let random=Math.floor(Math.random()*6)+1;
    console.log("Numero: "+random)

if(random%2==0){

    resolve("El numero es par");

} else{

   reject("El numero es impar");

}
});

promesa.then(

    function(value) {console.log(value)},
    function(error) {console.log(error)} 

);