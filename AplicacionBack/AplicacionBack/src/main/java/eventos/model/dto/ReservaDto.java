package eventos.model.dto;

import eventos.model.entities.Evento;
import eventos.model.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ReservaDto {

	
	private int idReserva;
	private int idEvento;
	private String username;
	private double precioVenta;
	private String observaciones;
	private int cantidad;
	
}
