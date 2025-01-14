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

function Viaje(origen,destino,duracion,pais,precio){
    this.origen=origen;
    this.destino=destino;
    this.duracion=duracion;
    this.pais=pais;
    this.precio=precio;
}

const mallorca= new Viaje("Madrid","Mallorca","10 dias","España",100.0);
const londres= new Viaje("Madrid","Londres","5 dias","UK",150.0);
const Burgos= new Viaje("Madrid","Burgos","8 dias","España");
const toledo= new Viaje("Madrid","Toledo","2 dias","España",74.89);

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


const cliente1=new Cliente("Jesus","Villaverde","Madrid","","84569345");


for (const key in cliente1) {
   
    if(typeof cliente1[key]!="function"){
        console.log(key+ " es " + cliente1[key]);
    }
    
}
console.log(cliente1.contratado());




const cliente2=new Cliente("Ivan","Soria","Madrid",Burgos,"84569345");

console.log(cliente2);
console.log(cliente2.contratado());
console.log("Duracion: "+cliente2.miViaje.duracion);

Burgos.precio=(49.99);
Burgos.descuento=(0.2);
Burgos.precioFinal=((Burgos.precio)*(1-Burgos.descuento));


const cliente3=new Cliente("Khaled","Beno","Marruecos",mallorca,"8646594");
const cliente4=new Cliente("Isaac","Ingles","Irlanda",londres,"3647433");


const arrayClientes=[
    cliente1,
    cliente2,
    cliente3,
    cliente4
];

console.log(arrayClientes);

const arrayViajes=[
    mallorca,
    londres,
    Burgos,
    toledo
];
console.log(arrayViajes);


ingresosClientes=0;
arrayClientes.forEach(cliente => {
    
    if(cliente.contratado()=="No tiene viaje contratado"){
        console.log("Cliente sin viaje:");
        console.log(cliente);

    } else{
        ingresosClientes+=cliente.miViaje.precio;
    }
});

console.log("Los ingresos totales por parte de los clientes son: " +ingresosClientes);