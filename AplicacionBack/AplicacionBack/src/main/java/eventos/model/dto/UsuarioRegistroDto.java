package eventos.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class UsuarioRegistroDto {

	private String username;
	private String password;
	private String nombre;
	private String apellidos;
	private String direccion;
	private String email;
	
}