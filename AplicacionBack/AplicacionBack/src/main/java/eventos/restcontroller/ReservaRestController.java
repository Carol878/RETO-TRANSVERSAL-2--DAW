package eventos.restcontroller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eventos.model.dto.ReservaDto;
import eventos.model.dto.ReservaSalidaDto;
import eventos.service.ReservaService;


@RestController
@RequestMapping("/reservas")
public class ReservaRestController {
	
	@Autowired
	public ReservaService reservaService;
	
	@GetMapping("/")
	ResponseEntity<?> buscarTodos(){
		List<ReservaSalidaDto> listaReservasDto = reservaService.findAll()
			    .stream()
			    .map(reserva -> ReservaSalidaDto.crearReservaSalidaDtoDesdeReserva(reserva))
			    .toList();
		return ResponseEntity.ok(listaReservasDto);
	}
	
	@GetMapping("/{id}")
	ResponseEntity<?> buscarUno(@PathVariable int id){
		return ResponseEntity.ok(ReservaSalidaDto.crearReservaSalidaDtoDesdeReserva(reservaService.findById(id)));
	}
	
	@PostMapping("/")
	ResponseEntity<?> insertarUno(@RequestBody ReservaDto reserva){
		return ResponseEntity.ok(ReservaSalidaDto.crearReservaSalidaDtoDesdeReserva(reservaService.insertFromDto(reserva)));
	}
	@PutMapping("/")
	ResponseEntity<?> actualizarUno(@RequestBody ReservaDto reserva){
		return ResponseEntity.ok(ReservaSalidaDto.crearReservaSalidaDtoDesdeReserva(reservaService.updateFromDto(reserva)));
	}
	@DeleteMapping("/{id}")
	ResponseEntity<?> eliminarUno(@PathVariable int id){
		return ResponseEntity.ok(reservaService.deleteById(id));
	}
	
	@GetMapping("/clientes/{id}")
	ResponseEntity<?> buscarUnoClientes(@PathVariable int id){
		return ResponseEntity.ok(ReservaSalidaDto.crearReservaSalidaDtoDesdeReserva(reservaService.findById(id)));
	}
	
	@PostMapping("/clientes/reservar")
	ResponseEntity<?> reservar(@RequestBody ReservaDto reservaDto){
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/clientes/misReservas/{username}")
	ResponseEntity<?> buscarReservasDeUnCliente(@PathVariable String username){
		List<ReservaSalidaDto> listaReservasDto = reservaService.buscarReservasDeUnCliente(username)
			    .stream()
			    .map(reserva -> ReservaSalidaDto.crearReservaSalidaDtoDesdeReserva(reserva))
			    .toList();
		return ResponseEntity.ok(listaReservasDto);
	}
	
	@DeleteMapping("/clientes/cancelarReserva/{id}")
	ResponseEntity<?> cancelarReserva(@PathVariable int idReserva){
		return ResponseEntity.ok(reservaService.deleteById(idReserva));
	}
	
}
