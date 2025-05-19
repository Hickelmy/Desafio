// src/app/features/patients/patients.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  LoadPatients,
  SetPatientSearch,
  SetPatientFilter,
  SetPatientPage,
  CreatePatient,
  UpdatePatient,
  DeletePatient,
} from './patients.actions';
import { tap, switchMap } from 'rxjs/operators';
import { Patient } from '../../../models/patient.model';
import { PaginatedResult, PatientsService } from './patients.service';

export interface PatientsStateModel {
  items: Patient[];
  total: number;
  page: number;
  limit: number;
  search: string;
  filter: 'All' | 'Active' | 'Inactive';
  loading: boolean;
}

@State<PatientsStateModel>({
  name: 'patients',
  defaults: {
    items: [],
    total: 0,
    page: 1,
    limit: 5,
    search: '',
    filter: 'All',
    loading: false,
  },
})
@Injectable()
export class PatientsState {
  constructor(private svc: PatientsService) {}

  @Selector() static items(state: PatientsStateModel) { return state.items; }
  @Selector() static total(state: PatientsStateModel) { return state.total; }
  @Selector() static page(state: PatientsStateModel) { return state.page - 1; }
  @Selector() static limit(state: PatientsStateModel) { return state.limit; }
  @Selector() static search(state: PatientsStateModel) { return state.search; }
  @Selector() static filter(state: PatientsStateModel) { return state.filter; }
  @Selector() static loading(state: PatientsStateModel) { return state.loading; }

  @Action(LoadPatients)
  load(ctx: StateContext<PatientsStateModel>, { page, limit, search }: LoadPatients) {
    ctx.patchState({ loading: true, page, limit, search });
    return this.svc.getAll(search, page, limit).pipe(
      tap((res: PaginatedResult<Patient>) => {
        ctx.patchState({
          items: res.items,
          total: res.total,
          loading: false,
        });
      })
    );
  }

  @Action(SetPatientSearch)
  setSearch(ctx: StateContext<PatientsStateModel>, { search }: SetPatientSearch) {
    const s = ctx.getState();
    ctx.patchState({ search, page: 1 });
    return ctx.dispatch(new LoadPatients(1, s.limit, search));
  }

  @Action(SetPatientFilter)
  setFilter(ctx: StateContext<PatientsStateModel>, { filter }: SetPatientFilter) {
    ctx.patchState({ filter });
  }

  @Action(SetPatientPage)
  setPage(ctx: StateContext<PatientsStateModel>, { page, limit }: SetPatientPage) {
    const s = ctx.getState();
    ctx.patchState({ page, limit });
    return ctx.dispatch(new LoadPatients(page, limit, s.search));
  }

  @Action(CreatePatient)
  create(ctx: StateContext<PatientsStateModel>, { patient }: CreatePatient) {
    return this.svc.create(patient).pipe(
      switchMap(() => {
        const s = ctx.getState();
        return ctx.dispatch(new LoadPatients(s.page, s.limit, s.search));
      })
    );
  }

  @Action(UpdatePatient)
  update(ctx: StateContext<PatientsStateModel>, { id, changes }: UpdatePatient) {
    return this.svc.update(id, changes).pipe(
      switchMap(() => {
        const s = ctx.getState();
        return ctx.dispatch(new LoadPatients(s.page, s.limit, s.search));
      })
    );
  }

  @Action(DeletePatient)
  delete(ctx: StateContext<PatientsStateModel>, { id }: DeletePatient) {
    return this.svc.delete(id).pipe(
      switchMap(() => {
        const s = ctx.getState();
        return ctx.dispatch(new LoadPatients(s.page, s.limit, s.search));
      })
    );
  }
}
