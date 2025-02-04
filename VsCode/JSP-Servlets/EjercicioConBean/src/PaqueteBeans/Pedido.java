package PaqueteBeans;

import java.beans.*;
import java.io.Serializable;
import java.util.Date;

public class Pedido implements Serializable, PropertyChangeListener {

	private int numeroPedido;
	private int idProducto;
	private Producto producto;
	private Date fecha;
	private int cantidad;
	private boolean pedir;
	
	@Override
	public void propertyChange(PropertyChangeEvent evt) {
	System.out.printf("Stock Anterior: %d%n",evt.getOldValue());
	System.out.printf("Stock actual: %d%n ",evt.getNewValue());	
	
	System.out.printf("Realizar pedido en roducto;  %s%n ",producto.getDescripcion());	
	}
	
	public Pedido() {}
	
	public Pedido(int numeroPedido,Producto producto,Date fecha,int cantidad) {
		
		this.numeroPedido=numeroPedido;
		this.producto=producto;
		this.fecha=fecha;
		this.cantidad=cantidad;
		
	}
	
	
	
	
	
	
	
	public int getNumeroPedido() {
		return numeroPedido;
	}
	public void setNumeroPedido(int numeroPedido) {
		this.numeroPedido = numeroPedido;
	}
	public int getIdProducto() {
		return idProducto;
	}
	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	public boolean isPedir() {
		return pedir;
	}
	public void setPedir(boolean pedir) {
		this.pedir = pedir;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	
}
