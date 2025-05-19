// src/app/features/dashboard/components/stats-summary.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatCardModule }     from '@angular/material/card';
import { MatIconModule }     from '@angular/material/icon';
import { Observable }        from 'rxjs';
import { Stat, StatsService } from './service/stats.service';

@Component({
  standalone: true,
  selector: 'app-stats-summary',
  templateUrl: './stats-summary.component.html',
  styleUrls: ['./stats-summary.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class StatsSummaryComponent implements OnInit {
  stats$!: Observable<Stat[]>;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.stats$ = this.statsService.getStats();
  }
}
