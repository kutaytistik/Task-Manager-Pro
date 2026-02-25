import {
  Component,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {

  @Output()
  menuClick = new EventEmitter<void>();

  isDarkMode = false;

  userInitial = 'K'; // avatar letter (Kutay için K)

  ngOnInit(): void {

    const saved =
      localStorage.getItem('darkMode');

    this.isDarkMode = saved === 'true';

    this.applyTheme();

  }

  toggleMenu(): void {

    this.menuClick.emit();

  }

  toggleDarkMode(): void {

    this.isDarkMode = !this.isDarkMode;

    localStorage.setItem(
      'darkMode',
      this.isDarkMode.toString()
    );

    this.applyTheme();

  }

  private applyTheme(): void {

    if (this.isDarkMode)
      document.body.classList.add('dark-mode');
    else
      document.body.classList.remove('dark-mode');

  }

}