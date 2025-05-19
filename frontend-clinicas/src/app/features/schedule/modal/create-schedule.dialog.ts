import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-schedule-dialog',
  standalone: true,
  templateUrl: './create-schedule.dialog.html',
  styleUrls: ['./create-schedule.dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateScheduleDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateScheduleDialogComponent>);
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    patient: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    specialty: ['', Validators.required],
    doctor: ['', Validators.required],
    status: ['Pendente']
  });

  submit() {
    if (this.form.valid) {
      const value = {
        ...this.form.value,
        time: this.form.value.time,
        reason: this.form.value.specialty
      };
      this.dialogRef.close(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
