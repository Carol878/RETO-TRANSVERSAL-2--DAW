package eventos.model.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@EqualsAndHashCode(of = "username")

@Entity
@Table(name="usuarios")
public class Usuario implements Serializable, UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	private String username;
	private String password;
	private String nombre;
	private String apellidos;
	private String direccion;
	private String email;
	private int enabled;
	private LocalDate fechaRegistro;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="usuario_perfiles", 
				joinColumns = @JoinColumn(name= "username"), 
				inverseJoinColumns = @JoinColumn(name="id_perfil"))
	private List<Perfil> perfiles;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return perfiles.stream()
				.map(p ->  new SimpleGrantedAuthority(p.getNombre()))
				.toList();
	}
	
	
}

