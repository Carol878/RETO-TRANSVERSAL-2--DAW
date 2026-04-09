package eventos.model.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import eventos.model.entities.Evento;
import eventos.model.enums.Destacado;
import eventos.model.enums.Estado;

public interface EventoRepository extends JpaRepository<Evento, Integer>{

	ArrayList<Evento> findByEstado(Estado estado);
	ArrayList<Evento> findByDestacado(Destacado destacado);
	
}
