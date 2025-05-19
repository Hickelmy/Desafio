// src/app/state/doctor.state.ts

import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { DoctorService, PaginatedResult } from '../services/doctor.service';
import {
  LoadDoctors,
  SetDoctorFilter,
  SetDoctorPage,
  AddDoctor,
  UpdateDoctor,
  DeleteDoctor
} from './doctor.actions';
import { Doctor } from '../../../models/doctor.model';

export interface DoctorStateModel {
  doctors: Doctor[];
  total: number;
  page: number;
  limit: number;
  filter: string;
}

@State<DoctorStateModel>({
  name: 'doctorState',
  defaults: {
    doctors: [],
    total: 0,
    page: 1,
    limit: 10,
    filter: ''
  }
})
@Injectable()
export class DoctorState {
  constructor(private doctorService: DoctorService) {}

  @Selector()
  static doctors(state?: DoctorStateModel): Doctor[] {
    return state?.doctors ?? [];
  }

  @Selector()
  static total(state?: DoctorStateModel): number {
    return state?.total ?? 0;
  }

  @Selector()
  static page(state?: DoctorStateModel): number {
    return state?.page ?? 1;
  }

  @Selector()
  static limit(state?: DoctorStateModel): number {
    return state?.limit ?? 10;
  }

  @Selector()
  static filter(state?: DoctorStateModel): string {
    return state?.filter ?? '';
  }

  @Action(LoadDoctors)
  loadDoctors(ctx: StateContext<DoctorStateModel>) {
    const { filter, page, limit } = ctx.getState();
    return this.doctorService
      .list({ search: filter, page, limit })
      .pipe(
        tap((res: PaginatedResult<Doctor>) => {
          ctx.patchState({
            doctors: res.data,
            total:   res.total,
            page:    res.page,
            limit:   res.limit
          });
        })
      );
  }

  @Action(SetDoctorFilter)
  setDoctorFilter(
    ctx: StateContext<DoctorStateModel>,
    { filter }: SetDoctorFilter
  ) {
    ctx.patchState({ filter, page: 1 });
    return ctx.dispatch(new LoadDoctors());
  }

  @Action(SetDoctorPage)
  setDoctorPage(
    ctx: StateContext<DoctorStateModel>,
    { page, limit }: SetDoctorPage
  ) {
    const current = ctx.getState().limit;
    ctx.patchState({ page, limit: limit ?? current });
    return ctx.dispatch(new LoadDoctors());
  }

  @Action(AddDoctor)
  addDoctor(
    ctx: StateContext<DoctorStateModel>,
    { doctor }: AddDoctor
  ) {
    return this.doctorService.create(doctor).pipe(
      tap(() => ctx.dispatch(new LoadDoctors()))
    );
  }

  @Action(UpdateDoctor)
  updateDoctor(
    ctx: StateContext<DoctorStateModel>,
    { id, changes }: UpdateDoctor
  ) {
    return this.doctorService.update(id, changes).pipe(
      tap(() => ctx.dispatch(new LoadDoctors()))
    );
  }

  @Action(DeleteDoctor)
  deleteDoctor(
    ctx: StateContext<DoctorStateModel>,
    { id }: DeleteDoctor
  ) {
    return this.doctorService.delete(id).pipe(
      tap(() => ctx.dispatch(new LoadDoctors()))
    );
  }
}
