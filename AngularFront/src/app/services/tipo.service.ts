import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private apiUrl = `${environment.apiUrl}/tipos`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      let headers = new HttpHeaders();
      // Solo enviamos el token si el usuario está logeado
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }

  /*private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }*/

  // Obtener
  getTipos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // ESTA ES LA FUNCIÓN QUE FALTABA
  crearTipo(tipo: any): Observable<any> {
    return this.http.post(this.apiUrl, tipo, { headers: this.getHeaders() });
  }

  // Editar
  editarTipo(tipo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, tipo, { headers: this.getHeaders() });
  }
}
