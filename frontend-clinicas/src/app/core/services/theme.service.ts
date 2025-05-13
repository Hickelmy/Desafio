import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'theme';

  init(): void {
    const saved = localStorage.getItem(this.key);
    const isDark = saved === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }

  toggle(): void {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(this.key, newTheme);
  }

  getCurrent(): 'dark' | 'light' {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
}
