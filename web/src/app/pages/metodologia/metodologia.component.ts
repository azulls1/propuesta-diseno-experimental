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

      <div class="stack-xl">

        <!-- 3.1 Diseño -->
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <span class="section-num">3.1</span><span>Diseño experimental</span>
          </h2>
          <div class="grid form-grid--3">
            @for (d of design; track d.label) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4">
                <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ d.label }}</div>
                <div class="text-forest font-display font-medium">{{ d.value }}</div>
                <div class="text-xs text-pine mt-1">{{ d.note }}</div>
              </div>
            }
          </div>
        </article>

        <!-- 3.2 Dataset -->
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <span class="section-num">3.2</span><span>Dataset y preprocesamiento</span>
          </h2>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr><th>Atributo</th><th>Valor</th><th>Justificación</th></tr>
              </thead>
              <tbody>
                @for (row of dataset; track row.attr) {
                  <tr>
                    <td class="font-display font-medium text-forest">{{ row.attr }}</td>
                    <td><span class="tag">{{ row.value }}</span></td>
                    <td class="text-pine">{{ row.why }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </article>

        <!-- 3.3 Train/Val/Test -->
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-4 flex items-center gap-2">
            <span class="section-num">3.3</span><span>Particiones del dataset</span>
          </h2>

          <div class="mb-4">
            <div class="flex h-12 w-full overflow-hidden rounded-lg border border-fog">
              <div class="flex items-center justify-center text-white text-sm font-display font-medium"
                   style="width: 70%; background: #04202C">
                Train · 70% <span class="ml-2 text-xs font-mono opacity-80">35 000</span>
              </div>
              <div class="flex items-center justify-center text-white text-sm font-display font-medium border-l-2 border-white"
                   style="width: 15%; background: #304040">
                Val · 15%
              </div>
              <div class="flex items-center justify-center text-white text-sm font-display font-medium border-l-2 border-white"
                   style="width: 15%; background: #5B7065">
                Test · 15%
              </div>
            </div>
          </div>

          <div class="grid form-grid">
            @for (s of splitInfo; track s.label) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4">
                <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ s.label }}</div>
                <div class="text-forest font-display font-medium">{{ s.value }}</div>
                <div class="text-xs text-pine mt-1">{{ s.note }}</div>
              </div>
            }
          </div>
        </article>

        <!-- 3.4 Procedimiento -->
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-4 flex items-center gap-2">
            <span class="section-num">3.4</span><span>Procedimiento experimental</span>
          </h2>
          <ol class="stack-sm">
            @for (step of procedure; track step.id) {
              <li class="flex gap-3">
                <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-mono font-semibold">
                  {{ step.id }}
                </div>
                <div class="flex-1 pt-0.5">
                  <div class="text-forest font-display font-medium">{{ step.title }}</div>
                  <div class="text-sm text-pine mt-0.5">{{ step.detail }}</div>
                </div>
              </li>
            }
          </ol>
        </article>

        <!-- 3.5 Métricas -->
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <span class="section-num">3.5</span><span>Métricas y análisis estadístico</span>
          </h2>
          <div class="grid form-grid">
            @for (m of metrics; track m.name) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4">
                <div class="flex items-center justify-between mb-1">
                  <div class="text-forest font-display font-medium">{{ m.name }}</div>
                  <span class="tag">{{ m.scope }}</span>
                </div>
                <div class="text-xs text-pine">{{ m.why }}</div>
              </div>
            }
          </div>
        </article>

        <!-- 3.6 Sesgos -->
        <article class="card" style="border-color: #D97706; background: rgba(255, 251, 235, 0.5)">
          <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
            <span class="section-num">3.6</span><span>Control de sesgos y amenazas a la validez</span>
          </h2>
          <p class="text-sm text-pine mb-4">Listado explícito — esta subsección marca la diferencia para el Criterio 3 (40% de la rúbrica).</p>
          <div class="grid form-grid">
            @for (b of biases; track b.name) {
              <div class="rounded-md border border-fog bg-white p-3">
                <div class="text-xs uppercase tracking-wider text-amber-700 font-mono mb-1">{{ b.name }}</div>
                <div class="text-sm text-pine">{{ b.mitigation }}</div>
              </div>
            }
          </div>
        </article>

      </div>
    </app-section-layout>
  `,
})
export class MetodologiaComponent {
  readonly design = [
    { label: 'Tipo',      value: 'Experimental controlado', note: 'Comparación pareada entre 2 condiciones.' },
    { label: 'Paradigma', value: 'Cuantitativo',            note: 'Métricas numéricas + pruebas de significancia.' },
    { label: 'Unidad',    value: 'Tuit individual',         note: 'Etiqueta binaria: hate / no-hate.' },
  ];

  readonly dataset = [
    { attr: 'Fuente',                 value: 'X (Twitter) API académica', why: 'Mayor representatividad de discurso público mexicano.' },
    { attr: 'Tamaño objetivo',        value: '50 000 tuits',              why: 'Suficiente para fine-tuning + validación robusta.' },
    { attr: 'Filtro geográfico',      value: 'place_country=MX',          why: 'Garantiza variante dialectal mexicana.' },
    { attr: 'Anotadores',             value: '3 nativos por tuit',        why: 'Reduce sesgo individual; consenso por mayoría.' },
    { attr: 'Acuerdo inter-anotador', value: "Cohen's κ ≥ 0.70",          why: 'Umbral de calidad para inclusión.' },
    { attr: 'Preprocesamiento',       value: 'URLs→[URL], &#64;user→[USER]',    why: 'Anonimización + reducción de ruido lexical.' },
  ];

  readonly splitInfo = [
    { label: 'Estrategia',       value: 'Estratificada por clase',         note: 'Mantiene proporción hate/no-hate.' },
    { label: 'Semilla',          value: 'seed=42',                         note: 'Reproducibilidad — split idéntico ante repeticiones.' },
    { label: 'Validación',       value: '5-fold CV sobre train + val',     note: 'Estima varianza de la métrica.' },
    { label: 'Representatividad',value: 'KS-test entre particiones',       note: 'p > 0.05 ⇒ no se rechaza igualdad de distribución.' },
  ];

  readonly procedure = [
    { id: '01', title: 'Recolección',          detail: 'Scrape vía API académica con filtro place_country=MX durante 6 meses.' },
    { id: '02', title: 'Anonimización',        detail: 'Sustitución de URLs, mentions y datos personales.' },
    { id: '03', title: 'Anotación',            detail: '3 hablantes nativos por tuit; descarte si κ < 0.70.' },
    { id: '04', title: 'Particionado',         detail: 'Split estratificado 70/15/15 con seed=42.' },
    { id: '05', title: 'Baselines',            detail: 'Ejecutar zero-shot XLM-RoBERTa-large + Logistic Regression con TF-IDF.' },
    { id: '06', title: 'Fine-tuning',          detail: 'RoBERTuito sobre train, 3 epochs, lr=2e-5, batch=32, 5 seeds.' },
    { id: '07', title: 'Evaluación',           detail: 'F1 macro sobre test intocado. Reportar media ± std.' },
    { id: '08', title: 'Pruebas estadísticas', detail: 'Wilcoxon signed-rank pareado entre métodos, α=0.05.' },
  ];

  readonly metrics = [
    { name: 'F1 macro',          scope: 'principal',    why: 'Robusta a desbalance, alineada con la hipótesis.' },
    { name: 'AUROC',             scope: 'soporte',      why: 'Independiente del umbral, útil para análisis fino.' },
    { name: 'Precision / Recall',scope: 'desglose',     why: 'Identifica si falla en FP o FN.' },
    { name: 'Wilcoxon p-value',  scope: 'estadística',  why: 'Comparación pareada no paramétrica entre seeds.' },
  ];

  readonly biases = [
    { name: 'Selección',       mitigation: 'Muestreo aleatorio con filtro geográfico verificable.' },
    { name: 'Anotador',        mitigation: 'Triple anotación + descarte por κ bajo + ronda de consenso.' },
    { name: 'Sobreajuste',     mitigation: 'Test intocado; hp tuning solo sobre val; 5 seeds para varianza.' },
    { name: 'Fuga de datos',   mitigation: 'Split por usuario (no por tuit) para evitar mismo autor en train y test.' },
    { name: 'Demográfico',     mitigation: 'Verificar distribución regional MX y reportar limitaciones.' },
    { name: 'Publicación',     mitigation: 'Reportar resultados negativos y todas las seeds, no solo la mejor.' },
  ];
}
