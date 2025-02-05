package PaqueteServlets;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.io.PrintWriter;
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
    
    private String userName2;
    private String password2;
    private String url2;
    private Integer contador;
    private ServletContext context;

    
    
    public void init(ServletConfig config) throws ServletException {
		super.init(config);
		
		 //Parámetros de inicialización específicos del servlet
	    userName = config.getInitParameter("usuario");
	    password = config.getInitParameter("password");
	    url = config.getInitParameter("URLBaseDeDatos");

	    //Parámetros globales de la aplicación (contexto)
	    this.context = config.getServletContext();
	    url2 = context.getInitParameter("URLBaseDeDatos");
	    userName2 = context.getInitParameter("usuario");
	    password2 = context.getInitParameter("password");

	    System.out.println("Usuario desde init-param: " + userName);
	    System.out.println("Contraseña desde init-param: " + password);
	    System.out.println("URL desde init-param: " + url);

	    System.out.println("Usuario desde context-param: " + userName2);
	    System.out.println("Contraseña desde context-param: " + password2);
	    System.out.println("URL desde context-param: " + url2);
		}
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		if (this.context == null) {
	        this.context = getServletContext();  // Si es null, obtén el contexto aquí
	    }
		contador= (Integer)context.getAttribute("contador");
		if (contador == null) {
	        contador = 0;  // Si es null, inicializar en 0
	    }
		
		PrintWriter out = response.getWriter();
		response.setContentType("text/html");
		
		out.println("<html><head><title>Resultado de la consulta</title></head><body>");
		 
		
		out.println("<p>==== " + contador.intValue() + " peticiones *.html===</p>");
		out.println(contador.intValue());
		out.println("</body></html>");
	}
	
	

	
	
	
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}