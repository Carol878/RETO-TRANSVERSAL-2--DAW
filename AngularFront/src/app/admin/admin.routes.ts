import { Routes } from '@angular/router';
import { AdminpanelComponent } from "./adminpanel-component/adminpanel-component";
import { GestioneventosComponent } from './gestioneventos-component/gestioneventos-component';
import { GestionperfilesComponent } from './gestionperfiles-component/gestionperfiles-component';
import { GestiontipoeventoComponent } from './gestiontipoevento-component/gestiontipoevento-component';
import { GestionusuariosComponent } from './gestionusuarios-component/gestionusuarios-component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminpanelComponent,
    children: [
      { path: 'gestioneventos', component: GestioneventosComponent},
      { path: 'gestionperfiles', component: GestionperfilesComponent},
      { path: 'gstiontipoevento', component: GestiontipoeventoComponent},
      { path: 'gestionusuarios', component: GestionusuariosComponent}
    ]
  }
];