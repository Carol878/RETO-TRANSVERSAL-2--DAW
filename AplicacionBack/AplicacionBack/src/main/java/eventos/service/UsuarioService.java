package eventos.service;

import eventos.model.dto.UsuarioDto;
import eventos.model.dto.UsuarioRegistroDto;
import eventos.model.entities.Usuario;

public interface UsuarioService extends CrudGenerico<Usuario, String>{
	
	Usuario findByUsernameAndPassword(String username, String password);
	Usuario insertFromDto(UsuarioDto usuarioDto);
	Usuario updateFromDto(UsuarioDto usuarioDto);
	Usuario registerOne(UsuarioRegistroDto usuarioRegistroDto);
}
