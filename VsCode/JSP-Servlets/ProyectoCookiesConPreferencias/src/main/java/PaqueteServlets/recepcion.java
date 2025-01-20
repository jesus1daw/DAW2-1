package PaqueteServlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * Servlet implementation class recepcion
 */
@WebServlet("/recepcion")
public class recepcion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public recepcion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String nombre=request.getParameter("nombre");
		String clave=request.getParameter("clave");
		Boolean error=false;
		String mensajeError="";
		
		
		if(nombre.length()<6 || nombre.length()>30) {
			error=true;
			mensajeError="error1";
		} 
		if(!nombre.matches("[a-zA-Z0-9_-]+")){
			error=true;
			mensajeError="error2";
		}
		if (clave.length() < 6 || clave.length() > 30) {
		    error = true; // Longitud no válida
		    mensajeError="error3";
		}
		if (!clave.matches(".*[A-Z].*")) {
		    error = true; // No contiene al menos una letra mayúscula
		    mensajeError="error4";
		}
		if (!clave.matches(".*[a-z].*")) {
		    error = true; // No contiene al menos una letra minúscula
		    mensajeError="error5";
		}
		if (!clave.matches(".*[0-9].*")) {
		    error = true; // No contiene al menos un número
		    mensajeError="error6";
		}
		if (!clave.matches(".*[\\-_\\/()$%&?!+*#<>=].*")) {
		    error = true; // No contiene al menos un carácter especial permitido
		    mensajeError="error7";
		}
		
		
		if(error==true) {
		request.getSession().setAttribute("mensajeError", mensajeError);
		response.sendRedirect("index.jsp");
		} else {
			
			//Paso 1: Cargar el driver JDBC.
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			//Paso 2: Conectarse a la Base de Datos utilizando la clase Connection
			String userName="admin1";
			String password="admin1";
			String url="jdbc:mysql://localhost/TiendaLibros";

			Connection conn = DriverManager.getConnection(url, userName, password);
			//Paso 3: Crear sentencias SQL, utilizando objetos de tipo Statement
			Statement stmt = conn.createStatement();
			String sqlStr = "SELECT * FROM libros WHERE ";
			for (int i = 0; i < autores.length; i++ ) {
			sqlStr = sqlStr + "autor = '" + autores[i] + "' ";
			if (i != autores.length - 1) {
			sqlStr += "OR ";
			}
			}
			sqlStr += "AND cantidad > 0 ORDER BY precio DESC";
			//para depuraci´on
			System.out.println("La consulta sql es " + sqlStr);
			//Paso 4: Ejecutar las sentencias SQL a trav´es de los objetos Statement
			ResultSet rset = stmt.executeQuery(sqlStr);
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
		
		
		
		
		
		
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
