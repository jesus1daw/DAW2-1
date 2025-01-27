package PaqueteServlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

/**
 * Servlet implementation class guardaCookie
 */
@WebServlet("/guardaCookie")
public class guardaCookie extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public guardaCookie() {
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
		
		HttpSession session = request.getSession();
		String nombre = (String) session.getAttribute("nombre");
		Cookie[] cookies=request.getCookies();
		
		for (Cookie cookie : cookies) {
			 String name=cookie.getName();
			if(name.equals(nombre)) {
				// Actualizar color y contador de visitas
	            String[] valueParts = cookie.getValue().split("\\|");
	            
	            int visitas = Integer.parseInt(valueParts[1]) + 1;
	            String color = request.getParameter("color");
	            cookie.setValue(color + "|" + visitas);
	            response.addCookie(cookie);
				
			}else {
		
		String valor=request.getParameter("color");
		
		Cookie laCookie=new Cookie(nombre,valor+"|1");
		
		response.addCookie(laCookie);
		
		
		
			}
		
	}
		response.sendRedirect("index.jsp");

}
}
