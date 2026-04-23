import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode} from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private apiUrl = `http://localhost:9000/`;

  constructor(private http: HttpClient, private router: Router) {}

  //Login
  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}usuarios/login`, {username, password});
  }

  //Registro
  register(data: any) {
      return this.http.post(`${this.apiUrl}usuarios/registro`, data);
  }

  //Token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Obtener el Token
    getToken(): string | null {
      return localStorage.getItem('token');
    }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  //Estado Login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //Rol
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded: any = jwtDecode(token);

    // Ajusta según cómo venga tu token
    return decoded.authorities?.includes('ROLE_ADMON');
  }

}
