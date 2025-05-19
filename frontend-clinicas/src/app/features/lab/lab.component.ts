import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent {
  displayedColumns = ['reg', 'patient', 'referred', 'test', 'report', 'transaction', 'actions'];

  labReports = [
    {
      reg: '2104 / L1',
      patient: 'Mrs Akshara',
      referred: 'Dr. Ali',
      test: 'Blood Sugar PP, BUN / Creatinine Ratio, Anti TPO',
      report: 'Dispatched',
      transaction: 'No due'
    },
    {
      reg: '2104 / L2',
      patient: 'Mrs Akshara',
      referred: 'Dr. Ali',
      test: 'APTT, Blood Sugar PP, A/G Ratio, Anti TPO, Biopsy',
      report: 'In progress',
      transaction: 'Due Rs. 150'
    },
    {
      reg: '2104 / L3',
      patient: 'Mrs Akshara',
      referred: 'Dr. Ali',
      test: 'Biopsy',
      report: 'Signed off',
      transaction: 'No due'
    }
  ];

  getChipColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'dispatched':
      case 'signed off':
      case 'final':
        return 'primary';
      case 'in progress':
      case 'due rs. 150':
      case 'no due':
        return 'warn';
      case 'new':
        return 'accent';
      default:
        return '';
    }
  }
}
