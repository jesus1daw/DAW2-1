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
 * Servlet implementation class CreaSesion
 */
@WebServlet("/CreaSesion")
public class CreaSesion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreaSesion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		 	
		if(request.getSession(false)!=null) {
			request.getSession().invalidate();
		}

		HttpSession session = request.getSession(true);
	       
		int entero=123;
		double real=45.67;
		String texto="Hola";
		LocalDateTime fecha=LocalDateTime.now();
		Punto punto=new Punto(12,5);
		Map<String, Boolean> semaforo = new HashMap	<>();
		semaforo.put("verde", true);
		semaforo.put("amarillo",false);
		semaforo.put("rojo",false);
		
		
	        session.setAttribute("entero", entero);

	        session.setAttribute("real", real);

	        session.setAttribute("texto", texto);

	        session.setAttribute("fecha", fecha);
	        
	        session.setAttribute("semaforo", semaforo);
	        
	        session.setAttribute("punto", punto);
		
	        
	        
	        response.sendRedirect("RecuperaSesion");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		
		
		
		
		
		
		
		
		
		
	}

}

