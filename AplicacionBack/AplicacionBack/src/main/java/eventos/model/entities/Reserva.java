package eventos.model.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(of = "idReserva")


@Entity
@Table(name = "reservas")
public class Reserva {
	

	@Id
	@Column(name="id_reserva")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idReserva;
	
	@ManyToOne
	@JoinColumn(name="id_evento")
	private Evento evento;
	
	@ManyToOne
	@JoinColumn(name="username")
	private Usuario usuario;
	
	@Column(name="precio_venta")
	private double precioVenta;
	
	private String observaciones;
	
	private int cantidad;
	
}
