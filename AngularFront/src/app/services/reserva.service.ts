import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Interfaz que refleja la tabla 'reservas' y la relación con 'eventos'
export interface Reserva {
  idReserva: number;      // ID_RESERVA
  idEvento: number;       // ID_EVENTO
  username: string;       // USERNAME
  precioVenta: number;    // PRECIO_VENTA
  observaciones: string;  // OBSERVACIONES
  cantidad: number;       // CANTIDAD
  nombreEvento?: string;  // Extraído mediante JOIN en el backend para mostrar en el HTML
  fechaInicio?: string;   // Extraído mediante JOIN
}

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

    // Cuerpo ajustado para que tu backend pueda mapearlo a la entidad de la BBDD
    const body = {
      idEvento: idEvento,
      cantidad: cantidad,
      // El username lo suele extraer el backend directamente del Token Bearer por seguridad
    };

    return this.http.post(`${this.apiUrl}/crear`, body, { headers });
  }

  /**
     * Obtiene las reservas reales de la base de datos del usuario logueado.
     * No hay datos inventados: si la BBDD devuelve 2 filas (como en tu SQL), se verán 2 tarjetas.
     */
    getMisReservas(): Observable<Reserva[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Este endpoint debe ejecutar el SELECT con INNER JOIN que comentamos anteriormente
      return this.http.get<Reserva[]>(`${this.apiUrl}/mis-reservas`, { headers });
    }

  /**
     * Nueva funcionalidad: Elimina una reserva de la base de datos.
     * Útil para el botón "Cancelar" que pusimos en el diseño.
     */
    cancelarReserva(idReserva: number): Observable<any> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.delete(`${this.apiUrl}/${idReserva}`, { headers });
    }
}
