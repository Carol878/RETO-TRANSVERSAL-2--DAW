package eventos.service;

import java.util.List;

import eventos.model.dto.EventoDto;
import eventos.model.dto.UsuarioDto;
import eventos.model.entities.Evento;
import eventos.model.entities.Usuario;

public interface EventoService extends CrudGenerico<Evento, Integer> {

	Evento insertFromDto(EventoDto eventoDto);
	Evento updateFromDto(EventoDto eventoDto);
	Evento cancelOne(int idEvento);
	List<Evento> buscarActivos();
	List<Evento> buscarDestacados();
	List<Evento> buscarTerminados();
	List<Evento> buscarCancelados();
	int calcularPlazasDisponibles(Evento evento);
}
