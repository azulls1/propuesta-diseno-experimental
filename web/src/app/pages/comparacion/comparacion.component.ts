import { Component, computed, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';

type BaselineType = 'trivial' | 'classical' | 'sota' | 'ablation';

interface Baseline {
  name: string;
  type: BaselineType;
  expectedF1: string;
  rationale: string;
  details: string;
}

@Component({
  selector: 'app-comparacion',
  standalone: true,
  imports: [SectionLayoutComponent, ExpandCardComponent],
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
          <div class="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest flex items-center gap-2">
              <span class="section-num">4.1</span><span>Baselines a evaluar</span>
            </h2>
            <span class="text-xs text-moss font-mono">click una tarjeta para ver detalles →</span>
          </div>

          <!-- Filter chips -->
          <div class="filter-pills mb-4">
            @for (f of filters; track f.id) {
              <button type="button"
                      (click)="activeFilter.set(f.id)"
                      class="filter-pill"
                      [class.active]="activeFilter() === f.id">
                {{ f.label }}
                <span class="ml-1 text-[10px] opacity-70">{{ countFor(f.id) }}</span>
              </button>
            }
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            @for (b of filteredBaselines(); track b.name) {
              <app-expand-card>
                <div summary>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="text-forest font-display font-medium">{{ b.name }}</div>
                    @switch (b.type) {
                      @case ('trivial')   { <span class="badge-inactive">Trivial</span> }
                      @case ('classical') { <span class="badge-inactive">Clásico</span> }
                      @case ('ablation')  { <span class="badge-inactive">Ablación</span> }
                      @case ('sota')      { <span class="badge-forest">Estado del arte</span> }
                    }
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-moss font-mono">F1 esperado:</span>
                    <span class="tag">{{ b.expectedF1 }}</span>
                  </div>
                </div>
                <div details>
                  <p class="text-sm text-pine mb-3">{{ b.rationale }}</p>
                  <div class="rounded border border-fog bg-gray-50 p-3 text-xs text-pine font-mono leading-relaxed">
                    {{ b.details }}
                  </div>
                </div>
              </app-expand-card>
            }
          </div>

          @if (filteredBaselines().length === 0) {
            <div class="text-center py-8 text-moss">
              No hay baselines para el filtro <strong>{{ activeFilter() }}</strong>.
            </div>
          }
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
          <div class="space-y-3">
            @for (t of tests; track t.name) {
              <app-expand-card>
                <div summary>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <div class="text-forest font-display font-medium">{{ t.name }}</div>
                    <span class="tag">{{ t.scope }}</span>
                  </div>
                </div>
                <div details>
                  <p class="text-sm text-pine mb-2">{{ t.note }}</p>
                  <div class="rounded border border-fog bg-gray-50 p-2 text-xs text-pine font-mono">{{ t.code }}</div>
                </div>
              </app-expand-card>
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
  protected activeFilter = signal<BaselineType | 'all'>('all');

  protected filteredBaselines = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.baselines : this.baselines.filter(b => b.type === f);
  });

  countFor(filter: BaselineType | 'all'): number {
    return filter === 'all' ? this.baselines.length : this.baselines.filter(b => b.type === filter).length;
  }

  readonly filters: { id: BaselineType | 'all'; label: string }[] = [
    { id: 'all',       label: 'Todos' },
    { id: 'trivial',   label: 'Trivial' },
    { id: 'classical', label: 'Clásico' },
    { id: 'sota',      label: 'Estado del arte' },
    { id: 'ablation',  label: 'Ablación' },
  ];

  readonly baselines: Baseline[] = [
    { name: 'Mayoría (clase frecuente)', type: 'trivial', expectedF1: '~0.42',
      rationale: 'Suelo absoluto. Garantiza que cualquier método tenga sentido.',
      details: 'sklearn.dummy.DummyClassifier(strategy="most_frequent")' },
    { name: 'Logistic Regression + TF-IDF', type: 'classical', expectedF1: '~0.62',
      rationale: 'Baseline clásico de referencia para clasificación de texto.',
      details: 'TfidfVectorizer(max_features=20000, ngram_range=(1,2)) + LogReg(C=1.0)' },
    { name: 'XLM-RoBERTa-large zero-shot', type: 'sota', expectedF1: '~0.71',
      rationale: 'Estado del arte actual sin fine-tuning dialectal.',
      details: 'transformers: pipeline("text-classification", model="xlm-roberta-large")' },
    { name: 'RoBERTuito-MX sin preprocessing', type: 'ablation', expectedF1: '~0.78',
      rationale: 'Ablación: aislamos el efecto del preprocesamiento.',
      details: 'Mismo modelo, sin las normalizaciones de URL/mention/emoji.' },
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
    { name: 'Wilcoxon signed-rank', scope: 'pareada · no paramétrica',
      note: 'Comparación pareada de F1 entre RoBERTuito-MX y cada baseline sobre 5 seeds. α = 0.05.',
      code: 'scipy.stats.wilcoxon(scores_ours, scores_baseline)' },
    { name: 'Bootstrap (n=1000)', scope: 'IC 95%',
      note: 'Intervalo de confianza no paramétrico para el F1 macro sobre test.',
      code: 'np.percentile([f1(resample(test)) for _ in range(1000)], [2.5, 97.5])' },
    { name: 'Corrección de Holm', scope: 'múltiples comparaciones',
      note: 'Comparamos contra 4 baselines ⇒ controlar FWER mediante Holm step-down.',
      code: 'statsmodels.stats.multitest.multipletests(pvalues, method="holm")' },
  ];
}
