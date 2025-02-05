package formulario1;



import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class formulario
 */
@WebServlet("/formulario1")
public class formulario1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public formulario1() {
        super();
        // TODO Auto-generated constructor stub
    }


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		
		String nombre = request.getParameter("nombre");
		String edad= request.getParameter("edad");
		String errorDatos=" ";
		
		if(nombre!= null && edad != null) {
			request.getSession().setAttribute("nombre", nombre);
			request.getSession().setAttribute("edad", edad);
			errorDatos="Faltan datos";
			request.getSession().setAttribute("errorDatos", errorDatos);
			response.sendRedirect("formulario.jsp");
			
			
			
			return;
		} else {
		
		}
				
		
		
		
		
	}

}

