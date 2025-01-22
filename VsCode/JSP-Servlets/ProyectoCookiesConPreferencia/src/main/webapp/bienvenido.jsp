<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%String nombre=(String) session.getAttribute("nombre"); %>

<h1>Bienvenido <%=nombre %></h1>



<form action="guardaCookie" method="post">



<label for="colores">Selecciona un color: </label>
<input type="radio" name="color" value="verde" id="colores">VERDE
<input type="radio" name="color" value="rojo" id="colores">ROJO
<input type="radio" name="color" value="azul" id="colores">AZUL

<input type="submit" value="Desconectar">



</form>


</body>
</html>