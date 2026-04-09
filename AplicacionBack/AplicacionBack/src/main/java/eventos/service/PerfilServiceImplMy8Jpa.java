package eventos.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import eventos.model.dto.PerfilDto;
import eventos.model.dto.UsuarioDto;
import eventos.model.entities.Perfil;
import eventos.model.entities.Usuario;
import eventos.model.repository.PerfilRepository;

@Service
public class PerfilServiceImplMy8Jpa implements PerfilService{

	@Autowired
	private PerfilRepository perfilRepository;
	
	@Override
	public List<Perfil> findAll() {
		
		return perfilRepository.findAll();
	}

	@Override
	public Perfil findById(Integer id) {
		return perfilRepository.findById(id).orElse(null);
	}

	@Override
	public Perfil insertOne(Perfil obj) {
		try {
			return perfilRepository.save(obj);
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public Perfil updateOne(Perfil obj) {
		try {
			Perfil existente = perfilRepository.findById(obj.getIdPerfil()).orElse(null);
			existente.setNombre(obj.getNombre());
			return perfilRepository.save(existente);
		}catch(Exception e){
			System.out.println("Error al actualizar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public int deleteById(Integer id) {
		if (perfilRepository.existsById(id)) {
			try {
				perfilRepository.deleteById(id);
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
	public Perfil insertFromDto(PerfilDto UsuarioDto) {
			
		Perfil perfil = new Perfil();
		
		perfil.setNombre(UsuarioDto.getNombre());
		
		return insertOne(perfil);
		
	}
	

	

}
