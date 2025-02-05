<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%@page isErrorPage="true"%>
<h1>Pagina de errores:</h1>
<p>division.jsp ha reportado el siguiente error:
<b><%=exception%></b> </p>

<p>El error que ha ocurrido es: <pre>
<%exception.printStackTrace(new java.io.PrintWriter(out)); %>
</pre> 

</body>
</html>