import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent),
    title: 'Propuesta de Diseño Experimental',
  },
  {
    path: 'motivacion',
    loadComponent: () => import('./pages/motivacion/motivacion.component').then(m => m.MotivacionComponent),
    title: 'Motivación — Propuesta de Diseño Experimental',
  },
  {
    path: 'hipotesis',
    loadComponent: () => import('./pages/hipotesis/hipotesis.component').then(m => m.HipotesisComponent),
    title: 'Hipótesis — Propuesta de Diseño Experimental',
  },
  {
    path: 'metodologia',
    loadComponent: () => import('./pages/metodologia/metodologia.component').then(m => m.MetodologiaComponent),
    title: 'Metodología — Propuesta de Diseño Experimental',
  },
  {
    path: 'redaccion',
    loadComponent: () => import('./pages/redaccion/redaccion.component').then(m => m.RedaccionComponent),
    title: 'Redacción — Propuesta de Diseño Experimental',
  },
  {
    path: 'entregables',
    loadComponent: () => import('./pages/entregables/entregables.component').then(m => m.EntregablesComponent),
    title: 'Entregables — Propuesta de Diseño Experimental',
  },
  // Redirects de módulos fusionados (preservan enlaces antiguos)
  { path: 'comparacion', redirectTo: 'metodologia', pathMatch: 'full' },
  { path: 'datasets',    redirectTo: 'metodologia', pathMatch: 'full' },
  { path: 'baselines',   redirectTo: 'metodologia', pathMatch: 'full' },
  { path: 'como-funciona', redirectTo: 'autor', pathMatch: 'full' },
  {
    path: 'autor',
    loadComponent: () => import('./pages/autor/autor.component').then(m => m.AutorComponent),
    title: 'Autor — Propuesta de Diseño Experimental',
  },
  {
    path: 'laboratorio',
    loadComponent: () => import('./pages/laboratorio/laboratorio.component').then(m => m.LaboratorioComponent),
    title: 'Laboratorio — Propuesta de Diseño Experimental',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
