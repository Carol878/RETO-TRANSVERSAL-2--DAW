package eventos.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eventos.model.dto.PerfilDto;
import eventos.model.entities.Perfil;
import eventos.service.PerfilService;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/perfiles")
public class PerfilRestController {

	@Autowired
	public PerfilService perfilService;
	
	@GetMapping("/")
	ResponseEntity<?> buscarTodos(){
		return ResponseEntity.ok(perfilService.findAll());
	}
	
	@GetMapping("/{id}")
	ResponseEntity<?> buscarUno(@PathVariable int id){
		return ResponseEntity.ok(perfilService.findById(id));
	}
	
	@PostMapping("/")
	ResponseEntity<?> insertarUno(@RequestBody PerfilDto perfil){
		System.out.println("Perfil recibido: " + perfil);
		return ResponseEntity.ok(perfilService.insertFromDto(perfil));
	}
	@PutMapping("/")
	ResponseEntity<?> actualizarUno(@RequestBody Perfil perfil){
		return ResponseEntity.ok(perfilService.updateOne(perfil));
	}
	@DeleteMapping("/{id}")
	ResponseEntity<?> eliminarUno(@PathVariable int id){
		return ResponseEntity.ok(perfilService.deleteById(id));
	}
	
	
	
}
