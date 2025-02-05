package PaqueteServlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.Date;

/**
 * Servlet implementation class SessionServletContador
 */
@WebServlet("/SessionServletContador")
public class SessionServletContador extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SessionServletContador() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	 	
			

			HttpSession session = request.getSession(true);
			
			Integer contador=(Integer)session.getAttribute("contador");
			if(contador == null) {
				contador=1;
			}else {
				contador++;
			}
			
			String id=session.getId();
			Date fechaCreacion=new Date(session.getCreationTime());
			Date fechaUltimo=new Date(session.getLastAccessedTime());
			int tiempo=session.getMaxInactiveInterval();
			
			session.setAttribute("contador", contador);
			session.setAttribute("id", id);
			session.setAttribute("fechaCreacion", fechaCreacion);
			session.setAttribute("fechaUltimo", fechaUltimo);
			session.setAttribute("tiempo", tiempo);
			
			request.getRequestDispatcher("mostrarContador.jsp").forward(request, response);
		
		
	}

	
	
	
}
