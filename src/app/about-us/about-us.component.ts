import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { ContactComponent } from '../contact/contact.component';
import { ServicesComponent } from '../services/services.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faPaperPlane, faXmark, faRotate } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [ CommonModule, FontAwesomeModule,RouterModule, FormsModule, HttpClientModule ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
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
export class AboutUsComponent {
  sidemenuStyle: any;
  isOpen: boolean = false;
  isVisible: boolean = false;
  userInput: string = '';
  messages: { role: string, content: string }[] = [];
copied: any;

  constructor(private http: HttpClient, library: FaIconLibrary, private router: Router) {
      library.addIcons(faPaperPlane, faXmark, faRotate);
    }

      ngOnInit(): void {
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
   toggleChat() {
  if (this.isOpen) {
    this.isOpen = false; // închide animația
  } else {
    this.isVisible = true; // adaugă în DOM
    this.isOpen = true;    // deschide animația
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
