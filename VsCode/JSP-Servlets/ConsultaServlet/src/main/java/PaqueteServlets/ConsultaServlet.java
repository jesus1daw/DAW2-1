package PaqueteServlets;

import jakarta.servlet.ServletConfig;
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
 * Servlet implementation class ConsultaServlet
 */
@WebServlet("/ConsultaServlet")
public class ConsultaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ConsultaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    private String userName;
    private String password;
    private String url;
    
    
    public void init(ServletConfig config) throws ServletException {
		super.init(config);
		// Lectura de los par´ametros de inicialización del Servlet
		userName=config.getInitParameter("usuario");
		password=config.getInitParameter("password");
		url=config.getInitParameter("URLBaseDeDatos");
		
		 System.out.println("Usuario: " + userName);
		    System.out.println("Contraseña: " + password);
		    System.out.println("URL: " + url);
		
		}
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Connection conn = null;
		Statement stmt = null;

		
		try {
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		
			conn = DriverManager.getConnection(url, userName, password);
	
			stmt = conn.createStatement();
		    String sqlStr = "SELECT * FROM libros";
		    
		    
		    response.getWriter().append("Usuario: "+userName);
		    response.getWriter().append("Pass: "+password);
		    
		    response.getWriter().append("url: "+url);
		    
		
		
		
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		
	}
	
	

	
	
	
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
