package paqueteServlets;

import jakarta.servlet.ServletException;
import java.util.Map;
import java.util.HashMap;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.time.LocalDateTime;

/**
 * Servlet implementation class RecuperaSesion
 */
@WebServlet("/RecuperaSesion")
public class RecuperaSesion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RecuperaSesion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		HttpSession session = request.getSession(true);
		
		int entero=(int) session.getAttribute("entero");
		double real=(double)session.getAttribute("real");
		String texto=(String)session.getAttribute("texto");
		LocalDateTime fecha=(LocalDateTime)session.getAttribute("fecha");
		Map<String, Boolean> semaforo=(Map<String, Boolean>)session.getAttribute("semaforo");
		Punto punto=(Punto)session.getAttribute("punto");
		
		
		
		
		
		
		response.sendRedirect("info.jsp");
		
		
		
	}

	

}
