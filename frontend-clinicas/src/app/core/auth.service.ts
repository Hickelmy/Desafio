import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of, tap, from } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { SetUser, ClearUser } from '../store/user/user.actions';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: AuthUser;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  private readonly baseUrl = 'http://localhost:3000/auth';
  private readonly storageTokenKey = 'access_token';
  private readonly storageRefreshKey = 'refresh_token';
  private readonly storageUserKey = 'user';

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(({ access_token, refresh_token, user }) => {
        const avatar = this.resolveAvatar(user.name, user.avatar);
        this.persistSession(access_token, refresh_token, { ...user, avatar });
        this.store.dispatch(new SetUser(user.name, avatar, user.email, user.id));
      })
    );
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  refresh(): Observable<AuthResponse> {
    const refresh_token = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, { refresh_token }).pipe(
      tap(({ access_token, refresh_token, user }) => {
        const avatar = this.resolveAvatar(user.name, user.avatar);
        this.persistSession(access_token, refresh_token, { ...user, avatar });
        this.store.dispatch(new SetUser(user.name, avatar, user.email, user.id));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageTokenKey);
    localStorage.removeItem(this.storageRefreshKey);
    localStorage.removeItem(this.storageUserKey);
    this.store.dispatch(new ClearUser());
    this.router.navigateByUrl('/login');
  }

  checkAndRedirect(): Observable<void> {
    const token = this.getToken();
    if (token) {
      return from(this.router.navigateByUrl('/dashboard')).pipe(mapTo(void 0)); // ✅ CORRETO
    }
    return of(void 0);
  }

loadUserFromStorage(): Observable<void> {
  const raw = localStorage.getItem(this.storageUserKey);
  if (!raw) return of(void 0);

  try {
    const parsed = JSON.parse(raw);
    const isValid = parsed?.id && parsed?.email && parsed?.name;

    if (isValid) {
      const avatar = this.resolveAvatar(parsed.name, parsed.avatar);
      this.store.dispatch(new SetUser(parsed.name, avatar, parsed.email, parsed.id));
    } else {
      console.warn('[AuthService] Dados de usuário incompletos no localStorage.');
    }
  } catch (err) {
    console.warn('[AuthService] Erro ao fazer parse do usuário no localStorage:', err);
  }

  return of(void 0);
}


  private resolveAvatar(name: string, avatar?: string): string {
    if (avatar) return avatar;
    const initial = name?.charAt(0)?.toUpperCase() || '?';
    return `https://ui-avatars.com/api/?name=${initial}&background=0D8ABC&color=fff`;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.storageRefreshKey);
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(this.storageUserKey);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private persistSession(token: string, refreshToken: string | undefined, user: AuthUser): void {
    localStorage.setItem(this.storageTokenKey, token);
    if (refreshToken) {
      localStorage.setItem(this.storageRefreshKey, refreshToken);
    }
    localStorage.setItem(this.storageUserKey, JSON.stringify(user));
  }
}
