import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
} from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';
import { Patient } from '../../../models/patient.model';

function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const v: string = (control.value || '').replace(/\D+/g, '');
  if (v.length !== 11 || /^(\d)\1+$/.test(v)) return { invalidCpf: true };
  const calc = (m: number): number =>
    v
      .split('')
      .slice(0, m - 1)
      .map((n: string) => +n)
      .reduce((acc: number, num: number, i: number) => acc + num * (m - i), 0);
  const check = (m: number): boolean =>
    ((calc(m) * 10) % 11) % 10 === +v.charAt(m - 1);
  return check(10) && check(11) ? null : { invalidCpf: true };
}

@Component({
  selector: 'app-modal-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE,  useValue: 'pt-BR' },
    { provide: DateAdapter,      useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Editar' : 'Novo' }} Paciente</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome*</mat-label>
          <input matInput formControlName="name" />
          <mat-error *ngIf="form.get('name')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>CPF*</mat-label>
          <input
            matInput
            formControlName="cpf"
            mask="000.000.000-00"
            placeholder="___.___.___-__"
          />
          <mat-error *ngIf="form.get('cpf')?.hasError('required')">
            CPF é obrigatório
          </mat-error>
          <mat-error *ngIf="form.get('cpf')?.hasError('invalidCpf')">
            CPF inválido
          </mat-error>
        </mat-form-field>
       <mat-form-field appearance="outline" class="full-width">
          <mat-label>Telefone*</mat-label>
          <input
            matInput
            formControlName="phone"
            mask="(00) 00000-0000"
            placeholder="(__) _____-____"
          />
          <mat-error *ngIf="form.get('phone')?.hasError('required')">
            Telefone é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email*</mat-label>
          <input matInput formControlName="email" />
          <mat-error *ngIf="form.get('email')?.hasError('required')">
            Email é obrigatório
          </mat-error>
          <mat-error *ngIf="form.get('email')?.hasError('email')">
            Email inválido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Médico Responsável*</mat-label>
          <input matInput formControlName="doctor" />
          <mat-error *ngIf="form.get('doctor')?.hasError('required')">
            Médico é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Data de Nascimento*</mat-label>
          <input
            #dobInput
            matInput
            [matDatepicker]="picker"
            formControlName="dob"
            placeholder="dd/mm/aaaa"
            [max]="maxDob"
            readonly
            (keydown)="bloquearDigitacao($event)"
          />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker startView="multi-year"></mat-datepicker>
          <mat-error *ngIf="form.get('dob')?.hasError('required')">
            Data de nascimento é obrigatória
          </mat-error>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="dialogRef.close()">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
          Salvar
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 1rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPatientFormComponent {
  @ViewChild('dobInput', { read: ElementRef }) dobInput!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  maxDob = new Date();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalPatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient | null
  ) {
    this.form = this.fb.group({
      name:   [data?.name   || '', Validators.required],
      cpf:    [data?.cpf    || '', [Validators.required, cpfValidator]],
      phone:  [data?.phone  || '', [
                 Validators.required,
               ]],
      email:  [data?.email  || '', [Validators.required, Validators.email]],
      doctor: [data?.doctor || '', Validators.required],
      dob:    [data?.dob    ? new Date(data.dob) : null, Validators.required],
    });
  }

  bloquearDigitacao(evt: KeyboardEvent): void {
    evt.preventDefault();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const raw = this.form.value;
    const formattedDob = (raw.dob as Date).toISOString().split('T')[0];
    this.dialogRef.close({ ...this.data, ...raw, dob: formattedDob });
  }
}
