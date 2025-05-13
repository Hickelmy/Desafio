import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule]
})
export class TopbarComponent {
  @Output() toggle = new EventEmitter<void>();

  user = {
    name: 'Usuario teste',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
