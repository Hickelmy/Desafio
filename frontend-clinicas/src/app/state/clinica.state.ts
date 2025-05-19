
import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector,
} from '@ngxs/store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LoadClinicas, SetFiltroClinicas } from './clinica.actions';
import { Clinica } from '../models/clinica.model';

export interface ClinicasStateModel {
  clinicas: Clinica[];
  filtro: string;
  page: number;
  limit: number;
  total: number;
  loading: boolean;
}

@State<ClinicasStateModel>({
  name: 'clinicas',
  defaults: {
    clinicas: [],
    filtro: '',
    page: 1,
    limit: 5,
    total: 0,
    loading: false,
  },
})
@Injectable()
export class ClinicasState {
  private readonly apiUrl = 'http://localhost:3000/clinicas';

  constructor(private readonly http: HttpClient) {}

  @Selector()
  static clinicas(state: ClinicasStateModel) {
    return state.clinicas;
  }

  @Selector()
  static total(state: ClinicasStateModel) {
    return state.total;
  }

  @Selector()
  static loading(state: ClinicasStateModel) {
    return state.loading;
  }

  @Action(SetFiltroClinicas)
  setFiltro(
    ctx: StateContext<ClinicasStateModel>,
    action: SetFiltroClinicas
  ) {
    console.log('[State] ▶️ SetFiltroClinicas.payload:', action.filtro);
    ctx.patchState({ filtro: action.filtro, page: 1 });

    const payload = {
      search: action.filtro,
      page: 1,
      limit: ctx.getState().limit,
    };
    console.log('[State] ➡️ Dispatch LoadClinicas with payload:', payload);
    return ctx.dispatch(new LoadClinicas(payload));
  }

  @Action(LoadClinicas)
  loadClinicas(
    ctx: StateContext<ClinicasStateModel>,
    action: LoadClinicas
  ) {
    console.log('[State] ▶️ LoadClinicas.payload:', action.payload);
    ctx.patchState({ loading: true });
    console.log('[State] loading = true');

    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('page', action.payload.page.toString())
      .set('limit', action.payload.limit.toString());

    if (action.payload.search) {
      params = params.set('search', action.payload.search);
    }
    console.log(
      '[State] 🔗 HTTP GET:',
      this.apiUrl,
      'params:',
      params.toString()
    );

    return this.http
      .get<{
        items: Clinica[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>(this.apiUrl, { headers, params })
      .pipe(
        tap((res) => {
          console.log('[State] ✅ HTTP response:', res);
          ctx.patchState({
            clinicas: res.items,
            total: res.total,
            page: res.page,
            limit: res.limit,
            loading: false,
          });
          console.log('[State] patched state:', ctx.getState());
        }),
        catchError((err) => {
          console.error('[State] ❌ HTTP error:', err);
          ctx.patchState({ loading: false });
          return throwError(() => err);
        })
      );
  }
}
