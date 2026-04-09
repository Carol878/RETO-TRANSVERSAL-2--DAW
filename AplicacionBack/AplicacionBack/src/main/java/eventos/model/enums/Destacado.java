package eventos.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter

public enum Destacado {
	  	S("S"),
	    N("N");
	    
	    private String valor;
	    
	    public static Destacado fromValor(String valor) {
	        if ("S".equals(valor)) return S;
	        if ("N".equals(valor)) return N;
	        throw new IllegalArgumentException("Valor destacado no válido: " + valor);
	    }
}
