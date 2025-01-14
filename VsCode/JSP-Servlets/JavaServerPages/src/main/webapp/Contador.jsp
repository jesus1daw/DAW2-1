<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<%@page import="java.util.*" %>
<%--Esto es un comentario de JSP --%>
<%! 
	private int cont=0;
	private Date fecha=new Date();
%>
<body>
<p>Esta página ha sido accedida <b><%= ++cont %></b> veces.</p>
<p>El ultimo acceso ha sido con fecha <b><%= fecha %></b></p>
<% fecha=new Date(); %>
</body>
</html>