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
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/auth.service';
import { SetUser } from '../../../store/user/user.actions';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);

  form!: FormGroup;
  error = '';
  loading = false;
  hidePassword = true;
  avatarLoading = false;
  avatarPreview: string | null = null;
  selectedAvatarFile: File | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.avatarLoading = true;
    this.selectedAvatarFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
      this.avatarLoading = false;
      this.cdr.markForCheck(); 
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.loading = true;

    const { name, email, password } = this.form.value;
    const payload = {
      name,
      email,
      password,
      avatar: this.avatarPreview || undefined
    };

    this.authService.register(payload).subscribe({
      next: ({ access_token, refresh_token, user }) => {
        localStorage.setItem('token', access_token);
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }

        const avatar = user?.avatar || this.avatarPreview || `https://i.pravatar.cc/40?u=${name}`;
        this.store.dispatch(new SetUser(user.name, avatar, user.email, user.id));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Erro ao registrar';
        this.cdr.markForCheck();
      }
    });
  }

  get passwordStrengthPercent(): number {
    const value: string = this.form.get('password')?.value || '';
    let strength = 0;
    if (/[a-z]/.test(value)) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/\d/.test(value)) strength += 1;
    if (/[\W]/.test(value)) strength += 1;
    if (value.length >= 8) strength += 1;
    return (strength / 5) * 100;
  }

  get hasUpperLowerCase(): boolean {
    const val = this.form.get('password')?.value || '';
    return /[a-z]/.test(val) && /[A-Z]/.test(val);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.form.get('password')?.value || '');
  }

  get hasSpecialChar(): boolean {
    return /[\W]/.test(this.form.get('password')?.value || '');
  }

  get hasMinLength(): boolean {
    return (this.form.get('password')?.value || '').length >= 8;
  }

  get strengthColor(): string {
    const percent = this.passwordStrengthPercent;
    if (percent < 40) return '#ef4444';   
    if (percent < 80) return '#f59e0b';   
    return '#22c55e';                     
  }
}
