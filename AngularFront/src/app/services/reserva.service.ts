import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  // Ajusta esta URL si tu controlador de Spring Boot tiene otra ruta base
  private apiUrl = 'http://localhost:9000/reservas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Función para crear una reserva nueva
  crearReserva(idEvento: number, cantidad: number = 1): Observable<any> {
    // Recuperamos el token de tu AuthService para demostrar quiénes somos
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Preparamos los datos a enviar (Ajusta esto según tu ReservaDto de Java)
    const body = {
      evento: { idEvento: idEvento },
      cantidad: cantidad
    };

    return this.http.post(`${this.apiUrl}/crear`, body, { headers });
  }

  // Ya dejamos preparada esta función para el siguiente paso (Mis Reservas)
  getMisReservas(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/mis-reservas`, { headers });
  }
}
