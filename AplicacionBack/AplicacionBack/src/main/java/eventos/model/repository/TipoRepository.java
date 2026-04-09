package eventos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import eventos.model.entities.Tipo;

public interface TipoRepository extends JpaRepository<Tipo, Integer> {

}
