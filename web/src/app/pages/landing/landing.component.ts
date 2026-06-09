import { Component } from '@angular/core';

interface RubricCriterion {
  id: string;
  title: string;
  weight: number;
  description: string;
}

interface Section {
  id: string;
  number: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
}

@Component({
  selector: 'app-landing',
  standalone: true,
  template: `
    <!-- HERO -->
    <section class="relative overflow-hidden">
      <div class="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div class="flex flex-wrap items-center gap-2 mb-6">
          <span class="badge-brand">Actividad 1</span>
          <span class="chip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-3 w-3 text-brand-400">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            Maestría en IA · 1er semestre
          </span>
          <span class="chip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-3 w-3 text-brand-400">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/>
            </svg>
            Investigación en IA
          </span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Propuesta de
          <span class="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-200 bg-clip-text text-transparent">
            diseño experimental
          </span>
        </h1>

        <p class="mt-6 max-w-2xl text-lg text-ink-300 leading-relaxed">
          Planificación rigurosa de un experimento científico en Inteligencia Artificial,
          siguiendo la estructura de la sección <em>Methods</em> de un artículo: hipótesis,
          metodología, muestreo, comparación con baselines y control de sesgos.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a href="#secciones" class="btn-primary">
            Explorar secciones
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m12 5 7 7-7 7M5 12h14"/>
            </svg>
          </a>
          <a href="https://github.com/azulls1/propuesta-diseno-experimental"
             target="_blank" rel="noopener" class="btn-ghost">
            Ver repositorio
          </a>
        </div>

        <!-- Stats -->
        <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          <div class="card">
            <div class="text-2xl font-bold text-white">5</div>
            <div class="text-xs uppercase tracking-wider text-ink-400 mt-1">páginas máx.</div>
          </div>
          <div class="card">
            <div class="text-2xl font-bold text-white">4</div>
            <div class="text-xs uppercase tracking-wider text-ink-400 mt-1">criterios rúbrica</div>
          </div>
          <div class="card">
            <div class="text-2xl font-bold text-brand-400">40<span class="text-base">%</span></div>
            <div class="text-xs uppercase tracking-wider text-ink-400 mt-1">peso del rigor</div>
          </div>
          <div class="card">
            <div class="text-2xl font-bold text-white">10<span class="text-base">/10</span></div>
            <div class="text-xs uppercase tracking-wider text-ink-400 mt-1">calificación obj.</div>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- RÚBRICA -->
    <section id="rubrica" class="mx-auto max-w-7xl px-6 py-16">
      <div class="mb-10">
        <span class="badge-brand">Rúbrica</span>
        <h2 class="mt-3 text-3xl font-bold">Cómo se evaluará el trabajo</h2>
        <p class="mt-2 text-ink-400 max-w-2xl">
          Cuatro criterios definidos por el maestro. El rigor metodológico pesa el doble que los demás.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        @for (criterion of criteria; track criterion.id) {
          <div class="card card-hover">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-xs uppercase tracking-wider text-ink-500">{{ criterion.id }}</div>
                <h3 class="mt-1 text-lg">{{ criterion.title }}</h3>
              </div>
              <div class="text-right shrink-0">
                <div class="text-2xl font-bold"
                  [class.text-brand-400]="criterion.weight >= 40"
                  [class.text-white]="criterion.weight < 40">
                  {{ criterion.weight }}<span class="text-sm">%</span>
                </div>
              </div>
            </div>
            <p class="mt-3 text-sm text-ink-400 leading-relaxed">{{ criterion.description }}</p>

            <!-- Weight bar -->
            <div class="mt-4 h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
                   [style.width.%]="criterion.weight"></div>
            </div>
          </div>
        }
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- SECCIONES DEL DOCUMENTO -->
    <section id="secciones" class="mx-auto max-w-7xl px-6 py-16">
      <div class="mb-10">
        <span class="badge-brand">Estructura</span>
        <h2 class="mt-3 text-3xl font-bold">Secciones de la propuesta</h2>
        <p class="mt-2 text-ink-400 max-w-2xl">
          Las cuatro piezas obligatorias del entregable, organizadas como en la sección <em>Methods</em> de un paper.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        @for (section of sections; track section.id) {
          <a [href]="'#' + section.id" class="card card-hover group">
            <div class="flex items-start gap-4">
              <div class="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-500/10 ring-1 ring-brand-500/20 text-brand-300 font-mono font-semibold">
                {{ section.number }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-lg group-hover:text-brand-300 transition-colors">{{ section.title }}</h3>
                  @switch (section.status) {
                    @case ('done')        { <span class="chip text-accent-success border-accent-success/30">Listo</span> }
                    @case ('in-progress') { <span class="chip text-accent-warn border-accent-warn/30">En curso</span> }
                    @default              { <span class="chip">Pendiente</span> }
                  }
                </div>
                <p class="mt-2 text-sm text-ink-400 leading-relaxed">{{ section.description }}</p>
              </div>
            </div>
          </a>
        }
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- META INFO -->
    <section class="mx-auto max-w-7xl px-6 py-16">
      <div class="card">
        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <div class="text-xs uppercase tracking-wider text-ink-500">Formato</div>
            <div class="mt-1 text-white">Calibri 12 · interlineado 1.5</div>
            <div class="text-sm text-ink-400">Máximo 5 páginas</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-ink-500">Stack del sitio</div>
            <div class="mt-1 text-white">Angular 19 · Tailwind 3</div>
            <div class="text-sm text-ink-400">FastAPI · Supabase · Redis/Celery</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-ink-500">Despliegue</div>
            <div class="mt-1 text-white mono text-sm">propuesta-diseno-experimental</div>
            <div class="text-sm text-ink-400">.iagentek.com.mx</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LandingComponent {
  readonly criteria: RubricCriterion[] = [
    {
      id: 'Criterio 1',
      title: 'Motivación argumentada',
      weight: 20,
      description: 'Problema real, bien sustentado en literatura, parcialmente resuelto y susceptible de mejora.',
    },
    {
      id: 'Criterio 2',
      title: 'Hipótesis y experimentos refutables',
      weight: 20,
      description: 'Hipótesis falsable, con variables y métricas claras. Experimentos que puedan refutarla.',
    },
    {
      id: 'Criterio 3',
      title: 'Rigor del experimento',
      weight: 40,
      description: 'Formalidad, equilibrio poblacional, calidad del muestreo, evitación de sesgos, suficiencia de pruebas.',
    },
    {
      id: 'Criterio 4',
      title: 'Redacción y presentación',
      weight: 20,
      description: 'Claridad, estructura tipo paper, tablas/figuras numeradas, citación consistente, sin errores.',
    },
  ];

  readonly sections: Section[] = [
    {
      id: 'motivacion',
      number: '01',
      title: 'Motivación',
      description: 'Problema real en IA que esta propuesta busca atacar, sustentado con literatura previa.',
      status: 'pending',
    },
    {
      id: 'hipotesis',
      number: '02',
      title: 'Hipótesis',
      description: 'Afirmación falsable con variables, métricas y criterio explícito de refutación.',
      status: 'pending',
    },
    {
      id: 'metodologia',
      number: '03',
      title: 'Metodología',
      description: 'Diseño, datos, muestreo, train/val/test, procedimiento, métricas y control de sesgos.',
      status: 'pending',
    },
    {
      id: 'comparacion',
      number: '04',
      title: 'Comparación',
      description: 'Baselines y estudios previos contra los que se medirán los resultados del experimento.',
      status: 'pending',
    },
  ];
}
