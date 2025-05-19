import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import {
  MatTableModule,
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import {
  MatDialogModule,
  MatDialog
} from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Store, Select } from '@ngxs/store';

import { Doctor } from '../../models/doctor.model';
import { ModalFormularioMedicoComponent } from './modal/modal-formulario-medico.component';
import { DeleteDoctor, LoadDoctors, SetDoctorFilter, SetDoctorPage } from './state/doctor.actions';
import { DoctorState } from './state/doctor.state';

@Component({
  selector: 'app-listagem-medicos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './listagem-medicos.component.html',
  styleUrls: ['./listagem-medicos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListagemMedicosComponent implements OnInit, AfterViewInit, OnDestroy {
  private store  = inject(Store);
  private dialog = inject(MatDialog);

  // Agora usamos store.select para garantir que nunca fiquem undefined
  medicos$ = this.store.select(DoctorState.doctors);
  total$   = this.store.select(DoctorState.total);
  page$    = this.store.select(DoctorState.page);
  limit$   = this.store.select(DoctorState.limit);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtro           = new FormControl<string>('');
  dataSource       = new MatTableDataSource<Doctor>();
  displayedColumns = [
    'name', 'crm', 'specialty', 'phone', 'email', 'status', 'actions'
  ];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Carrega dados iniciais
    this.loadDoctors();

    // Inscreve na lista de médicos
    this.medicos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.dataSource.data = list);

    // Filtro com debounce
    this.filtro.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(term =>
        this.store.dispatch(new SetDoctorFilter(term ?? ''))
      );
  }

  ngAfterViewInit(): void {
    // Associa o paginator ao dataSource
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent): void {
    this.store.dispatch(new SetDoctorPage(event.pageIndex + 1, event.pageSize));
  }

  novo(): void {
    this.openForm('criar');
  }

  editar(doc: Doctor): void {
    this.openForm('editar', doc);
  }

  apagar(id: string): void {
    if (confirm('Confirma exclusão do médico?')) {
      this.store.dispatch(new DeleteDoctor(id));
    }
  }

  private openForm(mode: 'criar' | 'editar', doctor?: Doctor): void {
    this.dialog
      .open(ModalFormularioMedicoComponent, { data: { mode, doctor } })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadDoctors());
  }

  private loadDoctors(): void {
    this.store.dispatch(new LoadDoctors());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
