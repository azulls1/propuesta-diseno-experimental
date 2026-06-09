import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-metodologia',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="03"
      sectionTitle="Metodología"
      sectionDescription="Diseño experimental, datos, muestreo, particiones train/val/test, procedimiento, métricas y control de sesgos. Es la sección con mayor peso en la rúbrica (40%)."
      [rubricWeight]="40"
      status="in-progress"
      prevLink="/hipotesis"
      prevLabel="Hipótesis"
      nextLink="/comparacion"
      nextLabel="Comparación">

      <div class="space-y-8">

        <!-- 3.1 Diseño -->
        <article class="card">
          <h2 class="text-xl mb-3 flex items-center gap-2">
            <span class="text-brand-400 mono text-sm">3.1</span>
            Diseño experimental
          </h2>
          <div class="grid sm:grid-cols-3 gap-3">
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Tipo</div>
              <div class="text-white">Experimental controlado</div>
              <div class="text-xs text-ink-400 mt-1">Comparación pareada entre 2 condiciones de entrenamiento.</div>
            </div>
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Paradigma</div>
              <div class="text-white">Cuantitativo</div>
              <div class="text-xs text-ink-400 mt-1">Métricas numéricas + pruebas de significancia.</div>
            </div>
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Unidad</div>
              <div class="text-white">Tuit individual</div>
              <div class="text-xs text-ink-400 mt-1">Etiqueta binaria: hate / no-hate.</div>
            </div>
          </div>
        </article>

        <!-- 3.2 Datos -->
        <article class="card">
          <h2 class="text-xl mb-3 flex items-center gap-2">
            <span class="text-brand-400 mono text-sm">3.2</span>
            Dataset y preprocesamiento
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="text-left text-ink-400 text-xs uppercase tracking-wider">
                <tr class="border-b border-ink-800">
                  <th class="pb-2 pr-4">Atributo</th>
                  <th class="pb-2 pr-4">Valor</th>
                  <th class="pb-2">Justificación</th>
                </tr>
              </thead>
              <tbody class="text-ink-300">
                <tr class="border-b border-ink-800/60">
                  <td class="py-2.5 pr-4 font-medium text-white">Fuente</td>
                  <td class="py-2.5 pr-4 mono text-xs">X (Twitter) API académica</td>
                  <td class="py-2.5">Mayor representatividad de discurso público mexicano.</td>
                </tr>
                <tr class="border-b border-ink-800/60">
                  <td class="py-2.5 pr-4 font-medium text-white">Tamaño objetivo</td>
                  <td class="py-2.5 pr-4 mono text-xs">50 000 tuits</td>
                  <td class="py-2.5">Suficiente para fine-tuning + validación robusta.</td>
                </tr>
                <tr class="border-b border-ink-800/60">
                  <td class="py-2.5 pr-4 font-medium text-white">Filtro geográfico</td>
                  <td class="py-2.5 pr-4 mono text-xs">place_country=MX</td>
                  <td class="py-2.5">Garantiza variante dialectal mexicana.</td>
                </tr>
                <tr class="border-b border-ink-800/60">
                  <td class="py-2.5 pr-4 font-medium text-white">Anotadores</td>
                  <td class="py-2.5 pr-4 mono text-xs">3 hablantes nativos / tuit</td>
                  <td class="py-2.5">Reduce sesgo individual; consenso por mayoría.</td>
                </tr>
                <tr class="border-b border-ink-800/60">
                  <td class="py-2.5 pr-4 font-medium text-white">Acuerdo inter-anotador</td>
                  <td class="py-2.5 pr-4 mono text-xs">Cohen's κ ≥ 0.70</td>
                  <td class="py-2.5">Umbral de calidad para inclusión.</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-medium text-white">Preprocesamiento</td>
                  <td class="py-2.5 pr-4 mono text-xs">URLs→[URL], &#64;user→[USER]</td>
                  <td class="py-2.5">Anonimización + reducción de ruido lexical.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <!-- 3.3 Train/Val/Test -->
        <article class="card">
          <h2 class="text-xl mb-4 flex items-center gap-2">
            <span class="text-brand-400 mono text-sm">3.3</span>
            Particiones del dataset
          </h2>

          <!-- Visual split bar -->
          <div class="mb-4">
            <div class="flex h-10 w-full overflow-hidden rounded-lg border border-ink-800">
              <div class="flex items-center justify-center bg-brand-500/30 text-white text-sm font-medium" style="width: 70%">
                Train · 70% <span class="ml-2 text-xs mono text-brand-200">35 000</span>
              </div>
              <div class="flex items-center justify-center bg-brand-500/15 text-white text-sm font-medium border-l border-ink-900" style="width: 15%">
                Val · 15%
              </div>
              <div class="flex items-center justify-center bg-accent-warn/20 text-white text-sm font-medium border-l border-ink-900" style="width: 15%">
                Test · 15%
              </div>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-3 text-sm">
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Estrategia</div>
              <div class="text-white">Estratificada por clase</div>
              <div class="text-xs text-ink-400 mt-1">Mantiene proporción hate/no-hate en cada partición.</div>
            </div>
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Semilla</div>
              <div class="text-white mono">seed=42</div>
              <div class="text-xs text-ink-400 mt-1">Reproducibilidad — split idéntico ante repeticiones.</div>
            </div>
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Validación</div>
              <div class="text-white">5-fold CV sobre train + val</div>
              <div class="text-xs text-ink-400 mt-1">Estima varianza de la métrica.</div>
            </div>
            <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
              <div class="text-xs uppercase tracking-wider text-ink-500 mb-1">Representatividad</div>
              <div class="text-white">KS-test entre particiones</div>
              <div class="text-xs text-ink-400 mt-1">p &gt; 0.05 ⇒ no se rechaza igualdad de distribución.</div>
            </div>
          </div>
        </article>

        <!-- 3.4 Procedimiento -->
        <article class="card">
          <h2 class="text-xl mb-4 flex items-center gap-2">
            <span class="text-brand-400 mono text-sm">3.4</span>
            Procedimiento experimental
          </h2>
          <ol class="space-y-3">
            @for (step of procedure; track step.id) {
              <li class="flex gap-3">
                <div class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300 text-xs font-mono font-semibold ring-1 ring-brand-500/30">
                  {{ step.id }}
                </div>
                <div class="flex-1 pt-0.5">
                  <div class="text-white">{{ step.title }}</div>
                  <div class="text-sm text-ink-400 mt-0.5">{{ step.detail }}</div>
                </div>
              </li>
            }
          </ol>
        </article>

        <!-- 3.5 Metricas -->
        <article class="card">
          <h2 class="text-xl mb-3 flex items-center gap-2">
            <span class="text-brand-400 mono text-sm">3.5</span>
            Métricas y análisis estadístico
          </h2>
          <div class="grid sm:grid-cols-2 gap-3">
            @for (m of metrics; track m.name) {
              <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
                <div class="flex items-center justify-between">
                  <div class="text-white font-medium">{{ m.name }}</div>
                  <span class="chip mono text-xs">{{ m.scope }}</span>
                </div>
                <div class="text-xs text-ink-400 mt-1">{{ m.why }}</div>
              </div>
            }
          </div>
        </article>

        <!-- 3.6 Sesgos -->
        <article class="card border-accent-warn/30">
          <h2 class="text-xl mb-3 flex items-center gap-2">
            <span class="text-brand-400 mono text-sm">3.6</span>
            Control de sesgos y amenazas a la validez
          </h2>
          <p class="text-sm text-ink-400 mb-4">Listado explícito — esta subsección marca la diferencia para el Criterio 3 (40% de la rúbrica).</p>
          <div class="grid sm:grid-cols-2 gap-2">
            @for (b of biases; track b.name) {
              <div class="rounded-md border border-ink-800 bg-ink-900/40 p-3">
                <div class="text-xs uppercase tracking-wider text-accent-warn mb-1">{{ b.name }}</div>
                <div class="text-sm text-ink-300">{{ b.mitigation }}</div>
              </div>
            }
          </div>
        </article>

      </div>
    </app-section-layout>
  `,
})
export class MetodologiaComponent {
  readonly procedure = [
    { id: '01', title: 'Recolección', detail: 'Scrape vía API académica con filtro place_country=MX durante 6 meses.' },
    { id: '02', title: 'Anonimización', detail: 'Sustitución de URLs, mentions y datos personales.' },
    { id: '03', title: 'Anotación', detail: '3 hablantes nativos por tuit; descarte si κ < 0.70.' },
    { id: '04', title: 'Particionado', detail: 'Split estratificado 70/15/15 con seed=42.' },
    { id: '05', title: 'Baselines', detail: 'Ejecutar zero-shot XLM-RoBERTa-large + Logistic Regression con TF-IDF.' },
    { id: '06', title: 'Fine-tuning', detail: 'RoBERTuito sobre train, 3 epochs, lr=2e-5, batch=32, 5 seeds.' },
    { id: '07', title: 'Evaluación', detail: 'F1 macro sobre test intocado. Reportar media ± std.' },
    { id: '08', title: 'Pruebas estadísticas', detail: 'Wilcoxon signed-rank pareado entre métodos, α=0.05.' },
  ];

  readonly metrics = [
    { name: 'F1 macro', scope: 'principal', why: 'Robusta a desbalance, alineada con la hipótesis.' },
    { name: 'AUROC', scope: 'soporte', why: 'Independiente del umbral, útil para análisis fino.' },
    { name: 'Precision / Recall', scope: 'desglose', why: 'Identifica si falla en FP o FN.' },
    { name: 'Wilcoxon p-value', scope: 'estadística', why: 'Comparación pareada no paramétrica entre seeds.' },
  ];

  readonly biases = [
    { name: 'Selección', mitigation: 'Muestreo aleatorio con filtro geográfico verificable.' },
    { name: 'Anotador', mitigation: 'Triple anotación + descarte por κ bajo + ronda de consenso.' },
    { name: 'Sobreajuste', mitigation: 'Test intocado; hp tuning solo sobre val; 5 seeds para estimar varianza.' },
    { name: 'Fuga de datos', mitigation: 'Split por usuario (no por tuit) para evitar mismo autor en train y test.' },
    { name: 'Demográfico', mitigation: 'Verificar distribución regional MX y reportar limitaciones.' },
    { name: 'Publicación', mitigation: 'Reportar también resultados negativos y todas las semillas, no solo la mejor.' },
  ];
}
