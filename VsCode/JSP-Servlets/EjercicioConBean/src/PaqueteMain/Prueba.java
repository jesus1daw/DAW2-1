package PaqueteMain;

import PaqueteBeans.Pedido;
import PaqueteBeans.Producto;

public class Prueba {

	public static void main(String[] args) {
		Producto producto = new Producto
		(1, "Dabber Sur Femme 2011", 10, 3, 16);
		Pedido pedido = new Pedido();
		pedido.setProducto (producto);
		producto.addPropertyChangeListener (pedido); //
		//cambiamos el stock actual, le damos el valor 2 --anterior es 10
		producto.setStockActual(2);
		
	}
}