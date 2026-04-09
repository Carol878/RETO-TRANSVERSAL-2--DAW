package eventos.service;

import java.util.List;

import eventos.model.dto.ReservaDto;
import eventos.model.entities.Reserva;

public interface ReservaService extends CrudGenerico<Reserva, Integer> {

	Reserva insertFromDto(ReservaDto reservaDto);
	Reserva updateFromDto(ReservaDto reservaDto);
	List<Reserva> buscarReservasDeUnCliente(String username);
	
}
