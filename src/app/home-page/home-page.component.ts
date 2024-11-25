import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
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
