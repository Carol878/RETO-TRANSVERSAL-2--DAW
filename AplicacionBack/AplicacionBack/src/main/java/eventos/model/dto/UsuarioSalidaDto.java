package eventos.model.dto;
import java.time.LocalDate;
import java.util.List;

import eventos.model.entities.Perfil;
import eventos.model.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UsuarioSalidaDto {
	
	private String username;
	private String nombre;
	private String apellidos;
	private String direccion;
	private String email;
	private LocalDate fechaRegistro;
	private List<Perfil> perfiles;
	
	public static UsuarioSalidaDto crearUsuarioSalidaDtoDesdeUsuario(Usuario usuario) {
		UsuarioSalidaDto usuarioSalidaDto = new UsuarioSalidaDto();
		usuarioSalidaDto.setUsername(usuario.getUsername());
		usuarioSalidaDto.setNombre(usuario.getNombre());
		usuarioSalidaDto.setEmail(usuario.getEmail());
		usuarioSalidaDto.setApellidos(usuario.getApellidos());
		usuarioSalidaDto.setDireccion(usuario.getDireccion());
		usuarioSalidaDto.setFechaRegistro(usuario.getFechaRegistro());
		usuarioSalidaDto.setPerfiles(usuario.getPerfiles());
		return usuarioSalidaDto;
	}
}
