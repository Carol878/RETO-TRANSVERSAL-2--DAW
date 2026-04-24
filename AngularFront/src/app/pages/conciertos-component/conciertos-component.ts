import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventocardComponent } from '../../components/eventocard-component/eventocard-component';
import { EventoService } from '../../services/evento.service';
import { TipoService } from '../../services/tipo.service'; // <--- Importamos el servicio de tipos
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
  categorias: any[] = []; // <--- Nueva variable para las categorías de la BD

  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(
    private eventoService: EventoService,
    private tipoService: TipoService, // <--- Inyectamos el servicio
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Cargamos los eventos
    this.eventoService.getEventos().subscribe({
      next: (datos: Evento[]) => {
        this.eventos = datos;
        this.eventosFiltrados = datos;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error("Error al traer eventos:", err)
    });

    // 2. Cargamos las categorías dinámicamente de la BD
    this.tipoService.getTipos().subscribe({
      next: (datos: any[]) => {
        this.categorias = datos;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error("Error al traer categorías:", err)
    });
  }

  aplicarFiltros() {
    this.eventosFiltrados = this.eventos.filter(ev => {
      const coincideNombre = ev.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());

      // Filtro por categoría: comparamos con el nombre que viene de la BD
      const coincideCategoria = this.categoriaSeleccionada === '' ||
                                 ev.tipo.nombre.toLowerCase() === this.categoriaSeleccionada.toLowerCase();

      return coincideNombre && coincideCategoria;
    });
  }
}
/*export class ConciertosComponent implements OnInit {
  eventos: any[] = [];
  eventosFiltrados: any[] = [];

  // 2. VARIABLES PARA LAS CATEGORÍAS
  categoriasBBDD: any[] = [];
  categoriaActiva: string = 'TODOS';

  constructor(
    private eventoService: EventoService,
    private tipoService: TipoService // 3. LO INYECTAMOS
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarCategorias(); // 4. LLAMAMOS A LA BBDD AL INICIAR
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
      this.eventosFiltrados = data;
    });
  }

  cargarCategorias() {
    this.tipoService.getTipos().subscribe(data => {
      this.categoriasBBDD = data;
    });
  }

  // 5. LA NUEVA LÓGICA DEL FILTRO DINÁMICO
  filtrarPorCategoria(idTipo?: number) {
    if (!idTipo) {
      // Si no pasamos ID, mostramos todo
      this.eventosFiltrados = this.eventos;
      this.categoriaActiva = 'TODOS';
    } else {
      // Filtramos buscando coincidencias con el ID de la categoría
      this.eventosFiltrados = this.eventos.filter(ev =>
        (ev.tipo && ev.tipo.idTipo === idTipo) || ev.idTipo === idTipo
      );

      // Actualizamos el nombre visual del botón activo
      const cat = this.categoriasBBDD.find(c => c.idTipo === idTipo);
      this.categoriaActiva = cat ? cat.nombre : 'FILTRADO';
    }
  }
}*/

/*// 1. Importamos ChangeDetectorRef
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para filtros
import { FormsModule } from '@angular/forms'; // 1. IMPORTANTE: Para leer los inputs
import { EventocardComponent } from '../../components/eventocard-component/eventocard-component';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-conciertos-component',
  standalone: true,
  imports: [EventocardComponent, CommonModule, FormsModule],
  templateUrl: './conciertos-component.html',
  styleUrl: './conciertos-component.css'
})
export class ConciertosComponent implements OnInit {

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = []; // Lista que se ve en pantalla

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
}*/

