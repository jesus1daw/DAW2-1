package PaqueteServlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;

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
       
    }

    //FUNCION mayorDeEdad (fechaDeNacimiento) devuelve true(mayorDeEdad) o false(menorDeEdad)
    protected Boolean mayorDeEdad(String _fechaNac) {
        
        SimpleDateFormat formatoFecha = new SimpleDateFormat("dd/MM/yyyy");
        Date fechaHoy = new Date(0);
        String cadenaHoy = formatoFecha.format(fechaHoy);
        
        String[] dat1 = _fechaNac.split("/");
        String[] dat2 = cadenaHoy.split("/");
        int anios = Integer.parseInt(dat2[2]) - Integer.parseInt(dat1[2]);
        int mes = Integer.parseInt(dat2[1]) - Integer.parseInt(dat1[1]);
        if (mes < 0) {
            anios = anios - 1;
        } else if (mes == 0) {
            int dia = Integer.parseInt(dat2[0]) - Integer.parseInt(dat1[0]);
            if (dia > 0) {
                anios = anios - 1;
            }
        }
        
        if(anios<18)
            return false;
        else
            return true;
    }


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Obtener parámetros del formulario
		String nombre=request.getParameter("nombre");
		String clave=request.getParameter("clave");
		String genero=request.getParameter("genero");
		String fechaNac=request.getParameter("fechaNac");
		String[] pais=request.getParameterValues("pais[]");
		String acepto=request.getParameter("acepto");
		String comentarios=request.getParameter("comentarios");
		
		String errores= " ";
		String errorEnvio="false";
		
		// Validar campos del formulario
		if(nombre.isEmpty()) {
			errores+="El nombre no puede estar vacio <br>";
			errorEnvio="true";
		}
		
		if(clave.length()<=6  || clave.length()>=12) {
			errores+="La contraseña debe contener entre 6 y 12 caracteres <br>";
			errorEnvio="true";	
		}
		
		if(genero == null) {
			errores+="Debes seleccionar un genero <br>";
			errorEnvio="true";
		}
		
		if(fechaNac.isEmpty()) {
			errores+="Debes poner una fecha <br>";
			errorEnvio="true";	
		}else if (!mayorDeEdad(fechaNac)) {
			errores+="Debes ser mayor de edad <br>";
			errorEnvio="true";
		}
		
		if(pais==null) {
			errores+="Debes poner al menos un pais <br>";
			errorEnvio="true";
		}
		
		if(acepto==null) {
			errores+="Debes marcar la casilla de ACEPTO <br>";
			errorEnvio="true";
		}
		
		 // Guardar datos en la sesión
		request.getSession().setAttribute("nombre", nombre);
		request.getSession().setAttribute("clave", clave);
		request.getSession().setAttribute("genero", genero);
		request.getSession().setAttribute("fechaNac", fechaNac);
		request.getSession().setAttribute("pais", pais);
		request.getSession().setAttribute("acepto", acepto);
		request.getSession().setAttribute("comentarios", comentarios);
		
		request.getSession().setAttribute("errorEnvio", errorEnvio);
		request.getSession().setAttribute("errores", errores);
		
		 // Redirigir al formulario JSP
		response.sendRedirect("formularioEYR.jsp");
			
		}

}