package eventos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import eventos.model.dto.ReservaDto;
import eventos.model.entities.Evento;
import eventos.model.entities.Reserva;
import eventos.model.entities.Usuario;
import eventos.model.repository.EventoRepository;
import eventos.model.repository.ReservaRepository;
import eventos.model.repository.UsuarioRepository;

@Service
public class ReservaServiceImplMy8Jpa implements ReservaService{

	@Autowired
	private ReservaRepository reservaRepository;
	
	@Autowired
	private EventoRepository eventoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public List<Reserva> findAll() {
		return reservaRepository.findAll();
	}

	@Override
	public Reserva findById(Integer id) {
		return reservaRepository.findById(id).orElse(null);
	}

	@Override
	public Reserva insertOne(Reserva obj) {
		try {
			obj.setIdReserva(0);
			return reservaRepository.save(obj);
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public Reserva updateOne(Reserva obj) {
		try {
			return reservaRepository.save(obj);
		}catch(Exception e){
			System.out.println("Error al actualizar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public int deleteById(Integer id) {
		if (reservaRepository.existsById(id)) {
			try {
				reservaRepository.deleteById(id);
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
	public Reserva insertFromDto(ReservaDto reservaDto) {
		Reserva reserva = new Reserva();
	    
		reserva.setIdReserva(reservaDto.getIdReserva());
		reserva.setPrecioVenta(reservaDto.getPrecioVenta());
		reserva.setObservaciones(reservaDto.getObservaciones());
		reserva.setCantidad(reservaDto.getCantidad());
		
		Evento evento = eventoRepository.findById(reservaDto.getIdEvento()).orElse(null);
		reserva.setEvento(evento);

		Usuario usuario = usuarioRepository.findById(reservaDto.getUsername()).orElse(null);
		reserva.setUsuario(usuario);

		return insertOne(reserva);
	}

	@Override
	public Reserva updateFromDto(ReservaDto reservaDto) {
		Reserva reserva = reservaRepository.findById(reservaDto.getIdReserva()).orElse(null);
		if (reserva == null) return null;
		    
		reserva.setPrecioVenta(reservaDto.getPrecioVenta());
		reserva.setObservaciones(reservaDto.getObservaciones());
		reserva.setCantidad(reservaDto.getCantidad());

		Evento evento = eventoRepository.findById(reservaDto.getIdEvento()).orElse(null);
		reserva.setEvento(evento);

		Usuario usuario = usuarioRepository.findById(reservaDto.getUsername()).orElse(null);
		reserva.setUsuario(usuario);
		    
		return updateOne(reserva);		
	}

	@Override
	public List<Reserva> buscarReservasDeUnCliente(String username) {
		
		return reservaRepository.findByUsuarioUsername(username);
	}
	
}
