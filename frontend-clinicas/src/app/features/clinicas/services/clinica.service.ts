
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Clinica } from '../../../models/clinica.model';
import { Especialidade } from '../../../models/especialidade.model';
import { PaginatedResult } from '../../../models/paginated-result';


@Injectable({
  providedIn: 'root',
})
export class ClinicaService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}


  findAll(
    search: string = '',
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResult<Clinica>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search.trim().length) {
      params = params.set('search', search.trim());
    }

    return this.http.get<PaginatedResult<Clinica>>(
      `${this.apiUrl}/clinicas`,
      { params }
    );
  }


  getById(id: string): Observable<Clinica> {
    return this.http.get<Clinica>(`${this.apiUrl}/clinicas/${id}`);
  }

 
  create(data: Clinica): Observable<Clinica> {
    return this.http.post<Clinica>(`${this.apiUrl}/clinicas`, data);
  }


  update(id: string, data: Clinica): Observable<Clinica> {
    return this.http.put<Clinica>(`${this.apiUrl}/clinicas/${id}`, data);
  }

 
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clinicas/${id}`);
  }

  getEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(
      `${this.apiUrl}/especialidades`
    );
  }
}
