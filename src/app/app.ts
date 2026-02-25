import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { FooterComponent } from './layout/footer/footer';

import { ScrollTopComponent } from './components/scroll-top/scroll-top';

@Component({

  selector: 'app-root',

  standalone: true,

  imports: [

    CommonModule,

    RouterOutlet,

    HeaderComponent,

    SidebarComponent,

    FooterComponent,

    ScrollTopComponent

  ],

  templateUrl: './app.html',

  styleUrl: './app.css'

})
export class AppComponent {

  sidebarOpen: boolean = true;


  toggleSidebar(): void {

    this.sidebarOpen =
      !this.sidebarOpen;

  }

}