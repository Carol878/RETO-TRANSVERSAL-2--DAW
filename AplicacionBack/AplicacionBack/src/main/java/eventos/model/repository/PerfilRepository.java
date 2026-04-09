package eventos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import eventos.model.entities.Perfil;

public interface PerfilRepository extends JpaRepository<Perfil, Integer>{

}
