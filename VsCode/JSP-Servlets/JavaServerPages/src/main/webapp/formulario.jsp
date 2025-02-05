<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>

<style>

.err{
color: red;
}

</style>
<body>


<%
String nombre=(String) session.getAttribute("nombre");
String edad=(String) session.getAttribute("edad");
String errorDatos=(String) session.getAttribute("errorDatos");

if (nombre != null && !nombre.isEmpty() && edad!=null && !edad.isEmpty()) {
%>

<p>Hola <%= nombre %> </p>
 
<%
	}else{
%>

<form action="formulario1" method="post">

<label for="nombre">Introduce un nombre</label>
<input type="text" name="nombre" id="nombre" value="<% if(nombre!=null) out.print(nombre); %>" >
<br>
<label for="edad">Introduce una edad</label>
<input type="text" name="edad" id="edad" value="<% if(edad!=null) out.print(edad); %>">
<input type="submit" value="enviar">
<p class="err"><%= (errorDatos != null) ? errorDatos : "" %>

</form>

<% } %>

</body>
</html>