package eventos.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@EqualsAndHashCode(of = "idTipo")


@Entity
@Table(name = "tipos")
public class Tipo {

	@Id
	@Column(name="id_tipo")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idTipo;
	private String nombre;
	private String descripcion;
	
}
