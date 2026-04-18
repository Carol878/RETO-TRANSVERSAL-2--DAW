import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { ConciertosComponent } from './pages/conciertos-component/conciertos-component';
import { EventodetalleComponent } from './pages/eventodetalle-component/eventodetalle-component';
import { LoginComponent } from './pages/login-component/login-component';

export const routes: Routes = [
  // 1. La ruta principal (localhost:4200/home) carga el muro de 4 columnas
  { path: 'home', component: HomeComponent },

  // 2. La ruta del catálogo (localhost:4200/concerts) carga el diseño de filtros
  { path: 'concerts', component: ConciertosComponent },

  // 3. La ruta de los detalles
  { path: 'detalles/:id', component: EventodetalleComponent },

  // 4. La ruta del login
  { path: 'login',
    loadComponent: () =>
      import('./pages/login-component/login-component').then(m => m.LoginComponent)},
  
  // 5. La ruta del registro
  { path: 'register',
    loadComponent: () =>
      import('./pages/register-component/register-component').then(m => m.RegisterComponent)},

  // 6. Si alguien entra a localhost:4200 sin nada, le mandamos a /home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
