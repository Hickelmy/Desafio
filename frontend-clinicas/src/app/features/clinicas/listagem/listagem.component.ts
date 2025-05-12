import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ListagemComponent implements OnInit {
  private router = inject(Router);

  displayedColumns: string[] = ['razaoSocial', 'nomeFantasia', 'cnpj', 'acoes'];
  dataSource = [
    { id: 1, razaoSocial: 'Clínica A', nomeFantasia: 'Clínica Alpha', cnpj: '00.000.000/0001-00' },
    { id: 2, razaoSocial: 'Clínica B', nomeFantasia: 'Clínica Beta', cnpj: '11.111.111/0001-11' },
  ];

  filtro = new FormControl('');

  ngOnInit(): void {
    this.filtro.valueChanges.pipe(debounceTime(300)).subscribe(f => {
      console.log('filtrar por:', f); // implementar integração com API
    });
  }

  editar(id: number): void {
    this.router.navigate(['/clinicas', id, 'edit']);
  }

  visualizar(id: number): void {
    this.router.navigate(['/clinicas', id, 'view']);
  }
}
