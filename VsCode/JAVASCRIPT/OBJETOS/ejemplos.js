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
const burgos= new Viaje("Madrid","Burgos","8 dias","España");
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




const cliente2=new Cliente("Ivan","Soria","Madrid",burgos,"84569345");

console.log(cliente2);
console.log(cliente2.contratado());
console.log("Duracion: "+cliente2.miViaje.duracion);

burgos.precio=(49.99);
burgos.descuento=(0.2);
burgos.precioFinal=((burgos.precio)*(1-burgos.descuento));


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
    burgos,
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

function BurgosMes (mes,fechaSalida){
    this.mes=mes;
    this.fechaSalida=fechaSalida;
}

const burgosEnero= new BurgosMes("Enero","19/01/2025");

console.log(burgosEnero);

burgosEnero.__proto__=burgos;

console.log(burgosEnero.duracion);




const direccion1={
    calle: "Arcipreste",
    numero: "12",
    piso: "3B"
}

const agencia={
    nif:"13221421",
    direccion: direccion1,
    telefono: "53453533",
    dirCom: function(){
        return this.direccion.calle+" "+this.direccion.numero+" "+this.direccion.piso;
    }
}



console.log(agencia);
console.log(agencia.dirCom());

const pepe=new Cliente("Pepe","Viyuela","España","","5654645");
const roma=new Viaje("Madrid","Roma","6 dias","Italia",120.50);

roma.__proto__=agencia;





//Origen, destino,duraccion,precio,direccion agencia,telefono agencia;
console.log("Direccion y telefono:")
console.log(roma.dirCom());
console.log(roma.telefono);

arrayViajes.forEach(viaje => {
    viaje.__proto__=agencia; 
    console.log(viaje.nif);  
});

//Sin prototipo
console.log(cliente2.miViaje.duracion);


arrayClientes.forEach(cliente => {
    
    arrayViajes.forEach(viaje=>{

        if(cliente.miViaje===viaje){
            cliente.__proto__=viaje;
            
        }
    });  
});

//Con prototipo
console.log(cliente2.duracion);
console.log(cliente3.duracion);
console.log(cliente4.duracion);






    arrayClientes.forEach(cliente => {
    
        arrayViajes.forEach(viaje=>{
    
            if(cliente.miViaje===viaje){
                
                console.log("Cliente: "+cliente.nombre+" // Destino: "+cliente.destino+" // Origen: "+cliente.origen
                    +" // Precio: "+cliente.precio+" // NIF: "+cliente.nif+" // Direccion: "+cliente.dirCom()+
                    " // Telefono: "+cliente.miViaje.telefono);
  
            }
        });  
    });

