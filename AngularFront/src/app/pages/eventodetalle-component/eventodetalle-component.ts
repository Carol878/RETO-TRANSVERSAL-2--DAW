import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { AuthService } from '../../services/auth.service';
import { Evento } from '../../models/evento.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-eventodetalle-component',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './eventodetalle-component.html',
  styleUrl: './eventodetalle-component.css'
})

export class EventodetalleComponent implements OnInit {

  evento: any;
  cantidadSeleccionada: number = 1;

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

  reservar(): void {
    if (!this.evento || !this.evento.idEvento) {
          alert('Aún estamos cargando los datos del evento, inténtalo en un segundo.');
          return;
        }

        const token = this.authService.getToken();
          if (!token) {
            alert('Debes iniciar sesión para reservar.');
            return;
          }

          // Extraer usuario del token
          const payload = JSON.parse(atob(token.split('.')[1]));
          const usernameActual = payload.sub || payload.username;

          // 2. Calculamos el precio total
          const precioTotal = (this.evento.precio || 0) * this.cantidadSeleccionada;

          // 3. Enviamos los datos reales al servicio
          this.reservaService.crearReserva(
            this.evento.idEvento,
            this.cantidadSeleccionada,
            usernameActual,
            precioTotal
          ).subscribe({
            next: (respuesta) => {
              alert(`¡Reserva confirmada por ${this.cantidadSeleccionada} entradas! Total: ${precioTotal}€`);
            },
            error: (error) => {
              console.error('Error al reservar:', error);
              alert('Hubo un error al procesar tu reserva.');
            }
          });
        }
    }

