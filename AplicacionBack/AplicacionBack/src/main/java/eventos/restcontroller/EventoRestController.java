package eventos.restcontroller;

import java.util.List;

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

import eventos.model.dto.EventoDto;
import eventos.model.dto.EventoSalidaDto;
import eventos.model.dto.ReservaSalidaDto;
import eventos.model.entities.Evento;
import eventos.service.EventoService;


@RestController
@RequestMapping("/eventos")
public class EventoRestController {

	@Autowired
	public EventoService eventoService;
	
	@GetMapping("/")
	ResponseEntity<?> buscarTodos(){
		List<EventoSalidaDto> listaEventosDto = eventoService.findAll()
			    .stream()
			    .map(evento -> EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)))
			    .toList();
		return ResponseEntity.ok(listaEventosDto);
	}
	
	@GetMapping("/{id}")
	ResponseEntity<?> buscarUno(@PathVariable int id){
		Evento evento = eventoService.findById(id);
		return ResponseEntity.ok(EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)));
	}
	
	@PostMapping("/")
	ResponseEntity<?> insertarUno(@RequestBody EventoDto evento){
		Evento eventoNuevo = eventoService.insertFromDto(evento);
		return ResponseEntity.ok(EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(eventoNuevo,eventoService.calcularPlazasDisponibles(eventoNuevo)));
	}
	@PutMapping("/")
	ResponseEntity<?> actualizarUno(@RequestBody EventoDto evento){
		Evento eventoNuevo = eventoService.updateFromDto(evento);
		return ResponseEntity.ok(EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(eventoNuevo,eventoService.calcularPlazasDisponibles(eventoNuevo)));
	}
	@DeleteMapping("/{id}")
	ResponseEntity<?> eliminarUno(@PathVariable int id){
		return ResponseEntity.ok(eventoService.deleteById(id));
	}
	
	@PutMapping("/cancelar/{id}")
	ResponseEntity<?> cancelarUno(@RequestBody int idEvento){
		Evento eventoNuevo = eventoService.cancelOne(idEvento);
		return ResponseEntity.ok(EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(eventoNuevo,eventoService.calcularPlazasDisponibles(eventoNuevo)));
	}
	
	@GetMapping("/clientes/activos")
	ResponseEntity<?> buscarActivos(){
		List<EventoSalidaDto> listaEventosDto = eventoService.buscarActivos()
			    .stream()
			    .map(evento -> EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)))
			    .toList();
		return ResponseEntity.ok(listaEventosDto);
	}
	@GetMapping("/clientes/destacados")
	ResponseEntity<?> buscarDestacados(){
		List<EventoSalidaDto> listaEventosDto = eventoService.buscarDestacados()
			    .stream()
			    .map(evento -> EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)))
			    .toList();
		return ResponseEntity.ok(listaEventosDto);
	}
	@GetMapping("/clientes/terminados")
	ResponseEntity<?> buscarTerminados(){
		List<EventoSalidaDto> listaEventosDto = eventoService.buscarTerminados()
			    .stream()
			    .map(evento -> EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)))
			    .toList();
		return ResponseEntity.ok(listaEventosDto);
	}
	@GetMapping("/clientes/cancelados")
	ResponseEntity<?> buscarCancelados(){
		List<EventoSalidaDto> listaEventosDto = eventoService.buscarCancelados()
			    .stream()
			    .map(evento -> EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)))
			    .toList();
		return ResponseEntity.ok(listaEventosDto);
	}
	@GetMapping("/clientes/{id}")
	ResponseEntity<?> buscarUnoClientes(@PathVariable int id){
		Evento evento = eventoService.findById(id);
		return ResponseEntity.ok(EventoSalidaDto.crearEventoSalidaDtoDesdeEvento(evento,eventoService.calcularPlazasDisponibles(evento)));
	}
	
	
	
}
