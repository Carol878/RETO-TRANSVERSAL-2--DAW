package eventos.model.enums;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter

public enum Estado {
	
	 	ACTIVO("Activo"),
	    CANCELADO("Cancelado"),
	    FINALIZADO("Finalizado");
	    
	    private String descripcion;
	    
	    
	    public static Estado fromDescripcion(String descripcion) {
	        for (Estado estado : Estado.values()) {
	            if (estado.getDescripcion().equals(descripcion)) {
	                return estado;
	            }
	        }
	        throw new IllegalArgumentException("Estado no válido: " + descripcion);
	    }
}
