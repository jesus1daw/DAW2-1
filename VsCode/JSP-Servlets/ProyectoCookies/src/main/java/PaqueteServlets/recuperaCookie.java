package PaqueteServlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class recuperaCookie
 */
@WebServlet("/recuperaCookie")
public class recuperaCookie extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public recuperaCookie() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		
		
		Cookie[] cookies=request.getCookies();
		
		for (Cookie cookie : cookies) {
			String nombre=cookie.getName();
			if(nombre.equals("Jesus")) {
				String valor=cookie.getValue();
				request.getSession().setAttribute("nombre", nombre);
				request.getSession().setAttribute("valor", valor);
				
			}
			
			
		}
	
		
		
		
		response.sendRedirect("imprimirCookies.jsp");
		
		
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
