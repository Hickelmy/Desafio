import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/auth';
  private readonly accessKey = 'access_token';
  private readonly refreshKey = 'refresh_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem(this.accessKey, res.access_token);
        localStorage.setItem(this.refreshKey, res.refresh_token);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  logout(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }

  checkAndRedirect(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
