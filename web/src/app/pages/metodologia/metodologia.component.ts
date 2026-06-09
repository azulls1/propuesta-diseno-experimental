import { Component, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { TabsComponent, TabItem } from '../../shared/interactive/tabs.component';
import { ModalComponent } from '../../shared/interactive/modal.component';

interface DesignItem { label: string; value: string; note: string; detail: string }
interface MetricItem { name: string; scope: string; why: string; formula?: string; range?: string }
interface BiasItem   { name: string; mitigation: string; how: string; example: string }

@Component({
  selector: 'app-metodologia',
  standalone: true,
  imports: [SectionLayoutComponent, TabsComponent, ModalComponent],
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

      <article class="card">
        <app-tabs [tabs]="tabs" [active]="active()" (activeChange)="active.set($event)" />

        @if (active() === 'design') {
          <div class="animate-tab">
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.1 Diseño experimental <span class="text-xs text-moss font-mono">· click una card →</span></h2>
            <div class="grid form-grid--3">
              @for (d of design; track d.label) {
                <button type="button" (click)="selectedDesign.set(d)"
                        class="rounded-lg border border-fog bg-gray-50 p-4 text-left hover:border-forest hover:shadow-card transition-all">
                  <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ d.label }}</div>
                  <div class="text-forest font-display font-medium">{{ d.value }}</div>
                  <div class="text-xs text-pine mt-1">{{ d.note }}</div>
                </button>
              }
            </div>
          </div>
        }

        @if (active() === 'data') {
          <div class="animate-tab">
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.2 Dataset y preprocesamiento</h2>
            <div class="table-responsive">
              <table class="table">
                <thead><tr><th>Atributo</th><th>Valor</th><th>Justificación</th></tr></thead>
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
          </div>
        }

        @if (active() === 'splits') {
          <div class="animate-tab">
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.3 Particiones del dataset</h2>
            <div class="mb-4">
              <div class="flex h-12 w-full overflow-hidden rounded-lg border border-fog">
                <div class="flex items-center justify-center text-white text-sm font-display font-medium"
                     style="width: 70%; background: #04202C">
                  Train · 70% <span class="ml-2 text-xs font-mono opacity-80">35 000</span>
                </div>
                <div class="flex items-center justify-center text-white text-sm font-display font-medium border-l-2 border-white"
                     style="width: 15%; background: #304040">Val · 15%</div>
                <div class="flex items-center justify-center text-white text-sm font-display font-medium border-l-2 border-white"
                     style="width: 15%; background: #5B7065">Test · 15%</div>
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
          </div>
        }

        @if (active() === 'proc') {
          <div class="animate-tab">
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.4 Procedimiento experimental</h2>
            <ol class="space-y-3">
              @for (step of procedure; track step.id) {
                <li class="flex gap-3 group cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
                    (click)="expandedStep.set(expandedStep() === step.id ? null : step.id)">
                  <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-mono font-semibold">
                    {{ step.id }}
                  </div>
                  <div class="flex-1 pt-0.5">
                    <div class="flex items-center justify-between gap-2">
                      <div class="text-forest font-display font-medium group-hover:text-pine">{{ step.title }}</div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           class="w-4 h-4 text-moss transition-transform duration-200"
                           [class.rotate-180]="expandedStep() === step.id">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                    <div class="text-sm text-pine mt-0.5">{{ step.detail }}</div>
                    @if (expandedStep() === step.id && step.more) {
                      <div class="mt-2 p-3 rounded border border-fog bg-gray-50 text-xs text-pine font-mono leading-relaxed animate-tab">
                        {{ step.more }}
                      </div>
                    }
                  </div>
                </li>
              }
            </ol>
          </div>
        }

        @if (active() === 'metrics') {
          <div class="animate-tab">
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.5 Métricas y análisis estadístico <span class="text-xs text-moss font-mono">· click una métrica →</span></h2>
            <div class="grid form-grid">
              @for (m of metrics; track m.name) {
                <button type="button" (click)="selectedMetric.set(m)"
                        class="rounded-lg border border-fog bg-gray-50 p-4 text-left hover:border-forest hover:shadow-card transition-all">
                  <div class="flex items-center justify-between mb-1">
                    <div class="text-forest font-display font-medium">{{ m.name }}</div>
                    <span class="tag">{{ m.scope }}</span>
                  </div>
                  <div class="text-xs text-pine">{{ m.why }}</div>
                </button>
              }
            </div>
          </div>
        }

        @if (active() === 'biases') {
          <div class="animate-tab card" style="border-color: #D97706; background: rgba(255,251,235,0.5); box-shadow: none">
            <h2 class="font-display text-lg font-semibold text-forest mb-2">3.6 Control de sesgos <span class="text-xs text-moss font-mono">· click un sesgo →</span></h2>
            <p class="text-sm text-pine mb-4">Esta subsección marca la diferencia para el Criterio 3 (40%).</p>
            <div class="grid form-grid">
              @for (b of biases; track b.name) {
                <button type="button" (click)="selectedBias.set(b)"
                        class="rounded-md border border-fog bg-white p-3 text-left hover:border-forest hover:shadow-card transition-all">
                  <div class="text-xs uppercase tracking-wider text-amber-700 font-mono mb-1">{{ b.name }}</div>
                  <div class="text-sm text-pine">{{ b.mitigation }}</div>
                </button>
              }
            </div>
          </div>
        }
      </article>

      <!-- MODALES -->
      @if (selectedDesign(); as d) {
        <app-modal [open]="true" [eyebrow]="'3.1 Diseño · ' + d.label"
                   [title]="d.value" [subtitle]="d.note"
                   (closeRequest)="selectedDesign.set(null)">
          <p class="text-pine leading-relaxed">{{ d.detail }}</p>
        </app-modal>
      }
      @if (selectedMetric(); as m) {
        <app-modal [open]="true" [eyebrow]="'3.5 Métrica · ' + m.scope"
                   [title]="m.name" [subtitle]="m.why"
                   (closeRequest)="selectedMetric.set(null)">
          @if (m.formula) {
            <div class="rounded-lg border border-fog bg-gray-50 p-4 mb-3">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Fórmula</div>
              <div class="font-mono text-forest text-sm">{{ m.formula }}</div>
            </div>
          }
          @if (m.range) {
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Rango / interpretación</div>
              <div class="text-sm text-pine">{{ m.range }}</div>
            </div>
          }
        </app-modal>
      }
      @if (selectedBias(); as b) {
        <app-modal [open]="true" [eyebrow]="'3.6 Sesgo · control'"
                   [title]="b.name"
                   (closeRequest)="selectedBias.set(null)">
          <div class="rounded-lg p-4 mb-3" style="background:#ECFDF5; border: 1px solid #A7F3D0">
            <div class="text-xs uppercase tracking-wider font-mono mb-2" style="color:#059669">Mitigación</div>
            <p class="text-sm text-pine">{{ b.mitigation }}</p>
          </div>
          <div class="rounded-lg border border-fog bg-gray-50 p-4 mb-3">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Cómo aplicarla</div>
            <p class="text-sm text-pine">{{ b.how }}</p>
          </div>
          <div class="rounded-lg p-4" style="background:#FEF2F2; border: 1px solid #FECACA">
            <div class="text-xs uppercase tracking-wider font-mono mb-2" style="color:#DC2626">Ejemplo de error</div>
            <p class="text-sm text-pine">{{ b.example }}</p>
          </div>
        </app-modal>
      }

    </app-section-layout>
  `,
  styles: [`
    @keyframes tab-in {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-tab { animation: tab-in 200ms ease-out; }
  `],
})
export class MetodologiaComponent {
  protected active = signal<string>('design');
  protected expandedStep = signal<string | null>(null);
  protected selectedDesign = signal<DesignItem | null>(null);
  protected selectedMetric = signal<MetricItem | null>(null);
  protected selectedBias   = signal<BiasItem | null>(null);

  readonly tabs: TabItem[] = [
    { id: 'design',  label: '3.1 Diseño' },
    { id: 'data',    label: '3.2 Datos' },
    { id: 'splits',  label: '3.3 Splits', badge: 'train/val/test' },
    { id: 'proc',    label: '3.4 Procedimiento', badge: '8 pasos' },
    { id: 'metrics', label: '3.5 Métricas' },
    { id: 'biases',  label: '3.6 Sesgos' },
  ];

  readonly design: DesignItem[] = [
    { label: 'Tipo', value: 'Experimental controlado', note: 'Comparación pareada entre 2 condiciones.',
      detail: 'Un experimento controlado manipula deliberadamente la variable independiente (estrategia de entrenamiento: zero-shot vs fine-tuned) y mide el efecto en la variable dependiente (F1 macro). Se contrasta con cuasi-experimental (sin asignación aleatoria) y observacional (sin manipulación). Aquí podemos asignar libremente las semillas y configs, así que cumple el criterio de "controlado".' },
    { label: 'Paradigma', value: 'Cuantitativo', note: 'Métricas numéricas + pruebas de significancia.',
      detail: 'Cuantitativo significa que la evidencia se expresa en números y se evalúa con métodos estadísticos. Es la opción correcta cuando la hipótesis se puede traducir a una métrica (F1). Un paradigma cualitativo (entrevistas, análisis temático) no aplicaría aquí porque no hay "interpretación de discurso" — hay clasificación binaria evaluada contra ground truth.' },
    { label: 'Unidad', value: 'Tuit individual', note: 'Etiqueta binaria: hate / no-hate.',
      detail: 'La unidad de análisis es la observación más pequeña sobre la que se aplica la métrica. Aquí es cada tuit por separado. Alternativas hubieran sido: unidad por usuario (agregando sus tuits), unidad por conversación (varios tuits enlazados). Elegimos tuit por simplicidad y porque la moderación de plataforma se aplica por tuit individual.' },
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
    { id: '01', title: 'Recolección',          detail: 'Scrape vía API académica con filtro place_country=MX durante 6 meses.', more: 'Comando: twarc2 search "lang:es place_country:MX" --limit 100000' },
    { id: '02', title: 'Anonimización',        detail: 'Sustitución de URLs, mentions y datos personales.', more: 'Regex: re.sub(r"https?://\\S+", "[URL]", text); re.sub(r"@\\w+", "[USER]", text)' },
    { id: '03', title: 'Anotación',            detail: '3 hablantes nativos por tuit; descarte si κ < 0.70.', more: 'Plataforma: Prolific filtrando MX nationality. Pago $0.20 USD por tuit. Tiempo estimado: 2 sem.' },
    { id: '04', title: 'Particionado',         detail: 'Split estratificado 70/15/15 con seed=42.', more: 'sklearn.model_selection.train_test_split(stratify=y, random_state=42)' },
    { id: '05', title: 'Baselines',            detail: 'Ejecutar zero-shot XLM-RoBERTa-large + Logistic Regression con TF-IDF.', more: 'Sin tuning — usar configs publicadas en HF model card.' },
    { id: '06', title: 'Fine-tuning',          detail: 'RoBERTuito sobre train, 3 epochs, lr=2e-5, batch=32, 5 seeds.', more: 'Tiempo estimado: 4 GPU-h por seed × 5 seeds = 20 GPU-h. Hardware: A100 40GB.' },
    { id: '07', title: 'Evaluación',           detail: 'F1 macro sobre test intocado. Reportar media ± std.', more: 'sklearn.metrics.f1_score(y_true, y_pred, average="macro")' },
    { id: '08', title: 'Pruebas estadísticas', detail: 'Wilcoxon signed-rank pareado entre métodos, α=0.05.', more: 'scipy.stats.wilcoxon(scores_ours, scores_baseline). Corrección Holm si comparamos contra varios.' },
  ];

  readonly metrics: MetricItem[] = [
    { name: 'F1 macro', scope: 'principal',
      why: 'Robusta a desbalance, alineada con la hipótesis.',
      formula: 'F1_macro = (1/C) · Σ 2·(P_c · R_c) / (P_c + R_c)',
      range: '[0, 1]. F1=1 perfecto. F1=0.5 baseline trivial. F1 macro promedia sin ponderar por tamaño de clase, así que castiga el ignorar la clase minoritaria.' },
    { name: 'AUROC', scope: 'soporte',
      why: 'Independiente del umbral, útil para análisis fino.',
      formula: 'AUROC = ∫ TPR(t) dFPR(t)',
      range: '[0, 1]. AUC=0.5 azar. AUC=1 separación perfecta. Útil cuando el umbral de decisión es ajustable en producción.' },
    { name: 'Precision / Recall', scope: 'desglose',
      why: 'Identifica si el modelo falla más en falsos positivos o falsos negativos.',
      formula: 'P = TP/(TP+FP)  ·  R = TP/(TP+FN)',
      range: 'Ambas [0,1]. Tradeoff típico: subir P sacrifica R y viceversa. Importante reportar ambas, no solo F1.' },
    { name: 'Wilcoxon p-value', scope: 'estadística',
      why: 'Comparación pareada no paramétrica entre seeds.',
      formula: 'W = Σ rank(|x_i - y_i|) · sign(x_i - y_i)',
      range: 'p ∈ [0, 1]. Rechazamos H0 si p < α (=0.05). No asume normalidad — adecuado para muestras pequeñas (5 seeds).' },
  ];

  readonly biases: BiasItem[] = [
    { name: 'Selección',
      mitigation: 'Muestreo aleatorio con filtro geográfico verificable.',
      how: 'Documentar la query exacta usada en la API académica (lang:es place_country:MX) y el rango temporal. Hacer pública la lista de tweet_id para que terceros puedan auditar la selección.',
      example: 'Filtrar solo tuits con muchos likes — sesga la muestra hacia contenido viral, no representativo del discurso ordinario.' },
    { name: 'Anotador',
      mitigation: 'Triple anotación + descarte por κ bajo + ronda de consenso.',
      how: 'Cada tuit se envía a 3 anotadores independientes. Calculamos Cohen\'s κ por par de anotadores. Si κ promedio < 0.70, descartamos el tuit. Los casos en disputa van a una ronda de consenso con un cuarto anotador experto.',
      example: 'Un solo anotador interpreta "güey" como agresión cuando culturalmente es informal — sesgo individual queda como ground truth.' },
    { name: 'Sobreajuste',
      mitigation: 'Test intocado; hp tuning solo sobre val; 5 seeds para varianza.',
      how: 'El test set NUNCA se ve durante desarrollo. Cualquier decisión (arquitectura, hp, early stopping) usa solo val. El test se mira UNA vez para reportar la métrica final. Repetimos con 5 semillas distintas para que la varianza no nos engañe.',
      example: 'Tunear hiperparámetros para minimizar loss en test — el F1 reportado infla artificialmente y no generaliza a datos nuevos.' },
    { name: 'Fuga de datos',
      mitigation: 'Split por usuario (no por tuit) para evitar mismo autor en train y test.',
      how: 'Antes del split estratificado, agrupamos los tuits por user_id. Asignamos usuarios enteros a train, val o test. Así el mismo autor jamás aparece en dos splits — evita que el modelo "memorice" estilos.',
      example: 'Dos tuits del mismo usuario, uno en train y uno en test. El modelo aprende rasgos idiosincráticos (emojis, jerga personal) y "ahorra" puntos en test.' },
    { name: 'Demográfico',
      mitigation: 'Verificar distribución regional MX y reportar limitaciones.',
      how: 'Analizamos place_name de los tuits para verificar que estén distribuidos por regiones (CDMX, MTY, GDL, Sur, etc.). Si una región domina >50%, lo reportamos como limitación de validez externa.',
      example: 'Todos los tuits son de CDMX. El modelo aprende dialecto chilango y falla en yucateco o norteño — pero el paper dice "español mexicano" sin matizar.' },
    { name: 'Publicación',
      mitigation: 'Reportar resultados negativos y todas las seeds, no solo la mejor.',
      how: 'Tabla con media ± std de las 5 seeds. Reportamos también las seeds individuales en el apéndice. Si la hipótesis se refuta, lo decimos — no escondemos el experimento.',
      example: 'Mostrar solo la seed con mejor F1. Otros investigadores no pueden replicar y la "evidencia" es ruido seleccionado.' },
  ];
}
