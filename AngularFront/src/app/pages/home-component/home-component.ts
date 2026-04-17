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
      next: (datos) => {
        // En un futuro podríamos filtrar aquí solo los "Destacados"
        this.eventos = datos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error cargando la home:", err)
    });
  }
}
