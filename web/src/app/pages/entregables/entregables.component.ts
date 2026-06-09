import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-entregables',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="08"
      sectionTitle="Entregables"
      sectionDescription="Lo que se entrega al cierre de la Actividad 1: documento académico, repositorio del proyecto y sitio web público."
      status="in-progress"
      prevLink="/baselines"
      prevLabel="Baselines"
      nextLink="/como-funciona"
      nextLabel="Cómo funciona">

      <div class="stack-xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (d of deliverables; track d.name) {
            <article class="card">
              <div class="flex items-center justify-between mb-2">
                <div class="grid h-10 w-10 place-items-center rounded-lg bg-forest text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="w-5 h-5">
                    <path [attr.d]="d.icon"/>
                  </svg>
                </div>
                @switch (d.status) {
                  @case ('done')     { <span class="badge badge-active">Listo</span> }
                  @case ('progress') { <span class="badge badge-warning">En curso</span> }
                  @default           { <span class="badge badge-inactive">Pendiente</span> }
                }
              </div>
              <h3 class="font-display text-base font-semibold text-forest">{{ d.name }}</h3>
              <p class="text-sm text-pine mt-1">{{ d.description }}</p>
              @if (d.link) {
                <a [href]="d.link" target="_blank" rel="noopener" class="btn-ghost mt-3 text-xs">
                  Abrir →
                </a>
              }
            </article>
          }
        </div>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Cronología</h2>
          <ol class="stack-sm">
            @for (m of milestones; track m.label) {
              <li class="flex gap-3 items-start">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-mono"
                      [style.background]="m.done ? '#04202C' : '#F7F8F7'"
                      [style.color]="m.done ? '#fff' : '#5B7065'"
                      [style.border]="m.done ? 'none' : '1px solid #DFE4E0'">
                  {{ m.done ? '✓' : '○' }}
                </span>
                <div class="flex-1 pt-0.5">
                  <div class="text-forest font-display font-medium">{{ m.label }}</div>
                  <div class="text-xs text-moss font-mono">{{ m.when }}</div>
                </div>
              </li>
            }
          </ol>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class EntregablesComponent {
  readonly deliverables = [
    {
      name: 'Documento académico',
      description: 'Word/PDF de máximo 5 páginas con la propuesta completa.',
      icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
      status: 'progress',
      link: null,
    },
    {
      name: 'Repositorio GitHub',
      description: 'Código fuente del sitio y wiki del análisis.',
      icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
      status: 'done',
      link: 'https://github.com/azulls1/propuesta-diseno-experimental',
    },
    {
      name: 'Sitio web',
      description: 'Sitio público que sirve como portafolio del proyecto.',
      icon: 'M3 12h18m-9-9a14 14 0 1 0 0 18 14 14 0 0 0 0-18z',
      status: 'done',
      link: 'https://propuesta-diseno-experimental.iagentek.com.mx',
    },
  ];

  readonly milestones = [
    { label: 'Wiki de análisis del enunciado',     when: '2026-06-09', done: true  },
    { label: 'Scaffold Angular + Tailwind + Forest', when: '2026-06-09', done: true  },
    { label: 'Despliegue inicial al VPS',           when: '2026-06-09', done: true  },
    { label: 'Restyle con Forest DS',               when: '2026-06-09', done: true  },
    { label: 'Backend FastAPI + Supabase',          when: 'Próximo',    done: false },
    { label: 'Documento .docx redactado',           when: 'Antes del cierre', done: false },
  ];
}
