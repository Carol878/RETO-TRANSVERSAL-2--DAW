import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventocardComponent } from '../../components/eventocard-component/eventocard-component';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [EventocardComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe({
      next: (datos: Evento[]) => {

        // Aplicamos el filtro para Activos y Destacados
        this.eventos = datos.filter(ev =>
          ev.estado === 'ACTIVO' && ev.destacado === 'S'
        );

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error("Error cargando la home:", err)
    });
  }
}
