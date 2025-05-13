import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';


import { StatsSummaryComponent } from '../components/stats-summary/stats-summary.component';
import { AppointmentsListComponent } from '../components/appointments-list/appointments-list.component';
import { DoctorOfTheMonthComponent } from '../components/doctor-of-the-month/doctor-of-the-month.component';
import { DivisionPieChartComponent } from '../components/division-pie-chart/division-pie-chart.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { TopbarComponent } from '../../../shared/topbar/topbar.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.scss'],
  imports: [
    CommonModule,
    MatSidenavModule,
    SidebarComponent,
    TopbarComponent,
    StatsSummaryComponent,
    AppointmentsListComponent,
    DoctorOfTheMonthComponent,
    DivisionPieChartComponent
  ]
})
export class DashboardShellComponent {
  isMobile = false;
  opened = true;

  constructor() {
    const observer = inject(BreakpointObserver);
    observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      this.opened = !this.isMobile;
    });
  }

  toggleSidebar(): void {
    this.opened = !this.opened;
  }
}
