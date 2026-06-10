import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { TabsComponent, TabItem } from '../../shared/interactive/tabs.component';
import { SupabaseService, Comment } from '../../core/supabase.service';

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [FormsModule, SectionLayoutComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section-layout
      sectionNumber="06"
      sectionTitle="Laboratorio"
      sectionDescription="Demos: simulación de intercepción (Python), calculadora estadística, validador de hipótesis y muro de comentarios persistido en Supabase."
      status="done"
      prevLink="/entregables"
      prevLabel="Entregables"
      nextLink="/autor"
      nextLabel="Autor">

      <article class="card">
        <app-tabs [tabs]="tabs" [active]="active()" (activeChange)="active.set($event)" />

        <!-- ════════ A. SIMULACIÓN (Python → GIF) ════════ -->
        @if (active() === 'sim') {
          <div class="animate-tab">
            <div class="mb-4">
              <h2 class="font-display text-lg font-semibold text-forest mb-1">Simulación de intercepción</h2>
              <p class="text-sm text-pine">
                Recálculo de trayectoria en tiempo real: un interceptor debe alcanzar un asteroide
                cuya trayectoria se curva por una perturbación no modelada (presión de radiación solar).
                Se comparan el guiado <strong class="text-forest">clásico (APN)</strong> y el
                <strong class="text-forest">guiado por IA (RL)</strong>, midiendo la distancia de fallo.
              </p>
            </div>

            <figure class="rounded-lg border border-fog bg-gray-50 overflow-hidden">
              <img src="sim/interceptacion.gif"
                   alt="Animación de intercepción de asteroide: guiado clásico APN vs IA RL"
                   class="w-full block" loading="lazy" />
              <figcaption class="text-xs text-moss px-3 py-2 border-t border-fog">
                Animación generada con <span class="font-mono">Python (numpy + matplotlib)</span> ·
                <span class="font-mono">tools/sim_interceptacion.py</span>. Simulación <strong>ilustrativa</strong>
                del diseño experimental (no es la política RL entrenada; los valores reales se computan al ejecutar el estudio).
              </figcaption>
            </figure>

            <div class="grid-stats mt-4">
              <div class="card-stat">
                <div class="card-stat__label">Fallo · Clásico (APN)</div>
                <div class="card-stat__value" style="color:#D97706">42.5 m</div>
                <div class="card-stat__desc">no neutraliza la amenaza</div>
              </div>
              <div class="card-stat" style="border-color:#04202C">
                <div class="card-stat__label">Fallo · IA (RL)</div>
                <div class="card-stat__value" style="color:#04202C">3.0 m</div>
                <div class="card-stat__desc">impacto · amenaza neutralizada</div>
              </div>
              <div class="card-stat">
                <div class="card-stat__label">Reducción del fallo</div>
                <div class="card-stat__value">93%</div>
                <div class="card-stat__desc">supera el umbral H1 (≥30%)</div>
              </div>
            </div>
            <p class="text-xs text-moss mt-3">
              El script es reproducible (semilla fija 42). Para regenerar la animación:
              <span class="font-mono">python tools/sim_interceptacion.py</span>.
            </p>
          </div>
        }

        <!-- ════════ B. CALCULADORA ESTADÍSTICA ════════ -->
        @if (active() === 'stats') {
          <div class="animate-tab">
            <div class="mb-4">
              <h2 class="font-display text-lg font-semibold text-forest mb-1">Wilcoxon signed-rank (pareado)</h2>
              <p class="text-sm text-pine">Mete la distancia de fallo de 5 semillas para dos métodos (p. ej. APN vs RL). Calcula W, p-value aproximado y si se rechaza H0 con α=0.05.</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs uppercase tracking-wider text-moss font-mono mb-1 block">APN — fallo (m) · 5 semillas</label>
                <textarea [(ngModel)]="statsA" rows="6"
                          class="w-full rounded-lg border border-fog bg-white p-3 text-sm font-mono text-forest focus:outline-none focus:border-forest"
                          placeholder="42.0
44.5
41.2
43.8
45.1"></textarea>
              </div>
              <div>
                <label class="text-xs uppercase tracking-wider text-moss font-mono mb-1 block">RL — fallo (m) · 5 semillas</label>
                <textarea [(ngModel)]="statsB" rows="6"
                          class="w-full rounded-lg border border-fog bg-white p-3 text-sm font-mono text-forest focus:outline-none focus:border-forest"
                          placeholder="28.1
27.4
29.0
26.8
28.6"></textarea>
              </div>
            </div>
            <button type="button" (click)="runWilcoxon()" class="btn-primary mt-3">Calcular Wilcoxon</button>

            @if (wilcoxonResult(); as r) {
              <div class="mt-4 grid sm:grid-cols-4 gap-2">
                <div class="rounded-lg border border-fog bg-gray-50 p-3">
                  <div class="text-xs uppercase tracking-wider text-moss font-mono">N (no-ceros)</div>
                  <div class="text-forest font-display font-bold text-xl">{{ r.n }}</div>
                </div>
                <div class="rounded-lg border border-fog bg-gray-50 p-3">
                  <div class="text-xs uppercase tracking-wider text-moss font-mono">W estadístico</div>
                  <div class="text-forest font-display font-bold text-xl">{{ r.W }}</div>
                </div>
                <div class="rounded-lg border border-fog bg-gray-50 p-3">
                  <div class="text-xs uppercase tracking-wider text-moss font-mono">p-value aprox.</div>
                  <div class="text-forest font-display font-bold text-xl">{{ r.p.toFixed(4) }}</div>
                </div>
                <div class="rounded-lg p-3"
                     [style.background]="r.p < 0.05 ? '#ECFDF5' : '#FEF2F2'"
                     [style.border]="r.p < 0.05 ? '1px solid #A7F3D0' : '1px solid #FECACA'">
                  <div class="text-xs uppercase tracking-wider font-mono"
                       [style.color]="r.p < 0.05 ? '#059669' : '#DC2626'">
                    α = 0.05
                  </div>
                  <div class="font-display font-bold text-sm mt-1"
                       [style.color]="r.p < 0.05 ? '#059669' : '#DC2626'">
                    {{ r.p < 0.05 ? '✓ Rechaza H0' : '✗ No rechaza H0' }}
                  </div>
                </div>
              </div>
              <p class="mt-3 text-xs text-moss font-mono">Aproximación normal con corrección de continuidad. Para N&lt;25 usa tabla exacta.</p>
            }

            @if (statsError()) {
              <div class="mt-3 rounded-lg p-3 text-sm" style="background:#FEF2F2; color:#DC2626">{{ statsError() }}</div>
            }
          </div>
        }

        <!-- ════════ C. VALIDADOR DE HIPÓTESIS ════════ -->
        @if (active() === 'validator') {
          <div class="animate-tab">
            <div class="mb-4">
              <h2 class="font-display text-lg font-semibold text-forest mb-1">Validador de hipótesis</h2>
              <p class="text-sm text-pine">Escribe tu hipótesis y te la califico contra los 6 criterios de falsabilidad. Las reglas se ejecutan en el navegador.</p>
            </div>
            <textarea [(ngModel)]="hypInput" rows="4"
                      placeholder="Ejemplo: El guiado por aprendizaje por refuerzo reducirá la distancia de fallo en al menos 30% respecto al baseline APN sobre 10 000 escenarios simulados (α=0.05, prueba pareada)."
                      class="w-full rounded-lg border border-fog bg-white p-3 text-sm text-forest focus:outline-none focus:border-forest"></textarea>

            @if (hypInput.trim()) {
              <div class="mt-4 grid sm:grid-cols-2 gap-2">
                @for (r of hypResults(); track r.id) {
                  <div class="rounded-lg p-3 transition-all"
                       [style.background]="r.pass ? '#ECFDF5' : '#FEF2F2'"
                       [style.border]="r.pass ? '1px solid #A7F3D0' : '1px solid #FECACA'">
                    <div class="flex items-start gap-2">
                      <span class="mt-0.5" [style.color]="r.pass ? '#059669' : '#DC2626'">
                        {{ r.pass ? '✓' : '✗' }}
                      </span>
                      <div class="flex-1">
                        <div class="text-sm font-display font-medium"
                             [style.color]="r.pass ? '#059669' : '#DC2626'">{{ r.label }}</div>
                        <div class="text-xs text-pine mt-0.5">{{ r.hint }}</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div class="mt-3 flex items-center gap-3">
                <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div class="h-full transition-all duration-500"
                       [style.background]="hypScore() >= 5 ? '#04202C' : '#9EADA3'"
                       [style.width.%]="(hypScore() / 6) * 100"></div>
                </div>
                <div class="font-display font-bold text-lg"
                     [style.color]="hypScore() >= 5 ? '#04202C' : '#5B7065'">
                  {{ hypScore() }} / 6
                </div>
              </div>
            }
          </div>
        }

        <!-- ════════ D. COMENTARIOS ════════ -->
        @if (active() === 'comments') {
          <div class="animate-tab">
            <div class="mb-4">
              <h2 class="font-display text-lg font-semibold text-forest mb-1">Muro de comentarios</h2>
              <p class="text-sm text-pine">Estos comentarios se guardan EN VIVO en una instancia self-hosted de Supabase, protegida con políticas RLS. Cualquier visitante puede dejar uno.</p>
            </div>

            <form (submit)="submitComment(); $event.preventDefault()" class="rounded-lg border border-fog bg-gray-50 p-4 mb-4">
              <div class="grid sm:grid-cols-3 gap-3 mb-3">
                <input type="text" [(ngModel)]="commentName" name="name"
                       placeholder="Tu nombre (opcional)"
                       class="rounded border border-fog bg-white px-3 py-2 text-sm focus:outline-none focus:border-forest">
                <input type="text" [(ngModel)]="commentMsg" name="msg" required
                       placeholder="Tu comentario sobre la propuesta…"
                       class="sm:col-span-2 rounded border border-fog bg-white px-3 py-2 text-sm focus:outline-none focus:border-forest">
              </div>
              <div class="flex items-center gap-2">
                <button type="submit" class="btn-primary"
                        [disabled]="commentSending() || !commentMsg.trim()">
                  @if (commentSending()) { <span>Enviando…</span> }
                  @else                  { <span>Publicar</span> }
                </button>
                <button type="button" (click)="loadComments()" class="btn-ghost">
                  ↻ Refrescar
                </button>
                @if (commentStatus()) {
                  <span class="text-xs font-mono"
                        [style.color]="commentStatus()!.startsWith('✓') ? '#059669' : '#DC2626'">
                    {{ commentStatus() }}
                  </span>
                }
              </div>
            </form>

            @if (comments().length === 0) {
              <div class="text-center py-8 text-moss text-sm">
                Aún no hay comentarios. Sé el primero.
              </div>
            } @else {
              <div class="stack-sm">
                @for (c of comments(); track c.id) {
                  <article class="rounded-lg border border-fog bg-white p-4">
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="flex items-center gap-2">
                        <div class="grid h-7 w-7 place-items-center rounded-full bg-forest text-white text-xs font-mono">
                          {{ initial(c.name) }}
                        </div>
                        <span class="text-forest font-display font-medium text-sm">{{ c.name || 'Anónimo' }}</span>
                      </div>
                      <span class="text-xs text-moss font-mono">{{ relativeTime(c.created_at) }}</span>
                    </div>
                    <p class="text-sm text-pine leading-relaxed">{{ c.message }}</p>
                  </article>
                }
              </div>
            }
          </div>
        }
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
export class LaboratorioComponent {
  private supabase = inject(SupabaseService);

  protected active = signal<string>('sim');
  readonly tabs: TabItem[] = [
    { id: 'sim',        label: '🛰️ Simulación',    badge: 'Python' },
    { id: 'stats',      label: '📊 Estadística',   badge: 'Wilcoxon' },
    { id: 'validator',  label: '🎯 Hipótesis',     badge: '6 reglas' },
    { id: 'comments',   label: '💬 Comentarios',   badge: 'Supabase' },
  ];

  // ─── B. Wilcoxon ───
  statsA = '42.0\n44.5\n41.2\n43.8\n45.1';
  statsB = '28.1\n27.4\n29.0\n26.8\n28.6';
  protected wilcoxonResult = signal<{ n: number; W: number; p: number } | null>(null);
  protected statsError = signal<string | null>(null);
  runWilcoxon() {
    this.statsError.set(null);
    this.wilcoxonResult.set(null);
    const a = this.parseNumbers(this.statsA);
    const b = this.parseNumbers(this.statsB);
    if (a.length === 0 || b.length === 0) { this.statsError.set('Necesitas al menos 2 valores en cada lista.'); return; }
    if (a.length !== b.length) { this.statsError.set('Las listas deben tener el mismo número de elementos.'); return; }
    // Diferencias no-cero
    type Diff = { d: number; abs: number; rank: number };
    const diffs: Diff[] = a.map((x, i) => ({ d: x - b[i], abs: Math.abs(x - b[i]), rank: 0 })).filter(d => d.d !== 0);
    if (diffs.length < 2) { this.statsError.set('Casi todos los pares son iguales — necesitas más variación.'); return; }
    // Asignar ranks (promediando ties)
    diffs.sort((x, y) => x.abs - y.abs);
    let i = 0;
    while (i < diffs.length) {
      let j = i;
      while (j + 1 < diffs.length && diffs[j + 1].abs === diffs[i].abs) j++;
      const avg = (i + j) / 2 + 1;
      for (let k = i; k <= j; k++) diffs[k].rank = avg;
      i = j + 1;
    }
    const Wplus = diffs.filter(d => d.d > 0).reduce((s, d) => s + d.rank, 0);
    const Wminus = diffs.filter(d => d.d < 0).reduce((s, d) => s + d.rank, 0);
    const W = Math.min(Wplus, Wminus);
    const n = diffs.length;
    // Aproximación normal con corrección de continuidad
    const mean = n * (n + 1) / 4;
    const sd = Math.sqrt(n * (n + 1) * (2 * n + 1) / 24);
    const z = (W + 0.5 - mean) / sd;
    const p = 2 * this.normalCdf(-Math.abs(z));
    this.wilcoxonResult.set({ n, W, p });
  }
  private parseNumbers(input: string): number[] {
    return input.split(/[\s,]+/).map(s => parseFloat(s)).filter(n => !isNaN(n));
  }
  private normalCdf(x: number): number {
    // Abramowitz & Stegun aproximación
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const pdf = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    const c = pdf * (0.319381530 * t - 0.356563782 * t ** 2 + 1.781477937 * t ** 3 - 1.821255978 * t ** 4 + 1.330274429 * t ** 5);
    return x >= 0 ? 1 - c : c;
  }

  // ─── C. Validador de hipótesis ───
  hypInput = '';
  protected hypResults = computed(() => {
    const t = this.hypInput.toLowerCase();
    return [
      { id: 'metric', label: 'Especifica una métrica cuantificable',
        pass: /\b(f1|accuracy|precision|recall|bleu|rouge|auroc|auc|mae|mse|rmse|kappa)\b/i.test(this.hypInput) || /(distancia de fallo|miss distance|δv|delta-?v|latencia|tasa de éxito)/i.test(this.hypInput),
        hint: 'Buscamos: distancia de fallo, Δv, latencia, tasa de éxito (o F1, accuracy, AUROC…).' },
      { id: 'threshold', label: 'Define un umbral cuantitativo',
        pass: /(\d+(\.\d+)?\s*(puntos|pts|%|p))/i.test(this.hypInput) || /(al menos|≥|>=|>|por encima de|por lo menos)\s+\d/i.test(this.hypInput),
        hint: 'Ej: "al menos 8 puntos", "≥0.85", "más del 10%".' },
      { id: 'alpha', label: 'Indica un nivel de significancia',
        pass: /(α|alpha|p\s*[<≤]\s*0?\.\d|p-?value|nivel.*significancia)/i.test(this.hypInput),
        hint: 'Ej: "α=0.05", "p < 0.01".' },
      { id: 'baseline', label: 'Nombra un baseline o comparación',
        pass: /(baseline|comparar|frente a|respecto a|vs\.?|versus|compara)/i.test(t),
        hint: 'Necesitas decir contra QUÉ comparas.' },
      { id: 'verb', label: 'Es una predicción direccional',
        pass: /(mejorar|reducir|aumentar|incrementar|disminuir|superar|mayor|menor)/i.test(t),
        hint: 'Verbos: mejorará, reducirá, superará, incrementará.' },
      { id: 'data', label: 'Especifica el dataset o población',
        pass: /(dataset|corpus|escenario|simulaci|asteroide|intercep|trayectoria|imagen|paciente|usuario|sobre\s+\d+|n\s*=\s*\d+)/i.test(t),
        hint: 'Sobre qué datos/población se prueba (p. ej. escenarios simulados).' },
    ];
  });
  protected hypScore = computed(() => this.hypResults().filter(r => r.pass).length);

  // ─── D. Comments (Supabase) ───
  commentName = '';
  commentMsg = '';
  protected comments = signal<Comment[]>([]);
  protected commentSending = signal(false);
  protected commentStatus = signal<string | null>(null);

  constructor() { this.loadComments(); }

  loadComments() {
    this.supabase.getComments().subscribe({
      next: (data) => this.comments.set(data),
      error: (err) => this.commentStatus.set('✗ ' + (err?.message || 'Error al cargar')),
    });
  }
  submitComment() {
    const msg = this.commentMsg.trim();
    if (!msg) return;
    this.commentSending.set(true);
    this.commentStatus.set(null);
    this.supabase.postComment(this.commentName.trim(), msg).subscribe({
      next: (res) => {
        if (res?.[0]) this.comments.update(arr => [res[0], ...arr]);
        this.commentMsg = '';
        this.commentStatus.set('✓ Publicado');
        this.commentSending.set(false);
        setTimeout(() => this.commentStatus.set(null), 2500);
      },
      error: (err) => {
        this.commentStatus.set('✗ ' + (err?.error?.message || err?.message || 'Error al publicar'));
        this.commentSending.set(false);
      },
    });
  }

  initial(name: string | null): string {
    return (name?.trim()?.[0] || '?').toUpperCase();
  }
  relativeTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const s = Math.floor(diff / 1000);
    if (s < 60) return `hace ${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `hace ${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `hace ${h}h`;
    const d = Math.floor(h / 24);
    return `hace ${d}d`;
  }
}
