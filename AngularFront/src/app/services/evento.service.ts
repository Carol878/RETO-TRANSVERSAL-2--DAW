import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Añadimos el token de forma segura (igual que en los otros servicios)
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // CORREGIDO: Añadida la barra separadora /${id}
  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  findById(id: number): Observable<Evento> {
     return this.http.get<Evento>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  crearEvento(evento: any): Observable<any> {
    return this.http.post(this.apiUrl, evento, { headers: this.getHeaders() });
  }

  // CORREGIDO: Añadida la barra separadora /${id}
  borrarEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // CORREGIDO: Añadida la barra separadora /cancelar/
  cancelarEvento(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancelar/${id}`, {}, { headers: this.getHeaders() });
  }

  // Llama al nuevo endpoint de Activar
  activarEvento(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/activar/${id}`, {}, { headers: this.getHeaders() });
    }

  actualizarEvento(evento: Evento): Observable<any> {
    return this.http.put(this.apiUrl, evento, { headers: this.getHeaders() });
  }
}



/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}`);
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}${id}`);
  }

  findById(id: number): Observable<Evento> {
    // Apuntamos directamente a /eventos/id (o a /eventos/detalle/id si lo pusiste así en tu Java)
     return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  crearEvento(evento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, evento);
  }

  borrarEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  cancelarEvento(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}cancelar/${id}`, {});
  }

  actualizarEvento(evento: Evento): Observable<any> {
  return this.http.put(`${this.apiUrl}`, evento);
  }

}*/
