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

String nombre=(String) session.getAttribute("nombre"); 
int visitas=0;
Cookie[] cookies=request.getCookies();
String color="verde";

for (Cookie cookie : cookies) {
	 String name=cookie.getName();
	if(name.equals(nombre)) {
		
		String[] valueParts = cookie.getValue().split("\\|");
		 color = valueParts[0];
         visitas = Integer.parseInt(valueParts[1]);
		 break;
	}

	}

%>

<h1>Bienvenido <%=nombre %></h1>



<form action="guardaCookie" method="post">



<label for="colores">Selecciona un color: </label>
<input type="radio" name="color" value="verde"  id="colores" <%= "verde".equals(color) ? "checked" : "" %>>VERDE
<input type="radio" name="color" value="rojo" id="colores" <%= "rojo".equals(color) ? "checked" : "" %>>ROJO
<input type="radio" name="color" value="azul" id="colores"  <%= "azul".equals(color) ? "checked" : "" %>>AZUL

<input type="submit" value="Desconectar">



</form>
<p>Has visitado esta página <%= visitas %> veces.</p>

</body>
</html>