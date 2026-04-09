package eventos.model.dto;

import eventos.model.entities.Evento;
import eventos.model.entities.Reserva;
import eventos.model.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ReservaSalidaDto {

	
	private int idReserva;
	private Evento evento;
	private String username;
	private double precioVenta;
	private String observaciones;
	private int cantidad;
	
	public static ReservaSalidaDto crearReservaSalidaDtoDesdeReserva(Reserva reserva) {
	    ReservaSalidaDto reservaSalidaDto = new ReservaSalidaDto();
	    
	    reservaSalidaDto.setIdReserva(reserva.getIdReserva());
	    reservaSalidaDto.setPrecioVenta(reserva.getPrecioVenta());
	    reservaSalidaDto.setObservaciones(reserva.getObservaciones());
	    reservaSalidaDto.setCantidad(reserva.getCantidad());
	    reservaSalidaDto.setUsername(reserva.getUsuario().getUsername());
	    reservaSalidaDto.setEvento(reserva.getEvento());
	    
	    return reservaSalidaDto;
	}
	
}
