import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Subject } from 'rxjs';
import {
  startWith,
  debounceTime,
  map,
  takeUntil,
} from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { LoadClinicas } from '../../../state/clinica.actions';
import { ClinicasState } from '../../../state/clinica.state';

import { ModalFormularioComponent } from '../components/modal-create/modal-formulario.component';
import { ModalVisualizarComponent } from '../components/modal-view/modal-visualizar.component';

@Component({
  selector: 'app-listagem-clinicas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly destroy$ = new Subject<void>();

  readonly clinicas$ = this.store.select(ClinicasState.clinicas);
  readonly total$    = this.store.select(ClinicasState.total);
  readonly loading$  = this.store.select(ClinicasState.loading);

  readonly filtro = new FormControl<string>('');
  readonly displayedColumns = [
    'nomeFantasia',
    'cnpj',
    'regional',
    'dataInauguracao',
    'ativa',
    'acoes',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize  = 5;

  ngOnInit(): void {
    console.log('[Component] ngOnInit');

    this.clinicas$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => console.log('[Component] clinicas$', items));
    this.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => console.log('[Component] total$', total));
    this.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => console.log('[Component] loading$', loading));

    this.filtro.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(s => (s ?? '').trim()),
        takeUntil(this.destroy$)
      )
      .subscribe(search => {
        console.log('[Component] filtro.valueChanges ➡️', search);
        this.pageIndex = 0;
        this.loadClinicas(search);
      });

    console.log('[Component] initial loadClinicas');
    this.loadClinicas('');
  }

  ngOnDestroy(): void {
    console.log('[Component] ngOnDestroy');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadClinicas(search: string): void {
    const payload = {
      search,
      page:  this.pageIndex + 1,
      limit: this.pageSize,
    };
    console.log('[Component] dispatch LoadClinicas with', payload);
    this.store.dispatch(new LoadClinicas(payload));
  }

  pageChanged(event: PageEvent): void {
    console.log('[Component] pageChanged event:', event);
    this.pageIndex = event.pageIndex;
    this.pageSize  = event.pageSize;
    this.loadClinicas((this.filtro.value ?? '').trim());
  }

  abrirCadastro(): void {
    console.log('[Component] abrirCadastro');
    const ref = this.dialog.open(ModalFormularioComponent, {
      width: '800px',
      disableClose: true,
      data: null,
    });

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('[Component] abrirCadastro dialog closed with', result);
        if (result === 'salvo') {
          this.loadClinicas((this.filtro.value ?? '').trim());
        }
      });
  }

  editar(id: string): void {
    console.log('[Component] editar id:', id);
    const ref = this.dialog.open(ModalFormularioComponent, {
      width: '800px',
      disableClose: true,
      data: { id },
    });

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('[Component] editar dialog closed with', result);
        if (result === 'salvo') {
          this.loadClinicas((this.filtro.value ?? '').trim());
        }
      });
  }

  visualizar(id: string): void {
    console.log('[Component] visualizar id:', id);
    this.dialog.open(ModalVisualizarComponent, {
      width: '600px',
      disableClose: true,
      data: { id },
    });
  }
}
