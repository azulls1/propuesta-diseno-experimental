import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CounterComponent } from '../../shared/interactive/animated-counter.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';
import { ModalComponent } from '../../shared/interactive/modal.component';

interface RubricCriterion {
  id: string;
  title: string;
  weight: number;
  description: string;
  max: string[];
  lose: string[];
  tip: string;
}

interface ModuleLink {
  route: string;
  number: string;
  title: string;
  description: string;
  criterio?: string;
}

interface StatCard {
  id: string;
  label: string;
  numeric?: number;
  numericSuffix?: string;
  suffix?: string;
  staticValue?: string;
  desc: string;
  delay?: number;
  highlight?: boolean;
  modalTitle: string;
  modalSubtitle?: string;
  modalCite?: string;
  modalCiteSource?: string;
  modalBody: string;
  modalList?: string[];
  modalRubric?: { label: string; weight: number; highlight?: boolean }[];
  modalCta?: { label: string; route: string };
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CounterComponent, CopyButtonComponent, ModalComponent],
  template: `
    <!-- HERO -->
    <section class="card-hero mb-8">
      <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span class="badge badge-info">Actividad 1</span>
        <span class="badge badge-inactive">Asignatura · Investigación en Inteligencia Artificial</span>
        <span class="badge badge-inactive">Maestría en IA · 1er semestre</span>
      </div>
      <h1 class="card-hero__title">
        Propuesta de diseño experimental
      </h1>
      <p class="card-hero__desc">
        Planificación rigurosa de un experimento científico en IA, siguiendo
        la estructura de la sección <em>Methods</em> de un artículo: hipótesis,
        metodología, muestreo, comparación con baselines y control de sesgos.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a routerLink="/motivacion" class="btn-cta">
          Empezar por Motivación →
        </a>
        <a href="https://github.com/azulls1/propuesta-diseno-experimental"
           target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium border border-white/40 text-white hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.67.8.55 4.57-1.53 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z"/>
          </svg>
          GitHub
        </a>
      </div>
    </section>

    <!-- STATS (animated counters · clickeables → modal) -->
    <section class="grid-stats mb-10">
      @for (s of stats; track s.id) {
        <button type="button"
                (click)="selectedStat.set(s)"
                class="card-stat text-left hover:border-forest hover:shadow-card-hover transition-all cursor-pointer"
                [style.border-color]="s.highlight ? '#04202C' : ''">
          <div class="card-stat__label">{{ s.label }}</div>
          <div class="card-stat__value" [style.color]="s.highlight ? '#04202C' : ''">
            @if (s.numeric != null) {
              <app-counter [value]="s.numeric" [startDelay]="s.delay || 0" [suffix]="s.suffix || ''" />{{ s.numericSuffix || '' }}
            } @else {
              {{ s.staticValue }}
            }
          </div>
          <div class="card-stat__desc">{{ s.desc }}</div>
        </button>
      }
    </section>

    <!-- MODAL: stat detail -->
    @if (selectedStat(); as s) {
      <app-modal [open]="true"
                 [eyebrow]="'Dato · ' + s.label"
                 [title]="s.modalTitle"
                 [subtitle]="s.modalSubtitle"
                 maxWidth="640px"
                 (closeRequest)="selectedStat.set(null)">
        <div class="stack-lg">
          @if (s.modalCite) {
            <div class="rounded-lg border-l-4 border-forest bg-gray-50 p-4 italic text-pine">
              "{{ s.modalCite }}"
              <div class="text-xs not-italic text-moss mt-2 font-mono">— {{ s.modalCiteSource }}</div>
            </div>
          }
          <p class="text-pine leading-relaxed">{{ s.modalBody }}</p>
          @if (s.modalList?.length) {
            <ul class="space-y-2">
              @for (li of s.modalList; track li) {
                <li class="flex gap-2 text-sm text-pine">
                  <span class="text-forest mt-0.5">·</span>
                  <span>{{ li }}</span>
                </li>
              }
            </ul>
          }
          @if (s.modalRubric?.length) {
            <div class="rounded-lg border border-fog overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="text-left text-xs uppercase tracking-wider text-moss font-mono px-3 py-2">Criterio</th>
                    <th class="text-right text-xs uppercase tracking-wider text-moss font-mono px-3 py-2">Peso</th>
                  </tr>
                </thead>
                <tbody>
                  @for (r of s.modalRubric; track r.label) {
                    <tr class="border-t border-fog">
                      <td class="px-3 py-2 text-forest">{{ r.label }}</td>
                      <td class="px-3 py-2 text-right font-mono text-forest font-semibold"
                          [class.text-lg]="r.highlight">{{ r.weight }}%</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
          @if (s.modalCta) {
            <div class="pt-2">
              <a [routerLink]="s.modalCta.route" (click)="selectedStat.set(null)" class="btn-primary">
                {{ s.modalCta.label }}
              </a>
            </div>
          }
        </div>
      </app-modal>
    }

    <!-- RÚBRICA -->
    <section class="mb-10">
      <header class="page-header">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span class="badge-forest mb-3 inline-flex">Rúbrica</span>
            <h2 class="page-header__title">Cómo se evaluará el trabajo</h2>
            <p class="page-header__desc">Click en cada criterio para ver cómo maximizarlo y cómo se pierden puntos.</p>
          </div>
        </div>
      </header>

      <div class="grid-cards">
        @for (c of criteria; track c.id) {
          <button type="button" (click)="selectedCriterion.set(c)"
                  class="card card-hover text-left w-full">
            <div class="flex items-start justify-between gap-4 mb-2">
              <div>
                <div class="text-xs uppercase tracking-wider text-moss font-mono">{{ c.id }}</div>
                <h3 class="font-display text-lg font-semibold text-forest mt-1">{{ c.title }}</h3>
              </div>
              <div class="text-right">
                <div class="font-display font-bold text-2xl"
                     [style.color]="c.weight >= 40 ? '#04202C' : '#5B7065'">
                  {{ c.weight }}%
                </div>
              </div>
            </div>
            <p class="text-sm text-pine leading-relaxed">{{ c.description }}</p>
            <div class="mt-3 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div class="h-full rounded-full bg-forest" [style.width.%]="c.weight"></div>
            </div>
            <div class="mt-3 flex items-center text-xs text-moss font-mono gap-1">
              <span>click para ver detalle</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="w-3 h-3">
                <path d="m9 5 7 7-7 7"/>
              </svg>
            </div>
          </button>
        }
      </div>
    </section>

    <!-- MODAL: criterio detail -->
    @if (selectedCriterion(); as c) {
      <app-modal [open]="true"
                 [eyebrow]="c.id + ' · ' + c.weight + '%'"
                 [title]="c.title"
                 [subtitle]="c.description"
                 maxWidth="720px"
                 (closeRequest)="selectedCriterion.set(null)">
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="rounded-lg p-4" style="background:#ECFDF5; border: 1px solid #A7F3D0">
            <div class="text-xs uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5" style="color:#059669">
              <span>↑</span> Cómo maximizar
            </div>
            <ul class="text-sm space-y-2 text-pine">
              @for (p of c.max; track p) {
                <li class="flex gap-2"><span style="color:#059669">✓</span><span>{{ p }}</span></li>
              }
            </ul>
          </div>
          <div class="rounded-lg p-4" style="background:#FEF2F2; border: 1px solid #FECACA">
            <div class="text-xs uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5" style="color:#DC2626">
              <span>↓</span> Cómo perder puntos
            </div>
            <ul class="text-sm space-y-2 text-pine">
              @for (p of c.lose; track p) {
                <li class="flex gap-2"><span style="color:#DC2626">✗</span><span>{{ p }}</span></li>
              }
            </ul>
          </div>
        </div>
        <div class="mt-5 rounded-lg border border-fog bg-gray-50 p-4">
          <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Tip estratégico</div>
          <p class="text-sm text-pine leading-relaxed">{{ c.tip }}</p>
        </div>
      </app-modal>
    }

    <!-- MÓDULOS DEL SITIO -->
    <section class="mb-10">
      <header class="page-header">
        <span class="badge-forest mb-3 inline-flex">Estructura</span>
        <h2 class="page-header__title">Módulos del sitio</h2>
        <p class="page-header__desc">Las secciones del entregable y los módulos de soporte del proyecto.</p>
      </header>

      <div class="grid-cards">
        @for (m of modules; track m.route) {
          <a [routerLink]="m.route" class="card card-hover group">
            <div class="flex items-start gap-3">
              <div class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest text-white font-mono text-sm font-semibold">
                {{ m.number }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-display text-base font-semibold text-forest group-hover:text-pine transition-colors">
                    {{ m.title }}
                  </h3>
                  @if (m.criterio) {
                    <span class="chip-mono">{{ m.criterio }}</span>
                  }
                </div>
                <p class="mt-1 text-sm text-pine leading-relaxed">{{ m.description }}</p>
              </div>
            </div>
          </a>
        }
      </div>
    </section>

    <!-- META INFO -->
    <section class="card-section">
      <div class="grid form-grid--3 gap-6">
        <div>
          <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Formato</div>
          <div class="font-display text-forest font-semibold">Calibri 12 · interlineado 1.5</div>
          <div class="text-sm text-pine">Máximo 5 páginas</div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Stack</div>
          <div class="font-display text-forest font-semibold">Angular 19 · Tailwind 4 · Forest DS</div>
          <div class="text-sm text-pine">nginx · Supabase · Docker · Traefik</div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Despliegue</div>
          <div class="flex items-center gap-2 mb-1">
            <div class="font-display text-forest font-semibold font-mono text-sm">propuesta-diseno-experimental.iagentek.com.mx</div>
            <app-copy text="https://propuesta-diseno-experimental.iagentek.com.mx" label="" />
          </div>
          <div class="text-sm text-pine">Swarm + Traefik + Let's Encrypt</div>
        </div>
      </div>
    </section>
  `,
})
export class LandingComponent {
  protected selectedCriterion = signal<RubricCriterion | null>(null);
  protected selectedStat = signal<StatCard | null>(null);

