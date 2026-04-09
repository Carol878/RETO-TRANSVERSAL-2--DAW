package eventos.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import eventos.model.dto.UsuarioDto;
import eventos.model.dto.UsuarioRegistroDto;
import eventos.model.entities.Perfil;
import eventos.model.entities.Usuario;
import eventos.model.repository.PerfilRepository;
import eventos.model.repository.UsuarioRepository;

@Service
public class UsuarioServiceImplMy8Jpa implements UsuarioService, UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private PerfilRepository perfilRepository;
	
	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario findById(String username) {
		return usuarioRepository.findById(username).orElse(null);
	}

	@Override
	public Usuario insertOne(Usuario obj) {
		try {
			if (usuarioRepository.findById(obj.getUsername())!=null) {
			return usuarioRepository.save(obj);
			} return null;
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public Usuario updateOne(Usuario obj) {
		try {
			return usuarioRepository.save(obj);
		}catch(Exception e){
			System.out.println("Error al actualizar " +  e.getMessage());
			return null;
		}
	}

	@Override
	public int deleteById(String username) {
		if (usuarioRepository.existsById(username)) {
			try {
				usuarioRepository.deleteById(username);
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
	public Usuario findByUsernameAndPassword(String username, String password) {
		
		return usuarioRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return usuarioRepository.findById(username).orElse(null);
	}

	@Override
	public Usuario insertFromDto(UsuarioDto usuarioDto) {
			
		Usuario usuario = new Usuario();

		usuario.setUsername(usuarioDto.getUsername());
		usuario.setPassword(usuarioDto.getPassword());
		usuario.setNombre(usuarioDto.getNombre());
		usuario.setApellidos(usuarioDto.getApellidos());
		usuario.setDireccion(usuarioDto.getDireccion());
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setEnabled(usuarioDto.getEnabled());
			
		List<Perfil> perfilesDto = new ArrayList<>();
		
		for (int idPerfil:usuarioDto.getPerfiles()) {
			perfilesDto.add(perfilRepository.findById(idPerfil).orElse(null));
		}
		
		usuario.setPerfiles(perfilesDto);
		usuario.setFechaRegistro(LocalDate.now());
		try {
			return usuarioRepository.save(usuario);
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}

	}
	

	@Override
	public Usuario updateFromDto(UsuarioDto usuarioDto) {
		Usuario usuario = new Usuario();

		usuario.setUsername(usuarioDto.getUsername());
		usuario.setPassword(usuarioDto.getPassword());
		usuario.setNombre(usuarioDto.getNombre());
		usuario.setApellidos(usuarioDto.getApellidos());
		usuario.setDireccion(usuarioDto.getDireccion());
		usuario.setEmail(usuarioDto.getEmail());
		usuario.setEnabled(usuarioDto.getEnabled());
			
		List<Perfil> perfilesDto = new ArrayList<>();
		
		for (int idPerfil:usuarioDto.getPerfiles()) {
			perfilesDto.add(perfilRepository.findById(idPerfil).orElse(null));
		}
		
		usuario.setPerfiles(perfilesDto);
		usuario.setFechaRegistro(findById(usuarioDto.getUsername()).getFechaRegistro());
		
		try {
			return usuarioRepository.save(usuario);
		}catch(Exception e){
			System.out.println("Error al insertar " +  e.getMessage());
			return null;
		}

	}

	@Override
	public Usuario registerOne(UsuarioRegistroDto usuarioRegistroDto) {
		Usuario usuario = new Usuario();

		usuario.setUsername(usuarioRegistroDto.getUsername());
		usuario.setPassword("{noop}" + usuarioRegistroDto.getPassword());
		usuario.setNombre(usuarioRegistroDto.getNombre());
		usuario.setApellidos(usuarioRegistroDto.getApellidos());
		usuario.setDireccion(usuarioRegistroDto.getDireccion());
		usuario.setEmail(usuarioRegistroDto.getEmail());
		usuario.setEnabled(1);
			
		List<Perfil> perfilesDto = new ArrayList<>();
		
		perfilesDto.add(perfilRepository.findById(2).orElse(null));
		
		usuario.setPerfiles(perfilesDto);
		
		usuario.setFechaRegistro(LocalDate.now());
		
		return insertOne(usuario);
	}

}
