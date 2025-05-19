// src/app/features/patients/patients.component.ts
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, map, tap, finalize, shareReplay } from 'rxjs/operators';
import { PatientsService, PaginatedResult } from './service/patients.service';
import { Patient } from '../../models/patient.model';
import { ModalPatientFormComponent } from './modal/modal-patient-form.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent {
  private service = inject(PatientsService);
  private dialog  = inject(MatDialog);

  private refresh$ = new BehaviorSubject<void>(undefined);
  private page$    = new BehaviorSubject<{ page: number; limit: number }>({ page: 1, limit: 5 });
  private search$  = new BehaviorSubject<string>('');
  readonly filter$  = new BehaviorSubject<'All'|'Active'|'Inactive'>('All');
  readonly loading$ = new BehaviorSubject<boolean>(false);

  darkMode = false;
  displayedColumns = ['select','patient','contact','birth','status','doctor','lastVisit','actions'];

  private data$ = combineLatest([
    this.page$,
    this.search$,
    this.refresh$,
  ]).pipe(
    tap(() => this.loading$.next(true)),
    switchMap(([{page, limit}, search]) =>
      this.service.getAll(search, page, limit).pipe(
        finalize(() => this.loading$.next(false))
      )
    ),
    shareReplay(1),
  );

  rows$      = this.data$.pipe(map((r: PaginatedResult<Patient>) => r.items));
  total$     = this.data$.pipe(map(r => r.total));
  pageIndex$ = this.page$.pipe(map(s => s.page - 1));
  pageSize$  = this.page$.pipe(map(s => s.limit));

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  onSearch(term: string) {
    this.search$.next(term.trim());
    this.page$.next({ ...this.page$.value, page: 1 });
    this.refresh$.next();
  }

  filterStatus(status: 'All'|'Active'|'Inactive') {
    this.filter$.next(status);
    this.page$.next({ ...this.page$.value, page: 1 });
    this.refresh$.next();
  }

  onPageChange(e: PageEvent) {
    this.page$.next({ page: e.pageIndex + 1, limit: e.pageSize });
    this.refresh$.next();
  }

  newPatient() {
    const ref = this.dialog.open(ModalPatientFormComponent, { width: '600px', data: null });
    ref.afterClosed().subscribe(r => {
      if (r) this.service.create(r).subscribe(() => this.refresh$.next());
    });
  }

  editPatient(p: Patient) {
    const ref = this.dialog.open(ModalPatientFormComponent, { width: '600px', data: p });
    ref.afterClosed().subscribe(updated => {
      if (updated) this.service.update(p.id, updated).subscribe(() => this.refresh$.next());
    });
  }

  deletePatient(id: string) {
    if (!confirm('Deseja realmente excluir este paciente?')) return;
    this.service.delete(id).subscribe(() => this.refresh$.next());
  }

  getStatusColor(status: string) {
    return status === 'Active' ? 'primary' : 'warn';
  }

  getAvatar(url: string|undefined, idx: number) {
    return url || `https://i.pravatar.cc/150?img=${idx + 10}`;
  }
}
