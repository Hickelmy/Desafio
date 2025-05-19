import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

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

  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./layout/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard-shell/dashboard-shell.component').then(m => m.DashboardShellComponent)
      },

      {
        path: 'schedule',
        loadComponent: () =>
          import('./features/schedule/schedule.component').then(m => m.ScheduleComponent)
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./features/patients/patients.component').then(m => m.PatientsComponent)
      },
      {
        path: 'doctor',
        loadComponent: () =>
          import('./features/doctor/listagem-medicos.component').then(m => m.ListagemMedicosComponent)
      },
      {
        path: 'todo',
        loadComponent: () =>
          import('./features/todo/todo.component').then(m => m.TodoComponent)
      },
      {
        path: 'cme',
        loadComponent: () =>
          import('./features/cme/cme.component').then(m => m.CMEComponent)
      },

      {
        path: 'imaging',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/imaging/imaging.component').then(m => m.ImagingComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/imaging/view/imaging-view.component').then(m => m.ImagingViewComponent)
          }
        ]
      },
      
      {
        path: 'clinicas',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/clinicas/pages/listagem.component').then(m => m.ListagemComponent)
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/clinicas/components/modal-create/modal-formulario.component').then(m => m.ModalFormularioComponent)
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/clinicas/components/modal-create/modal-formulario.component').then(m => m.ModalFormularioComponent)
          },
          {
            path: ':id/view',
            loadComponent: () =>
              import('./features/clinicas/components/modal-view/modal-visualizar.component').then(m => m.ModalVisualizarComponent)
          }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];
