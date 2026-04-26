import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventocard-component',
  standalone: true,
  imports: [RouterLink,CommonModule], // Necesario para el botón de Detalles
  templateUrl: './eventocard-component.html',
  styleUrl: './eventocard-component.css'
})
export class EventocardComponent {
  // El decorador @Input permite que le inyectemos un Evento a esta tarjeta
  @Input() evento!: Evento;
}
