import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [SectionLayoutComponent, CopyButtonComponent, ExpandCardComponent],
  template: `
    <app-section-layout
      sectionNumber="10"
      sectionTitle="Autor"
      sectionDescription="Información sobre quién desarrolla esta propuesta de diseño experimental."
      status="done"
      prevLink="/como-funciona"
      prevLabel="Cómo funciona"
      [nextLink]="null">

      <div class="grid-content">
        <article class="card text-center">
          <div class="w-24 h-24 mx-auto rounded-full bg-forest text-white grid place-items-center mb-4 transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                 class="w-12 h-12">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 class="font-display text-2xl font-semibold text-forest">Adonai Samael Hernández Mata</h2>
          <div class="flex items-center justify-center gap-2 mt-1">
            <span class="text-sm text-moss font-mono">azulls1</span>
            <app-copy text="azulls1" label="" />
          </div>
          <p class="text-sm text-pine mt-3 leading-relaxed max-w-md mx-auto">
            Estudiante de Maestría en Inteligencia Artificial.
            Investigación en IA aplicada y diseño de experimentos reproducibles.
          </p>

          <div class="grid grid-cols-2 gap-2 mt-6 max-w-md mx-auto">
            <a href="https://github.com/azulls1" target="_blank" rel="noopener"
               class="rounded-lg border border-fog bg-white px-3 py-2.5 text-sm flex items-center justify-center gap-2 hover:border-forest hover:bg-gray-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-forest">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.67.8.55 4.57-1.53 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z"/>
              </svg>
              <span class="text-forest font-medium">GitHub</span>
            </a>
            <a href="mailto:azull.samael@gmail.com"
               class="rounded-lg border border-fog bg-white px-3 py-2.5 text-sm flex items-center justify-center gap-2 hover:border-forest hover:bg-gray-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="w-4 h-4 text-forest">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/>
              </svg>
              <span class="text-forest font-medium">Email</span>
            </a>
            <a href="https://iagentek.com.mx" target="_blank" rel="noopener"
               class="rounded-lg border border-fog bg-white px-3 py-2.5 text-sm flex items-center justify-center gap-2 hover:border-forest hover:bg-gray-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="w-4 h-4 text-forest">
                <circle cx="12" cy="12" r="10"/>
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
              </svg>
              <span class="text-forest font-medium">iagentek</span>
            </a>
            <a href="https://github.com/azulls1/propuesta-diseno-experimental" target="_blank" rel="noopener"
               class="rounded-lg border border-fog bg-white px-3 py-2.5 text-sm flex items-center justify-center gap-2 hover:border-forest hover:bg-gray-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="w-4 h-4 text-forest">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 17V7m0 10l-4-4m4 4l4-4M15 7v10m0-10l-4 4m4-4l4 4"/>
              </svg>
              <span class="text-forest font-medium">Repo</span>
            </a>
          </div>
        </article>

        <aside class="stack">
          <app-expand-card>
            <div summary>
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Asignatura</div>
              <div class="text-forest font-display font-semibold">Investigación en Inteligencia Artificial</div>
              <div class="text-sm text-pine mt-1">Primer semestre · Maestría en IA</div>
            </div>
            <div details>
              <div class="space-y-2 text-sm text-pine">
                <p><strong class="text-forest">Asignatura completa:</strong> Investigación en Inteligencia Artificial.</p>
                <p><strong class="text-forest">Modalidad:</strong> Mixta — clases sincrónicas + entregables.</p>
                <p><strong class="text-forest">Carga:</strong> 8 actividades semestrales.</p>
                <p><strong class="text-forest">Esta:</strong> Actividad 1 — Propuesta de diseño experimental (10 pts).</p>
              </div>
            </div>
          </app-expand-card>

          <app-expand-card>
            <div summary>
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Proyecto / marca</div>
              <div class="text-forest font-display font-semibold">iagentek</div>
              <div class="text-sm text-pine mt-1">Plataforma de IA generativa aplicada.</div>
            </div>
            <div details>
              <p class="text-sm text-pine mb-3">
                iagentek es la plataforma personal donde despliego proyectos de IA aplicada,
                incluido este sitio, bajo el dominio iagentek.com.mx.
              </p>
              <a href="https://iagentek.com.mx" target="_blank" rel="noopener" class="btn-ghost text-xs">
                iagentek.com.mx →
              </a>
            </div>
          </app-expand-card>

          <article class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Identificadores</div>
            <ul class="text-sm space-y-2">
              @for (id of identifiers; track id.value) {
                <li class="flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="text-xs text-moss">{{ id.label }}</div>
                    <div class="text-forest font-mono text-xs truncate">{{ id.value }}</div>
                  </div>
                  <app-copy [text]="id.value" label="" />
                </li>
              }
            </ul>
          </article>
        </aside>
      </div>
    </app-section-layout>
  `,
})
export class AutorComponent {
  readonly identifiers = [
    { label: 'GitHub user',    value: 'azulls1' },
    { label: 'Email',          value: 'azull.samael@gmail.com' },
    { label: 'Entregable',     value: 'mexmiart07_act2' },
    { label: 'Asignatura',     value: 'Investigación en Inteligencia Artificial' },
    { label: 'Programa',       value: 'Maestría en IA · 1er semestre' },
    { label: 'Año',            value: '2026 · Junio' },
  ];
}
