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
    path: 'comparacion',
    loadComponent: () => import('./pages/comparacion/comparacion.component').then(m => m.ComparacionComponent),
    title: 'Comparación — Propuesta de Diseño Experimental',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
