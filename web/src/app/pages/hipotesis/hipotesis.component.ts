import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-hipotesis',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="02"
      sectionTitle="Hipótesis"
      sectionDescription="Formulación falsable con variables, métricas y criterio explícito de refutación. La hipótesis debe poder ser puesta a prueba por la metodología propuesta."
      [rubricWeight]="20"
      status="in-progress"
      prevLink="/motivacion"
      prevLabel="Motivación"
      nextLink="/metodologia"
      nextLabel="Metodología">

      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-6">

          <!-- H1 destacada -->
          <article class="card relative overflow-hidden border-brand-300">
            <div class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-brand-500/8 blur-3xl"></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-3">
                <span class="badge-brand">H1</span>
                <span class="chip">Alternativa</span>
              </div>
              <h2 class="mb-3">Hipótesis alternativa</h2>
              <p class="text-lg text-brand-500 leading-relaxed italic border-l-4 border-brand-500 pl-4 font-display">
                El fine-tuning de RoBERTuito sobre un corpus anotado de
                <strong class="not-italic">50 000 tuits en español mexicano</strong>
                incrementará el F1-score macro de detección de discurso de odio en
                <strong class="text-forest-500 not-italic">al menos 8 puntos</strong>
                respecto al baseline XLM-RoBERTa-large zero-shot
                (<span class="mono text-sm">α = 0.05</span>, prueba pareada).
              </p>
            </div>
          </article>

          <!-- H0 -->
          <article class="card">
            <div class="flex items-center gap-2 mb-3">
              <span class="chip">H0</span>
              <span class="chip">Nula</span>
            </div>
            <h2 class="mb-3">Hipótesis nula</h2>
            <p class="text-sage-700 leading-relaxed italic border-l-2 border-sage-300 pl-4">
              No existe diferencia estadísticamente significativa
              (<span class="mono">p &gt; 0.05</span>) entre el F1-score del modelo
              afinado y el baseline zero-shot sobre el corpus dialectal mexicano.
            </p>
          </article>

          <!-- Variables -->
          <article class="card">
            <h2 class="mb-4">Variables del experimento</h2>
            <div class="grid sm:grid-cols-3 gap-3">
              <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
                <div class="text-xs uppercase tracking-wider text-forest-500 font-ui mb-1">Independiente</div>
                <div class="text-brand-500 font-display font-medium">Estrategia de entrenamiento</div>
                <div class="text-xs text-sage-600 mt-1 mono">zero-shot · fine-tuned</div>
              </div>
              <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
                <div class="text-xs uppercase tracking-wider text-forest-500 font-ui mb-1">Dependiente</div>
                <div class="text-brand-500 font-display font-medium">F1-score macro</div>
                <div class="text-xs text-sage-600 mt-1 mono">{{ '{' }}0, 1{{ '}' }}</div>
              </div>
              <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
                <div class="text-xs uppercase tracking-wider text-forest-500 font-ui mb-1">Control</div>
                <div class="text-brand-500 font-display font-medium">Semilla, hardware, hp</div>
                <div class="text-xs text-sage-600 mt-1 mono">seed=42 · A100 · lr=2e-5</div>
              </div>
            </div>
          </article>

          <!-- Criterio de refutación -->
          <article class="card border-warning/40 bg-warning/5">
            <div class="flex items-center gap-2 text-warning text-sm font-display font-medium mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
              </svg>
              Criterio explícito de refutación
            </div>
            <p class="text-sage-700 leading-relaxed">
              La hipótesis H1 se considerará
              <strong class="text-brand-500">refutada</strong>
              si, tras ejecutar el experimento con 5 semillas aleatorias distintas,
              el incremento promedio en F1-score es
              <span class="mono text-forest-500">&lt; 8 puntos</span>
              o si la prueba de Wilcoxon pareada arroja
              <span class="mono text-forest-500">p ≥ 0.05</span>.
              En ese caso aceptaríamos H0.
            </p>
          </article>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-4">
          <div class="card border-forest-500/30">
            <div class="flex items-center gap-2 text-forest-500 text-sm font-display font-medium mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              Falsabilidad
            </div>
            <p class="text-sm text-sage-700 leading-relaxed">
              Una hipótesis es <strong class="text-brand-500">científica</strong>
              cuando es posible diseñar un experimento que la refute.
              La nuestra cumple porque define un umbral cuantitativo concreto.
            </p>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-2">Checklist</div>
            <ul class="text-sm space-y-2 text-sage-700">
              <li class="flex gap-2"><span class="text-success">✓</span> Falsable</li>
              <li class="flex gap-2"><span class="text-success">✓</span> Variables nombradas</li>
              <li class="flex gap-2"><span class="text-success">✓</span> Métrica cuantificable</li>
              <li class="flex gap-2"><span class="text-success">✓</span> Umbral explícito</li>
              <li class="flex gap-2"><span class="text-success">✓</span> Prueba estadística</li>
              <li class="flex gap-2"><span class="text-success">✓</span> H0 declarada</li>
            </ul>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-2">Plantilla aplicada</div>
            <p class="text-xs text-sage-600 mono leading-relaxed">
              [técnica X] mejorará [métrica M] en al menos [umbral] en [tarea T] sobre [población] frente a [baseline].
            </p>
          </div>
        </aside>
      </div>

    </app-section-layout>
  `,
})
export class HipotesisComponent {}
