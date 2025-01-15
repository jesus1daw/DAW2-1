package PaqueteServlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class EnviaYRecibe
 */
@WebServlet("/EnviaYRecibe")
public class EnviaYRecibe extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EnviaYRecibe() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String nombre=request.getParameter("nombre");
		String clave=request.getParameter("clave");
		String genero=request.getParameter("genero");
		String fechaNac=request.getParameter("fechaNac");
		String[] pais=request.getParameterValues("pais[]");
		String acepto=request.getParameter("acepto");
		String comentarios=request.getParameter("comentarios");
		
		String errores= "";
		if(nombre.isEmpty()) {
			errores+="El nombre no puede estar vacio <br>";
			
		}
		if(clave.length()<=6  || clave.length()>=12) {
			errores+="La contraseña debe contener entre 6 y 12 caracteres <br>";
			
		}
		
		if(genero == null) {
			errores+="Debes seleccionar un genero";
		}
		if(fechaNac.isEmpty()) {
			errores+="Debes poner una fecha";
		}
		
		
	}

}
