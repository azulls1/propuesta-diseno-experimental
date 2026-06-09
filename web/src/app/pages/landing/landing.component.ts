import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CounterComponent } from '../../shared/interactive/animated-counter.component';

interface RubricCriterion {
  id: string;
  title: string;
  weight: number;
  description: string;
}

interface ModuleLink {
  route: string;
  number: string;
  title: string;
  description: string;
  criterio?: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CounterComponent],
  template: `
    <!-- HERO -->
    <section class="card-hero mb-8">
      <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span class="badge badge-info">Actividad 1</span>
        <span class="badge badge-inactive">Maestría en IA</span>
        <span class="badge badge-inactive">1er semestre</span>
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

    <!-- STATS (animated counters) -->
    <section class="grid-stats mb-10">
      <div class="card-stat">
        <div class="card-stat__label">Páginas máx.</div>
        <div class="card-stat__value"><app-counter [value]="5" /></div>
        <div class="card-stat__desc">Calibri 12 · 1.5</div>
      </div>
      <div class="card-stat">
        <div class="card-stat__label">Criterios rúbrica</div>
        <div class="card-stat__value"><app-counter [value]="4" [startDelay]="100" /></div>
        <div class="card-stat__desc">10 puntos · 100%</div>
      </div>
      <div class="card-stat" style="border-color: #04202C">
        <div class="card-stat__label">Peso del rigor</div>
        <div class="card-stat__value" style="color:#04202C">
          <app-counter [value]="40" [startDelay]="200" suffix="%" />
        </div>
        <div class="card-stat__desc">Criterio 3 (el más alto)</div>
      </div>
      <div class="card-stat">
        <div class="card-stat__label">Calificación obj.</div>
        <div class="card-stat__value">
          <app-counter [value]="10" [startDelay]="300" />/10
        </div>
        <div class="card-stat__desc">Sin descuentos</div>
      </div>
    </section>

    <!-- RÚBRICA -->
    <section class="mb-10">
      <header class="page-header">
        <span class="badge-forest mb-3 inline-flex">Rúbrica</span>
        <h2 class="page-header__title">Cómo se evaluará el trabajo</h2>
        <p class="page-header__desc">Cuatro criterios. El rigor metodológico pesa el doble que los demás.</p>
      </header>

      <div class="grid-cards">
        @for (c of criteria; track c.id) {
          <article class="card">
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
          </article>
        }
      </div>
    </section>

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
          <div class="text-sm text-pine">FastAPI · Supabase · Redis · Celery (en construcción)</div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Despliegue</div>
          <div class="font-display text-forest font-semibold font-mono text-sm">propuesta-diseno-experimental</div>
          <div class="text-sm text-pine">.iagentek.com.mx · Swarm + Traefik</div>
        </div>
      </div>
    </section>
  `,
})
export class LandingComponent {
  readonly criteria: RubricCriterion[] = [
    { id: 'Criterio 1', title: 'Motivación argumentada', weight: 20,
      description: 'Problema real, sustentado en literatura, parcialmente resuelto y susceptible de mejora.' },
    { id: 'Criterio 2', title: 'Hipótesis y experimentos refutables', weight: 20,
      description: 'Hipótesis falsable, con variables y métricas claras. Experimentos que puedan refutarla.' },
    { id: 'Criterio 3', title: 'Rigor del experimento', weight: 40,
      description: 'Formalidad, equilibrio poblacional, calidad del muestreo, evitación de sesgos.' },
    { id: 'Criterio 4', title: 'Redacción y presentación', weight: 20,
      description: 'Claridad, estructura tipo paper, tablas numeradas, citación consistente.' },
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
  ];
}
