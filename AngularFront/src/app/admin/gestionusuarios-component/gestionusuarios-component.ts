import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-gestionusuarios-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionusuarios-component.html',
  styleUrl: './gestionusuarios-component.css'
})
export class GestionusuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioEdicion: any = null;
  mostrarFormulario: boolean = false;

  // Nuevas variables para el control del formulario
  esNuevo: boolean = false;
  rolSeleccionado: number = 2; // 2 suele ser CLIENTE, 1 suele ser ADMON en BBDD

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error al cargar usuarios", err)
    });
  }

  // FUNCIÓN PARA CREAR NUEVO USUARIO
  abrirFormularioNuevo() {
    this.esNuevo = true;
    this.rolSeleccionado = 2; // Por defecto Cliente
    this.usuarioEdicion = {
      username: '',
      password: '',
      nombre: '',
      apellidos: '',
      email: '',
      direccion: ''
    };
    this.mostrarFormulario = true;
    this.cdr.detectChanges();
  }

  // FUNCIÓN PARA EDITAR USUARIO EXISTENTE
  abrirFormulario(usuario: any) {
    this.esNuevo = false;
    this.usuarioEdicion = { ...usuario };

    // Extraer el ID del rol actual para mostrarlo en el desplegable
    if (usuario.perfiles && usuario.perfiles.length > 0) {
      this.rolSeleccionado = usuario.perfiles[0].idPerfil || usuario.perfiles[0].id_perfil || 2;
    } else {
      this.rolSeleccionado = 2;
    }

    this.mostrarFormulario = true;
    this.cdr.detectChanges();
  }

  guardarUsuario() {
    const datosParaEnviar = { ...this.usuarioEdicion };

    // Asignamos el rol
    datosParaEnviar.perfiles = [Number(this.rolSeleccionado)];

    if (this.esNuevo) {
      // LLAMADA PARA CREAR
      this.usuarioService.crearUsuario(datosParaEnviar).subscribe({
        next: () => {
          alert('¡Usuario CREADO correctamente!');
          this.mostrarFormulario = false;
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el usuario. Comprueba que el Username no exista ya.');
        }
      });
    } else {
      // LLAMADA PARA EDITAR
      this.usuarioService.editarUsuario(datosParaEnviar).subscribe({
        next: () => {
          alert('Usuario ACTUALIZADO correctamente');
          this.mostrarFormulario = false;
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el usuario.');
        }
      });
    }
  }

  eliminarUsuario(username: string) {
    if (confirm(`¿Seguro que quieres eliminar definitivamente al usuario ${username}?`)) {
      this.usuarioService.eliminarUsuario(username).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.username !== username);
          this.cdr.detectChanges();
          alert(`Usuario ${username} eliminado correctamente.`);
        },
        error: (err) => alert('Error al eliminar. Puede que este usuario tenga reservas asociadas.')
      });
    }
  }

  obtenerRoles(perfiles: any[]): string {
    if (!perfiles || perfiles.length === 0) return 'CLIENTE';
    return perfiles.map(p => p.nombre).join(', ');
  }
}
