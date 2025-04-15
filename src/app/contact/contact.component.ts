import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicesComponent } from '../services/services.component';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube, faTiktok, faFacebook, faWhatsapp, } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ CommonModule, FontAwesomeModule,RouterModule, FormsModule ],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  sidemenuStyle: any;
copied: any;

  constructor(library: FaIconLibrary) {
      library.addIcons(faInstagram, faYoutube, faTiktok, faFacebook, faWhatsapp, faEnvelope, faPhone);
    }

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

  copyPhoneNumber() {
    const phoneNumber = '+40724552359';
    navigator.clipboard.writeText(phoneNumber).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  formStatus: { success: boolean; message: string } | null = null;

  // Simulated form submission handler
  onSubmit(formValues: { Nume: string; Email: string; Mesaj: string }): void {
    console.log('Form submitted with values:', formValues);

    // Reset form status
    this.formStatus = null;

    // Simulate API call
    const isSuccess = Math.random() > 0.5; // Random success/failure for demo purposes

    if (isSuccess) {
      this.formStatus = { success: true, message: 'Mesajul a fost trimis cu succes!' };
    } else {
      this.formStatus = { success: false, message: 'A apărut o problemă. Încercați din nou.' };
    }
  }
}

export const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
];
