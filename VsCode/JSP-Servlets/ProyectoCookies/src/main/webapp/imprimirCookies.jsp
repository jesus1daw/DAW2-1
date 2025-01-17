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
String valor=(String) session.getAttribute("valor");

%>

<p><%= nombre %></p>

<br>
<br>

<p><%= valor %></p>


</body>
</html>