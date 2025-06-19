import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicesComponent } from '../services/services.component';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faXmark, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faTiktok, faFacebook, faWhatsapp, } from '@fortawesome/free-brands-svg-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  imports: [ CommonModule, FontAwesomeModule,RouterModule, FormsModule, HttpClientModule ],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
    animations: [
    trigger('chatAnimation', [
      state('closed', style({
        transform: 'scale(0) translateY(50%)',
        opacity: 0,
        transformOrigin: 'bottom right'
      })),
      state('open', style({
        transform: 'scale(1) translateY(0)',
        opacity: 1,
        transformOrigin: 'bottom right'
      })),
      transition('closed => open', [
        animate('1s ease-out')
      ]),
      transition('open => closed', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class ContactComponent {
  sidemenuStyle: any;
  isOpen: boolean = false;
  isVisible: boolean = false;
  userInput: string = '';
  messages: { role: string, content: string }[] = [];
copied: any;

  constructor(private http: HttpClient, library: FaIconLibrary, private router: Router) {
      library.addIcons(faInstagram, faYoutube, faTiktok, faFacebook, faWhatsapp, faEnvelope, faPhone, faPaperPlane, faXmark, faRotate);
    }

      ngOnInit(): void {
    const savedChatState = localStorage.getItem('chatIsOpen');
    this.isOpen = savedChatState ? JSON.parse(savedChatState) : false;

    if (this.isOpen) {
      this.isVisible = true;
    }
    // Încărcăm istoricul conversației de pe server
    this.http.get<{ messages: { role: string, content: string }[] }>('http://localhost:3000/get-history').subscribe(response => {
      this.messages = response.messages;
    }, error => {
      console.error('Eroare la încărcarea istoricului conversației:', error);
    });
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
  toggleChat() {
  if (this.isOpen) {
    this.isOpen = false;
    localStorage.setItem('chatIsOpen', 'false');
  } else {
    this.isVisible = true;
    this.isOpen = true;
    localStorage.setItem('chatIsOpen', 'true');
  }
}

onAnimationDone(event: any) {
  if (event.toState === 'closed') {
    this.isVisible = false; // scoate din DOM după animație
  }
}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Adaugă mesajul utilizatorului în istoricul conversației
    this.messages.push({ role: 'user', content: this.userInput });
    const currentMessages = [...this.messages]; // Copiem toate mesajele pentru a le trimite

    console.log('Mesaje trimise către backend:', currentMessages); // Log pentru a verifica ce trimitem

    this.userInput = '';

    // Trimite toate mesajele la backend
    this.http.post<any>('http://localhost:3000/chat', {
      messages: currentMessages
    }).subscribe(response => {
      console.log('Răspuns de la server:', response); // Log pentru răspunsul de la server

      const reply = response.choices[0].message.content;
      this.messages.push({ role: 'assistant', content: reply });

      // Salvează istoricul conversației în localStorage
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    });
  }

  clearChat() {
    this.messages = [];
    // Trimite cerere la server pentru a șterge istoricul conversației
    this.http.post('http://localhost:3000/reset', {}).subscribe({
      next: () => console.log('Istoric șters pe server'),
      error: err => console.error('Eroare la ștergerea istoricului pe server:', err)
    });
  }

  resetChat() {
    if (confirm('Sigur vrei să resetezi conversația?')) {
      this.messages = [];
      // Trimite o cerere la server pentru a reseta istoricul conversației
      this.http.post('http://localhost:3000/reset', {}).subscribe({
        next: () => console.log('Istoric resetat pe server'),
        error: err => console.error('Eroare la resetarea istoricului pe server:', err)
      });
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
