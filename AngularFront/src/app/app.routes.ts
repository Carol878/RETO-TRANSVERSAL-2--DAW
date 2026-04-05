import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { ConciertosComponent } from './pages/conciertos-component/conciertos-component';
import { MisreservasComponent } from './pages/misreservas-component/misreservas-component';
import { EventodetalleComponent } from './pages/eventodetalle-component/eventodetalle-component';

export const routes: Routes = [

    { path: '', component: HomeComponent},
    { path: 'concerts', component: ConciertosComponent},
    { path: 'reservations', component: MisreservasComponent},
    { path: 'detalles', component: EventodetalleComponent},
    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)},

];
