import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { TipoService } from '../../services/tipo.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-gestioneventos-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestioneventos-component.html',
  styleUrl: './gestioneventos-component.css'
})
export class GestioneventosComponent implements OnInit {

  listaEventos: Evento[] = [];
  listaTipos: any[] = [];
  modoEdicion = false;
  eventoEditando: Evento | null = null;

  nuevoEvento = {
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    duracion: 0,
    direccion: '',
    destacado: 'N',
    aforoMaximo: 0,
    minimoAsistencia: 0,
    precio: 0,
    idTipo: 1
  };

  constructor(
    private eventoService: EventoService,
    private tipoService: TipoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarTipos();
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.listaEventos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando eventos:', err)
    });
  }

  cargarTipos() {
    this.tipoService.getTipos().subscribe({
      next: (data) => {
        this.listaTipos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando tipos:', err)
    });
  }

  resetFormulario() {
    this.nuevoEvento = {
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      duracion: 0,
      direccion: '',
      destacado: 'N',
      aforoMaximo: 0,
      minimoAsistencia: 0,
      precio: 0,
      idTipo: 1
    };
  }

  borrar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este evento de forma DEFINITIVA?\n\nNOTA: Si el evento ya tiene reservas de clientes, el sistema bloqueará el borrado por seguridad.')) {
      this.eventoService.borrarEvento(id).subscribe({
        next: (respuesta) => {
          if (respuesta === 1) {
            alert('Evento eliminado permanentemente de la base de datos.');
            this.cargarEventos();
            this.cdr.detectChanges();
          } else {
            alert('Este evento no puede eliminarse porque hay reservas en camino. Te recomendamos cancelarlo.');
          }
        },
        error: (err) => {
          console.error('Error borrando evento:', err);
          alert('Este evento no puede eliminarse porque hay reservas en camino. Te recomendamos cancelarlo.');
        }
      });
    }
  }

  cancelar(id: number) {
    if (confirm('¿Estás seguro de que deseas cancelar este evento? Esta acción cambiará su estado.')) {
      this.eventoService.cancelarEvento(id).subscribe({
        next: () => {
          alert('El evento ha sido cancelado exitosamente.');
          this.cargarEventos();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error cancelando evento:', err);
          alert('Hubo un error al cancelar el evento.');
        }
      });
    }
  }

  activar(id: number) {
    if (confirm('¿Estás seguro de que deseas reactivar este evento? Volverá a estar visible para los clientes.')) {
      this.eventoService.activarEvento(id).subscribe({
        next: () => {
          alert('El evento ha sido reactivado exitosamente.');
          this.cargarEventos();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error activando evento:', err);
          alert('Hubo un error al activar el evento.');
        }
      });
    }
  }

  editar(id: number) {
    this.eventoService.getEvento(id).subscribe({
      next: (evento) => {
        this.eventoEditando = evento;
        this.modoEdicion = true;
        this.nuevoEvento = {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          fechaInicio: evento.fechaInicio,
          duracion: evento.duracion,
          direccion: evento.direccion,
          destacado: evento.destacado,
          aforoMaximo: evento.aforoMaximo,
          minimoAsistencia: evento.minimoAsistencia,
          precio: evento.precio,
          idTipo: evento.tipo.idTipo
        };
        this.cdr.detectChanges();
      }
    });
  }

    guardar() {
        // Comprobamos que los campos no estén vacíos
        if (
          this.nuevoEvento.nombre.trim() === '' ||
          this.nuevoEvento.descripcion.trim() === '' ||
          this.nuevoEvento.fechaInicio === '' ||
          this.nuevoEvento.direccion.trim() === '' ||
          this.nuevoEvento.aforoMaximo <= 0 ||
          this.nuevoEvento.precio < 0
        ) {
          alert('No se puede guardar. Por favor, rellena todos los campos de texto y asegúrate de que el aforo y precio son válidos.');
          return;
        }

        // Si pasa el control, sigue su curso normal:
        if (this.modoEdicion && this.eventoEditando) {
          const eventoActualizado = { ...this.eventoEditando, ...this.nuevoEvento };
          this.eventoService.actualizarEvento(eventoActualizado).subscribe({
            next: () => {
              this.cargarEventos();
              this.modoEdicion = false;
              this.eventoEditando = null;
              this.resetFormulario();
              this.cdr.detectChanges();
            },
            error: (err) => console.error('Error actualizando evento:', err)
          });
        } else {
          this.eventoService.crearEvento(this.nuevoEvento).subscribe({
            next: () => {
              this.cargarEventos();
              this.resetFormulario();
              this.cdr.detectChanges();
              alert('✅ Evento creado correctamente.');
            },
            error: (err) => console.error('Error creando evento:', err)
          });
    }
  }
}
