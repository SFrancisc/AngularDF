import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; // Correct path to your component
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { DetailingInteriorComponent } from './services/detailing-interior/detailing-interior.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect default route
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'detailing-interior', component: DetailingInteriorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Sets up routes for the app
  exports: [RouterModule]  // Exports the router module
})
export class AppRoutingModule { }
