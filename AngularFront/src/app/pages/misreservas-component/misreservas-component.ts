import { Component } from '@angular/core';
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
