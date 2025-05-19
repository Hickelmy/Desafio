// src/app/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../../models/doctor.model';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  // private baseUrl = '/api/doctors';
  private readonly baseUrl = 'http://localhost:3000/doctors';

  list(params: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Observable<PaginatedResult<Doctor>> {
    let qp = new HttpParams();
    if (params.search) qp = qp.set('search', params.search);
    if (params.page)   qp = qp.set('page', String(params.page));
    if (params.limit)  qp = qp.set('limit', String(params.limit));
    return this.http.get<PaginatedResult<Doctor>>(this.baseUrl, { params: qp });
  }

  getById(id: string) {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }
  create(doc: Partial<Doctor>) {
    return this.http.post<Doctor>(this.baseUrl, doc);
  }
  update(id: string, doc: Partial<Doctor>) {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doc);
  }
  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
