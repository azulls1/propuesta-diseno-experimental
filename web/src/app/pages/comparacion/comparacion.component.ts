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
      status="in-progress"
      prevLink="/metodologia"
      prevLabel="Metodología"
      nextLink="/redaccion"
      nextLabel="Redacción">

      <div class="stack-xl">

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-4 flex items-center gap-2">
            <span class="section-num">4.1</span><span>Baselines a evaluar</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            @for (b of baselines; track b.name) {
              <div class="rounded-lg border bg-white p-4"
                   [style.border-color]="b.type === 'sota' ? '#04202C' : '#DFE4E0'">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <div class="text-forest font-display font-medium">{{ b.name }}</div>
                  @switch (b.type) {
                    @case ('trivial')   { <span class="badge-inactive">Trivial</span> }
                    @case ('classical') { <span class="badge-inactive">Clásico</span> }
                    @case ('ablation')  { <span class="badge-inactive">Ablación</span> }
                    @case ('sota')      { <span class="badge-forest">Estado del arte</span> }
                  }
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs text-moss font-mono">F1 esperado:</span>
                  <span class="tag">{{ b.expectedF1 }}</span>
                </div>
                <p class="text-sm text-pine">{{ b.rationale }}</p>
              </div>
            }
          </div>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <span class="section-num">4.2</span><span>Condiciones de comparación justa</span>
          </h2>
          <p class="text-sm text-pine mb-4">
            Todos los métodos se evalúan bajo las mismas condiciones para que la comparación sea científicamente válida.
          </p>
          <div class="grid form-grid">
            @for (c of fairness; track c) {
              <div class="rounded-md border border-fog bg-gray-50 p-3 flex items-start gap-2 text-sm">
                <span style="color:#059669" class="mt-0.5">✓</span>
                <span class="text-pine">{{ c }}</span>
              </div>
            }
          </div>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <span class="section-num">4.3</span><span>Pruebas estadísticas</span>
          </h2>
          <div class="stack-sm">
            @for (t of tests; track t.name) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4">
                <div class="flex items-center justify-between mb-1">
                  <div class="text-forest font-display font-medium">{{ t.name }}</div>
                  <span class="tag">{{ t.scope }}</span>
                </div>
                <p class="text-sm text-pine">{{ t.note }}</p>
              </div>
            }
          </div>
        </article>

        <article class="card" style="border-color: #04202C">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="w-5 h-5">
              <path d="M3 3v18h18M7 14l4-4 3 3 5-5"/>
            </svg>
            Resultados esperados
          </h2>
          <p class="text-pine leading-relaxed">
            Si la hipótesis se confirma, esperamos
            <strong class="text-forest">F1 ≥ 0.83</strong> para RoBERTuito-MX
            (vs <span class="font-mono">0.71</span> del baseline zero-shot),
            con <span class="font-mono">p &lt; 0.01</span> tras corrección de Holm.
            Si la hipótesis se refuta, la mejora será inferior al umbral de
            <span class="font-mono">8 puntos</span>, lo que sugeriría que el shift dialectal
            requiere intervenciones más profundas que el simple fine-tuning.
          </p>
        </article>

      </div>
    </app-section-layout>
  `,
})
export class ComparacionComponent {
  readonly baselines: Baseline[] = [
    { name: 'Mayoría (clase frecuente)',           type: 'trivial',   expectedF1: '~0.42', rationale: 'Suelo absoluto. Garantiza que cualquier método tenga sentido.' },
    { name: 'Logistic Regression + TF-IDF',        type: 'classical', expectedF1: '~0.62', rationale: 'Baseline clásico de referencia para clasificación de texto.' },
    { name: 'XLM-RoBERTa-large zero-shot',         type: 'sota',      expectedF1: '~0.71', rationale: 'Estado del arte actual sin fine-tuning dialectal.' },
    { name: 'RoBERTuito-MX (ours) sin preprocess', type: 'ablation',  expectedF1: '~0.78', rationale: 'Ablación: aislamos el efecto del preprocesamiento.' },
  ];

  readonly fairness = [
    'Mismo conjunto de test, intocado durante desarrollo.',
    'Mismas métricas con la misma implementación (scikit-learn).',
    'Mismo presupuesto computacional (≤ 4 GPU-horas por método).',
    'Mismas 5 semillas aleatorias para promediar varianza.',
    'Mismo preprocesamiento aplicado a todos (o ablación explícita).',
    'Hiperparámetros tuneados con el mismo protocolo sobre val.',
  ];

  readonly tests = [
    { name: 'Wilcoxon signed-rank', scope: 'pareada · no paramétrica', note: 'Comparación pareada de F1 entre RoBERTuito-MX y cada baseline sobre 5 seeds. α = 0.05.' },
    { name: 'Bootstrap (n=1000)',   scope: 'IC 95%',                   note: 'Intervalo de confianza no paramétrico para el F1 macro sobre test.' },
    { name: 'Corrección de Holm',   scope: 'múltiples comparaciones',  note: 'Comparamos contra 4 baselines ⇒ controlar FWER mediante Holm step-down.' },
  ];
}
