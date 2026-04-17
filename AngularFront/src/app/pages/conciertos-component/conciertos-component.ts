// 1. Importamos ChangeDetectorRef
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para filtros
import { FormsModule } from '@angular/forms'; // 1. IMPORTANTE: Para leer los inputs
import { EventocardComponent } from '../../components/eventocard-component/eventocard-component';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-conciertos-component',
  standalone: true,
  imports: [EventocardComponent, CommonModule, FormsModule],
  templateUrl: './conciertos-component.html',
  styleUrl: './conciertos-component.css'
})
export class ConciertosComponent implements OnInit {

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = []; // 3. Esta es la lista que se verá en pantalla

  // Variables para los filtros
    terminoBusqueda: string = '';
    categoriaSeleccionada: string = '';

  // 2. Inyectamos el despertador (cdr) en el constructor
  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("Llamando al backend real...");

    this.eventoService.getEventos().subscribe({
      next: (datosDelBackend: Evento[]) => {
        // Metemos los datos en la variable
        this.eventos = datosDelBackend; // Al empezar, mostramos todos
        this.eventosFiltrados = datosDelBackend; // Al empezar, mostramos todos
         this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error("Error al traer eventos:", err);
      }
    });
  }
// 4. FUNCIÓN DE FILTRADO
  aplicarFiltros() {
    this.eventosFiltrados = this.eventos.filter(ev => {
      // Filtro por nombre (lo pasamos a minúsculas para que no importe si escribes con mayúsculas)
      const coincideNombre = ev.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());

      // Filtro por categoría (si está vacío, pasan todos)
      const coincideCategoria = this.categoriaSeleccionada === '' ||
                                 ev.tipo.nombre.toLowerCase() === this.categoriaSeleccionada.toLowerCase();

      return coincideNombre && coincideCategoria;
    });
  }
}

