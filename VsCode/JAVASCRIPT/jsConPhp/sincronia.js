
var xhttp = new XMLHttpRequest();       
xhttp.open("GET", " hora_servidor.php ", false);     
xhttp.send();
if (xhttp.status == 200){
	alert("OK");
}else {
	alert("Error");
}
alert(xhttp.response);
