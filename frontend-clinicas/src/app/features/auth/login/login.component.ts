import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/auth.service';
import { SetUser } from '../../../store/user/user.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);

  form!: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  hidePassword = true;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.loading = true;

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: ({ access_token, refresh_token, user }) => {
        localStorage.setItem('token', access_token);
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }

        const name = user?.name || 'Usuário';
        const avatar = user?.avatar || `https://i.pravatar.cc/40?u=${name || email}`;
        this.store.dispatch(new SetUser(name, avatar, user?.email, user?.id));

        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 2000);
      },

      error: (err) => {
        this.loading = false;

        if (err.status === 401) {
          this.error = 'Credenciais inválidas. Verifique e tente novamente.';
        } else if (err.status === 0) {
          this.error = 'Falha de conexão com o servidor.';
        } else {
          this.error = err?.error?.message || 'Erro ao fazer login.';
        }

        this.cdr.markForCheck();
      }
    });
  }
}
