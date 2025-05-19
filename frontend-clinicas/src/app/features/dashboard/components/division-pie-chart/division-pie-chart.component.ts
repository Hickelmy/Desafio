import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-division-pie-chart',
  templateUrl: './division-pie-chart.component.html',
  styleUrls: ['./division-pie-chart.component.scss'],
  imports: [CommonModule, MatCardModule, NgxChartsModule]
})
export class DivisionPieChartComponent implements OnInit {
  data = [
    { name: 'Cardiology', value: 30 },
    { name: 'Neurology', value: 25 },
    { name: 'Orthopedics', value: 20 },
    { name: 'Pediatrics', value: 25 }
  ];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [] as string[]  
  };

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this.colorScheme.domain = isDark
      ? ['#60a5fa', '#f87171', '#facc15', '#34d399']
      : ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'];
  }
}
