import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-home-page',
  standalone: true, // Mark as a standalone component
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  // Define sidemenuStyle property
  sidemenuStyle = {
    'background-color': 'red', // Example style, modify as needed
    'width': '250px',
    'position': 'fixed',
    'top': '0',
    'left': '0'
  };
}
