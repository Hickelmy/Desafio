import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loading-overlay">
      <mat-progress-spinner
        diameter="60"
        strokeWidth="5"
        mode="indeterminate"
        color="primary"
      ></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(2px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  `]
})
export class LoadingSpinnerComponent {}
