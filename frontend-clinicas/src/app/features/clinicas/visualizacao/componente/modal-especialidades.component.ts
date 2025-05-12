import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'modal-especialidades',
  template: `
    <h2>Especialidades Médicas</h2>
    <ul>
      <li *ngFor="let e of data">{{ e }}</li>
    </ul>
  `,
  imports: [CommonModule, MatDialogModule]
})
export class ModalEspecialidadesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
