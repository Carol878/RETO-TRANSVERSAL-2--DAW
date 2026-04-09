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

import eventos.model.entities.Tipo;
import eventos.service.TipoService;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/tipos")
public class TipoRestController {

	@Autowired
	public TipoService tipoService;
	
	@GetMapping("/")
	ResponseEntity<?> buscarTodos(){
		return ResponseEntity.ok(tipoService.findAll());
	}
	
	@GetMapping("/{id}")
	ResponseEntity<?> buscarUno(@PathVariable int id){
		return ResponseEntity.ok(tipoService.findById(id));
	}
	
	@PostMapping("/")
	ResponseEntity<?> insertarUno(@RequestBody Tipo tipo){
		return ResponseEntity.ok(tipoService.insertOne(tipo));
	}
	@PutMapping("/")
	ResponseEntity<?> actualizarUno(@RequestBody Tipo tipo){
		return ResponseEntity.ok(tipoService.updateOne(tipo));
	}
	@DeleteMapping("/{id}")
	ResponseEntity<?> eliminarUno(@PathVariable int id){
		return ResponseEntity.ok(tipoService.deleteById(id));
	}
	
}