import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-adminpanel-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // ¡Súper importante!
  templateUrl: './adminpanel-component.html',
  styleUrl: './adminpanel-component.css'
})
export class AdminpanelComponent {

}
/*import { Component } from '@angular/core';
// 1. Importamos las herramientas de rutas
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-adminpanel-component',
  standalone: true,
  // 2. Las añadimos al array de imports
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './adminpanel-component.html',
  styleUrl: './adminpanel-component.css'
})
export class AdminpanelComponent {

}*/
