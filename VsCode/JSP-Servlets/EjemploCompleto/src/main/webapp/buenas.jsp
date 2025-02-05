<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@page import="java.util.Calendar"%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<p>Hoy es <%=Calendar.getInstance().getTime() %> </p> 
<%
	String saludo;
	int horaDelDia=Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
	if(horaDelDia<12){
		saludo= "Buenos Dias";
	} else if (horaDelDia >=12 && horaDelDia<21){
		saludo ="Buenas tardes";
	} else {
		saludo ="Buenas noches";
	}
%>
<p><%= saludo %></p>
</body>
</html>