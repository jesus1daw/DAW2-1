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
color:red;
}

</style>
<body>
<%@ page import="java.util.Arrays" %>
<%

	//Variables obtenidas de la sesión
	String nombre=(String) session.getAttribute("nombre");
	String clave=(String) session.getAttribute("clave");
	String genero=(String) session.getAttribute("genero");
	String fechaNac=(String) session.getAttribute("fechaNac");
	String[] pais= (String[]) session.getAttribute("pais");
	String acepto=(String) session.getAttribute("acepto");
	String comentarios=(String) session.getAttribute("comentarios");

	String errorEnvio=(String) session.getAttribute("errorEnvio");
	String errores=(String) session.getAttribute("errores");

	//Comprobación del estado de envío
	if(errorEnvio==null || errorEnvio=="true"){
	
%>

<!-- Formulario -->
<form action="EnviaYRecibe" method="post">

	<label for="nombre">Nombre:</label>
	<input type="text" name="nombre" id="nombre" value="<% if(nombre!=null) out.print(nombre); %>">
	<br>
	<br>
	
	<label for="clave">Clave:</label>
	<input type="password" name="clave" id="clave" value="<% if(clave!=null) out.print(clave); %>">
	<br>
	<br>
	
	<label for="genero">Genero:</label>
	<input type="radio" name="genero" id="genero" value="m" <%= "m".equals(genero) ? "checked" : "" %>>Masculino
	<input type="radio" name="genero" id="genero" value="f" <%= "f".equals(genero) ? "checked" : "" %>>Femenino
	<br>
	<br>
	
	<label for="fechaNac">Fecha de Nacimiento</label>
	<input type="text" name="fechaNac" id="fechaNac" value="<% if(fechaNac!=null) out.print(fechaNac); %>">
	<br>
	<br>
	
	<label for="pais">Pais:</label>
	<select MULTIPLE name="pais[]" id="pais">
		<option value="españa" <%= (pais != null && Arrays.asList(pais).contains("españa")) ? "selected" : "" %> >España</option>
		<option value="francia"  <%= (pais != null && Arrays.asList(pais).contains("francia")) ? "selected" : "" %>>Francia</option>
		<option value="italia"  <%= (pais != null && Arrays.asList(pais).contains("italia")) ? "selected" : "" %>>Italia</option>
		<option value="marruecos"  <%= (pais != null && Arrays.asList(pais).contains("marruecos")) ? "selected" : "" %>>Marruecos</option>
	</select>
	<br>
	<br>
	
	<label for="acepto">Acepto:</label>
	<input type="checkbox" name="acepto" id="acepto" value="aceptado" <%= "aceptado".equals(acepto) ? "checked" : "" %>>
	<br>
	<br>
	
	<label for="comentarios">Comentarios:</label>
	<textarea name="comentarios" id="comentarios"> Añade un comentario:</textarea>
	<br>
	<br>
	
	<label for="imagen">Inserta una imagen:</label>
	<input type="file" id="imagen" name="imagen"> 
	<br>
	<br>
	
	<input type="submit" value="enviar">
	<p class="err"><%=  (errores != null) ? errores : "" %></p>

</form>

<% 

//Si el formulario fue enviado correctamente, mostrar los datos
} else { %>
	
	<p>Tu nombre es: <%=nombre %></p>
	<p>Tu clave es: <%=clave %></p>
	<p>Tu fecha de nacimiento es: <%=fechaNac %></p>
	<p>Tu pais es: <% for (int i = 0; i < pais.length; i++) {
        out.print(pais[i]);
        if (i < pais.length - 1) {
            out.print(", "); 
        }
    } %></p>
	
<%	

}

%>

</body>
</html>