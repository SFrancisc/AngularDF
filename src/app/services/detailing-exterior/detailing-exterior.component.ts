import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomePageComponent } from '../../home-page/home-page.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { ContactComponent } from '../../contact/contact.component';
import { ServicesComponent } from '../services.component';

@Component({
  selector: 'app-detailing-exterior',
  imports: [RouterLink],
  templateUrl: './detailing-exterior.component.html',
  styleUrl: './detailing-exterior.component.scss'
})
export class DetailingExteriorComponent {
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
}

export const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
];
