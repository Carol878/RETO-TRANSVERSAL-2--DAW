import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {

  constructor(public authService: AuthService, private router: Router) {}

  // Solo lo usamos para saber si pintamos "Iniciar" o "Cerrar" sesión
  estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  // Función para cerrar la sesión
  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
/*import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})

export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Solo lo usamos para el texto del cuarto botón
  estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
/*export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  intentarEntrarAdmin(): void {
    if (!this.estaLogueado()) {
      alert('Debes iniciar sesión primero.');
      this.router.navigate(['/login']);
      return;
    }

    // Comprobamos el rol en el Token
    const token = this.authService.getToken();
    const payload = JSON.parse(atob(token!.split('.')[1]));

    if (payload.rol === 'ADMIN' || payload.rol === 'ROLE_ADMIN') {
      this.router.navigate(['/admin/eventos']);
    } else {
      alert('Acceso denegado: No tienes permisos de administrador.');
    }
  }

  manejarSesion(): void {
    if (this.estaLogueado()) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}*/
