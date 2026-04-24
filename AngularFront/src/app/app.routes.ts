import { Routes } from '@angular/router';

// 1. Componentes Públicos (Asegúrate de que las rutas a tus archivos sean correctas)
import { HomeComponent } from './pages/home-component/home-component';
import { LoginComponent } from './pages/login-component/login-component';
import { ConciertosComponent } from './pages/conciertos-component/conciertos-component';
import { MisreservasComponent } from './pages/misreservas-component/misreservas-component';
import { EventodetalleComponent } from './pages/eventodetalle-component/eventodetalle-component';

// 2. Componentes de Administrador
import { AdminpanelComponent } from './admin/adminpanel-component/adminpanel-component';
import { GestioneventosComponent } from './admin/gestioneventos-component/gestioneventos-component';
import { GestionusuariosComponent } from './admin/gestionusuarios-component/gestionusuarios-component';
//import { GestionperfilesComponent } from './admin/gestionperfiles-component/gestionperfiles-component';
import { GestiontipoeventoComponent } from './admin/gestiontipoevento-component/gestiontipoevento-component';
import { RegisterComponent } from './pages/register-component/register-component';

export const routes: Routes = [
  // RUTAS PÚBLICAS Y DE USUARIO
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'concerts', component: ConciertosComponent },
  { path: 'misreservas', component: MisreservasComponent },
  { path: 'detalles/:id', component: EventodetalleComponent }, // Ruta con ID dinámico

  // RUTAS DE ADMINISTRADOR
  {
    path: 'admin',
    component: AdminpanelComponent,
    children: [
      { path: 'eventos', component: GestioneventosComponent },
      { path: 'usuarios', component: GestionusuariosComponent },
      //{ path: 'perfiles', component: GestionperfilesComponent },
      { path: 'tipoevento', component: GestiontipoeventoComponent },
      { path: '', redirectTo: 'eventos', pathMatch: 'full' }
    ]
  },

  // Ruta comodín: Si alguien escribe una URL que no existe, lo mandamos al inicio
  { path: '**', redirectTo: '' }
];
/*import { Routes } from '@angular/router';
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
  { path: '**', redirectTo: '/home' },

  // 7. Añadimos la ruta de Mis Reservas (Lazy loading)
    { path: 'misreservas',
      loadComponent: () =>
        import('./pages/misreservas-component/misreservas-component').then(m => m.MisreservasComponent)},

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];*/
