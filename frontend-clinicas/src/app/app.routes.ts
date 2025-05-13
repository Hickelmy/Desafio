import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // 🔁 Redirecionamento padrão
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🔐 Autenticação
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },

  // 📊 Dashboard (protegido)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard-shell/dashboard-shell.component').then(m => m.DashboardShellComponent)
  },

  // 🏥 Clínicas (CRUD)
  {
    path: 'clinicas',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/clinicas/listagem/listagem.component').then(m => m.ListagemComponent)
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/clinicas/formulario/formulario.component').then(m => m.FormularioComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./features/clinicas/formulario/formulario.component').then(m => m.FormularioComponent)
      },
      {
        path: ':id/view',
        loadComponent: () =>
          import('./features/clinicas/visualizacao/visualizacao.component').then(m => m.VisualizacaoComponent)
      }
    ]
  },

  // ❌ Rota desconhecida
  {
    path: '**',
    redirectTo: 'login'
  }
];
