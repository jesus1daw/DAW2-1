<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>



<form action="EnviaYRecibe" method="post">

<label for="nombre">Nombre:</label>
<input type="text" name="nombre" id="nombre">
<br>
<br>
<label for="clave">Clave:</label>
<input type="password" name="clave" id="clave">
<br>
<br>
<label for="genero">Genero:</label>
<input type="radio" name="genero" id="genero" value="m">Masculino
<input type="radio" name="genero" id="genero" value="f">Femenino
<br>
<br>
<label for="fechaNac">Fecha de Nacimiento</label>
<input type="text" name="fechaNac" id="fechaNac">
<br>
<br>
<label for="pais">Pais:</label>
<select MULTIPLE name="pais[]" id="pais">
	<option value="españa">España</option>
	<option value="francia">Francia</option>
	<option value="italia">Italia</option>
	<option value="marruecos">Marruecos</option>
</select>
<br>
<br>
<label for="acepto">Acepto:</label>
<input type="checkbox" name="acepto" id="acepto">
<br>
<br>
<label for="comentarios">Comentarios:</label>
<textarea name="comentarios" id="comentarios">Añade un comentario:</textarea>

<br>
<br>






<input type="submit" value="enviar">
<p class="err"></p>

</form>







</body>
</html>