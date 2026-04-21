import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-misreservas-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './misreservas-component.html',
  styleUrl: './misreservas-component.css'
})
export class MisreservasComponent implements OnInit {

  listaReservas: any[] = [];
  usernameActual: string = '';

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef //  Forzar manualmente la detección de cambios
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.usernameActual = payload.sub || payload.username;
        this.cargarMisReservas();
      } catch (e) {
        console.error('Error al decodificar token', e);
      }
    }
  }

  cargarMisReservas(): void {
    this.reservaService.getMisReservas(this.usernameActual).subscribe({
      next: (datosBD) => {

        // Traducimos los datos
        this.listaReservas = datosBD.map((reservaJava: any) => {
          return {
            id: reservaJava.idReserva,
            evento: reservaJava.evento ? reservaJava.evento.nombre : 'Evento sin nombre',
            fecha: reservaJava.evento ? reservaJava.evento.fechaInicio : 'Sin fecha',
            lugar: reservaJava.evento ? reservaJava.evento.direccion : 'Sin ubicación',
            cantidad: reservaJava.cantidad,
            total: reservaJava.precioVenta
          };
        });

        console.log('Datos listos, obligando a repintar la pantalla...');

        // Repinta el HTML con las tarjetas
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al conectar con Spring Boot:', err);
        this.listaReservas = [];
        this.cdr.detectChanges();
      }
    });
  }

  cancelarReserva(id: number) {
    if(confirm('¿Seguro que quieres cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(id).subscribe({
        next: () => {
          // Filtramos la lista para quitar la reserva cancelada
          this.listaReservas = this.listaReservas.filter(r => r.id !== id);
          alert('Reserva cancelada correctamente');

          // Repinta la pantalla al borrar para que desaparezca la tarjeta
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cancelar:', err);
          alert('Hubo un error en el servidor al intentar cancelar.');
        }
      });
    }
  }

  descargarTicket(id: number) {
    alert('Preparando tu entrada para descargar...');
  }
}
/*import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-misreservas-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './misreservas-component.html',
  styleUrl: './misreservas-component.css'
})
export class MisreservasComponent {

  // Datos de prueba (luego vendrán del service)
  listaReservas = [
    {
      id: 101,
      evento: 'Festival Rock 2026',
      fecha: '15 Jun 2026',
      lugar: 'Estadio Olímpico',
      cantidad: 2,
      total: 100
    },
    {
      id: 102,
      evento: 'Noche de Jazz',
      fecha: '22 Jun 2026',
      lugar: 'Teatro Principal',
      cantidad: 1,
      total: 35
    }
  ];

  descargarTicket(id: number) {
    console.log('Descargando PDF de la reserva:', id);
    alert('Preparando tu entrada para descargar...');
  }

  cancelarReserva(id: number) {
    if(confirm('¿Seguro que quieres cancelar esta reserva?')) {
      this.listaReservas = this.listaReservas.filter(r => r.id !== id);
    }
  }
}
*/
