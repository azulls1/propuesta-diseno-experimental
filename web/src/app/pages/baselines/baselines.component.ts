import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-baselines',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="07"
      sectionTitle="Baselines y estado del arte"
      sectionDescription="Métodos contra los que se mide nuestra propuesta. Por qué cada uno está incluido y qué aporta su comparación."
      status="in-progress"
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
          <h2 class="font-display text-xl font-semibold text-forest mb-4">Tipos de baselines incluidos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            @for (t of types; track t.type) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4">
                <div class="flex items-center justify-between gap-2 mb-2">
                  <div class="text-forest font-display font-medium">{{ t.type }}</div>
                  <span class="tag">{{ t.example }}</span>
                </div>
                <p class="text-sm text-pine">{{ t.why }}</p>
              </div>
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
  readonly types = [
    { type: 'Trivial', example: 'Random / Mayoría',
      why: 'Suelo absoluto. Garantiza que el problema no es trivialmente fácil.' },
    { type: 'Clásico', example: 'Logistic Regression + TF-IDF',
      why: 'Baseline competitivo barato; benchmark estándar en NLP.' },
    { type: 'Estado del arte', example: 'XLM-RoBERTa-large',
      why: 'La métrica más alta publicada — lo que queremos superar.' },
    { type: 'Ablación', example: 'Nuestro método sin componente X',
      why: 'Aísla la contribución individual de cada parte de la propuesta.' },
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
