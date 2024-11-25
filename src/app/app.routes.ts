import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; // Correct path to your component

export const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Sets up routes for the app
  exports: [RouterModule]  // Exports the router module
})
export class AppRoutingModule { }
