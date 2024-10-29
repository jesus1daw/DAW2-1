
productos2 = 
`G27CQ4 212,65€
XG27ACS 269,66€
CQ32G2SE 214,20€
G27C4X 189,45€`;

const lineas = productos2.trim().split('\n');
 console.log(productos2);
const monitores = [];
lineas.forEach(linea => {
    const partes = linea.split(' ');
    const nombre = partes[0];
    const precio = parseFloat(partes[1].replace(',', '.').replace('€', '').trim());
    monitores.push({ nombre,precio }); 
    
});

console.log(monitores);







