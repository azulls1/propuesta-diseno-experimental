import { Component, computed, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { TabsComponent, TabItem } from '../../shared/interactive/tabs.component';
import { ModalComponent } from '../../shared/interactive/modal.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';

interface DesignItem { label: string; value: string; note: string; detail: string }
interface MetricItem { name: string; scope: string; why: string; formula?: string; range?: string }
interface BiasItem   { name: string; mitigation: string; how: string; example: string }

// Fusionado desde Datasets
interface AttrItem {
  label: string; value: string; note: string;
  mono: boolean; copyable: boolean; detail: string;
}

// Fusionado desde Comparación / Baselines
type BaselineType = 'trivial' | 'classical' | 'sota' | 'ablation';

interface Baseline {
  name: string;
  type: BaselineType;
  expectedF1: string;
  rationale: string;
  details: string;
}

@Component({
  selector: 'app-metodologia',
  standalone: true,
  imports: [SectionLayoutComponent, TabsComponent, ModalComponent, ExpandCardComponent, ChecklistComponent, CopyButtonComponent],
  template: `
    <app-section-layout
      sectionNumber="03"
      sectionTitle="Metodología"
      sectionDescription="Diseño experimental, datos, muestreo, particiones train/val/test, procedimiento, métricas y control de sesgos. Es la sección con mayor peso en la rúbrica (40%)."
      [rubricWeight]="40"
      status="done"
      prevLink="/hipotesis"
      prevLabel="Hipótesis"
      nextLink="/redaccion"
      nextLabel="Redacción">

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
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.2 Escenarios y muestreo</h2>
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
            <h2 class="font-display text-lg font-semibold text-forest mb-3">3.3 Particiones de los escenarios</h2>
            <div class="mb-4">
              <div class="flex h-12 w-full overflow-hidden rounded-lg border border-fog">
                <div class="flex items-center justify-center text-white text-sm font-display font-medium"
                     style="width: 70%; background: #04202C">
                  Train · 70% <span class="ml-2 text-xs font-mono opacity-80">7 000</span>
                </div>
                <div class="flex items-center justify-center text-white text-sm font-display font-medium border-l-2 border-white"
                     style="width: 15%; background: #304040">Val · 15%</div>
                <div class="flex items-center justify-center text-white text-sm font-display font-medium border-l-2 border-white"
                     style="width: 15%; background: #5B7065">Test · OOD 15%</div>
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

      <!-- ════════ 3.7 DATOS Y MUESTREO (fusionado desde Datasets) ════════ -->
      <article class="card">
        <h2 class="font-display text-xl font-semibold text-forest mb-1 flex items-center gap-2">
          <span class="section-num">3.7</span><span>Datos y muestreo</span>
        </h2>
        <p class="text-sm text-pine mb-4">Origen de los escenarios, parámetros de muestreo, fuentes de referencia y consideraciones de validez del muestreo.</p>

        <div class="stack-xl">
          <div>
            <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <h3 class="font-display text-lg font-semibold text-forest">Banco de escenarios</h3>
              <span class="text-xs text-moss font-mono">hover para detalles · click ⧉ para copiar →</span>
            </div>
            <div class="grid form-grid">
              @for (a of attributes; track a.label) {
                <button type="button" (click)="selectedAttr.set(a)"
                        class="rounded-lg border border-fog bg-gray-50 p-4 text-left hover:border-forest hover:shadow-card transition-all">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex-1">
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ a.label }}</div>
                      <div class="text-forest font-display font-medium" [class.font-mono]="a.mono">{{ a.value }}</div>
                      <div class="text-xs text-pine mt-1">{{ a.note }}</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="w-3 h-3 text-moss shrink-0">
                      <path d="m9 5 7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              }
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <h3 class="font-display text-lg font-semibold text-forest">Fuentes de referencia</h3>
              <span class="text-xs text-moss font-mono">click para más info →</span>
            </div>
            <p class="text-sm text-pine mb-3">Catálogos y efemérides públicos que anclan el muestreo de escenarios.</p>
            <div class="stack-sm">
              @for (d of references; track d.name) {
                <app-expand-card>
                  <div summary>
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-forest font-display font-medium">{{ d.name }}</span>
                      <span class="tag">{{ d.size }}</span>
                    </div>
                    <p class="text-xs text-pine mt-1">{{ d.use }}</p>
                  </div>
                  <div details>
                    <div class="grid sm:grid-cols-2 gap-3">
                      <div>
                        <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Fuente</div>
                        <div class="text-sm text-pine">{{ d.source }}</div>
                      </div>
                      <div>
                        <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Licencia</div>
                        <div class="text-sm text-pine font-mono">{{ d.license }}</div>
                      </div>
                    </div>
                    @if (d.url) {
                      <div class="mt-3 flex items-center gap-2">
                        <a [href]="d.url" target="_blank" rel="noopener" class="btn-ghost text-xs">Visitar →</a>
                        <app-copy [text]="d.url" label="URL" />
                      </div>
                    }
                  </div>
                </app-expand-card>
              }
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <h3 class="font-display text-lg font-semibold text-forest">Validez del muestreo</h3>
              <span class="text-xs text-moss font-mono">checklist persistente →</span>
            </div>
            <p class="text-sm text-pine mb-3">Self-audit de representatividad y reproducibilidad antes de publicar el banco de escenarios.</p>
            <app-checklist storageKey="datasets-ethics" [initialItems]="ethicsChecklist" />
          </div>
        </div>
      </article>

      @if (selectedAttr(); as a) {
        <app-modal [open]="true" [eyebrow]="'Dataset · ' + a.label"
                   [title]="a.value" [subtitle]="a.note"
                   (closeRequest)="selectedAttr.set(null)">
          <p class="text-pine leading-relaxed mb-4">{{ a.detail }}</p>
          @if (a.copyable) {
            <div class="flex items-center gap-2">
              <span class="text-xs text-moss font-mono">Copiar valor:</span>
              <app-copy [text]="a.value" />
            </div>
          }
        </app-modal>
      }

      <!-- ════════ 3.8 BASELINES DE COMPARACIÓN (fusionado desde Baselines) ════════ -->
      <article class="card">
        <h2 class="font-display text-xl font-semibold text-forest mb-1 flex items-center gap-2">
          <span class="section-num">3.8</span><span>Baselines de comparación</span>
        </h2>
        <p class="text-pine leading-relaxed mb-4">
          Una distancia de fallo sin contexto no tiene significado. La comparación con baselines establece el
          <strong class="text-forest">suelo</strong> (la balística sin corrección, lo peor aceptable)
          y el <strong class="text-forest">techo</strong> (el control óptimo clásico, lo más preciso conocido).
          Sin baselines, no podemos refutar nuestra hipótesis con rigor.
        </p>

        <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
          <h3 class="font-display text-lg font-semibold text-forest">Tipos de baselines incluidos</h3>
          <span class="text-xs text-moss font-mono">filtrar →</span>
        </div>

        <div class="filter-pills mb-4">
          @for (f of baselineTypeFilters; track f.id) {
            <button type="button"
                    (click)="baselineTypeFilter.set(f.id)"
                    class="filter-pill"
                    [class.active]="baselineTypeFilter() === f.id">
              {{ f.label }}
              <span class="ml-1 text-[10px] opacity-70">{{ countBaselineTypes(f.id) }}</span>
            </button>
          }
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          @for (t of filteredBaselineTypes(); track t.type) {
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
                    <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Fallo rel. esperado</div>
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

        <div class="mt-6 rounded-lg border border-fog bg-gray-50 p-4">
          <h3 class="font-display text-lg font-semibold text-forest mb-3">Comparación justa: condiciones</h3>
          <p class="text-sm text-pine mb-3">
            La comparación solo aporta valor si todos los métodos se evalúan en las mismas condiciones.
          </p>
          <div class="grid form-grid">
            @for (c of fairConditions; track c) {
              <div class="rounded-md border border-fog bg-white p-3 flex items-start gap-2 text-sm">
                <span style="color:#059669" class="mt-0.5">✓</span>
                <span class="text-pine">{{ c }}</span>
              </div>
            }
          </div>
        </div>
      </article>

      <!-- ════════ 3.9 COMPARACIÓN CON ESTUDIOS PREVIOS (fusionado desde Comparación) ════════ -->
      <article class="card">
        <h2 class="font-display text-xl font-semibold text-forest mb-1 flex items-center gap-2">
          <span class="section-num">3.9</span><span>Comparación con estudios previos</span>
        </h2>
        <p class="text-sm text-pine mb-4">Baselines concretos a evaluar, condiciones de comparación justa, pruebas estadísticas y resultados esperados que permitirán validar o refutar la hipótesis.</p>

        <div class="stack-xl">
          <div>
            <div class="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <h3 class="font-display text-lg font-semibold text-forest">Baselines a evaluar</h3>
              <span class="text-xs text-moss font-mono">click una tarjeta para ver detalles →</span>
            </div>

            <div class="filter-pills mb-4">
              @for (f of baselineFilters; track f.id) {
                <button type="button"
                        (click)="activeFilter.set(f.id)"
                        class="filter-pill"
                        [class.active]="activeFilter() === f.id">
                  {{ f.label }}
                  <span class="ml-1 text-[10px] opacity-70">{{ countBaselines(f.id) }}</span>
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
                      <span class="text-xs text-moss font-mono">Fallo rel. esperado:</span>
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
          </div>

          <div>
            <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <h3 class="font-display text-lg font-semibold text-forest">Condiciones de comparación justa</h3>
              <span class="text-xs text-moss font-mono">marca las que ya cumples →</span>
            </div>
            <p class="text-sm text-pine mb-4">
              Self-audit: click cada condición conforme la cumples en tu experimento. Persiste localmente.
            </p>
            <app-checklist storageKey="comparacion-fairness" [initialItems]="fairnessChecklist" />
          </div>

          <div>
            <h3 class="font-display text-lg font-semibold text-forest mb-3">Pruebas estadísticas</h3>
            <div class="space-y-3">
              @for (t of statTests; track t.name) {
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
          </div>

          <app-expand-card>
            <div summary>
              <div class="flex items-center gap-2 text-forest font-display font-semibold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="w-5 h-5"><path d="M3 3v18h18M7 14l4-4 3 3 5-5"/></svg>
                Resultados esperados
              </div>
              <p class="text-sm text-pine mt-2">Click para ver los dos escenarios y su interpretación.</p>
            </div>
            <div details>
              <div class="grid sm:grid-cols-2 gap-3">
                <div class="rounded-lg p-4" style="background:#ECFDF5; border: 1px solid #A7F3D0">
                  <div class="text-xs uppercase tracking-wider font-mono mb-2" style="color:#059669">Escenario A — Hipótesis confirmada</div>
                  <p class="text-sm text-pine mb-2">
                    <strong class="text-forest">Reducción de la distancia de fallo ≥ 30 %</strong>
                    para el guiado RL frente a APN,
                    con <span class="font-mono">p &lt; 0.01</span> tras corrección de Holm
                    y latencia compatible con operación a bordo.
                  </p>
                  <div class="text-xs text-pine mt-2">
                    <strong>Interpretación:</strong> la política aprendida absorbe la incertidumbre de masa
                    y las perturbaciones mejor que el guiado clásico. Contribuimos un banco de escenarios replicable.
                  </div>
                </div>
                <div class="rounded-lg p-4" style="background:#FEF2F2; border: 1px solid #FECACA">
                  <div class="text-xs uppercase tracking-wider font-mono mb-2" style="color:#DC2626">Escenario B — Hipótesis refutada</div>
                  <p class="text-sm text-pine mb-2">
                    Reducción &lt; <span class="font-mono">30 %</span> o p ≥ 0.05.
                  </p>
                  <div class="text-xs text-pine mt-2">
                    <strong>Interpretación:</strong> el guiado clásico APN u óptimo sigue siendo preferible;
                    los cuellos de botella son la brecha sim2real y la generalización OOD, no la capacidad del modelo.
                  </div>
                </div>
              </div>
            </div>
          </app-expand-card>
        </div>
      </article>

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
    { id: 'data',    label: '3.2 Escenarios' },
    { id: 'splits',  label: '3.3 Splits', badge: 'train/val/OOD' },
    { id: 'proc',    label: '3.4 Procedimiento', badge: '8 pasos' },
    { id: 'metrics', label: '3.5 Métricas' },
    { id: 'biases',  label: '3.6 Sesgos' },
  ];

  readonly design: DesignItem[] = [
    { label: 'Tipo', value: 'Experimental controlado', note: 'Comparación pareada entre 2 condiciones.',
      detail: 'Un experimento controlado manipula deliberadamente la variable independiente (estrategia de guiado: APN clásico vs RL aprendido) y mide el efecto en la variable dependiente (distancia de fallo). Se contrasta con cuasi-experimental (sin asignación aleatoria) y observacional (sin manipulación). Aquí controlamos el simulador, las semillas y los escenarios, así que cumple el criterio de "controlado".' },
    { label: 'Paradigma', value: 'Cuantitativo (Monte Carlo)', note: 'Métricas numéricas + pruebas de significancia.',
      detail: 'Cuantitativo significa que la evidencia se expresa en números y se evalúa con métodos estadísticos. La hipótesis se traduce a una métrica física (distancia de fallo en metros) estimada por simulación Monte Carlo sobre miles de escenarios. Un paradigma cualitativo no aplicaría: aquí hay una trayectoria evaluada contra el objetivo, no interpretación subjetiva.' },
    { label: 'Unidad', value: 'Escenario de intercepción', note: 'Mismo escenario evaluado en ambas condiciones.',
      detail: 'La unidad de análisis es un escenario de intercepción individual: un asteroide objetivo con su masa, geometría y velocidad de aproximación muestreadas, más sus perturbaciones. El diseño es pareado: el mismo escenario se resuelve con APN y con RL, aislando el efecto de la estrategia de guiado.' },
  ];

  readonly dataset = [
    { attr: 'Origen',                 value: 'Simulador N cuerpos',         why: 'No hay dataset descargable; los escenarios se generan por simulación.' },
    { attr: 'Tamaño objetivo',        value: '10 000 escenarios',           why: 'Suficiente para estimaciones de alta precisión y potencia ≥ 0.80.' },
    { attr: 'Anclaje',                value: 'JPL Small-Body Database',     why: 'Parámetros muestreados del catálogo real de NEOs conocidos.' },
    { attr: 'Perturbaciones',         value: 'Gravedad 3.º · SRP · ruido',  why: 'Sol y planetas (DE440), presión de radiación y ruido de sensores.' },
    { attr: 'Representatividad',      value: 'KS-test vs catálogo',         why: 'Se exige p > 0.05: no se rechaza igualdad con la población real.' },
    { attr: 'Reproducibilidad',      value: 'Semillas + versión liberadas', why: 'Simulador, parámetros y semillas se publican para auditoría.' },
  ];

  readonly splitInfo = [
    { label: 'Estrategia',       value: 'Estratificada por dificultad',    note: 'Por velocidad de aproximación y nivel de incertidumbre.' },
    { label: 'Semilla',          value: 'seed=42',                         note: 'Reproducibilidad — split idéntico ante repeticiones.' },
    { label: 'Validación',       value: '5-fold CV sobre train + val',     note: 'Estima varianza de la métrica.' },
    { label: 'Prueba OOD',       value: 'Tipos/tamaños no vistos',         note: 'Conjunto intocado, distribución desplazada (fuera de distribución).' },
  ];

  readonly procedure = [
    { id: '01', title: 'Generación',           detail: 'Muestreo de parámetros del asteroide anclado al catálogo JPL + perturbaciones.', more: 'Masa, tamaño, geometría y velocidad de aproximación de distribuciones JPL Small-Body Database; gravedad de terceros (DE440), SRP y ruido de sensores.' },
    { id: '02', title: 'Baselines clásicos',   detail: 'Balística sin corrección, PN, APN y control óptimo (Lambert + convexo).', more: 'APN es la referencia principal de la hipótesis; el control óptimo marca el techo de precisión a costa de latencia.' },
    { id: '03', title: 'Entrenamiento RL',     detail: 'Política recurrente optimizada con PPO y meta-aprendizaje, sobre 5 semillas.', more: 'PPO (Schulman et al., 2017) + meta-learning para adaptación en línea a dinámicas inciertas. Hardware: A100.' },
    { id: '04', title: 'Particionado',         detail: 'Split estratificado 70/15/15 por dificultad con seed=42; test OOD.', more: 'El conjunto de prueba reserva tipos y tamaños de asteroide no vistos en entrenamiento, intocado durante todo el desarrollo.' },
    { id: '05', title: 'Validación',           detail: 'Ajuste de hiperparámetros únicamente sobre val.', more: '5-fold cross-validation sobre train + val. El test no se mira durante el ajuste.' },
    { id: '06', title: 'Evaluación',           detail: 'Ejecución en el test intocado. Reportar media ± desviación estándar.', more: 'Mismos escenarios para todos los métodos (diseño pareado). Tiempo y hardware fijados.' },
    { id: '07', title: 'Registro de métricas', detail: 'Distancia de fallo, Δv, tasa de éxito y latencia de cómputo.', more: 'La distancia de fallo (m) es la métrica principal; las demás dan soporte de eficiencia y viabilidad a bordo.' },
    { id: '08', title: 'Pruebas estadísticas', detail: 'Wilcoxon signed-rank pareado entre métodos, α=0.05.', more: 'scipy.stats.wilcoxon(miss_rl, miss_apn). Corrección de Holm al comparar contra los cuatro baselines.' },
  ];

  readonly metrics: MetricItem[] = [
    { name: 'Distancia de fallo', scope: 'principal',
      why: 'Métrica física directa de la calidad de intercepción; menor es mejor.',
      formula: 'd_miss = mín_t ‖ r_sonda(t) − r_objetivo(t) ‖',
      range: 'En metros, ≥ 0. d=0 sería impacto perfecto. La hipótesis exige reducir su media ≥ 30 % frente a APN.' },
    { name: 'Δv (coste de maniobra)', scope: 'soporte',
      why: 'Mide la eficiencia de propulsante de la trayectoria corregida.',
      formula: 'Δv = ∫ ‖ a_control(t) ‖ dt',
      range: 'En m/s, ≥ 0. Un guiado puede acertar gastando demasiado Δv; por eso se reporta junto al fallo.' },
    { name: 'Tasa de éxito / latencia', scope: 'desglose',
      why: 'Éxito = % de escenarios bajo el umbral operacional; latencia = viabilidad a bordo.',
      formula: 'éxito = #(d_miss < umbral) / N',
      range: 'Éxito en [0,1]; latencia en ms por recálculo. La latencia decide si el método es ejecutable en tiempo real a bordo.' },
    { name: 'Wilcoxon p-value', scope: 'estadística',
      why: 'Comparación pareada no paramétrica sobre los escenarios.',
      formula: 'W = Σ rank(|x_i - y_i|) · sign(x_i - y_i)',
      range: 'p ∈ [0, 1]. Rechazamos H0 si p < α (=0.05). No asume normalidad — adecuado para distribuciones de fallo sesgadas.' },
  ];

  readonly biases: BiasItem[] = [
    { name: 'Brecha sim2real',
      mitigation: 'Randomización de dominio + modelos de perturbación calibrados contra DART.',
      how: 'Se aleatorizan los parámetros de masa, forma y perturbaciones en cada episodio, y los modelos de ruido y dinámica se calibran contra datos de misiones reales (DART, Cheng et al. 2023). Es la principal amenaza a la validez externa.',
      example: 'Entrenar y evaluar solo en un simulador idealizado: la política aprende a explotar artefactos del simulador que no existen en vuelo real.' },
    { name: 'Desplazamiento de distribución (OOD)',
      mitigation: 'Conjunto de prueba con tipos y tamaños de asteroide no vistos en entrenamiento.',
      how: 'El test reserva una distribución desplazada respecto a train/val para medir explícitamente la generalización fuera de distribución, evitando sobreestimar el desempeño.',
      example: 'Entrenar solo con asteroides rocosos pequeños y reportar éxito como si aplicara a cualquier NEO — sin probar tamaños o composiciones nuevas.' },
    { name: 'Reward hacking / sobreajuste',
      mitigation: 'Función de recompensa auditada; test intocado; 5 semillas para varianza.',
      how: 'La recompensa se audita para que optimice realmente la distancia de fallo y no un proxy. El test NUNCA se ve durante el desarrollo; el ajuste usa solo val. Se promedia sobre 5 semillas para estimar la varianza.',
      example: 'La política minimiza Δv ignorando el fallo, o explota una métrica proxy — luce bien en entrenamiento y falla la intercepción real.' },
    { name: 'Representatividad de escenarios',
      mitigation: 'Muestreo anclado al catálogo JPL y verificado con KS-test.',
      how: 'Los parámetros se muestrean del JPL Small-Body Database y se compara la distribución muestreada con el catálogo mediante Kolmogorov–Smirnov (p > 0.05). Si un tipo de objeto domina la muestra, se documenta como límite de validez externa.',
      example: 'Sobre-representar asteroides grandes y lentos hace que el guiado luzca robusto, pero no generaliza a objetivos rápidos y pequeños.' },
    { name: 'Reproducibilidad',
      mitigation: 'Publicar semillas, versión del simulador, efemérides e hiperparámetros.',
      how: 'Se liberan todas las semillas, la versión fijada del simulador, las efemérides DE440 y los hiperparámetros, de modo que un tercero pueda replicar el experimento solo con el documento.',
      example: 'Reportar resultados sin la versión del simulador ni la semilla: nadie puede reproducir la distancia de fallo y la evidencia no es auditable.' },
    { name: 'Sin sujetos humanos',
      mitigation: 'El objeto de estudio es una simulación física; no aplican consideraciones de participantes.',
      how: 'No hay datos de personas ni anotación humana: los escenarios son físicos. Aun así, se reportan todos los resultados (incluidos los negativos y todas las semillas) para mantener el valor informativo.',
      example: 'Mostrar solo la semilla con mejor fallo. Otros investigadores no pueden replicar y la "evidencia" es ruido seleccionado.' },
  ];

  // ══════════════ 3.7 Datos y muestreo (fusionado desde Datasets) ══════════════
  protected selectedAttr = signal<AttrItem | null>(null);

  readonly attributes: AttrItem[] = [
    { label: 'Nombre', value: 'Banco de escenarios (propio)', note: 'Generado por simulación de N cuerpos.', mono: false, copyable: false,
      detail: 'Banco de escenarios de intercepción que generamos como contribución del proyecto. No hay un dataset descargable: cada escenario se sintetiza con un simulador de dinámica de N cuerpos de alta fidelidad y se libera bajo licencia abierta para auditoría.' },
    { label: 'Tamaño objetivo', value: '10 000 escenarios', note: 'Potencia a priori ≥ 0.80 (α=0.05).', mono: true, copyable: false,
      detail: '10 000 escenarios pareados dan un margen del IC 95 % muy estrecho para la distancia de fallo, de modo que la reducción objetivo de 30 % supera con holgura el mínimo efecto detectable. Un análisis de potencia a priori confirma suficiencia muestral.' },
    { label: 'Anclaje', value: 'JPL Small-Body Database', note: 'Masa, tamaño, geometría, velocidad.', mono: false, copyable: false,
      detail: 'Los parámetros del asteroide objetivo se muestrean de distribuciones ancladas en el catálogo real JPL Small-Body Database de NEOs conocidos, para que la población de escenarios sea representativa de objetivos reales.' },
    { label: 'Perturbaciones', value: 'Gravedad 3.º · SRP · ruido', note: 'Efemérides DE440 + ruido de sensores.', mono: true, copyable: true,
      detail: 'Cada escenario modela gravedad de terceros cuerpos (Sol y planetas, vía efemérides DE440), presión de radiación solar y un modelo de ruido de sensores sobre la posición y velocidad relativas. Son las fuentes de incertidumbre que el guiado debe absorber.' },
    { label: 'Licencia', value: 'Abierta (auditable)', note: 'Simulador, parámetros y semillas liberados.', mono: false, copyable: false,
      detail: 'El simulador, los parámetros de muestreo y las semillas se publican bajo licencia abierta, de modo que un tercero pueda regenerar el banco de escenarios completo y reproducir la evaluación.' },
    { label: 'Representatividad', value: 'KS-test vs catálogo', note: 'Se exige p > 0.05.', mono: false, copyable: false,
      detail: 'La representatividad del banco frente a la población real de NEOs se verifica comparando las distribuciones muestreadas con el catálogo JPL mediante una prueba de Kolmogorov–Smirnov: se exige p > 0.05 para no rechazar la igualdad de distribución.' },
  ];

  readonly references = [
    { name: 'JPL Small-Body Database', size: 'Catálogo NEO',
      use: 'Ancla el muestreo de masa, tamaño, geometría y velocidad de aproximación.',
      source: 'NASA JPL — Center for Near-Earth Object Studies',
      license: 'Pública (NASA/JPL)',
      url: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html' },
    { name: 'Efemérides DE440', size: 'Efemérides',
      use: 'Posiciones de Sol y planetas para la gravedad de terceros cuerpos.',
      source: 'JPL Planetary and Lunar Ephemerides',
      license: 'Pública (NASA/JPL)',
      url: 'https://ssd.jpl.nasa.gov/planets/eph_export.html' },
  ];

  readonly ethicsChecklist: ChecklistItem[] = [
    { text: 'Parámetros muestreados del catálogo JPL, no inventados.',                              done: false },
    { text: 'Representatividad verificada con KS-test (p > 0.05) frente al catálogo.',              done: false },
    { text: 'Conjunto de prueba OOD intocado durante todo el desarrollo.',                          done: false },
    { text: 'Resultados reportados como media ± std sobre las 5 semillas.',                         done: false },
    { text: 'Versión del simulador y efemérides DE440 fijadas y documentadas.',                     done: false },
    { text: 'Semillas e hiperparámetros publicados para replicación.',                              done: false },
    { text: 'Sin sujetos humanos: el objeto de estudio es una simulación física.',                  done: false },
  ];

  // ══════════════ 3.8 Baselines de comparación (fusionado desde Baselines) ══════════════
  protected baselineTypeFilter = signal<BaselineType | 'all'>('all');

  protected filteredBaselineTypes = computed(() => {
    const f = this.baselineTypeFilter();
    return f === 'all' ? this.baselineTypes : this.baselineTypes.filter(t => t.id === f);
  });

  countBaselineTypes(filter: BaselineType | 'all'): number {
    return filter === 'all' ? this.baselineTypes.length : this.baselineTypes.filter(t => t.id === filter).length;
  }

  readonly baselineTypeFilters: { id: BaselineType | 'all'; label: string }[] = [
    { id: 'all',       label: 'Todos' },
    { id: 'trivial',   label: 'Trivial' },
    { id: 'classical', label: 'Clásico' },
    { id: 'sota',      label: 'Estado del arte' },
    { id: 'ablation',  label: 'Ablación' },
  ];

  readonly baselineTypes = [
    { id: 'trivial' as BaselineType, type: 'Trivial', example: 'Balística sin corrección',
      why: 'Suelo absoluto: trayectoria sin guiado, referencia de fallo relativo 1.00.',
      expectedF1: '1.00 (ref.)', risk: 'Si un método no supera esto, no aporta guiado alguno.',
      impl: 'Propagación balística sin control' },
    { id: 'classical' as BaselineType, type: 'Clásico', example: 'PN / APN',
      why: 'Leyes de guiado clásicas; APN es la referencia principal de la hipótesis.',
      expectedF1: '0.30 – 0.60', risk: 'Pierden robustez bajo incertidumbre de masa y perturbaciones.',
      impl: 'Navegación proporcional (aumentada)' },
    { id: 'sota' as BaselineType, type: 'Estado del arte', example: 'Control óptimo (Lambert + convexo)',
      why: 'Lo más preciso conocido, pero costoso de recalcular a bordo.',
      expectedF1: '0.20 – 0.30', risk: 'Latencia potencialmente inviable en tiempo real a bordo.',
      impl: 'Lambert + optimización convexa' },
    { id: 'ablation' as BaselineType, type: 'Ablación', example: 'RL sin meta-aprendizaje',
      why: 'Aísla la contribución de cada componente de la política propuesta.',
      expectedF1: '≤ 0.21', risk: 'Olvidar ablaciones impide atribuir la mejora a la parte correcta.',
      impl: 'Misma política RL con flag --no-meta' },
  ];

  readonly fairConditions = [
    'Mismos escenarios de prueba intocados, sin filtrado diferencial.',
    'Mismas métricas (distancia de fallo, Δv, latencia) con idéntica configuración.',
    'Mismas semillas aleatorias (al menos 5) para promediar varianza.',
    'Mismo presupuesto de cómputo a bordo (latencia reportada).',
    'Mismo modelo de perturbaciones aplicado a todos los métodos.',
    'Pruebas estadísticas pareadas con corrección por múltiples comparaciones.',
  ];

  // ══════════════ 3.9 Comparación con estudios previos (fusionado desde Comparación) ══════════════
  protected activeFilter = signal<BaselineType | 'all'>('all');

  protected filteredBaselines = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.baselines : this.baselines.filter(b => b.type === f);
  });

  countBaselines(filter: BaselineType | 'all'): number {
    return filter === 'all' ? this.baselines.length : this.baselines.filter(b => b.type === filter).length;
  }

  readonly baselineFilters: { id: BaselineType | 'all'; label: string }[] = [
    { id: 'all',       label: 'Todos' },
    { id: 'trivial',   label: 'Trivial' },
    { id: 'classical', label: 'Clásico' },
    { id: 'sota',      label: 'Estado del arte' },
    { id: 'ablation',  label: 'Ablación' },
  ];

  readonly baselines: Baseline[] = [
    { name: 'Balística sin corrección', type: 'trivial', expectedF1: '1.00 (ref.)',
      rationale: 'Suelo absoluto. Trayectoria sin guiado; cualquier método debe superarla.',
      details: 'Propagación de la dinámica sin maniobra de corrección.' },
    { name: 'Navegación proporcional aumentada (APN)', type: 'classical', expectedF1: '0.30 – 0.45',
      rationale: 'Baseline clásico fuerte y referencia principal de la hipótesis.',
      details: 'Ley APN con ganancia ajustada; también se evalúa PN simple (0.45 – 0.60).' },
    { name: 'Control óptimo (Lambert + convexo)', type: 'sota', expectedF1: '0.20 – 0.30',
      rationale: 'Estado del arte en precisión; costoso de recalcular a bordo.',
      details: 'Solución del problema de Lambert + optimización convexa por tramos.' },
    { name: 'Guiado RL meta-aprendido (propuesta)', type: 'ablation', expectedF1: '≤ 0.21',
      rationale: 'Política recurrente con PPO + meta-aprendizaje; lo que queremos validar.',
      details: 'Política recurrente optimizada con PPO sobre 5 semillas; ablación --no-meta.' },
  ];

  readonly fairnessChecklist: ChecklistItem[] = [
    { text: 'Mismos escenarios de prueba OOD, intocados durante desarrollo.',  done: false },
    { text: 'Mismas métricas con la misma implementación del simulador.',      done: false },
    { text: 'Mismo presupuesto de cómputo a bordo (latencia por recálculo).',  done: false },
    { text: 'Mismas 5 semillas aleatorias para promediar varianza.',          done: false },
    { text: 'Mismo modelo de perturbaciones aplicado a todos los métodos.',   done: false },
    { text: 'Hiperparámetros ajustados con el mismo protocolo sobre val.',     done: false },
  ];

  readonly statTests = [
    { name: 'Wilcoxon signed-rank', scope: 'pareada · no paramétrica',
      note: 'Comparación pareada de la distancia de fallo entre el guiado RL y cada baseline sobre los mismos escenarios. α = 0.05.',
      code: 'scipy.stats.wilcoxon(miss_rl, miss_apn)' },
    { name: 'Bootstrap (n=1000)', scope: 'IC 95%',
      note: 'Intervalo de confianza no paramétrico para la distancia de fallo sobre el test.',
      code: 'np.percentile([miss(resample(test)) for _ in range(1000)], [2.5, 97.5])' },
    { name: 'Corrección de Holm', scope: 'múltiples comparaciones',
      note: 'Comparamos contra 4 baselines ⇒ controlar FWER mediante Holm step-down.',
      code: 'statsmodels.stats.multitest.multipletests(pvalues, method="holm")' },
  ];
}
