import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {
  displayedColumns: string[] = ['select', 'patient', 'contact', 'birth', 'status', 'doctor', 'lastVisit', 'actions'];

  patients = [
    {
      name: 'Bessie Cooper',
      email: 'tanya.hill@example.com',
      phone: '(303) 555-0105',
      dob: '1979-04-12',
      age: 39,
      status: 'Active',
      doctor: 'Dr. Adam Bennett',
      lastVisit: '2023-10-20',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Dianne Russell',
      email: 'sara.cruz@example.com',
      phone: '(201) 555-0124',
      dob: '2001-06-08',
      age: 24,
      status: 'Inactive',
      doctor: 'Dr. Emily Roberts',
      lastVisit: '2024-10-04',
      avatar: ''
    },
    {
      name: 'Wade Warren',
      email: 'jessica.hanson@example.com',
      phone: '(270) 555-0117',
      dob: '1999-08-19',
      age: 24,
      status: 'Active',
      doctor: 'Dr. Michael Hayes',
      lastVisit: '2024-10-05',
      avatar: 'https://i.pravatar.cc/150?img=11'
    }
  ];

  getStatusColor(status: string): string {
    return status === 'Active' ? 'primary' : 'warn';
  }

  getAvatar(url: string, index: number): string {
    return url || `https://i.pravatar.cc/150?img=${index + 10}`;
  }
}
