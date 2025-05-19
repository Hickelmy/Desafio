import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { NgxMaskDirective } from 'ngx-mask';

import { Clinica } from '../../../../models/clinica.model';
import { Especialidade } from '../../../../models/especialidade.model';
import { ClinicaService } from '../../services/clinica.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-formulario',
  standalone: true,
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgxMaskDirective
  ]
})
export class ModalFormularioComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ClinicaService);
  private readonly dialogRef = inject(MatDialogRef<ModalFormularioComponent>);
  readonly clinica: Clinica | null = inject(MAT_DIALOG_DATA);

  readonly hoje = new Date();
  readonly minDataHora = this.hoje.toISOString().slice(0, 16);

  form!: FormGroup;
  especialidades: Especialidade[] = [];

  readonly regionais = [
    'Alto tietê', 'Interior', 'ES', 'SP Interior', 'SP', 'SP2', 'MG', 'Nacional',
    'SP CAV', 'RJ', 'SP1', 'NE1', 'NE2', 'SUL', 'Norte'
  ];

  ngOnInit(): void {
    this.initForm();
    this.carregarEspecialidades();
  }

  private initForm(): void {
    this.form = this.fb.group({
      razaoSocial: [this.clinica?.razaoSocial ?? '', Validators.required],
      nomeFantasia: [this.clinica?.nomeFantasia ?? '', Validators.required],
      cnpj: [this.clinica?.cnpj ?? '', [Validators.required, Validators.maxLength(18)]],
      regional: [this.clinica?.regional ?? '', Validators.required],
      dataInauguracao: [this.clinica?.dataInauguracao ?? '', Validators.required],
      ativa: [this.clinica?.ativa ?? false],
      especialidades: [
        this.clinica?.especialidades ?? [],
        [Validators.required, Validators.minLength(5)]
      ]
    });
  }

  private carregarEspecialidades(): void {
    this.service.getEspecialidades().subscribe({
      next: (res) => (this.especialidades = res),
      error: (err) => {
        console.error('Erro ao carregar especialidades:', err);
        this.especialidades = [];
      }
    });
  }

  abrirCampoDataHora(): void {
    const input = document.querySelector(
      'input[formControlName="dataInauguracao"]'
    ) as HTMLInputElement;

    input?.showPicker?.() ?? input?.focus();
  }

  bloquearDigitacao(event: KeyboardEvent): void {
    event.preventDefault();
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  salvarModal(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    const payload: Clinica = {
      ...this.clinica,
      razaoSocial: raw.razaoSocial.trim(),
      nomeFantasia: raw.nomeFantasia.trim(),
      cnpj: raw.cnpj.replace(/\D/g, ''),
      regional: raw.regional,
      dataInauguracao: new Date(raw.dataInauguracao).toISOString(),
      ativa: raw.ativa,
      especialidades: raw.especialidades
    };

    if (!this.validarCNPJ(payload.cnpj)) {
      this.form.get('cnpj')?.setErrors({ invalidCnpj: true });
      return;
    }

    const request$ = this.clinica?.id
      ? this.service.update(this.clinica.id, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => this.dialogRef.close('salvo'),
      error: (err) => {
        if (
          err.status === 400 &&
          err.error?.message?.toLowerCase().includes('cnpj')
        ) {
          this.form.get('cnpj')?.setErrors({ jaExiste: true });
        } else {
          console.error('Erro ao salvar clínica:', err);
        }
      }
    });
  }

  private validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const t = cnpj.length - 2;
    const d = cnpj.substring(t);
    const d1 = parseInt(d.charAt(0));
    const d2 = parseInt(d.charAt(1));

    const calc = (x: number) => {
      const n = cnpj.substring(0, x);
      let y = x - 7, s = 0;

      for (let i = x; i >= 1; i--) {
        s += parseInt(n.charAt(x - i)) * y--;
        if (y < 2) y = 9;
      }

      const r = 11 - (s % 11);
      return r > 9 ? 0 : r;
    };

    return calc(t) === d1 && calc(t + 1) === d2;
  }
}
