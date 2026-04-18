import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  username = '';
  nombre = '';
  apellidos = '';
  email = '';
  direccion = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const body = {
      username: this.username,
      password: this.password,
      nombre: this.nombre,
      apellidos: this.apellidos,
      direccion: this.direccion,
      email: this.email
    };

    this.http.post('http://localhost:9000/usuarios/registro', body).subscribe({
      next: () => {
        alert('Registro completado');
        this.router.navigate(['/login']);
      },
      error: () => alert('Error al registrar usuario')
    });
  }

}
