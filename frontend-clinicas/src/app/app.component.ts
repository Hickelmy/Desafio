import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 

import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/auth.service';
import { catchError, finalize, switchMap, of } from 'rxjs';
import { LoadingSpinnerComponent } from './layout/loader/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,              
    RouterOutlet,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly theme = inject(ThemeService);
  private readonly auth = inject(AuthService);

  ready = false;

  ngOnInit(): void {
    this.theme.init();

    this.auth
      .loadUserFromStorage()
      .pipe(
        switchMap(() => this.auth.checkAndRedirect()),
        catchError(() => of(null)),
        finalize(() => {
          this.ready = true;
        })
      )
      .subscribe();
  }
}
