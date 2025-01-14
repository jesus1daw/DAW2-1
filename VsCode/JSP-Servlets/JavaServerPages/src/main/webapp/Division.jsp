<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Manejo de errores</title>
</head>
<body>
<%@page errorPage="Errores.jsp"%>
<h1>Ejemplo de manejo de errores en JSP</h1>
<%!
	private double toDouble(String value)
	{
	return(Double.valueOf(value).doubleValue());
	}
%>
<%
	double op1=toDouble(request.getParameter("op1"));
	double op2=toDouble(request.getParameter("op2"));
	double res=op1/op2;
%>

</body>

<h1>resultado: <%= res %></h1>



</html>