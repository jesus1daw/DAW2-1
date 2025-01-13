const cliente={
    nombre:"Jesus",
    apellido:"Villaverde",
    telefono:"650883881",
    ciudad:"Madrid"
};

const viaje={
    origen:"Madrid",
    destino:"Paris",
    duracion:"7 dias",
    pais:"Francia",
    trayecto: function(){
        return this.origen+"-"+this.destino;
    }
};

// function trayecto(viaje){
//     console.log(viaje.origen+"-"+viaje.destino);
// }
// trayecto(viaje);

for (const key in viaje) {
   
    if(typeof viaje[key]!="function"){
        console.log(key+ " es " + viaje[key]);
    }
    
}
console.log(viaje.trayecto());
console.log("-----------");

function Viaje(origen,destino,duracion,pais){
    this.origen=origen;
    this.destino=destino;
    this.duracion=duracion;
    this.pais=pais;
}

const mallorca= new Viaje("Madrid","Mallorca","10 dias","España");
const londres= new Viaje("Madrid","Londres","5 dias","UK");
const Burgos= new Viaje("Madrid","Burgos","8 dias","España");
const toledo= new Viaje("Madrid","Toledo","2 dias","España");

delete(toledo.pais); 
toledo.pais="España";

for (const key in toledo) {
   
    if(typeof toledo[key]!="function"){
        console.log(key+ " es " + toledo[key]);
    }
    
}

console.log("-----------");


function Cliente(nombre,apellido,ciudad,miViaje,telefono){
    this.nombre=nombre;
    this.apellido=apellido;
    this.ciudad=ciudad;
    this.miViaje=miViaje;
    this.telefono=telefono;
    this.contratado=function(){
        if(miViaje==""){
            return "No tiene viaje contratado";
        } else{
            return miViaje;
        }
    }

}


const cliente1=new Cliente("Jesus","Villaverde","Madrid","Francia","84569345");


for (const key in cliente1) {
   
    if(typeof cliente1[key]!="function"){
        console.log(key+ " es " + cliente1[key]);
    }
    
}
console.log(cliente1.contratado());




const cliente2=new Cliente("Jesus","Villaverde","Madrid",Burgos,"84569345");

console.log("Duracion: "+cliente2.miViaje.duracion);