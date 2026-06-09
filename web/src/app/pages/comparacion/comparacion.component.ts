import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

interface Baseline {
  name: string;
  type: 'trivial' | 'classical' | 'sota' | 'ablation';
  expectedF1: string;
  rationale: string;
}

@Component({
  selector: 'app-comparacion',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="04"
      sectionTitle="Comparación con otras técnicas"
      sectionDescription="Baselines, condiciones de comparación justa y pruebas estadísticas que permitirán validar o refutar la hipótesis."
      [rubricWeight]="20"
      status="in-progress"
      prevLink="/metodologia"
      prevLabel="Metodología"
      [nextLink]="null">

      <div class="space-y-8">

        <!-- Baselines table -->
        <article class="card">
          <h2 class="mb-4 flex items-center gap-2">
            <span class="section-num">4.1</span>
            <span>Baselines a evaluar</span>
          </h2>

          <div class="grid gap-3 md:grid-cols-2">
            @for (b of baselines; track b.name) {
              <div class="rounded-lg border bg-white p-4 transition-all"
                   [class.border-sage-200]="b.type !== 'sota'"
                   [class.border-forest-500]="b.type === 'sota'"
                   [class.shadow-card]="b.type === 'sota'">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <div class="text-brand-500 font-display font-medium">{{ b.name }}</div>
                  @switch (b.type) {
                    @case ('trivial')   { <span class="chip">Trivial</span> }
                    @case ('classical') { <span class="chip">Clásico</span> }
                    @case ('ablation')  { <span class="chip">Ablación</span> }
                    @case ('sota')      { <span class="badge-forest">Estado del arte</span> }
                  }
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs text-sage-500 font-ui">F1 esperado:</span>
                  <span class="mono text-sm text-forest-500 font-medium">{{ b.expectedF1 }}</span>
                </div>
                <p class="text-sm text-sage-600">{{ b.rationale }}</p>
              </div>
            }
          </div>
        </article>

        <!-- Comparación justa -->
        <article class="card">
          <h2 class="mb-3 flex items-center gap-2">
            <span class="section-num">4.2</span>
            <span>Condiciones de comparación justa</span>
          </h2>
          <p class="text-sm text-sage-700 mb-4">
            Todos los métodos se evalúan bajo las mismas condiciones para que la comparación sea científicamente válida.
          </p>
          <div class="grid sm:grid-cols-2 gap-2">
            @for (c of fairness; track c) {
              <div class="rounded-md border border-sage-200 bg-sage-50/50 p-3 flex items-start gap-2 text-sm">
                <span class="text-success mt-0.5">✓</span>
                <span class="text-sage-700">{{ c }}</span>
              </div>
            }
          </div>
        </article>

        <!-- Pruebas estadísticas -->
        <article class="card">
          <h2 class="mb-3 flex items-center gap-2">
            <span class="section-num">4.3</span>
            <span>Pruebas estadísticas</span>
          </h2>
          <div class="space-y-3">
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="flex items-center justify-between mb-1">
                <div class="text-brand-500 font-display font-medium">Wilcoxon signed-rank</div>
                <span class="chip mono">pareada · no paramétrica</span>
              </div>
              <p class="text-sm text-sage-600">
                Comparación pareada de F1 entre RoBERTuito-MX y cada baseline sobre 5 seeds.
                No asume normalidad, robusta a outliers. Nivel α = 0.05.
              </p>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="flex items-center justify-between mb-1">
                <div class="text-brand-500 font-display font-medium">Bootstrap (n=1000)</div>
                <span class="chip mono">IC 95%</span>
              </div>
              <p class="text-sm text-sage-600">
                Intervalo de confianza no paramétrico para el F1 macro de cada método sobre test.
              </p>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="flex items-center justify-between mb-1">
                <div class="text-brand-500 font-display font-medium">Corrección de Holm</div>
                <span class="chip mono">múltiples comparaciones</span>
              </div>
              <p class="text-sm text-sage-600">
                Comparamos contra 4 baselines ⇒ controlar FWER mediante Holm step-down.
              </p>
            </div>
          </div>
        </article>

        <!-- Resultados esperados -->
        <article class="card border-forest-500/40 bg-forest-500/5">
          <h2 class="mb-3 flex items-center gap-2 text-forest-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-5 w-5">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18M7 14l4-4 3 3 5-5"/>
            </svg>
            Resultados esperados
          </h2>
          <p class="text-sage-700 leading-relaxed">
            Si la hipótesis se confirma, esperamos
            <strong class="text-brand-500">F1 ≥ 0.83</strong> para RoBERTuito-MX
            (vs <span class="mono text-forest-500">0.71</span> del baseline zero-shot),
            con
            <span class="mono">p &lt; 0.01</span>
            tras corrección de Holm.
            Si la hipótesis se refuta, la mejora será inferior al umbral de
            <span class="mono">8 puntos</span>
            o no significativa, lo que sugeriría que el shift dialectal
            requiere intervenciones más profundas que el simple fine-tuning.
          </p>
        </article>

      </div>
    </app-section-layout>
  `,
})
export class ComparacionComponent {
  readonly baselines: Baseline[] = [
    {
      name: 'Mayoría (clase frecuente)',
      type: 'trivial',
      expectedF1: '~0.42',
      rationale: 'Suelo absoluto. Garantiza que cualquier método tenga sentido.',
    },
    {
      name: 'Logistic Regression + TF-IDF',
      type: 'classical',
      expectedF1: '~0.62',
      rationale: 'Baseline clásico de referencia para clasificación de texto.',
    },
    {
      name: 'XLM-RoBERTa-large zero-shot',
      type: 'sota',
      expectedF1: '~0.71',
      rationale: 'Estado del arte actual sin fine-tuning dialectal. La métrica a superar.',
    },
    {
      name: 'RoBERTuito-MX (ours) sin preprocessing',
      type: 'ablation',
      expectedF1: '~0.78',
      rationale: 'Ablación: aislamos el efecto del preprocesamiento (URLs, mentions).',
    },
  ];

  readonly fairness: string[] = [
    'Mismo conjunto de test, intocado durante desarrollo.',
    'Mismas métricas definidas con la misma implementación (scikit-learn).',
    'Mismo presupuesto computacional (≤ 4 GPU-horas por método).',
    'Mismas 5 semillas aleatorias para promediar varianza.',
    'Mismo preprocesamiento aplicado a todos (o ablación explícita).',
    'Hiperparámetros tuneados con el mismo protocolo sobre val.',
  ];
}
