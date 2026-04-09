package eventos.restcontroller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eventos.model.dto.UsuarioDto;
import eventos.model.dto.UsuarioEntradaDto;
import eventos.model.dto.UsuarioRegistroDto;
import eventos.model.dto.UsuarioSalidaDto;
import eventos.model.entities.Usuario;
import eventos.security.JwtService;
import eventos.service.UsuarioService;



@RestController
@RequestMapping("/usuarios")
public class UsuarioRestController {
	
	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserDetailsService userDetailsService;

	@PostMapping("/login")
	ResponseEntity<?> login(@RequestBody UsuarioEntradaDto usuario) {
		// Autenticar con Spring Security
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword())
				);

		// Si llegamos aquí, las credenciales son válidas
		UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getUsername());
		String token = jwtService.generateToken(userDetails);

		// Opcional: incluir datos del usuario en la respuesta
		Usuario usuarioCompleto = usuarioService.findById(usuario.getUsername());
		Map<String, Object> response = new HashMap<>();
		response.put("token", token);
		response.put("usuario", UsuarioSalidaDto.crearUsuarioSalidaDtoDesdeUsuario(usuarioCompleto));

		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/registro")
	ResponseEntity<?> registro(@RequestBody UsuarioRegistroDto usuario) {
		

		return ResponseEntity.ok(usuarioService.registerOne(usuario));
	}
	
	@GetMapping("/")
	ResponseEntity<?> buscarTodos(){
		return ResponseEntity.ok(usuarioService.findAll());
	}
	
	@GetMapping("/{username}")
	ResponseEntity<?> buscarUno(@PathVariable String username){
		return ResponseEntity.ok(usuarioService.findById(username));
	}
	
	@PostMapping("/")
	ResponseEntity<?> insertarUno(@RequestBody UsuarioDto usuario){
		return ResponseEntity.ok(usuarioService.insertFromDto(usuario));
	}
	@PutMapping("/")
	ResponseEntity<?> actualizarUno(@RequestBody UsuarioDto usuario){
		return ResponseEntity.ok(usuarioService.updateFromDto(usuario));
	}
	@DeleteMapping("/{username}")
	ResponseEntity<?> eliminarUno(@PathVariable String username){
		return ResponseEntity.ok(usuarioService.deleteById(username));
	}
}