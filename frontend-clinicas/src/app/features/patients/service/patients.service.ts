// src/app/features/patients/service/patients.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../../models/patient.model';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  //   private readonly baseUrl = `${environment.apiUrl}/patients`;

  private readonly baseUrl = 'http://localhost:3000/patients';

  constructor(private readonly http: HttpClient) {}

  getAll(search: string = '', page: number = 1, limit: number = 5): Observable<PaginatedResult<Patient>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<PaginatedResult<Patient>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, data);
  }

  update(id: string, data: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
