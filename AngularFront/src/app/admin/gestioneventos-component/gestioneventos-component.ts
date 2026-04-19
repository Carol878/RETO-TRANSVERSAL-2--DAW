import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestioneventos-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gestioneventos-component.html',
  styleUrl: './gestioneventos-component.css'
})
export class GestioneventosComponent {

  // Datos de ejemplo basados en tu HTML original
  listaEventos = [
    { idEvento: 1, nombre: 'Festival Rock', aforoMaximo: 5000, fechaInicio: '2026-06-15', precio: 50, estado: 'Activo' },
    { idEvento: 2, nombre: 'Noche de Jazz', aforoMaximo: 1500, fechaInicio: '2026-06-22', precio: 35, estado: 'Destacado' }
  ];

  nuevoEvento = { nombre: '', fechaInicio: '', ubicacion: '', aforo: 0, descripcion: '' };

  crearEvento() {
    console.log('Guardando:', this.nuevoEvento);
    // Aquí irá la llamada al servicio más adelante
  }

  borrar(id: number) {
    this.listaEventos = this.listaEventos.filter(e => e.idEvento !== id);
  }

  editar(id: number) { console.log('Editando evento:', id); }
  cancelar(id: number) { console.log('Cancelando evento:', id); }
}
