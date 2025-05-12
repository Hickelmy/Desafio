import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalEspecialidadesComponent } from './componente/modal-especialidades.component';

@Component({
  standalone: true,
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class VisualizacaoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  clinica!: {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    regional: string;
    dataInauguracao: string;
    ativa: boolean;
    especialidades: string[];
  };

  especialidadesLimitadas: string[] = [];
  hasMaisEspecialidades = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Mock de dados (deve ser substituído por chamada ao backend futuramente)
    this.clinica = {
      razaoSocial: `Clínica Exemplo ${id}`,
      nomeFantasia: `Clínica Ex ${id}`,
      cnpj: '00.000.000/0001-00',
      regional: 'SP',
      dataInauguracao: new Date().toLocaleDateString(),
      ativa: true,
      especialidades: [
        'Clínico Geral', 'Pediatria', 'Ortopedia',
        'Cardiologia', 'Neurologia', 'Ginecologia'
      ]
    };

    this.hasMaisEspecialidades = this.clinica.especialidades.length > 5;
    this.especialidadesLimitadas = this.hasMaisEspecialidades
      ? this.clinica.especialidades.slice(0, 5)
      : this.clinica.especialidades;
  }

  verTodasEspecialidades(): void {
    this.dialog.open(ModalEspecialidadesComponent, {
      data: this.clinica.especialidades,
      panelClass: 'custom-modal-panel'
    });
  }
}
