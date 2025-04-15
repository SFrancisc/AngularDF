import { Component } from '@angular/core';
import { HomePageComponent } from '../../home-page/home-page.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { ServicesComponent } from '../services.component';
import { ContactComponent } from '../../contact/contact.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detailing-motor',
  imports: [RouterLink],
  templateUrl: './detailing-motor.component.html',
  styleUrl: './detailing-motor.component.scss'
})
export class DetailingMotorComponent {
  sidemenuStyle: any;

  constructor() { }

  openMenu() {
    // Logic for opening the menu
    console.log("Opening menu");
    // Example: Set a style to show the menu
    this.sidemenuStyle = { 'display': 'block' };
  }

  closeMenu() {
    // Logic for closing the menu
    console.log("Closing menu");
    // Example: Set a style to hide the menu
    this.sidemenuStyle = { 'display': 'none' };
  }
  scrollToTop() {;
    // Derulează până în vârful paginii
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
];