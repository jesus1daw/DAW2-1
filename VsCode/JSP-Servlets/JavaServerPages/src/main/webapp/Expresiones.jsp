<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Expresiones JSP</title>
</head>
<body>

<h1>Ejemplo de expresiones JSP</h1>

<ul>

<li>Fecha actual: <%=new java.util.Date() %>
<li>Nombre del Host: <%= request.getRemoteHost() %>
<li>Id de la sesión: <%= session.getId() %>
<li>El parametro es: <%=request.getParameter("nombre") %>
</ul>

</body>
</html>