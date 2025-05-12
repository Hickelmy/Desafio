import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule 
  ]
})
export class DashboardComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  userEmail = localStorage.getItem('user_email');

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irParaClinicas(): void {
    this.router.navigate(['/clinicas']);
  }
}
