package eventos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import eventos.model.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{

	public Usuario findByUsernameAndPassword(String username, String password);
	
}
