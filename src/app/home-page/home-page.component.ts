import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactComponent } from '../contact/contact.component';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  // Add your sidemenu style or logic if needed
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