  readonly stats: StatCard[] = [
    {
      id: 'pages', label: 'Páginas máx.', numeric: 5, delay: 0,
      desc: 'Calibri 12 · 1.5',
      modalTitle: '5 páginas máximas',
      modalSubtitle: 'Cómo distribuirlas según el plan de redacción',
      modalCite: 'Extensión máxima: 5 páginas, fuente Calibri 12 e interlineado 1,5.',
      modalCiteSource: 'Enunciado de la Actividad 1 (mexmiart07_act2.docx)',
      modalBody: 'El límite es estricto. Toda la propuesta científica debe caber en 5 páginas. Esto obliga a ser sintético sin sacrificar rigor. Aquí el reparto que recomendamos:',
      modalList: [
        '§ 1 Introducción y motivación → 0.75 pg',
        '§ 2 Hipótesis → 0.5 pg',
        '§ 3 Metodología (la más larga, 6 sub-secciones) → 1.75 pg',
        '§ 4 Comparación con baselines → 0.75 pg',
        '§ 5 Resultados esperados → 0.5 pg',
        '§ 6 Referencias → 0.75 pg',
      ],
      modalCta: { label: 'Ver plan de redacción completo →', route: '/redaccion' },
    },
    {
      id: 'rubric', label: 'Criterios rúbrica', numeric: 4, delay: 100,
      desc: '10 puntos · 100%',
      modalTitle: '4 criterios · 10 puntos · 100%',
      modalSubtitle: 'Cómo se distribuye la calificación',
      modalBody: 'El maestro evalúa con 4 criterios cuya suma da 10 puntos (100%). El reparto NO es uniforme — el Criterio 3 (rigor) pesa el doble que cualquier otro.',
      modalRubric: [
        { label: 'C1 — Motivación argumentada',                 weight: 20 },
        { label: 'C2 — Hipótesis + experimentos que la refuten', weight: 20 },
        { label: 'C3 — Rigor del experimento',                   weight: 40, highlight: true },
        { label: 'C4 — Redacción y presentación',                weight: 20 },
      ],
      modalCta: { label: 'Ver rúbrica detallada →', route: '/redaccion' },
    },
    {
      id: 'rigor', label: 'Peso del rigor', numeric: 40, suffix: '%', delay: 200,
      desc: 'Criterio 3 (el más alto)',
      modalTitle: 'Rigor metodológico · 40%',
      modalSubtitle: 'El criterio más pesado de la rúbrica',
      modalCite: 'Formalidad y rigor del experimento planteado, equilibrio en la población seleccionada, calidad del muestreo, evitación de sesgos, ¿las pruebas son suficientes para validar o no la hipótesis?',
      modalCiteSource: 'Descripción del Criterio 3 en el enunciado',
      modalBody: 'El C3 vale el doble que cualquier otro criterio. Si te falta tiempo, sacrifica volumen en otras secciones para que ésta brille. Cinco sub-aspectos lo componen:',
      modalList: [
        'Formalidad y rigor del experimento',
        'Equilibrio en la población seleccionada',
        'Calidad del muestreo',
        'Evitación de sesgos',
        '¿Las pruebas son suficientes para validar o refutar la hipótesis?',
      ],
      modalCta: { label: 'Ir a Metodología →', route: '/metodologia' },
    },
    {
      id: 'goal', label: 'Calificación obj.', numeric: 10, numericSuffix: '/10', delay: 300,
      desc: 'Sin descuentos',
      modalTitle: 'Calificación objetivo: 10/10',
      modalSubtitle: 'La estrategia para no perder puntos',
      modalBody: 'Apuntar a 10/10 obliga a cuidar las cuatro métricas, no solo el C3. Lo que las pierde más comúnmente:',
      modalList: [
        'C1: motivación sin referencias reales — pierdes 5-10 pts',
        'C2: hipótesis no falsable — pierdes 5-10 pts',
        'C3: omitir la subsección de sesgos — pierdes 10-15 pts',
        'C4: pasarte de 5 páginas o faltas de ortografía — pierdes 5-10 pts',
      ],
      modalCta: { label: 'Checklist pre-entrega →', route: '/entregables' },
    },
  ];

