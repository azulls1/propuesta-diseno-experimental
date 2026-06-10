import { Component, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';
import { ModalComponent } from '../../shared/interactive/modal.component';

interface Reference {
  id: string;
  refNum: string;
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
              La defensa planetaria ante asteroides peligrosos dejó de ser teórica: en 2022 la misión
              DART de la NASA impactó el asteroide Dimorphos y midió una alteración real de su órbita,
              con un factor de transferencia de momento
              <button type="button" (click)="selectedRef.set(refMap['cheng2023'])"
                      class="inline-flex items-center gap-1 rounded-md border border-fog bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-forest hover:border-forest hover:bg-white transition-all">
                [Cheng et al., 2023] ↗
              </button>.
              Sin embargo, durante la fase terminal de aproximación el retardo de la señal Tierra–sonda
              <button type="button" (click)="showDataPoint.set('drop')"
                      class="inline-flex items-baseline rounded-md border-b-2 border-forest bg-forest/5 px-1 hover:bg-forest hover:text-white transition-colors">
                <strong class="text-forest hover:text-white">impide el control desde tierra</strong>
              </button>:
              el guiado debe ser autónomo y recalcularse a bordo en tiempo real, y el aprendizaje por
              refuerzo ya muestra resultados prometedores en operaciones de proximidad a asteroides
              <button type="button" (click)="selectedRef.set(refMap['gaudet2020a'])"
                      class="inline-flex items-center gap-1 rounded-md border border-fog bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-forest hover:border-forest hover:bg-white transition-all">
                [Gaudet et al., 2020] ↗
              </button>.
            </p>
            <p class="text-pine leading-relaxed">
              El problema es relevante porque los métodos clásicos de guiado —navegación proporcional
              y control óptimo basado en el problema de Lambert— asumen una dinámica conocida y, bajo
              incertidumbre realista (masa y forma del objetivo desconocidas, gravedad multicuerpo,
              presión de radiación solar, ruido de sensores), pierden robustez o resultan
              computacionalmente costosos para ejecutarse a bordo.
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
                  <div class="text-xs font-mono text-moss mb-1">[{{ r.refNum }}]</div>
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
                   title="El control desde tierra es inviable en fase terminal"
                   subtitle="Por qué la autonomía a bordo es el corazón de la motivación"
                   maxWidth="640px"
                   (closeRequest)="showDataPoint.set(null)">
          <div class="stack-lg">
            <p class="text-pine leading-relaxed">
              En la intercepción terminal de un cuerpo pequeño, el retardo de la señal Tierra–sonda
              (minutos) hace imposible cerrar el lazo de control desde el centro de misión: para cuando
              llega una corrección, la geometría del encuentro ya cambió. El guiado debe
              <strong class="text-forest">recalcularse a bordo en tiempo real</strong>.
            </p>
            <div class="rounded-lg border-l-4 border-forest bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Por qué es relevante para la hipótesis</div>
              <p class="text-sm text-pine">
                Define el "techo de oportunidad" de la propuesta. Si el guiado clásico APN pierde robustez
                bajo incertidumbre de masa y perturbaciones, una política aprendida podría absorberla mejor.
                Por eso H1 promete reducir la distancia de fallo <strong class="text-forest">≥ 30 %</strong>
                — un objetivo ambicioso pero plausible según la literatura citada.
              </p>
            </div>
            <button type="button"
                    (click)="showDataPoint.set(null); selectedRef.set(refMap['gaudet2020a'])"
                    class="btn-primary text-xs">
              Ver paper de guiado RL para asteroides →
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
    { method: 'Navegación proporcional (PN) clásica', metric: 'Fallo rel. 0.45–0.60',
      note: 'Ley de guiado madura y barata, pero asume dinámica conocida.',
      variant: 'Guiado clásico',
      limitation: 'Pierde robustez bajo incertidumbre' },
    { method: 'Navegación proporcional aumentada (APN)', metric: 'Fallo rel. 0.30–0.45',
      note: 'Baseline clásico fuerte — referencia principal de la hipótesis.',
      variant: 'Guiado clásico fuerte',
      limitation: 'Sensible a masa y perturbaciones' },
    { method: 'Control óptimo (Lambert + convexo)', metric: 'Fallo rel. 0.20–0.30',
      note: 'Estado del arte en precisión, pero costoso a bordo.',
      variant: 'Estado del arte',
      limitation: 'Latencia inviable en tiempo real' },
  ];

  readonly references: Reference[] = [
    {
      id: 'cheng2023',
      refNum: '1',
      cite: 'Cheng et al. (2023)',
      full: 'Momentum transfer from the DART mission kinetic impact on asteroid Dimorphos',
      authors: 'A. F. Cheng, H. F. Agrusa, B. W. Barbee, et al.',
      year: 2023,
      venue: 'Nature · vol. 616',
      url: 'https://www.nature.com/articles/s41586-023-05878-z',
      abstract: 'Reporta la medición del impacto cinético de la misión DART sobre el asteroide Dimorphos: una reducción de 2.70 ± 0.10 mm/s en su velocidad orbital con un factor de transferencia de momento β entre 2.2 y 4.9. Demuestra empíricamente que un impactador cinético es una estrategia viable de defensa planetaria.',
    },
    {
      id: 'gaudet2020a',
      refNum: '2',
      cite: 'Gaudet et al. (2020)',
      full: 'Terminal adaptive guidance via reinforcement meta-learning: Applications to autonomous asteroid close-proximity operations',
      authors: 'B. Gaudet, R. Linares, R. Furfaro',
      year: 2020,
      venue: 'Acta Astronautica · vol. 171',
      url: 'https://doi.org/10.1016/j.actaastro.2020.02.036',
      abstract: 'Propone una política de guiado adaptativo terminal entrenada con meta-aprendizaje por refuerzo para operaciones de proximidad a asteroides. Muestra que una política recurrente puede adaptarse en línea a dinámicas inciertas, superando al guiado clásico en escenarios con masa y forma del objetivo desconocidas.',
    },
    {
      id: 'izzo2019',
      refNum: '3',
      cite: 'Izzo et al. (2019)',
      full: 'A survey on artificial intelligence trends in spacecraft guidance dynamics and control',
      authors: 'D. Izzo, M. Märtens, B. Pan',
      year: 2019,
      venue: 'Astrodynamics · vol. 3(4)',
      url: 'https://doi.org/10.1007/s42064-018-0053-6',
      abstract: 'Revisión del creciente cuerpo de investigación en IA aplicada al guiado, dinámica y control de naves espaciales. Documenta tendencias en aprendizaje por refuerzo y optimización aprendida, y señala la falta de comparaciones rigurosas frente a métodos clásicos bajo incertidumbre realista.',
    },
  ];

  protected readonly refMap: Record<string, Reference> = this.references.reduce((acc, r) => {
    acc[r.id] = r;
    return acc;
  }, {} as Record<string, Reference>);

  readonly gaps: Gap[] = [
    {
      id: 'no-comparison',
      short: 'No existe una comparación cuantitativa y estadísticamente rigurosa entre el guiado aprendido (RL) y el clásico para la intercepción de cuerpos pequeños.',
      impact: 'Sin esa comparación, las decisiones de misión sobre qué controlador embarcar se toman sin evidencia comparable. No se puede afirmar que el RL supere al guiado clásico bajo incertidumbre realista si nadie lo midió en condiciones idénticas.',
      evidence: 'Izzo et al. (2019) revisan las tendencias de IA en guiado y control pero señalan la falta de comparaciones rigurosas frente a métodos clásicos bajo incertidumbre realista.',
      refIds: ['izzo2019'],
    },
    {
      id: 'no-uncertainty',
      short: 'El desempeño del guiado RL no se ha evaluado sistemáticamente bajo incertidumbre de masa, gravedad multicuerpo, presión de radiación solar y ruido de sensores.',
      impact: 'No hay certeza cuantitativa de cuánto se degrada la distancia de fallo del guiado clásico cuando la dinámica deja de ser perfectamente conocida, ni de cuánto la absorbe una política aprendida.',
      evidence: 'Gaudet et al. (2020) muestran guiado adaptativo por meta-RL en proximidad a asteroides, pero centrado en su propio método, sin un contraste pareado y estadístico contra APN y control óptimo.',
      refIds: ['gaudet2020a', 'izzo2019'],
    },
    {
      id: 'no-stats',
      short: 'La literatura no cuantifica la ventaja del guiado aprendido con pruebas estadísticas pareadas sobre los mismos escenarios.',
      impact: 'Sin pruebas estadísticas (Wilcoxon pareado, corrección de Holm), las afirmaciones del tipo "X guiado es mejor que Y" no son rigurosas. Se necesitan comparaciones pareadas sobre múltiples semillas y escenarios para concluir con base científica.',
      evidence: 'La medición real de DART (Cheng et al., 2023) valida el impactador cinético, pero la elección del controlador de guiado terminal sigue careciendo de un análisis estadístico comparativo.',
      refIds: ['cheng2023'],
    },
  ];

  readonly checklist: ChecklistItem[] = [
    { text: 'Problema con datos cuantitativos en el documento', done: false },
    { text: '2-3 referencias reales citadas en el documento',  done: false },
    { text: 'Hueco específico identificado en el documento',   done: false },
    { text: 'Conexión explícita motivación → hipótesis',       done: false },
  ];
}
