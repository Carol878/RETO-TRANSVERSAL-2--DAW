import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { FooterComponent } from './components/footer-component/footer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Le decimos que vamos a usar las rutas, el navbar y el footer
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html' // <-- Apuntamos al HTML que acabamos de arreglar
})
export class AppComponent {
  title = 'AngularFront';
}