  readonly criteria: RubricCriterion[] = [
    { id: 'Criterio 1', title: 'Motivación argumentada', weight: 20,
      description: 'Problema real, sustentado en literatura, parcialmente resuelto y susceptible de mejora.',
      max: ['Cita 2-3 papers reales (Google Scholar)', 'Cuantifica el problema con números', 'Identifica el hueco específico', 'Conecta motivación con hipótesis'],
      lose: ['Texto genérico sin referencias', 'Problema demasiado amplio', 'Sin estadísticas del problema', 'Desconexión con hipótesis'],
      tip: 'Invierte tiempo en Google Scholar antes de escribir. Una motivación con 3 papers reales y un número concreto vale mucho más que dos páginas de generalidades.' },
    { id: 'Criterio 2', title: 'Hipótesis y experimentos refutables', weight: 20,
      description: 'Hipótesis falsable, con variables y métricas claras. Experimentos que puedan refutarla.',
      max: ['Hipótesis en una frase clara', 'Incluye H0 y H1 explícitas', 'Define umbral cuantitativo', 'Indica qué resultado la refutaría'],
      lose: ['Hipótesis vaga ("será mejor")', 'No falsable', 'Sin métrica concreta', 'Experimento que no testea la hipótesis'],
      tip: 'Pregúntate: "¿qué resultado haría que tirara la hipótesis a la basura?" Si no tienes respuesta, no es falsable.' },
    { id: 'Criterio 3', title: 'Rigor del experimento', weight: 40,
      description: 'Formalidad, equilibrio poblacional, calidad del muestreo, evitación de sesgos.',
      max: ['Documenta cada decisión con justificación', 'Sección dedicada a sesgos', 'Justifica tamaño muestral', 'Especifica pruebas estadísticas + α', 'Discute limitaciones'],
      lose: ['Sin versiones/seeds/hp', 'Muestreo no justificado', 'Sin mención de sesgos', 'Sin análisis estadístico', 'Comparaciones insuficientes'],
      tip: 'Este criterio vale el doble. Si te falta tiempo, sacrifica volumen en otras secciones para que ésta brille. Sección dedicada de sesgos = diferencial.' },
    { id: 'Criterio 4', title: 'Redacción y presentación', weight: 20,
      description: 'Claridad, estructura tipo paper, tablas numeradas, citación consistente.',
      max: ['Estructura tipo paper numerada', 'Tablas/figuras con descripción', 'Citas en el texto', 'Una idea por párrafo', 'Tiempos y voz consistentes'],
      lose: ['Exceder 5 páginas', 'Faltas de ortografía', 'Sin referencias', 'Formato distinto al pedido', 'Tono coloquial'],
      tip: '20% por redacción es mucho — no lo dejes para el último día. Lee tu propio texto en voz alta antes de entregar.' },
  ];

