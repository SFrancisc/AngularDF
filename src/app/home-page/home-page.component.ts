import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactComponent } from '../contact/contact.component';
import { ServicesComponent } from '../services/services.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  sidemenuStyle: any;
  isOpen: boolean = false;
  userInput: string = '';
  messages: { role: string, content: string }[] = [];

  constructor(private http: HttpClient, library: FaIconLibrary, private router: Router) {
    library.addIcons(faInstagram, faYoutube, faTiktok);
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
    this.sidemenuStyle = { 'display': 'block' };
  }

  closeMenu() {
    this.sidemenuStyle = { 'display': 'none' };
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
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

// Rute (dacă le folosești aici)
export const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
];
