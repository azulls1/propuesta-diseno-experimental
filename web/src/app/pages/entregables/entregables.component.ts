import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';

type Criterio = 'C1' | 'C2' | 'C3' | 'C4' | '—';

interface EntregableRow {
  criterio: Criterio;
  tipo: 'Reporte PDF' | 'Reporte MD' | 'ZIP completo' | 'Wiki' | 'Enunciado' | 'Manifest';
  nombre: string;
  detalle: string;
  url: string;
  size: string;
  sha256?: string;
  pesoRubrica?: string;
}

interface Manifest {
  generated_at: string;
  zip: { name: string; size: number; sha256: string };
  contents: { path: string; sha256: string }[];
}

const COLOR: Record<Criterio, string> = {
  C1: '#2563EB', C2: '#059669', C3: '#04202C', C4: '#7C3AED', '—': '#9EADA3',
};

@Component({
  selector: 'app-entregables',
  standalone: true,
  imports: [SectionLayoutComponent, ChecklistComponent, CopyButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section-layout
      sectionNumber="08"
      sectionTitle="Entregables"
      sectionDescription="Catálogo único de archivos físicos que componen la entrega. Cada uno indica criterio de rúbrica, tamaño y hash SHA-256 para verificación."
      status="in-progress"
      prevLink="/baselines"
      prevLabel="Baselines"
      nextLink="/como-funciona"
      nextLabel="Cómo funciona">

      <div class="stack-xl">

        <!-- HERO DE ENTREGABLES -->
        <article class="card-hero">
          <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span class="badge badge-info">Entregable principal</span>
            @if (manifest()) {
              <span class="badge badge-inactive">Generado · {{ formatDate(manifest()!.generated_at) }}</span>
            }
          </div>
          <h2 class="card-hero__title">Descarga toda la entrega</h2>
          <p class="card-hero__desc">
            Un ZIP único que contiene el reporte PDF (5 páginas), el desglose
            del enunciado (método Karpathy), el .docx original del maestro y la
            descripción del sitio web.
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="downloads/entregable-actividad-1-samuel-hernandez.zip"
               download class="btn-cta">
              ⇩ Descargar entregable completo (ZIP)
            </a>
            <a href="downloads/reporte.pdf"
               target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium border border-white/40 text-white hover:bg-white/10 transition-colors">
              ↗ Solo el reporte PDF
            </a>
          </div>
          @if (manifest()) {
            <div class="mt-6 inline-flex items-center gap-2 text-xs font-mono text-white/70">
              <span>SHA-256 ZIP:</span>
              <span class="text-white/90 truncate max-w-xs sm:max-w-sm">{{ manifest()!.zip.sha256 }}</span>
            </div>
          }
        </article>

        <!-- STATS DEL ENTREGABLE -->
        <div class="grid-stats">
          <div class="card-stat">
            <div class="card-stat__label">Reporte PDF</div>
            <div class="card-stat__value">5</div>
            <div class="card-stat__desc">páginas exactas</div>
          </div>
          <div class="card-stat">
            <div class="card-stat__label">Criterios cubiertos</div>
            <div class="card-stat__value">4/4</div>
            <div class="card-stat__desc">100% de la rúbrica</div>
          </div>
          <div class="card-stat" style="border-color: #04202C">
            <div class="card-stat__label">Total ZIP</div>
            <div class="card-stat__value" style="color:#04202C">{{ manifest() ? formatBytes(manifest()!.zip.size) : '—' }}</div>
            <div class="card-stat__desc">comprimido</div>
          </div>
          <div class="card-stat">
            <div class="card-stat__label">Archivos</div>
            <div class="card-stat__value">{{ manifest()?.contents?.length || 0 }}</div>
            <div class="card-stat__desc">en el ZIP</div>
          </div>
        </div>

        <!-- CATÁLOGO -->
        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Catálogo de archivos</h2>
            <span class="text-xs text-moss font-mono">filtra por criterio →</span>
          </div>

          <!-- Filter chips -->
          <div class="filter-pills mb-4">
            @for (f of filters; track f.id) {
              <button type="button"
                      (click)="activeFilter.set(f.id)"
                      class="filter-pill"
                      [class.active]="activeFilter() === f.id">
                {{ f.label }}
                <span class="ml-1 text-[10px] opacity-70">{{ countFor(f.id) }}</span>
              </button>
            }
          </div>

          <!-- Catálogo -->
          <div class="stack-sm">
            @for (r of filteredRows(); track r.url) {
              <div class="rounded-lg border border-fog bg-white p-4 hover:border-forest hover:shadow-card transition-all">
                <div class="flex items-start gap-3 flex-wrap sm:flex-nowrap">
                  <!-- Badge criterio -->
                  <span class="rounded px-2 py-1 text-xs font-mono font-semibold text-white shrink-0"
                        [style.background]="getColor(r.criterio)">
                    {{ r.criterio }}
                  </span>
                  <!-- Detalle -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-forest font-display font-medium">{{ r.nombre }}</span>
                      <span class="tag">{{ r.tipo }}</span>
                      @if (r.pesoRubrica) {
                        <span class="text-xs text-moss font-mono">· {{ r.pesoRubrica }}</span>
                      }
                    </div>
                    <p class="text-sm text-pine mt-1">{{ r.detalle }}</p>
                    @if (r.sha256) {
                      <div class="flex items-center gap-2 mt-1.5">
                        <span class="text-[10px] uppercase tracking-wider text-moss font-mono">SHA-256:</span>
                        <span class="text-[10px] font-mono text-pine truncate">{{ r.sha256.slice(0, 16) }}…</span>
                        <app-copy [text]="r.sha256" label="" />
                      </div>
                    }
                  </div>
                  <!-- Acciones -->
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-xs text-moss font-mono hidden sm:inline">{{ r.size }}</span>
                    <a [href]="r.url" download
                       class="btn-primary text-xs px-3 py-1.5">
                      ⇩ Descargar
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </article>

        <!-- CHECKLIST PRE-ENTREGA -->
        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Checklist pre-entrega</h2>
            <span class="text-xs text-moss font-mono">persiste localmente →</span>
          </div>
          <p class="text-sm text-pine mb-4">Antes de subir al aula virtual, asegúrate de marcar estos puntos.</p>
          <app-checklist storageKey="entregables-pre-entrega" [initialItems]="preEntregaItems" />
        </article>

        <!-- COMANDOS DE REGENERACIÓN -->
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Cómo regenerar todo</h2>
          <p class="text-sm text-pine mb-3">
            Los archivos se generan con scripts versionados en el repo. Si cambias el reporte.md,
            corre estos comandos en el VPS para actualizar PDF y ZIP:
          </p>
          <div class="stack-sm">
            <div class="rounded-lg border border-fog bg-gray-50 p-3 flex items-center gap-3">
              <div class="flex-1 font-mono text-xs text-evergreen overflow-x-auto">bash tools/build_pdf.sh</div>
              <app-copy text="bash tools/build_pdf.sh" label="" />
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-3 flex items-center gap-3">
              <div class="flex-1 font-mono text-xs text-evergreen overflow-x-auto">python3 tools/build_entregable_zip.py</div>
              <app-copy text="python3 tools/build_entregable_zip.py" label="" />
            </div>
          </div>
          <p class="text-xs text-moss mt-3">
            build_pdf.sh usa pandoc + xelatex en Docker. build_entregable_zip.py arma el ZIP con LEEME que mapea a rúbrica.
          </p>
        </article>

      </div>
    </app-section-layout>
  `,
})
export class EntregablesComponent implements OnInit {
  private http = inject(HttpClient);

  protected manifest = signal<Manifest | null>(null);
  protected activeFilter = signal<Criterio | 'all'>('all');

  ngOnInit() {
    this.http.get<Manifest>('downloads/manifest.json').subscribe({
      next: (m) => this.manifest.set(m),
      error: () => this.manifest.set(null),
    });
  }

  readonly rows: EntregableRow[] = [
    {
      criterio: 'C3', tipo: 'Reporte PDF',
      nombre: 'reporte.pdf',
      detalle: 'Propuesta académica completa: introducción, hipótesis, metodología (40% de la rúbrica), comparación y referencias.',
      url: 'downloads/reporte.pdf',
      size: '58 KB',
      pesoRubrica: 'Cubre C1+C2+C3+C4',
    },
    {
      criterio: '—', tipo: 'Reporte MD',
      nombre: 'reporte.md (fuente)',
      detalle: 'Markdown fuente del reporte. Editar aquí para regenerar el PDF.',
      url: 'downloads/reporte.pdf',
      size: '11 KB',
    },
    {
      criterio: '—', tipo: 'ZIP completo',
      nombre: 'entregable-actividad-1-samuel-hernandez.zip',
      detalle: 'Bundle final con reporte, wiki, enunciado original y README del sitio. Incluye LEEME.md con mapeo a rúbrica + hashes de cada archivo.',
      url: 'downloads/entregable-actividad-1-samuel-hernandez.zip',
      size: '127 KB',
    },
    {
      criterio: 'C1', tipo: 'Wiki',
      nombre: 'Wiki: Motivación (req 1)',
      detalle: 'Material de apoyo para entender el Criterio 1. Método LLM-wiki Karpathy.',
      url: 'https://github.com/azulls1/propuesta-diseno-experimental/blob/main/docs/wiki/03-req-1-hipotesis.md',
      size: '4 KB',
      pesoRubrica: '20%',
    },
    {
      criterio: 'C2', tipo: 'Wiki',
      nombre: 'Wiki: Hipótesis (req 1)',
      detalle: 'Análisis del Criterio 2 — falsabilidad y plantilla aplicada.',
      url: 'https://github.com/azulls1/propuesta-diseno-experimental/blob/main/docs/wiki/03-req-1-hipotesis.md',
      size: '4 KB',
      pesoRubrica: '20%',
    },
    {
      criterio: 'C3', tipo: 'Wiki',
      nombre: 'Wiki: Metodología + Train/Val + Sesgos',
      detalle: 'Análisis profundo del Criterio 3 — el más pesado (40%).',
      url: 'https://github.com/azulls1/propuesta-diseno-experimental/blob/main/docs/wiki/04-req-2-metodologia.md',
      size: '12 KB',
      pesoRubrica: '40%',
    },
    {
      criterio: 'C4', tipo: 'Wiki',
      nombre: 'Wiki: Plan de redacción + Checklist final',
      detalle: 'Estructura de 5 páginas + reglas de estilo para el Criterio 4.',
      url: 'https://github.com/azulls1/propuesta-diseno-experimental/blob/main/docs/wiki/09-plan-redaccion.md',
      size: '10 KB',
      pesoRubrica: '20%',
    },
    {
      criterio: '—', tipo: 'Enunciado',
      nombre: 'mexmiart07_act2.docx',
      detalle: 'Documento original del maestro (referencia de los requisitos).',
      url: 'https://github.com/azulls1/propuesta-diseno-experimental/raw/main/docs/enunciado/mexmiart07_act2.docx',
      size: '42 KB',
    },
    {
      criterio: '—', tipo: 'Manifest',
      nombre: 'manifest.json',
      detalle: 'Listado completo de archivos en el ZIP + sus hashes SHA-256, para verificación de integridad.',
      url: 'downloads/manifest.json',
      size: '3 KB',
    },
  ];

  readonly filters: { id: Criterio | 'all'; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'C1',  label: 'C1 · Motivación' },
    { id: 'C2',  label: 'C2 · Hipótesis' },
    { id: 'C3',  label: 'C3 · Rigor (40%)' },
    { id: 'C4',  label: 'C4 · Redacción' },
    { id: '—',   label: 'Material de apoyo' },
  ];

  protected filteredRows = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.rows : this.rows.filter(r => r.criterio === f);
  });

  countFor(f: Criterio | 'all'): number {
    return f === 'all' ? this.rows.length : this.rows.filter(r => r.criterio === f).length;
  }

  getColor(c: Criterio): string { return COLOR[c]; }

  formatBytes(b: number): string {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
    return `${(b / 1024 / 1024).toFixed(1)} MB`;
  }
  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  }

  readonly preEntregaItems: ChecklistItem[] = [
    { text: 'Verifiqué que el PDF tiene exactamente 5 páginas o menos.', done: false },
    { text: 'Revisé que la portada incluye autoría, asignatura y fecha.',  done: false },
    { text: 'El SHA-256 del ZIP coincide con el del manifest.json.',       done: false },
    { text: 'Las referencias bibliográficas son reales (verificadas en Scholar).', done: false },
    { text: 'El documento usa Calibri/equivalente y interlineado 1.5.',   done: false },
    { text: 'No hay errores de ortografía (corrector activado).',          done: false },
    { text: 'Subí el ZIP al aula virtual y obtuve confirmación.',          done: false },
  ];
}
