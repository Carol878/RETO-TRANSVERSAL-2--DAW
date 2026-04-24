import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventocardComponent } from '../../components/eventocard-component/eventocard-component';
import { EventoService } from '../../services/evento.service';
import { TipoService } from '../../services/tipo.service';
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
  eventosFiltrados: Evento[] = [];
  categorias: any[] = [];

  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(
    private eventoService: EventoService,
    private tipoService: TipoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Cargamos los eventos
    this.eventoService.getEventos().subscribe({
      next: (datos: Evento[]) => {
        // Solo dejamos pasar los ACTIVOS
        const eventosActivos = datos.filter(ev => ev.estado === 'ACTIVO');

        // Guardamos solo los activos como nuestra base de datos particular para esta página
        this.eventos = eventosActivos;
        this.eventosFiltrados = eventosActivos;

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error("Error al traer eventos:", err)
    });

    // 2. Cargamos las categorías de la BD
    this.tipoService.getTipos().subscribe({
      next: (datos: any[]) => {
        this.categorias = datos;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error("Error al traer categorías:", err)
    });
  }

  aplicarFiltros() {
    // Al filtrar sobre this.eventos, garantizamos que nunca habrá uno cancelado
    this.eventosFiltrados = this.eventos.filter(ev => {
      const coincideNombre = ev.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());

      const coincideCategoria = this.categoriaSeleccionada === '' ||
                                 ev.tipo.nombre.toLowerCase() === this.categoriaSeleccionada.toLowerCase();

      return coincideNombre && coincideCategoria;
    });
  }
}
