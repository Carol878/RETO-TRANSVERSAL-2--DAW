import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:9000/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 1. OBTENER: ¡Hemos quitado la barra al final de la URL para evitar el 302 Redirect!
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // CREAR: Llama al @PostMapping del backend
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario, { headers: this.getHeaders() });
  }

  // 2. EDITAR: Asumimos que la ruta en tu backend es /editar (como en eventos)
  editarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, usuario, { headers: this.getHeaders() });
  }

  // 3. ELIMINAR: Asumimos que la ruta es /eliminar/{username} (como en eventos)
  eliminarUsuario(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${username}`, { headers: this.getHeaders() });
  }
}
