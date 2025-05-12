import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class FormularioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isEdit = false;

  regionais = [
    'Alto tietê', 'Interior', 'ES', 'SP Interior', 'SP', 'SP2', 'MG',
    'Nacional', 'SP CAV', 'RJ', 'SP2', 'SP1', 'NE1', 'NE2', 'SUL', 'Norte'
  ];

  especialidades = [
    'Clínico Geral', 'Pediatria', 'Ortopedia', 'Ginecologia',
    'Dermatologia', 'Cardiologia', 'Oftalmologia', 'Endocrinologia',
    'Neurologia', 'Psiquiatria'
  ];

  ngOnInit(): void {
    this.isEdit = !!this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.maxLength(18)]],
      regional: ['', Validators.required],
      dataInauguracao: ['', Validators.required],
      ativa: [false],
      especialidades: [[], [Validators.required, Validators.minLength(5)]]
    });

    if (this.isEdit) {
      // mock do carregamento de dados
      const dados = {
        razaoSocial: 'Clínica Exemplo',
        nomeFantasia: 'Clínica Ex',
        cnpj: '00.000.000/0001-00',
        regional: 'SP',
        dataInauguracao: new Date(),
        ativa: true,
        especialidades: ['Clínico Geral', 'Pediatria', 'Ortopedia', 'Cardiologia', 'Neurologia']
      };
      this.form.patchValue(dados);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    if (this.isEdit) {
      alert('Clínica atualizada com sucesso!');
    } else {
      alert('Clínica criada com sucesso!');
    }

    this.router.navigate(['/clinicas']);
  }
}
