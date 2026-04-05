import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner-component/banner-component';
import { EventocardComponent } from '../../components/eventocard-component/eventocard-component';

@Component({
  selector: 'app-home-component',
  imports: [BannerComponent, EventocardComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {}
