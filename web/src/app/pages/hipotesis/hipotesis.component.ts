import { Component, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { TabsComponent, TabItem } from '../../shared/interactive/tabs.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';

@Component({
  selector: 'app-hipotesis',
  standalone: true,
  imports: [SectionLayoutComponent, TabsComponent, ChecklistComponent, ExpandCardComponent],
  template: `
    <app-section-layout
      sectionNumber="02"
      sectionTitle="Hipótesis"
      sectionDescription="Formulación falsable con variables, métricas y criterio explícito de refutación. La hipótesis debe poder ser puesta a prueba por la metodología propuesta."
      [rubricWeight]="20"
      status="in-progress"
      prevLink="/motivacion"
      prevLabel="Motivación"
      nextLink="/metodologia"
      nextLabel="Metodología">

      <div class="grid-content">
        <div class="stack-lg">

          <article class="card">
            <app-tabs [tabs]="tabs" [active]="activeTab()" (activeChange)="activeTab.set($event)" />

            <!-- TAB: H1 -->
            @if (activeTab() === 'h1') {
              <div class="animate-tab">
                <div class="flex items-center gap-2 mb-3">
                  <span class="badge-forest">H1</span>
                  <span class="badge-inactive">Alternativa</span>
                </div>
                <p class="text-lg text-forest leading-relaxed italic border-l-4 border-forest pl-4 font-display">
                  El fine-tuning de RoBERTuito sobre un corpus anotado de
                  <strong class="not-italic">50 000 tuits en español mexicano</strong>
                  incrementará el F1-score macro de detección de discurso de odio en
                  <strong class="not-italic">al menos 8 puntos</strong>
                  respecto al baseline XLM-RoBERTa-large zero-shot
                  (<span class="font-mono text-sm">α = 0.05</span>, prueba pareada).
                </p>
              </div>
            }

            <!-- TAB: H0 -->
            @if (activeTab() === 'h0') {
              <div class="animate-tab">
                <div class="flex items-center gap-2 mb-3">
                  <span class="badge-muted">H0</span>
                  <span class="badge-inactive">Nula</span>
                </div>
                <p class="text-pine leading-relaxed italic border-l-2 border-fog pl-4">
                  No existe diferencia estadísticamente significativa
                  (<span class="font-mono">p &gt; 0.05</span>) entre el F1-score del modelo
                  afinado y el baseline zero-shot sobre el corpus dialectal mexicano.
                </p>
              </div>
            }

            <!-- TAB: Variables -->
            @if (activeTab() === 'vars') {
              <div class="animate-tab grid form-grid--3">
                @for (v of variables; track v.role) {
                  <div class="rounded-lg border border-fog bg-gray-50 p-4">
                    <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ v.role }}</div>
                    <div class="text-forest font-display font-medium">{{ v.name }}</div>
                    <div class="text-xs text-moss mt-1 font-mono">{{ v.value }}</div>
                    <p class="text-xs text-pine mt-2">{{ v.detail }}</p>
                  </div>
                }
              </div>
            }

            <!-- TAB: Refutación -->
            @if (activeTab() === 'refute') {
              <div class="animate-tab card" style="border-color: #D97706; background: #FFFBEB; box-shadow: none">
                <div class="flex items-center gap-2 text-amber-700 text-sm font-display font-medium mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="w-4 h-4">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <path d="M12 9v4M12 17h.01"/>
                  </svg>
                  Criterio explícito de refutación
                </div>
                <p class="text-pine leading-relaxed">
                  La hipótesis H1 se considerará
                  <strong class="text-forest">refutada</strong>
                  si, tras ejecutar el experimento con 5 semillas aleatorias distintas,
                  el incremento promedio en F1-score es
                  <span class="font-mono text-forest">&lt; 8 puntos</span>
                  o si la prueba de Wilcoxon pareada arroja
                  <span class="font-mono text-forest">p ≥ 0.05</span>.
                  En ese caso aceptaríamos H0.
                </p>
              </div>
            }
          </article>

        </div>

        <!-- Sidebar -->
        <aside class="stack">
          <app-expand-card>
            <div summary>
              <div class="text-forest text-sm font-display font-medium">🔬 Falsabilidad</div>
              <p class="text-xs text-pine mt-1">Por qué nuestra H1 es científica.</p>
            </div>
            <div details>
              <p class="text-sm text-pine leading-relaxed mb-3">
                Una hipótesis es <strong class="text-forest">científica</strong>
                cuando es posible diseñar un experimento que la refute (Karl Popper).
                La nuestra cumple porque:
              </p>
              <ul class="text-xs space-y-1.5 text-pine">
                <li>· Define un umbral cuantitativo (8 puntos)</li>
                <li>· Especifica una métrica concreta (F1 macro)</li>
                <li>· Indica el método estadístico (Wilcoxon, α=0.05)</li>
                <li>· Dice qué resultado la refutaría</li>
              </ul>
            </div>
          </app-expand-card>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-3">Checklist · click para marcar</div>
            <app-checklist storageKey="hipotesis-checklist" [initialItems]="checklist" />
          </div>

          <app-expand-card>
            <div summary>
              <div class="text-forest text-sm font-display font-medium">📝 Plantilla aplicada</div>
              <p class="text-xs text-pine mt-1">La fórmula que usamos para escribir H1.</p>
            </div>
            <div details>
              <p class="text-xs text-moss font-mono leading-relaxed mb-3">
                [técnica X] mejorará [métrica M] en al menos [umbral] en [tarea T] sobre [población] frente a [baseline].
              </p>
              <div class="rounded border border-fog bg-gray-50 p-3 text-xs space-y-1">
                <div><span class="text-moss font-mono">X:</span> <span class="text-forest">fine-tuning de RoBERTuito</span></div>
                <div><span class="text-moss font-mono">M:</span> <span class="text-forest">F1-score macro</span></div>
                <div><span class="text-moss font-mono">umbral:</span> <span class="text-forest">8 puntos</span></div>
                <div><span class="text-moss font-mono">T:</span> <span class="text-forest">detección de discurso de odio</span></div>
                <div><span class="text-moss font-mono">población:</span> <span class="text-forest">español dialectal MX</span></div>
                <div><span class="text-moss font-mono">baseline:</span> <span class="text-forest">XLM-RoBERTa-large zero-shot</span></div>
              </div>
            </div>
          </app-expand-card>
        </aside>
      </div>

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
export class HipotesisComponent {
  protected activeTab = signal<string>('h1');

  readonly tabs: TabItem[] = [
    { id: 'h1', label: 'H1 — Alternativa' },
    { id: 'h0', label: 'H0 — Nula' },
    { id: 'vars', label: 'Variables', badge: '3' },
    { id: 'refute', label: 'Refutación' },
  ];

  readonly variables = [
    { role: 'Independiente', name: 'Estrategia de entrenamiento', value: 'zero-shot · fine-tuned',
      detail: 'La condición que manipulamos para observar su efecto.' },
    { role: 'Dependiente',   name: 'F1-score macro',              value: '{0, 1}',
      detail: 'Lo que medimos como resultado del experimento.' },
    { role: 'Control',       name: 'Semilla, hardware, hp',       value: 'seed=42 · A100 · lr=2e-5',
      detail: 'Variables que mantenemos constantes para aislar el efecto.' },
  ];

  readonly checklist: ChecklistItem[] = [
    { text: 'Falsable',              done: true },
    { text: 'Variables nombradas',   done: true },
    { text: 'Métrica cuantificable', done: true },
    { text: 'Umbral explícito',      done: true },
    { text: 'Prueba estadística',    done: true },
    { text: 'H0 declarada',          done: true },
  ];
}
