package eventos.model.entities;

import java.time.LocalDate;

import eventos.model.enums.Destacado;
import eventos.model.enums.Estado;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@EqualsAndHashCode(of = "idEvento")


@Entity
@Table(name = "eventos")
public class Evento {

	@Id
	@Column(name="id_evento")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEvento;
	
	private String nombre;
	private String descripcion;
	
	@Column(name="fecha_inicio")
	private LocalDate fechaInicio;
	
	private int duracion;
	private String direccion;
	
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
	@Enumerated(EnumType.STRING)
	private Destacado destacado;
	
	@Column(name="aforo_maximo")
	private int aforoMaximo;
	
	@Column(name="minimo_asistencia")
	private int minimoAsistencia;
	
	private double precio;
	
	@ManyToOne
	@JoinColumn(name="id_tipo")
	private Tipo tipo;
	
	
}
