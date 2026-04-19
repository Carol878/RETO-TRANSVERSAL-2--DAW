import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { AuthService } from '../../services/auth.service';
import { Evento } from '../../models/evento.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-eventodetalle-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eventodetalle-component.html',
  styleUrl: './eventodetalle-component.css'
})

export class EventodetalleComponent implements OnInit {

  evento: Evento | null = null;

    constructor(
      private route: ActivatedRoute,
      private eventoService: EventoService,
      private authService: AuthService,
      private router: Router,
      private reservaService: ReservaService,
      private cdr: ChangeDetectorRef // 2. Inyectamos el despertador
      ) {}

      ngOnInit(): void {
          const id = this.route.snapshot.paramMap.get('id');

          if (id) {
            this.eventoService.findById(Number(id)).subscribe({
              next: (data: Evento) => {
                this.evento = data;
                this.cdr.detectChanges(); // 3. Pellizco a Angular para que dibuje la pantalla
              },
              error: (err: any) => {
                console.error("2. ERROR. El backend no nos da los datos:", err);
              }
            });
          }
        }

  procesarReserva(): void {
      // 1. Comprobamos si el usuario tiene sesión iniciada
      if (!this.authService.isLoggedIn()) {
        alert("Debes iniciar sesión para poder reservar una entrada.");
        this.router.navigate(['/login']);
        return;
      }
      // 2. Ejecutamos la reserva
      if (this.evento && this.evento.idEvento) {
          console.log("Enviando reserva al backend...");

      // 2. Llamamos al cartero y le pasamos el ID del evento
          this.reservaService.crearReserva(this.evento.idEvento).subscribe({
            next: (respuesta) => {
              console.log("¡Reserva confirmada por el servidor!", respuesta);
              alert("¡Entrada reservada con éxito!");
              this.router.navigate(['/misreservas']);
            },
            error: (err) => {
            console.error("Error al intentar reservar:", err);
            alert("Hubo un problema al procesar tu reserva. Inténtalo de nuevo.");
            }
                  });
                }
              }
            }
