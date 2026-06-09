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
          <h2 class="mb-3 flex items-center gap-2">
            <span class="section-num">3.1</span>
            <span>Diseño experimental</span>
          </h2>
          <div class="grid sm:grid-cols-3 gap-3">
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Tipo</div>
              <div class="text-brand-500 font-display font-medium">Experimental controlado</div>
              <div class="text-xs text-sage-600 mt-1">Comparación pareada entre 2 condiciones de entrenamiento.</div>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Paradigma</div>
              <div class="text-brand-500 font-display font-medium">Cuantitativo</div>
              <div class="text-xs text-sage-600 mt-1">Métricas numéricas + pruebas de significancia.</div>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Unidad</div>
              <div class="text-brand-500 font-display font-medium">Tuit individual</div>
              <div class="text-xs text-sage-600 mt-1">Etiqueta binaria: hate / no-hate.</div>
            </div>
          </div>
        </article>

        <!-- 3.2 Datos -->
        <article class="card">
          <h2 class="mb-3 flex items-center gap-2">
            <span class="section-num">3.2</span>
            <span>Dataset y preprocesamiento</span>
          </h2>
          <div class="overflow-x-auto">
            <table class="table-iagentek">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valor</th>
                  <th>Justificación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-display font-medium">Fuente</td>
                  <td class="mono text-xs">X (Twitter) API académica</td>
                  <td>Mayor representatividad de discurso público mexicano.</td>
                </tr>
                <tr>
                  <td class="font-display font-medium">Tamaño objetivo</td>
                  <td class="mono text-xs">50 000 tuits</td>
                  <td>Suficiente para fine-tuning + validación robusta.</td>
                </tr>
                <tr>
                  <td class="font-display font-medium">Filtro geográfico</td>
                  <td class="mono text-xs">place_country=MX</td>
                  <td>Garantiza variante dialectal mexicana.</td>
                </tr>
                <tr>
                  <td class="font-display font-medium">Anotadores</td>
                  <td class="mono text-xs">3 hablantes nativos / tuit</td>
                  <td>Reduce sesgo individual; consenso por mayoría.</td>
                </tr>
                <tr>
                  <td class="font-display font-medium">Acuerdo inter-anotador</td>
                  <td class="mono text-xs">Cohen's κ ≥ 0.70</td>
                  <td>Umbral de calidad para inclusión.</td>
                </tr>
                <tr>
                  <td class="font-display font-medium">Preprocesamiento</td>
                  <td class="mono text-xs">URLs→[URL], &#64;user→[USER]</td>
                  <td>Anonimización + reducción de ruido lexical.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <!-- 3.3 Train/Val/Test -->
        <article class="card">
          <h2 class="mb-4 flex items-center gap-2">
            <span class="section-num">3.3</span>
            <span>Particiones del dataset</span>
          </h2>

          <!-- Visual split bar -->
          <div class="mb-4">
            <div class="flex h-12 w-full overflow-hidden rounded-lg border border-sage-200 shadow-inset-soft">
              <div class="flex items-center justify-center bg-brand-500 text-white text-sm font-display font-medium" style="width: 70%">
                Train · 70% <span class="ml-2 text-xs mono opacity-80">35 000</span>
              </div>
              <div class="flex items-center justify-center bg-brand-400 text-white text-sm font-display font-medium border-l border-white" style="width: 15%">
                Val · 15%
              </div>
              <div class="flex items-center justify-center bg-forest-500 text-white text-sm font-display font-medium border-l border-white" style="width: 15%">
                Test · 15%
              </div>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-3 text-sm">
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Estrategia</div>
              <div class="text-brand-500 font-display font-medium">Estratificada por clase</div>
              <div class="text-xs text-sage-600 mt-1">Mantiene proporción hate/no-hate en cada partición.</div>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Semilla</div>
              <div class="text-brand-500 mono font-medium">seed=42</div>
              <div class="text-xs text-sage-600 mt-1">Reproducibilidad — split idéntico ante repeticiones.</div>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Validación</div>
              <div class="text-brand-500 font-display font-medium">5-fold CV sobre train + val</div>
              <div class="text-xs text-sage-600 mt-1">Estima varianza de la métrica.</div>
            </div>
            <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
              <div class="text-xs uppercase tracking-wider text-sage-500 font-ui mb-1">Representatividad</div>
              <div class="text-brand-500 font-display font-medium">KS-test entre particiones</div>
              <div class="text-xs text-sage-600 mt-1">p &gt; 0.05 ⇒ no se rechaza igualdad de distribución.</div>
            </div>
          </div>
        </article>

        <!-- 3.4 Procedimiento -->
        <article class="card">
          <h2 class="mb-4 flex items-center gap-2">
            <span class="section-num">3.4</span>
            <span>Procedimiento experimental</span>
          </h2>
          <ol class="space-y-3">
            @for (step of procedure; track step.id) {
              <li class="flex gap-3">
                <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500 text-white text-xs font-mono font-semibold">
                  {{ step.id }}
                </div>
                <div class="flex-1 pt-0.5">
                  <div class="text-brand-500 font-display font-medium">{{ step.title }}</div>
                  <div class="text-sm text-sage-600 mt-0.5">{{ step.detail }}</div>
                </div>
              </li>
            }
          </ol>
        </article>

        <!-- 3.5 Metricas -->
        <article class="card">
          <h2 class="mb-3 flex items-center gap-2">
            <span class="section-num">3.5</span>
            <span>Métricas y análisis estadístico</span>
          </h2>
          <div class="grid sm:grid-cols-2 gap-3">
            @for (m of metrics; track m.name) {
              <div class="rounded-lg border border-sage-200 bg-sage-50/50 p-4">
                <div class="flex items-center justify-between">
                  <div class="text-brand-500 font-display font-medium">{{ m.name }}</div>
                  <span class="chip mono text-xs">{{ m.scope }}</span>
                </div>
                <div class="text-xs text-sage-600 mt-1">{{ m.why }}</div>
              </div>
            }
          </div>
        </article>

        <!-- 3.6 Sesgos -->
        <article class="card border-warning/40 bg-warning/5">
          <h2 class="mb-3 flex items-center gap-2">
            <span class="section-num">3.6</span>
            <span>Control de sesgos y amenazas a la validez</span>
          </h2>
          <p class="text-sm text-sage-700 mb-4">Listado explícito — esta subsección marca la diferencia para el Criterio 3 (40% de la rúbrica).</p>
          <div class="grid sm:grid-cols-2 gap-2">
            @for (b of biases; track b.name) {
              <div class="rounded-md border border-sage-200 bg-white p-3">
                <div class="text-xs uppercase tracking-wider text-warning font-ui mb-1">{{ b.name }}</div>
                <div class="text-sm text-sage-700">{{ b.mitigation }}</div>
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
