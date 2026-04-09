package eventos.service;

import eventos.model.dto.PerfilDto;
import eventos.model.entities.Perfil;

public interface PerfilService extends CrudGenerico<Perfil, Integer>{

	Perfil insertFromDto(PerfilDto UsuarioDto);
	
}
