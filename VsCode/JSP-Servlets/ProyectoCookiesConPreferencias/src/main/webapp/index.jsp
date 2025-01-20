<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
String errores=(String) session.getAttribute("mensajeError");
%>

<form action="recepcion" method="post">
<label for="nombre">Introduce el nombre: </label>
<input type="text" name="nombre" id="nombre">
<br>
<br>
<label for="clave">Introduce la contraseña: </label>
<input type="text" name="clave" id="clave">
<br>
<br>

<input type="submit" value="enviar">
<br>
<br>

<p class="err"><%=  (errores != null) ? errores : "" %></p>

	

</form>


</body>
</html>