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

import org.apache.el.lang.FunctionMapperImpl.Function;

import java.sql.*;
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
		String mensajeError="";
		
		
		if(validarUser(nombre) || validarClave(clave)) {

		mensajeError="Fallo en la validacion";
		request.getSession().setAttribute("mensajeError", mensajeError);
		response.sendRedirect("index.jsp");
		
		} else {
			
				String userName = "admin1";
		        String password = "admin1";
		        String url = "jdbc:mysql://localhost:3306/tienda";
		        
		        try {
		            
		            Class.forName("com.mysql.cj.jdbc.Driver");
		            Connection conn = DriverManager.getConnection(url, userName, password);
		            response.getWriter().append("Conexion exitosa ");
		           
		            String sqlStr = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ? ";
		            PreparedStatement consulta=conn.prepareStatement(sqlStr);
		            consulta.setString(1, nombre);
		            consulta.setString(2, clave);
		            
		            ResultSet resultado=consulta.executeQuery();
		            
		            if (resultado.next()) {
		                response.getWriter().append("Usuario encontrado  ");
		            } else {
		                response.getWriter().append("Usuario no encontrado  ");
		            }
		            
		        } catch (ClassNotFoundException e) {
		            // Manejar excepción si el driver no se encuentra
		        	response.getWriter().append("No se encuentra el driver ");
		            e.printStackTrace();
		        } catch (SQLException e) {
		            // Manejar errores relacionados con la base de datos
		        	response.getWriter().append("Fallo al conectar con la base de datos ");
		            e.printStackTrace();
		        } catch (Exception e) {
		            // Capturar cualquier otra excepción
		        	response.getWriter().append("Error ");
		            e.printStackTrace();
		        }
		}
		
	}
	
	
	public boolean validarUser(String nombre) {
		
		boolean error=false;
		
		if(nombre.length()<6 || nombre.length()>30) {
			error=true;
		} 
		
		if(!nombre.matches("[a-zA-Z0-9_-]+")){
			error=true;
		}
		
		return error;
		
	}
	
	
	public boolean validarClave(String clave) {
		
		boolean error=false;
		
		if (clave.length() < 6 || clave.length() > 30) {
		    error = true; // Longitud no válida   
		}
		
		if (!clave.matches(".*[A-Z].*")) {
		    error = true; // No contiene al menos una letra mayúscula 
		}
		
		if (!clave.matches(".*[a-z].*")) {
		    error = true; // No contiene al menos una letra minúscula
		}
		
		if (!clave.matches(".*[0-9].*")) {
		    error = true; // No contiene al menos un número
		}
		
		if (!clave.matches(".*[\\-_\\/()$%&?!+*#<>=].*")) {
		    error = true; // No contiene al menos un carácter especial permitido 
		}
		
		return error;
	}
	
	
}

	
	

	
	
	
	
	
	

