package eventos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import eventos.model.dto.TipoDto;
import eventos.model.entities.Perfil;
import eventos.model.entities.Tipo;
import eventos.model.repository.EventoRepository;
import eventos.model.repository.TipoRepository;

@Service
public class TipoServiceImplMy8Jpa implements TipoService{

	@Autowired
	private TipoRepository tipoRepository;
	
	@Override
	public List<Tipo> findAll() {
		
		return tipoRepository.findAll();
	}

	@Override
	public Tipo findById(Integer id) {
		return tipoRepository.findById(id).orElse(null);
	}

	@Override
	public Tipo insertOne(Tipo obj) {
		try {
			obj.setIdTipo(0);
			return tipoRepository.save(obj);
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public Tipo updateOne(Tipo obj) {
		try {
			Tipo existente = tipoRepository.findById(obj.getIdTipo()).orElse(null);
			existente.setNombre(obj.getNombre());
			existente.setDescripcion(obj.getDescripcion());
			return tipoRepository.save(existente);
		}catch(Exception e){
			System.out.println("Error al actualizar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public int deleteById(Integer id) {
		if (tipoRepository.existsById(id)) {
			try {
				tipoRepository.deleteById(id);
				return 1;
			}catch (Exception e) {
				System.out.println(e.getMessage());
				return -1;
			}
		} else {
			return 0;
		}
	}

	@Override
	public Tipo insertFromDto(TipoDto TipoDto) {
		Tipo tipo = new Tipo();
		
		tipo.setNombre(TipoDto.getNombre());
		tipo.setDescripcion(TipoDto.getDescripcion());
		
		return insertOne(tipo);
	}

}
