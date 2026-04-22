import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestioneventos-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestioneventos-component.html',
  styleUrl: './gestioneventos-component.css'
})
export class GestioneventosComponent implements OnInit{

 listaEventos: Evento[] = [];
 modoEdicion = false; // false = crear, true = editar
 eventoEditando: Evento | null = null
 

  nuevoEvento = {
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    duracion: 0,
    direccion: '',
    destacado: 'NO',
    aforoMaximo: 0,
    minimoAsistencia: 0,
    precio: 0,
    tipo: {
      idTipo: 1,
      nombre: '',
      descripcion: ''
    }
  };

  constructor(private eventoService: EventoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log("ejecuta onInit");
    this.cargarEventos();
  }

  cargarEventos() {
    console.log("LLAMANDO AL SERVICIO...");
    this.eventoService.getEventos().subscribe({
      next: (data) => {console.log("DATOS RECIBIDOS:", data); this.listaEventos = data;  this.cdr.detectChanges(); },
      error: (err) => console.error('Error cargando eventos:', err)
    });
  }

  /*crearEvento() {
    this.eventoService.crearEvento(this.nuevoEvento).subscribe({
      next: () => {
        this.cargarEventos();
        this.resetFormulario();
      },
      error: (err) => console.error('Error creando evento:', err)
    });
  }*/

  resetFormulario() {
    this.nuevoEvento = {
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      duracion: 0,
      direccion: '',
      destacado: 'NO',
      aforoMaximo: 0,
      minimoAsistencia: 0,
      precio: 0,
      tipo: {
        idTipo: 1,
        nombre: '',
        descripcion: ''
      }
    };
  }

  borrar(id: number) {
    this.eventoService.borrarEvento(id).subscribe({
      next: () => {this.cargarEventos(),this.cdr.detectChanges()},
      error: (err) => console.error('Error borrando evento:', err)
    });
  }

  cancelar(id: number) {
    this.eventoService.cancelarEvento(id).subscribe({
      next: () => {this.cargarEventos(),this.cdr.detectChanges()},
      error: (err) => console.error('Error cancelando evento:', err)
    });
  }

  editar(id: number) {
    this.eventoService.getEvento(id).subscribe({
    next: (evento) => {
      this.eventoEditando = evento;
      this.modoEdicion = true;

      // Rellenar el formulario con los datos del evento
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
        tipo: evento.tipo
      };
       this.cdr.detectChanges();
    }
  });
  }

  guardar() {
  if (this.modoEdicion && this.eventoEditando) {
    // ACTUALIZAR
    const eventoActualizado = {
      ...this.eventoEditando,
      ...this.nuevoEvento
    };

    this.eventoService.actualizarEvento(eventoActualizado).subscribe({
      next: () => {
        this.cargarEventos();
        this.modoEdicion = false;   // ← vuelve a modo crear automáticamente
        this.eventoEditando = null;
        this.resetFormulario();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error actualizando evento:', err)
    });

    } else {
      // CREAR
      this.eventoService.crearEvento(this.nuevoEvento).subscribe({
        next: () => {
          this.cargarEventos();
          this.resetFormulario();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error creando evento:', err)
      });
    }
  }



}
