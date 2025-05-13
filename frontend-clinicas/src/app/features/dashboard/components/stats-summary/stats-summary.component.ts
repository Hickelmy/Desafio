import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-stats-summary',
  templateUrl: './stats-summary.component.html',
  styleUrls: ['./stats-summary.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class StatsSummaryComponent {
  stats = [
    {
      icon: 'groups',
      label: 'Total Patients',
      value: 1280,
      color: '#0ea5e9'
    },
    {
      icon: 'event',
      label: 'Appointments',
      value: 456,
      color: '#10b981'
    },
    {
      icon: 'bar_chart',
      label: 'Avg / Patient',
      value: 3.5,
      color: '#f59e0b'
    }
  ];
}
