import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-eventodetalle-component',
  standalone: true,
  imports: [RouterLink],
  // ¡AQUÍ ESTABA EL ERROR 2! Ahora apunta al archivo correcto
  templateUrl: './eventodetalle-component.html'
})
export class EventodetalleComponent implements OnInit {

  evento: Evento | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 0;

    if (id > 0) {
      this.eventoService.getEvento(id).subscribe({
        next: (datos) => {
          this.evento = datos;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error al cargar los detalles:", err)
      });
    }
  }
}
