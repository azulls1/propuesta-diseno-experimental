import { Component, computed, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';

type BType = 'trivial' | 'classical' | 'sota' | 'ablation';

@Component({
  selector: 'app-baselines',
  standalone: true,
  imports: [SectionLayoutComponent, ExpandCardComponent],
  template: `
    <app-section-layout
      sectionNumber="07"
      sectionTitle="Baselines y estado del arte"
      sectionDescription="Métodos contra los que se mide nuestra propuesta. Por qué cada uno está incluido y qué aporta su comparación."
      status="done"
      prevLink="/datasets"
      prevLabel="Datasets"
      nextLink="/entregables"
      nextLabel="Entregables">

      <div class="stack-xl">
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Por qué necesitamos baselines</h2>
          <p class="text-pine leading-relaxed">
            Un número de F1 sin contexto no tiene significado. La comparación con baselines establece el
            <strong class="text-forest">suelo</strong> (lo mínimo que debería superar cualquier método razonable)
            y el <strong class="text-forest">techo</strong> (lo que el estado del arte actual alcanza).
            Sin baselines, no podemos refutar nuestra hipótesis con rigor.
          </p>
        </article>

        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Tipos de baselines incluidos</h2>
            <span class="text-xs text-moss font-mono">filtrar →</span>
          </div>

          <div class="filter-pills mb-4">
            @for (f of filters; track f.id) {
              <button type="button"
                      (click)="active.set(f.id)"
                      class="filter-pill"
                      [class.active]="active() === f.id">
                {{ f.label }}
                <span class="ml-1 text-[10px] opacity-70">{{ countFor(f.id) }}</span>
              </button>
            }
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            @for (t of filtered(); track t.type) {
              <app-expand-card>
                <div summary>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="text-forest font-display font-medium">{{ t.type }}</div>
                    <span class="tag">{{ t.example }}</span>
                  </div>
                  <p class="text-sm text-pine">{{ t.why }}</p>
                </div>
                <div details>
                  <div class="space-y-2">
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">F1 esperado</div>
                      <div class="text-forest font-mono">{{ t.expectedF1 }}</div>
                    </div>
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Riesgo</div>
                      <div class="text-sm text-pine">{{ t.risk }}</div>
                    </div>
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Implementación</div>
                      <div class="text-xs font-mono bg-gray-50 border border-fog rounded px-2 py-1 text-evergreen">{{ t.impl }}</div>
                    </div>
                  </div>
                </div>
              </app-expand-card>
            }
          </div>
        </article>

        <article class="card" style="border-color: #04202C">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Comparación justa: condiciones</h2>
          <p class="text-sm text-pine mb-3">
            La comparación solo aporta valor si todos los métodos se evalúan en las mismas condiciones.
          </p>
          <div class="grid form-grid">
            @for (c of conditions; track c) {
              <div class="rounded-md border border-fog bg-white p-3 flex items-start gap-2 text-sm">
                <span style="color:#059669" class="mt-0.5">✓</span>
                <span class="text-pine">{{ c }}</span>
              </div>
            }
          </div>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class BaselinesComponent {
  protected active = signal<BType | 'all'>('all');

  protected filtered = computed(() => {
    const f = this.active();
    return f === 'all' ? this.types : this.types.filter(t => t.id === f);
  });

  countFor(filter: BType | 'all'): number {
    return filter === 'all' ? this.types.length : this.types.filter(t => t.id === filter).length;
  }

  readonly filters: { id: BType | 'all'; label: string }[] = [
    { id: 'all',       label: 'Todos' },
    { id: 'trivial',   label: 'Trivial' },
    { id: 'classical', label: 'Clásico' },
    { id: 'sota',      label: 'Estado del arte' },
    { id: 'ablation',  label: 'Ablación' },
  ];

  readonly types = [
    { id: 'trivial' as BType, type: 'Trivial', example: 'Random / Mayoría',
      why: 'Suelo absoluto. Garantiza que el problema no es trivialmente fácil.',
      expectedF1: '~0.42', risk: 'Si tu modelo no supera esto, hay algo gravemente mal.',
      impl: 'sklearn.dummy.DummyClassifier' },
    { id: 'classical' as BType, type: 'Clásico', example: 'Logistic Regression + TF-IDF',
      why: 'Baseline competitivo barato; benchmark estándar en NLP.',
      expectedF1: '~0.62', risk: 'A veces sorprendentemente competitivo en datasets pequeños.',
      impl: 'TfidfVectorizer + LogReg' },
    { id: 'sota' as BType, type: 'Estado del arte', example: 'XLM-RoBERTa-large',
      why: 'La métrica más alta publicada — lo que queremos superar.',
      expectedF1: '~0.71', risk: 'Riesgo de comparar contra una versión NO óptima si no usamos la oficial.',
      impl: 'transformers.AutoModelForSequenceClassification' },
    { id: 'ablation' as BType, type: 'Ablación', example: 'Nuestro método sin componente X',
      why: 'Aísla la contribución individual de cada parte de la propuesta.',
      expectedF1: '~0.78', risk: 'Olvidar ablaciones es el error #1 en papers de NLP.',
      impl: 'Mismo pipeline con flag --no-preprocessing' },
  ];

  readonly conditions = [
    'Mismo test set, sin filtrado diferencial.',
    'Mismas métricas con la misma librería e idéntica configuración.',
    'Mismas semillas aleatorias (al menos 5) para promediar varianza.',
    'Mismo presupuesto de cómputo (GPU-horas reportadas).',
    'Mismo preprocesamiento o, si difiere, ablación documentada.',
    'Pruebas estadísticas pareadas con corrección por múltiples comparaciones.',
  ];
}
