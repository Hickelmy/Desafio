import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule     } from '@angular/material/input';
import { MatSelectModule    } from '@angular/material/select';
import { MatButtonModule    } from '@angular/material/button';

import { Store } from '@ngxs/store';
import { AddDoctor, UpdateDoctor } from '../state/doctor.actions';
import { Doctor } from '../../../models/doctor.model';

interface DialogData {
  mode: 'criar' | 'editar';
  doctor?: Doctor;
}

@Component({
  selector: 'app-modal-formulario-medico',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './modal-formulario-medico.component.html',
  styleUrls: ['./modal-formulario-medico.component.scss']
})
export class ModalFormularioMedicoComponent {
  form: FormGroup;
  mode: 'criar' | 'editar';
  statusOptions = ['Ativo', 'Inativo'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ModalFormularioMedicoComponent, boolean>,
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData
  ) {
    this.mode = data.mode;
    this.form = this.fb.group({
      name:      [data.doctor?.name      ?? '', [Validators.required]],
      crm:       [data.doctor?.crm       ?? '', [Validators.required]],
      specialty: [data.doctor?.specialty ?? '', [Validators.required]],
      phone:     [data.doctor?.phone     ?? ''],
      email:     [data.doctor?.email     ?? '', [Validators.email]],
      status:    [data.doctor?.status    ?? 'Ativo', [Validators.required]]
    });
  }

  get name()      { return this.form.get('name'); }
  get crm()       { return this.form.get('crm'); }
  get specialty() { return this.form.get('specialty'); }
  get phone()     { return this.form.get('phone'); }
  get email()     { return this.form.get('email'); }
  get status()    { return this.form.get('status'); }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Doctor = this.form.value as Doctor;

    if (this.mode === 'criar') {
      this.store.dispatch(new AddDoctor(payload));
    } else {
      this.store.dispatch(new UpdateDoctor(this.data.doctor!.id, payload));
    }

    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
