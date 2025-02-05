package PaqueteBeans;

import java.io.Serializable;
import java.beans.*;

public class Producto implements Serializable{
	
	private String descripcion;
	private int idProducto;
	private int stockActual;
	private int stockMinimo;
	private float pvp;
	
	public static final String PROP_SAMPLE_PROPERTY="sampleProperty";
	
	private PropertyChangeSupport propertySupport;
	
	public Producto() {
		propertySupport=new PropertyChangeSupport(this);
	}
	
	public Producto(int idProducto,String descripcion,int stockActual,int stockMinimo,float pvp) {
		propertySupport=new PropertyChangeSupport(this);
		this.idProducto=idProducto;
		this.descripcion=descripcion;
		this.stockActual=stockActual;
		this.stockMinimo=stockMinimo;
		this.pvp=pvp;
	}
	
	
	
	
	
	
	
	
	
	

	
	public void addPropertyChangeListener(PropertyChangeListener listener) {
		propertySupport.addPropertyChangeListener(listener);
	}
	
	public void removePropertyChangeListener(PropertyChangeListener listener) {
		propertySupport.removePropertyChangeListener(listener);
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public int getIdProducto() {
		return idProducto;
	}
	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}
	public int getStockActual() {
		return stockActual;
	}
	
	
	public void setStockActual(int valorNuevo) {
		int valorAnterior=this.stockActual;
		this.stockActual=valorNuevo;
		
		if(this.stockActual<getStockMinimo()) {
			propertySupport.firePropertyChange("stockActual", valorAnterior, this.stockActual);
			
		}
		
		
		
	}
	public int getStockMinimo() {
		return stockMinimo;
	}
	public void setStockMinimo(int stockMinimo) {
		this.stockMinimo = stockMinimo;
	}
	public float getPvp() {
		return pvp;
	}
	public void setPvp(float pvp) {
		this.pvp = pvp;
	}
}
