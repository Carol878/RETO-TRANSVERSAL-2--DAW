// 1. IMPORTANTE: Aquí importamos 'Routes' para que Angular deje de quejarse
import { Routes } from '@angular/router';

// 2. Importaciones de tus componentes (sin la palabra admin/ y sin el .component al final)
import { AdminpanelComponent } from './adminpanel-component/adminpanel-component';
import { GestioneventosComponent } from './gestioneventos-component/gestioneventos-component';
import { GestionusuariosComponent } from './gestionusuarios-component/gestionusuarios-component';
import { GestionperfilesComponent } from './gestionperfiles-component/gestionperfiles-component';
import { GestiontipoeventoComponent } from './gestiontipoevento-component/gestiontipoevento-component';

export const routes: Routes = [
  {
    path: '', // Lo dejamos vacío porque el padre (app.routes) ya dirá que esto es 'admin'
    component: AdminpanelComponent,
    children: [
      { path: 'eventos', component: GestioneventosComponent },
      { path: 'usuarios', component: GestionusuariosComponent },
      { path: 'perfiles', component: GestionperfilesComponent },
      { path: 'tipoevento', component: GestiontipoeventoComponent },
      { path: '', redirectTo: 'eventos', pathMatch: 'full' }
    ]
  }
];

