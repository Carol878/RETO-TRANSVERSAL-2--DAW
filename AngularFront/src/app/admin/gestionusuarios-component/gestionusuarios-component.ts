import { Component } from '@angular/core';

@Component({
  selector: 'app-gestionusuarios-component',
  standalone: true,
  imports: [],
  templateUrl: './gestionusuarios-component.html',
  styleUrl: './gestionusuarios-component.css'
})
export class GestionusuariosComponent {
  // Datos de prueba
  usuarios: any[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', perfil: 'ADMIN' },
    { id: 2, nombre: 'Ana López', email: 'ana@email.com', perfil: 'USUARIO' }
  ];
}
