import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserState } from '../../store/user/user.state';
import { ThemeState } from '../../store/theme/theme.state';
import { ToggleTheme } from '../../store/theme/theme.actions';
import { ClearUser } from '../../store/user/user.actions';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class TopbarComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  @Input() isMobile = false;
  @Output() toggle = new EventEmitter<void>();

  @Select(UserState.name) name$!: Observable<string>;
  @Select(UserState.email) email$!: Observable<string>;
  @Select(UserState.avatarUrl) avatar$!: Observable<string>; 
  @Select(UserState.id) id$!: Observable<string>;
  @Select(ThemeState.mode) mode$!: Observable<'light' | 'dark'>;


  loggingOut = false;

  toggleTheme(): void {

    this.store.dispatch(new ToggleTheme());
  }

  logout(): void {
    this.loggingOut = true;

    this.store.dispatch(new ClearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }
}
