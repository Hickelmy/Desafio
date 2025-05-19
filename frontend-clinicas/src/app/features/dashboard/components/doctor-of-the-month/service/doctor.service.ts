import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface DoctorOfMonth {
  id: string;
  name: string;
  specialization: string;
  image: string;
  appointments: number;
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private baseUrl = 'http://localhost:3000';
  private token   = localStorage.getItem('authToken') || '';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  getRandomDoctor(): Observable<DoctorOfMonth> {
    return this.http
      .get<DoctorOfMonth>(`${this.baseUrl}/doctors/random`, { headers: this.headers })
      .pipe(
        catchError(err => {
          console.warn('Falha ao buscar médico random, usando mock', err);
          return of({
            id: '00000000-0000-0000-0000-000000000000',
            name: 'Dr. Fallback',
            specialization: 'General',
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            appointments: 0
          });
        })
      );
  }

  constructor(private http: HttpClient) {}
}
