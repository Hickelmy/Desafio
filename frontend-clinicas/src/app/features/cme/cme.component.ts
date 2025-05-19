import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-cme',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './cme.component.html',
  styleUrls: ['./cme.component.scss']
})
export class CMEComponent {
  form: FormGroup;
  displayedColumns = ['name', 'status'];
  materials: { name: string; status: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['Esterilizado', Validators.required]
    });
  }

  addMaterial() {
    if (this.form.valid) {
      this.materials.push(this.form.value);
      this.form.reset({ status: 'Esterilizado' });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Esterilizado': return 'primary';
      case 'Sujo': return 'warn';
      case 'Em uso': return 'accent';
      default: return '';
    }
  }
}
