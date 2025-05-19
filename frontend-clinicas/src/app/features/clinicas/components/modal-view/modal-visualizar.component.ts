import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-visualizar',
  standalone: true,
  templateUrl: './modal-visualizar.component.html',
  styleUrls: ['./modal-visualizar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ModalVisualizarComponent {
  readonly clinica = inject(MAT_DIALOG_DATA) as {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    regional: string;
    dataInauguracao: string;
    ativa: boolean;
    especialidades: { id: string; nome: string }[];
  };

  private readonly dialogRef = inject(MatDialogRef<ModalVisualizarComponent>);

  colapsarEspecialidades = false;

  exibirMaisEspecialidades(): void {
    this.colapsarEspecialidades = true;
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  get camposPrincipais() {
    return [
      { label: 'Razão Social', valor: this.clinica.razaoSocial },
      { label: 'CNPJ', valor: this.clinica.cnpj },
      { label: 'Regional', valor: this.clinica.regional || '-' },
      { label: 'Data de Inauguração', valor: this.clinica.dataInauguracao || '-' },
      { label: 'Ativa', valor: this.clinica.ativa ? 'Sim' : 'Não' }
    ];
  }
}
