// src/app/services/stats.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Stat {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  private baseUrl = 'http://localhost:3000';
  private token   = localStorage.getItem('authToken') || '';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Faz GET de /{path}/count retornando só o número, ou
   * em caso de erro, retorna um valor mock (defaultValue).
   */
  private countEndpoint(path: string, defaultValue: number = 0): Observable<number> {
    return this.http
      .get<{ count: number }>(`${this.baseUrl}/${path}/count`, { headers: this.headers })
      .pipe(
        map(res => res.count),
        catchError(err => {
          console.warn(`StatsService: falha em ${path}/count, usando mock ${defaultValue}`, err);
          return of(defaultValue);
        })
      );
  }

  getPatientsCount(): Observable<number> {
    return this.countEndpoint('patients', 1280);
  }

  getClinicsCount(): Observable<number> {
    return this.countEndpoint('clinicas', 24);
  }

  getDoctorsCount(): Observable<number> {
    return this.countEndpoint('doctors', 42);
  }

  /** Combina as três consultas e retorna o array de stats já formatado. */
  getStats(): Observable<Stat[]> {
    return combineLatest({
      patients: this.getPatientsCount(),
      clinics:  this.getClinicsCount(),
      doctors:  this.getDoctorsCount()
    }).pipe(
      map(({ patients, clinics, doctors }) => [
        {
          icon:  'groups',
          label: 'Pacientes',
          value: patients,
          color: '#0ea5e9'
        },
        {
          icon:  'local_hospital',
          label: 'Clínicas',
          value: clinics,
          color: '#10b981'
        },
        {
          icon:  'medical_services',
          label: 'Médicos',
          value: doctors,
          color: '#f59e0b'
        }
      ])
    );
  }

  constructor(private http: HttpClient) {}
}
