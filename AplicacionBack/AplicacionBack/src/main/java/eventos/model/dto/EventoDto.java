package eventos.model.dto;

import java.time.LocalDate;

import eventos.model.enums.Destacado;
import eventos.model.enums.Estado;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data


public class EventoDto {
	
	private int idEvento;
	private String nombre;
	private String descripcion;
	private LocalDate fechaInicio;
	private int duracion;
	private String direccion;
	private Destacado destacado;
	private int aforoMaximo;
	private int minimoAsistencia;
	private double precio;
	private int idTipo;
}
