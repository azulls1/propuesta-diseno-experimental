import { Component, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';
import { ModalComponent } from '../../shared/interactive/modal.component';

interface Reference {
  id: string;
  cite: string;
  full: string;
  authors: string;
  year: number;
  venue: string;
  doi?: string;
  url: string;
  abstract: string;
}

interface Gap {
  id: string;
  short: string;
  impact: string;
  evidence: string;
  refIds: string[];
}

@Component({
  selector: 'app-motivacion',
  standalone: true,
  imports: [SectionLayoutComponent, ChecklistComponent, ExpandCardComponent, ModalComponent],
  template: `
    <app-section-layout
      sectionNumber="01"
      sectionTitle="Motivación"
      sectionDescription="Identificación de un problema real en IA, sustento en literatura previa y argumentación del hueco de investigación que justifica esta propuesta."
      [rubricWeight]="20"
      status="done"
      nextLink="/hipotesis"
      nextLabel="Hipótesis">

      <div class="grid-content">
        <!-- Main content -->
        <div class="stack-lg">
          <article class="card">
            <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
              <span class="section-num">1.1</span>
              <span>Contexto y problema</span>
            </h2>
            <p class="text-pine leading-relaxed mb-4">
              Los modelos de detección de discurso de odio en español han avanzado considerablemente,
              alcanzando F1-scores superiores a 0.85 en variantes peninsulares
              <button type="button" (click)="selectedRef.set(refMap['plaza2021'])"
                      class="inline-flex items-center gap-1 rounded-md border border-fog bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-forest hover:border-forest hover:bg-white transition-all">
                [Plaza et al., 2021] ↗
              </button>.
              Sin embargo, su desempeño cae sistemáticamente
              <button type="button" (click)="showDataPoint.set('drop')"
                      class="inline-flex items-baseline rounded-md border-b-2 border-forest bg-forest/5 px-1 hover:bg-forest hover:text-white transition-colors">
                <strong class="text-forest hover:text-white">entre 12 y 18 puntos</strong>
              </button>
              cuando se evalúan sobre variantes dialectales latinoamericanas
              <button type="button" (click)="selectedRef.set(refMap['pamungkas2023'])"
                      class="inline-flex items-center gap-1 rounded-md border border-fog bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-forest hover:border-forest hover:bg-white transition-all">
                [Pamungkas et al., 2023] ↗
              </button>,
              particularmente las regionalismos mexicanos donde la frontera entre
              insulto, broma y agresión cambia con el registro coloquial.
            </p>
            <p class="text-pine leading-relaxed">
              Este fenómeno es relevante porque las plataformas con mayor presencia en México
              (X, TikTok, Facebook) aplican filtros entrenados predominantemente con español
              ibérico, generando dos errores opuestos: falsos positivos (censurar expresiones
              culturales no agresivas) y falsos negativos (dejar pasar agresiones encubiertas
              en jerga local).
            </p>
          </article>

          <article class="card">
            <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
              <span class="section-num">1.2</span>
              <span>Estado del arte</span>
              <span class="text-xs text-moss font-mono ml-auto">click para expandir →</span>
            </h2>
            <div class="stack-sm">
              @for (s of stateOfArt; track s.method) {
                <app-expand-card>
                  <div summary class="flex items-center justify-between gap-3">
                    <div class="font-display font-medium text-forest">{{ s.method }}</div>
                    <span class="tag">{{ s.metric }}</span>
                  </div>
                  <div details>
                    <p class="text-sm text-pine mb-2">{{ s.note }}</p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                      <div class="rounded border border-fog bg-gray-50 p-2">
                        <div class="text-moss font-mono">Variante</div>
                        <div class="text-forest">{{ s.variant }}</div>
                      </div>
                      <div class="rounded border border-fog bg-gray-50 p-2">
                        <div class="text-moss font-mono">Limitación</div>
                        <div class="text-forest">{{ s.limitation }}</div>
                      </div>
                    </div>
                  </div>
                </app-expand-card>
              }
            </div>
          </article>

          <article class="card">
            <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <h2 class="font-display text-xl font-semibold text-forest flex items-center gap-2">
                <span class="section-num">1.3</span>
                <span>Hueco de investigación</span>
              </h2>
              <span class="text-xs text-moss font-mono">click cada hueco para ver impacto →</span>
            </div>
            <div class="stack-sm">
              @for (g of gaps; track g.id) {
                <button type="button" (click)="selectedGap.set(g)"
                        class="w-full rounded-lg border border-fog bg-gray-50 p-3 text-left hover:border-forest hover:shadow-card transition-all flex items-start gap-3">
                  <span class="text-forest font-mono shrink-0 text-lg">·</span>
                  <span class="flex-1 text-pine text-sm">{{ g.short }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="w-3 h-3 text-moss shrink-0 mt-1">
                    <path d="m9 5 7 7-7 7"/>
                  </svg>
                </button>
              }
            </div>
          </article>
        </div>

        <!-- Sidebar tips -->
        <aside class="stack">
          <button type="button" (click)="showRubric.set(true)"
                  class="card text-left w-full hover:border-forest transition-all"
                  style="border-color: rgba(4,32,44,0.2)">
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-2 text-forest text-sm font-display font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="w-4 h-4">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 8v4l3 2"/>
                </svg>
                Lo que evalúa la rúbrica
              </div>
              <span class="text-xs text-moss font-mono">↗</span>
            </div>
            <p class="text-sm text-pine leading-relaxed">
              <strong class="text-forest">Criterio 1 — 20%.</strong>
              Motivación suficientemente argumentada con referencias reales y problema bien acotado.
            </p>
            <div class="mt-2 text-xs text-moss font-mono">click para ver detalle completo</div>
          </button>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Self-audit · Criterio 1</div>
            <p class="text-xs text-pine mb-3">Marca cada punto cuando lo verifiques en TU documento. Persiste en este navegador.</p>
            <app-checklist storageKey="motivacion-checklist" [initialItems]="checklist" />
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-3">
              <div class="text-xs uppercase tracking-wider text-moss font-mono">Referencias clave</div>
              <span class="text-xs text-moss font-mono">↗ click</span>
            </div>
            <div class="space-y-2">
              @for (r of references; track r.id) {
                <button type="button" (click)="selectedRef.set(r)"
                        class="w-full rounded-lg border border-fog bg-gray-50 p-3 text-left hover:border-forest hover:shadow-card transition-all">
                  <div class="text-xs font-mono text-moss mb-1">[{{ r.id === 'plaza2021' ? '1' : r.id === 'pamungkas2023' ? '2' : '3' }}]</div>
                  <div class="text-sm text-forest font-display font-medium leading-tight">{{ r.cite }}</div>
                  <div class="text-xs text-pine mt-1">{{ r.venue }} · {{ r.year }}</div>
                </button>
              }
            </div>
          </div>
        </aside>
      </div>

      <!-- MODAL: gap detail -->
      @if (selectedGap(); as g) {
        <app-modal [open]="true"
                   eyebrow="Hueco de investigación"
                   [title]="g.short"
                   subtitle="¿Por qué importa cerrarlo?"
                   maxWidth="640px"
                   (closeRequest)="selectedGap.set(null)">
          <div class="stack-lg">
            <div class="rounded-lg border-l-4 border-forest bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Impacto</div>
              <p class="text-sm text-pine">{{ g.impact }}</p>
            </div>
            <div class="rounded-lg border border-fog bg-white p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Evidencia en literatura</div>
              <p class="text-sm text-pine">{{ g.evidence }}</p>
            </div>
            @if (g.refIds.length > 0) {
              <div>
                <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Referencias relacionadas</div>
                <div class="flex flex-wrap gap-2">
                  @for (rid of g.refIds; track rid) {
                    <button type="button"
                            (click)="selectedGap.set(null); selectedRef.set(refMap[rid])"
                            class="rounded-md border border-fog bg-gray-50 px-2.5 py-1 font-mono text-xs text-forest hover:border-forest hover:bg-white transition-all">
                      {{ refMap[rid].cite }} ↗
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </app-modal>
      }

      <!-- MODAL: reference -->
      @if (selectedRef(); as r) {
        <app-modal [open]="true"
                   [eyebrow]="r.venue + ' · ' + r.year"
                   [title]="r.full"
                   [subtitle]="r.authors"
                   maxWidth="720px"
                   (closeRequest)="selectedRef.set(null)">
          <div class="stack-lg">
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Abstract / aportación</div>
              <p class="text-sm text-pine leading-relaxed">{{ r.abstract }}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              @if (r.doi) {
                <span class="font-mono text-xs text-moss">DOI: {{ r.doi }}</span>
              }
              <a [href]="r.url" target="_blank" rel="noopener" class="btn-primary text-xs">
                Abrir en el sitio editorial →
              </a>
            </div>
          </div>
        </app-modal>
      }

      <!-- MODAL: data point "12-18 puntos" -->
      @if (showDataPoint() === 'drop') {
        <app-modal [open]="true"
                   eyebrow="Dato cuantitativo · §1.1"
                   title="Caída de 12 a 18 puntos F1"
                   subtitle="Por qué este número es el corazón de la motivación"
                   maxWidth="640px"
                   (closeRequest)="showDataPoint.set(null)">
          <div class="stack-lg">
            <p class="text-pine leading-relaxed">
              El rango <strong class="text-forest">12-18 puntos</strong> se refiere a la diferencia en F1-score
              observada cuando un modelo entrenado con español peninsular (HatEval ES-ES o equivalente)
              se evalúa sobre tuits de variantes latinoamericanas sin adaptación específica.
            </p>
            <div class="rounded-lg border-l-4 border-forest bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Por qué es relevante para la hipótesis</div>
              <p class="text-sm text-pine">
                Define el "techo de oportunidad" que tendría nuestra propuesta. Si el shift dialectal
                cuesta hasta 18 puntos, un fine-tuning bien hecho podría recuperar varios de ellos.
                Por eso H1 promete recuperar <strong class="text-forest">≥ 8 puntos</strong> — un objetivo
                ambicioso pero alcanzable según la literatura citada.
              </p>
            </div>
            <button type="button"
                    (click)="showDataPoint.set(null); selectedRef.set(refMap['pamungkas2023'])"
                    class="btn-primary text-xs">
              Ver paper que documenta este shift →
            </button>
          </div>
        </app-modal>
      }

      <!-- MODAL: rúbrica detail -->
      @if (showRubric()) {
        <app-modal [open]="true"
                   eyebrow="Rúbrica · Criterio 1 · 20%"
                   title="Motivación suficientemente argumentada"
                   subtitle="Qué busca el maestro al calificar esta sección"
                   maxWidth="640px"
                   (closeRequest)="showRubric.set(false)">
          <div class="stack-lg">
            <p class="text-pine leading-relaxed">
              El Criterio 1 evalúa que demuestres que el problema es <strong class="text-forest">real</strong>,
              <strong class="text-forest">importante</strong> y <strong class="text-forest">no está bien resuelto</strong>.
              Vale 20% (2 de 10 puntos).
            </p>
            <div class="grid sm:grid-cols-2 gap-3">
              <div class="rounded-lg p-4" style="background:#ECFDF5; border: 1px solid #A7F3D0">
                <div class="text-xs uppercase tracking-wider font-mono mb-2" style="color:#059669">Cómo maximizar</div>
                <ul class="text-sm space-y-1.5 text-pine">
                  <li class="flex gap-2"><span style="color:#059669">↑</span><span>Cita 2-3 papers reales (Scholar)</span></li>
                  <li class="flex gap-2"><span style="color:#059669">↑</span><span>Cuantifica el problema con números</span></li>
                  <li class="flex gap-2"><span style="color:#059669">↑</span><span>Identifica el hueco específico</span></li>
                  <li class="flex gap-2"><span style="color:#059669">↑</span><span>Conecta con la hipótesis</span></li>
                </ul>
              </div>
              <div class="rounded-lg p-4" style="background:#FEF2F2; border: 1px solid #FECACA">
                <div class="text-xs uppercase tracking-wider font-mono mb-2" style="color:#DC2626">Cómo perder puntos</div>
                <ul class="text-sm space-y-1.5 text-pine">
                  <li class="flex gap-2"><span style="color:#DC2626">↓</span><span>Texto genérico sin referencias</span></li>
                  <li class="flex gap-2"><span style="color:#DC2626">↓</span><span>Problema demasiado amplio</span></li>
                  <li class="flex gap-2"><span style="color:#DC2626">↓</span><span>Sin estadísticas concretas</span></li>
                  <li class="flex gap-2"><span style="color:#DC2626">↓</span><span>Sin enlace con hipótesis</span></li>
                </ul>
              </div>
            </div>
          </div>
        </app-modal>
      }

    </app-section-layout>
  `,
})
export class MotivacionComponent {
  // ─── Signals para modales ───
  protected selectedGap = signal<Gap | null>(null);
  protected selectedRef = signal<Reference | null>(null);
  protected showDataPoint = signal<string | null>(null);
  protected showRubric = signal<boolean>(false);

  // ─── Datos ───
  readonly stateOfArt = [
    { method: 'BETO + fine-tuning multilingual', metric: 'F1 0.80-0.85 (ES-ES)',
      note: 'Línea base reportada en HatEval 2019, no evalúa dialectos LatAm.',
      variant: 'Español peninsular',
      limitation: 'Sin evaluación dialectal' },
    { method: 'XLM-RoBERTa-large zero-shot LatAm', metric: 'F1 0.68-0.74 (MX)',
      note: 'Sin fine-tuning dialectal — base de comparación realista del problema.',
      variant: 'Multilingüe genérico',
      limitation: 'Drop de hasta 13 pts en MX' },
    { method: 'RoBERTuito + adaptación dominio', metric: 'F1 0.75-0.80 (AR)',
      note: 'Mejor para rioplatense, no validado en español mexicano.',
      variant: 'Rioplatense',
      limitation: 'No transfer a MX' },
  ];

  readonly references: Reference[] = [
    {
      id: 'plaza2021',
      cite: 'Plaza-del-Arco et al. (2021)',
      full: 'A multi-task learning approach to hate speech detection leveraging sentiment analysis',
      authors: 'F. M. Plaza-del-Arco, M. D. Molina-González, L. A. Ureña-López, M. T. Martín-Valdivia',
      year: 2021,
      venue: 'IEEE Access · vol. 9',
      doi: '10.1109/ACCESS.2021.3103697',
      url: 'https://doi.org/10.1109/ACCESS.2021.3103697',
      abstract: 'Propone un enfoque multi-tarea que combina detección de discurso de odio con análisis de sentimientos. Establece baselines competitivos para HatEval 2019 en español peninsular y demuestra que la información de sentimiento mejora el F1 macro entre 2-4 puntos.',
    },
    {
      id: 'pamungkas2023',
      cite: 'Pamungkas et al. (2023)',
      full: 'Towards multidomain and multilingual abusive language detection: a survey',
      authors: 'E. W. Pamungkas, V. Basile, V. Patti',
      year: 2023,
      venue: 'Personal and Ubiquitous Computing · vol. 27(1)',
      doi: '10.1007/s00779-021-01609-1',
      url: 'https://link.springer.com/article/10.1007/s00779-021-01609-1',
      abstract: 'Survey que documenta los retos de la detección de lenguaje abusivo en escenarios multidominio y multilingüe. Reporta sistemáticamente las caídas de desempeño cross-dialectales y cross-lingual, motivando la necesidad de benchmarks específicos por variante.',
    },
    {
      id: 'perez2022',
      cite: 'Pérez et al. (2022)',
      full: 'RoBERTuito: a pre-trained language model for social media text in Spanish',
      authors: 'J. M. Pérez, D. A. Furman, L. Alonso Alemany, F. Luque',
      year: 2022,
      venue: 'LREC 2022',
      url: 'https://aclanthology.org/2022.lrec-1.785/',
      abstract: 'Presenta RoBERTuito, un modelo BERT-like pre-entrenado sobre 500M+ de tuits en español. Supera a BETO, BERTin y RoBERTa-BNE en tareas de redes sociales (detección de odio, análisis de sentimiento, ironía). Es el modelo base que esta propuesta busca afinar para variantes mexicanas.',
    },
  ];

  protected readonly refMap: Record<string, Reference> = this.references.reduce((acc, r) => {
    acc[r.id] = r;
    return acc;
  }, {} as Record<string, Reference>);

  readonly gaps: Gap[] = [
    {
      id: 'no-benchmark',
      short: 'No existe un benchmark público de discurso de odio anotado por hablantes nativos de español mexicano.',
      impact: 'Sin un benchmark dialectal, cualquier modelo desplegado en plataformas mexicanas se evalúa con métricas que sobrestiman su desempeño real. El maestro y la comunidad académica no pueden auditar el progreso real de la moderación automática en México.',
      evidence: 'Las encuestas de Pamungkas et al. (2023) listan benchmarks por idioma pero no por variante regional. Los datasets ES disponibles (HatEval, OffendES) son peninsulares.',
      refIds: ['pamungkas2023'],
    },
    {
      id: 'no-evaluation',
      short: 'Los modelos competitivos no se han evaluado sistemáticamente sobre dialectos mexicanos.',
      impact: 'No tenemos certeza cuantitativa de cuánto cae el F1 al usar XLM-RoBERTa o RoBERTuito en variantes mexicanas. Las decisiones de despliegue se toman a ciegas o con evaluación informal.',
      evidence: 'Pérez et al. (2022) validan RoBERTuito principalmente en datasets argentinos; su paper menciona cross-lingual pero no cross-dialectal MX explícitamente.',
      refIds: ['perez2022', 'pamungkas2023'],
    },
    {
      id: 'no-stats',
      short: 'La literatura no cuantifica el costo en F1 del shift dialectal con pruebas estadísticas pareadas.',
      impact: 'Sin pruebas estadísticas (Wilcoxon, McNemar), las afirmaciones del tipo "X método es mejor que Y" no son rigurosas. Se necesitan comparaciones pareadas sobre múltiples seeds para concluir con base científica.',
      evidence: 'Plaza-del-Arco et al. (2021) reportan F1 pero no aplican pruebas de significancia entre métodos. Mosbach et al. (2021) en ICLR documentan que el F1 de fine-tuning de BERT varía sustancialmente entre seeds, lo que hace mandatorio el análisis estadístico.',
      refIds: ['plaza2021'],
    },
  ];

  readonly checklist: ChecklistItem[] = [
    { text: 'Problema con datos cuantitativos en el documento', done: false },
    { text: '2-3 referencias reales citadas en el documento',  done: false },
    { text: 'Hueco específico identificado en el documento',   done: false },
    { text: 'Conexión explícita motivación → hipótesis',       done: false },
  ];
}
