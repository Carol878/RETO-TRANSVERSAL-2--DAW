import { Injectable } from '@angular/core';
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
    return this.http.get<Evento[]>(`${this.apiUrl}/`);
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  findById(id: number): Observable<Evento> {
    // Apuntamos directamente a /eventos/id (o a /eventos/detalle/id si lo pusiste así en tu Java)
     return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  crearEvento(evento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, evento);
  }

  borrarEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cancelarEvento(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancelar/${id}`, {});
  }

  actualizarEvento(evento: Evento): Observable<any> {
  return this.http.put(`${this.apiUrl}/`, evento);
  }

}
