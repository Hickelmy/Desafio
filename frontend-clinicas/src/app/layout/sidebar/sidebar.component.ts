import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isDark = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() {
    document.documentElement.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
  }

  toggleTheme() {
    this.isDark.update(prev => {
      const newVal = !prev;
      document.documentElement.setAttribute('data-theme', newVal ? 'dark' : 'light');
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  }
}
