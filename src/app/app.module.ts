import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'; // If you have routing
import { HomePageComponent } from './home-page/home-page.component'; // Import the standalone component

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HomePageComponent will be imported and bootstrapped directly in main.ts
  ],
  providers: [],
})
export class AppModule { }
