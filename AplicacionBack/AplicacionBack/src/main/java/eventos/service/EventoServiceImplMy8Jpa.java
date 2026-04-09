package eventos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import eventos.model.dto.EventoDto;
import eventos.model.entities.Evento;
import eventos.model.enums.Destacado;
import eventos.model.enums.Estado;
import eventos.model.repository.EventoRepository;
import eventos.model.repository.ReservaRepository;
import eventos.model.repository.TipoRepository;

@Service
public class EventoServiceImplMy8Jpa implements EventoService{

	@Autowired
	private EventoRepository eventoRepository;
	
	@Autowired
	private ReservaRepository reservaRepository;
	
	@Autowired
	private TipoRepository tipoRepository;

	@Override
	public List<Evento> findAll() {
		return eventoRepository.findAll();
	}

	@Override
	public Evento findById(Integer id) {
		return eventoRepository.findById(id).orElse(null);
	}

	@Override
	public Evento insertOne(Evento obj) {
		try {
			obj.setIdEvento(0);
			return eventoRepository.save(obj);
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public Evento updateOne(Evento obj) {
		try {
			Evento existente = eventoRepository.findById(obj.getIdEvento()).orElse(null);
			existente.setNombre(obj.getNombre());
			existente.setDescripcion(obj.getDescripcion());
			existente.setFechaInicio(obj.getFechaInicio());
			existente.setDuracion(obj.getDuracion());
			existente.setDireccion(obj.getDireccion());
			existente.setDestacado(obj.getDestacado());
			existente.setAforoMaximo(obj.getAforoMaximo());
			existente.setMinimoAsistencia(obj.getMinimoAsistencia());
			existente.setPrecio(obj.getPrecio());
			
			existente.setTipo(obj.getTipo());
			
			return eventoRepository.save(existente);
		}catch(Exception e){
			System.out.println("Error al actualizar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public int deleteById(Integer id) {
		if (eventoRepository.existsById(id)) {
			try {
				eventoRepository.deleteById(id);
				return 1;
			}catch (Exception e) {
				System.out.println(e.getMessage());
				return -1;
			}
		} else {
			return 0;
		}
	}

	@Override
	public Evento insertFromDto(EventoDto eventoDto) {
		Evento evento = new Evento();
		
		evento.setNombre(eventoDto.getNombre());
		evento.setDescripcion(eventoDto.getDescripcion());
		evento.setFechaInicio(eventoDto.getFechaInicio());
		evento.setDuracion(eventoDto.getDuracion());
		evento.setDireccion(eventoDto.getDireccion());
		evento.setEstado(Estado.ACTIVO);
		evento.setDestacado(eventoDto.getDestacado());
		evento.setAforoMaximo(eventoDto.getAforoMaximo());
		evento.setMinimoAsistencia(eventoDto.getMinimoAsistencia());
		evento.setPrecio(eventoDto.getPrecio());
		evento.setTipo(tipoRepository.findById(eventoDto.getIdTipo()).orElse(null));
		
		return insertOne(evento);
	}

	@Override
	public Evento updateFromDto(EventoDto eventoDto) {
		Evento evento = eventoRepository.findById(eventoDto.getIdEvento()).orElse(null);
		if (evento == null) return null; 
		
		evento.setNombre(eventoDto.getNombre());
		evento.setDescripcion(eventoDto.getDescripcion());
		evento.setFechaInicio(eventoDto.getFechaInicio());
		evento.setDuracion(eventoDto.getDuracion());
		evento.setDireccion(eventoDto.getDireccion());
		
		evento.setDestacado(eventoDto.getDestacado());
		evento.setAforoMaximo(eventoDto.getAforoMaximo());
		evento.setMinimoAsistencia(eventoDto.getMinimoAsistencia());
		evento.setPrecio(eventoDto.getPrecio());
		evento.setTipo(tipoRepository.findById(eventoDto.getIdTipo()).orElse(null));
		
		return updateOne(evento);
	}

	@Override
	public Evento cancelOne(int idEvento) {
		try {
			
			Evento existente = eventoRepository.findById(idEvento).orElse(null);
			
			existente.setEstado(Estado.CANCELADO);
				
			
			return eventoRepository.save(existente);
		}catch(Exception e){
			System.out.println("Error al actualizar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public List<Evento> buscarActivos() {
		
		return eventoRepository.findByEstado(Estado.ACTIVO);
	}

	@Override
	public List<Evento> buscarDestacados() {
		
		return eventoRepository.findByDestacado(Destacado.S);
	}

	@Override
	public List<Evento> buscarTerminados() {
		
		return eventoRepository.findByEstado(Estado.FINALIZADO);
	}

	@Override
	public List<Evento> buscarCancelados() {
		
		return eventoRepository.findByEstado(Estado.CANCELADO);
	}

	@Override
	public int calcularPlazasDisponibles(Evento evento) {
		
		
		int aforoActual = reservaRepository.calcularAforoDeEvento(evento.getIdEvento());
		return aforoActual;
	}
	
	
	
}
