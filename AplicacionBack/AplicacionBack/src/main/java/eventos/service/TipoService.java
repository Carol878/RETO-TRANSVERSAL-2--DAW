package eventos.service;

import eventos.model.dto.TipoDto;
import eventos.model.entities.Tipo;

public interface TipoService extends CrudGenerico<Tipo, Integer>{

	Tipo insertFromDto(TipoDto TipoDto);
	
}
