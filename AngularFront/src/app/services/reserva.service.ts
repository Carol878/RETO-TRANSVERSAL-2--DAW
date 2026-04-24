import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


export interface Reserva {
  idReserva: number;
  idEvento: number;
  username: string;
  precioVenta: number;
  observaciones: string;
  cantidad: number;
  nombreEvento?: string;
  fechaInicio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

    private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  crearReserva(idEvento: number, cantidad: number, username: string, precioVenta: number): Observable<Reserva> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      idEvento: idEvento,
      cantidad: cantidad,
      username: username,
      precioVenta: precioVenta
    };
    // AHORA LLAMA A LA RUTA DE CLIENTE
    return this.http.post<Reserva>(`${this.apiUrl}/clientes/reservar`, body, { headers });
  }

  // AHORA PIDE EL USERNAME PARA LLAMAR A /misReservas/{username}
  getMisReservas(username: string): Observable<Reserva[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Reserva[]>(`${this.apiUrl}/clientes/misReservas/${username}`, { headers });
  }

  cancelarReserva(idReserva: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // AHORA LLAMA A LA RUTA DE CANCELAR DE CLIENTE
    return this.http.delete(`${this.apiUrl}/clientes/cancelarReserva/${idReserva}`, { headers });
  }

}