  readonly modules: ModuleLink[] = [
    { route: '/motivacion',    number: '01', title: 'Motivación',    criterio: 'C1',
      description: 'Problema real en IA y hueco de investigación.' },
    { route: '/hipotesis',     number: '02', title: 'Hipótesis',     criterio: 'C2',
      description: 'Afirmación falsable con variables y métricas.' },
    { route: '/metodologia',   number: '03', title: 'Metodología',   criterio: 'C3',
      description: 'Diseño, datos, muestreo, train/val/test, sesgos.' },
    { route: '/comparacion',   number: '04', title: 'Comparación',
      description: 'Baselines y estudios previos contra los que medimos.' },
    { route: '/redaccion',     number: '05', title: 'Redacción',     criterio: 'C4',
      description: 'Estructura del documento académico final.' },
    { route: '/datasets',      number: '06', title: 'Datasets',
      description: 'Origen, preprocesamiento y particiones de datos.' },
    { route: '/baselines',     number: '07', title: 'Baselines',
      description: 'Métodos de comparación y estado del arte.' },
    { route: '/entregables',   number: '08', title: 'Entregables',
      description: 'Documento .docx, repositorio y sitio web.' },
    { route: '/como-funciona', number: '09', title: 'Cómo funciona',
      description: 'Stack, despliegue y arquitectura del sitio.' },
    { route: '/autor',         number: '10', title: 'Autor',
      description: 'Quién está detrás de la propuesta.' },
    { route: '/laboratorio',   number: '11', title: 'Laboratorio',
      description: 'Demos en vivo: clasificador HF, calculadora Wilcoxon y validador.' },
  ];
}
