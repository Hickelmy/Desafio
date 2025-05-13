import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.theme.init();
    this.auth.checkAndRedirect(); // Se autenticado, vai direto para /dashboard
  }
}
