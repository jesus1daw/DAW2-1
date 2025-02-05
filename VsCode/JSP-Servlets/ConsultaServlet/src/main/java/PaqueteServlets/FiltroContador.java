package PaqueteServlets;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import java.io.IOException;

/**
 * Servlet Filter implementation class FiltroContador
 */
@WebFilter("/FiltroContador")
public class FiltroContador extends HttpFilter implements Filter {
       
	FilterConfig config;
	
    public FiltroContador() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		
		ServletContext miContexto = config.getServletContext();
		
		Integer intContador = (Integer)miContexto.getAttribute("contador");
		if(intContador == null) {
		intContador = 0;
		}
		intContador++;
		miContexto.setAttribute("contador", intContador);
		 System.out.println("Contador actualizado: " + intContador);


		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
		this.config = fConfig;
	}

}