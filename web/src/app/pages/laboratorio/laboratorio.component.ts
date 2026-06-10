import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { TabsComponent, TabItem } from '../../shared/interactive/tabs.component';
import { SupabaseService, Comment } from '../../core/supabase.service';

interface HFResult { label: string; score: number; }

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [FormsModule, SectionLayoutComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section-layout
      sectionNumber="🧪"
      sectionTitle="Laboratorio"
      sectionDescription="Demos ejecutables: clasificador en vivo, calculadora estadística, validador de hipótesis y muro de comentarios persistido en Supabase."
      status="in-progress"
      prevLink="/autor"
      prevLabel="Autor"
      [nextLink]="null">

      <article class="card">
        <app-tabs [tabs]="tabs" [active]="active()" (activeChange)="active.set($event)" />

        <!-- ════════ A. CLASIFICADOR ════════ -->
        @if (active() === 'classifier') {
          <div class="animate-tab">
            <div class="mb-4">
              <h2 class="font-display text-lg font-semibold text-forest mb-1">Demo del clasificador</h2>
              <p class="text-sm text-pine">Escribe un texto en español → llamamos a <span class="font-mono">Hate-speech-CNERG/dehatebert-mono-spanish</span> en HuggingFace Inference API y vemos qué dice. Es exactamente el tipo de modelo que mediremos en el experimento.</p>
            </div>
            <textarea [(ngModel)]="hfInput"
                      rows="3"
                      placeholder="Escribe aquí un tuit en español…"
                      class="w-full rounded-lg border border-fog bg-white p-3 text-sm font-mono text-forest focus:outline-none focus:border-forest"></textarea>
            <div class="mt-3 flex items-center gap-2 flex-wrap">
              <button type="button" (click)="classify()"
                      [disabled]="hfLoading() || !hfInput.trim()"
                      class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                @if (hfLoading()) { <span>Clasificando…</span> }
                @else             { <span>Clasificar</span> }
              </button>
              @for (s of hfSamples; track s) {
                <button type="button" (click)="hfInput = s; classify()"
                        class="filter-pill text-xs">
                  {{ s.length > 40 ? s.slice(0,40) + '…' : s }}
                </button>
              }
            </div>

            @if (hfError()) {
              <div class="mt-4 rounded-lg p-3 text-sm" style="background:#FEF2F2; color:#DC2626; border:1px solid #FECACA">
                <strong>Error:</strong> {{ hfError() }}
                @if (hfError()?.includes('loading')) {
                  <div class="mt-1 text-xs">El modelo se está cargando en HF (cold start, ~20s). Vuelve a darle clic.</div>
                }
              </div>
            }

            @if (hfResults().length > 0) {
              <div class="mt-4 stack-sm">
                @for (r of hfResults(); track r.label) {
                  <div class="rounded-lg border border-fog bg-gray-50 p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-forest font-display font-medium">{{ labelEs(r.label) }}</span>
                      <span class="tag">{{ (r.score * 100).toFixed(1) }}%</span>
                    </div>
                    <div class="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-500"
                           [style.background]="r.label.toLowerCase().includes('hate') ? '#DC2626' : '#059669'"
                           [style.width.%]="r.score * 100"></div>
                    </div>
                  </div>
                }
              </div>
              <p class="mt-3 text-xs text-moss font-mono">↑ Resultado real de HuggingFace · este modelo fue entrenado en español peninsular y muestra el shift dialectal del que habla la hipótesis.</p>
            }
          </div>
        }

        <!-- ════════ B. CALCULADORA ESTADÍSTICA ════════ -->
        @if (active() === 'stats') {
          <div class="animate-tab">
            <div class="mb-4">
              <h2 class="font-display text-lg font-semibold text-forest mb-1">Wilcoxon signed-rank (pareado)</h2>
              <p class="text-sm text-pine">Mete F1 de 5 seeds para dos métodos. Calcula W, p-value aproximado y si se rechaza H0 con α=0.05.</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs uppercase tracking-wider text-moss font-mono mb-1 block">Método A (5 seeds)</label>
                <textarea [(ngModel)]="statsA" rows="6"
                          class="w-full rounded-lg border border-fog bg-white p-3 text-sm font-mono text-forest focus:outline-none focus:border-forest"
                          placeholder="0.71
0.72
0.70
0.71
0.73"></textarea>
              </div>
              <div>
                <label class="text-xs uppercase tracking-wider text-moss font-mono mb-1 block">Método B (5 seeds)</label>
                <textarea [(ngModel)]="statsB" rows="6"
                          class="w-full rounded-lg border border-fog bg-white p-3 text-sm font-mono text-forest focus:outline-none focus:border-forest"
                          placeholder="0.82
0.83
0.81
0.84
0.82"></textarea>
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
                      placeholder="Ejemplo: El fine-tuning de RoBERTuito sobre 50k tuits MX incrementará el F1 macro en al menos 8 puntos respecto al baseline zero-shot (α=0.05, prueba pareada)."
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
  private http = inject(HttpClient);
  private supabase = inject(SupabaseService);

  protected active = signal<string>('classifier');
  readonly tabs: TabItem[] = [
    { id: 'classifier', label: '🤖 Clasificador',  badge: 'HuggingFace' },
    { id: 'stats',      label: '📊 Estadística',   badge: 'Wilcoxon' },
    { id: 'validator',  label: '🎯 Hipótesis',     badge: '6 reglas' },
    { id: 'comments',   label: '💬 Comentarios',   badge: 'Supabase' },
  ];

  // ─── A. Classifier (HF Inference API) ───
  hfInput = '';
  protected hfLoading = signal(false);
  protected hfError = signal<string | null>(null);
  protected hfResults = signal<HFResult[]>([]);
  readonly hfSamples = [
    'No me gustó nada el plan que propusieron en clase, qué fastidio.',
    'Eres un imbécil, lárgate de aquí.',
    'Qué bonito día para tomar café con los compas.',
  ];
  labelEs(label: string): string {
    const l = label.toLowerCase();
    if (l.includes('hate') || l === 'label_1') return '🔴 Discurso de odio';
    if (l.includes('non') || l === 'label_0')  return '🟢 No es discurso de odio';
    return label;
  }
  classify() {
    const text = this.hfInput.trim();
    if (!text) return;
    this.hfLoading.set(true);
    this.hfError.set(null);
    this.hfResults.set([]);
    this.http.post<any>(
      'https://api-inference.huggingface.co/models/Hate-speech-CNERG/dehatebert-mono-spanish',
      { inputs: text },
    ).subscribe({
      next: (res) => {
        const arr: HFResult[] = Array.isArray(res?.[0]) ? res[0] : res;
        if (!Array.isArray(arr)) {
          this.hfError.set('Respuesta inesperada de HF');
        } else {
          this.hfResults.set(arr.sort((a, b) => b.score - a.score));
        }
        this.hfLoading.set(false);
      },
      error: (err) => {
        const msg = err?.error?.error || err?.message || 'Error al llamar a HuggingFace';
        this.hfError.set(msg);
        this.hfLoading.set(false);
      },
    });
  }

  // ─── B. Wilcoxon ───
  statsA = '0.71\n0.72\n0.70\n0.71\n0.73';
  statsB = '0.82\n0.83\n0.81\n0.84\n0.82';
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
        pass: /\b(f1|accuracy|precision|recall|bleu|rouge|auroc|auc|mae|mse|rmse|kappa)\b/i.test(this.hypInput),
        hint: 'Buscamos: F1, accuracy, precision, recall, BLEU, AUROC, etc.' },
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
        pass: /(dataset|corpus|tuit|tweet|imagen|paciente|usuario|sobre\s+\d+|n\s*=\s*\d+|mexicano|español|inglés)/i.test(t),
        hint: 'Sobre qué datos/población se prueba.' },
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
