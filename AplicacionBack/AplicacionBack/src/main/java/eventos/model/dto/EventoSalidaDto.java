package eventos.model.dto;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import eventos.model.entities.Evento;
import eventos.model.entities.Tipo;
import eventos.model.enums.Destacado;
import eventos.service.EventoService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data

public class EventoSalidaDto {
	

	private int idEvento;
	private String nombre;
	private String descripcion;
	private LocalDate fechaInicio;
	private int duracion;
	private String direccion;
	private Destacado destacado;
	private int aforoMaximo;
	private int minimoAsistencia;
	private double precio;
	private Tipo tipo;
	private int plazasDisponibles;
	
	
	public static EventoSalidaDto crearEventoSalidaDtoDesdeEvento(Evento evento, int plazasDisponibles) {
	    EventoSalidaDto eventoSalidaDto = new EventoSalidaDto();
	    
	    eventoSalidaDto.setIdEvento(evento.getIdEvento());
	    eventoSalidaDto.setNombre(evento.getNombre());
	    eventoSalidaDto.setDescripcion(evento.getDescripcion());
	    eventoSalidaDto.setFechaInicio(evento.getFechaInicio());
	    eventoSalidaDto.setDuracion(evento.getDuracion());
	    eventoSalidaDto.setDireccion(evento.getDireccion());
	    eventoSalidaDto.setDestacado(evento.getDestacado());
	    eventoSalidaDto.setAforoMaximo(evento.getAforoMaximo());
	    eventoSalidaDto.setMinimoAsistencia(evento.getMinimoAsistencia());
	    eventoSalidaDto.setPrecio(evento.getPrecio());
	    eventoSalidaDto.setTipo(evento.getTipo());
	    
	    eventoSalidaDto.setPlazasDisponibles(evento.getAforoMaximo()-plazasDisponibles);
	    
	    return eventoSalidaDto;
	}
	
}
