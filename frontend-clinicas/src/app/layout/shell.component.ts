import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SidebarComponent,
    TopbarComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  opened = true;
  isMobile = false;

  private readonly breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(({ matches }) => {
        this.isMobile = matches;
        this.opened = !matches; 
      });
  }

  toggleSidebar(): void {
    this.opened = !this.opened;
  }
}
