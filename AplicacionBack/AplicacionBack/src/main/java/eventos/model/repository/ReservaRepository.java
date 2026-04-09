package eventos.model.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import eventos.model.entities.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Integer>{

	ArrayList<Reserva> findByUsuarioUsername(String username);
	
	@Query("select COALESCE(SUM(r.cantidad),0) from Reserva r where r.evento.idEvento = ?1 ")
	Integer calcularAforoDeEvento(int idEvento);
	
}
