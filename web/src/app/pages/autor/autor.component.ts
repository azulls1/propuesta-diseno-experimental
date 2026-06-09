import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="10"
      sectionTitle="Autor"
      sectionDescription="Información sobre quién desarrolla esta propuesta de diseño experimental."
      status="in-progress"
      prevLink="/como-funciona"
      prevLabel="Cómo funciona"
      [nextLink]="null">

      <div class="grid-content">
        <article class="card text-center">
          <div class="w-24 h-24 mx-auto rounded-full bg-forest text-white grid place-items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                 class="w-12 h-12">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 class="font-display text-2xl font-semibold text-forest">Samuel Hernández</h2>
          <p class="text-sm text-moss font-mono mt-1">azulls1 · iagenerativetek</p>
          <p class="text-sm text-pine mt-3 leading-relaxed">
            Estudiante de Maestría en Inteligencia Artificial.
            Investigación en IA aplicada y diseño de experimentos reproducibles.
          </p>

          <div class="flex justify-center gap-3 mt-6">
            <a href="https://github.com/azulls1" target="_blank" rel="noopener" class="btn-ghost">
              GitHub
            </a>
            <a href="mailto:iagenerativetek@gmail.com" class="btn-ghost">
              Email
            </a>
          </div>
        </article>

        <aside class="stack">
          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Asignatura</div>
            <div class="text-forest font-display font-semibold">Investigación en Inteligencia Artificial</div>
            <div class="text-sm text-pine mt-1">Primer semestre, Maestría en IA</div>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Proyecto / marca</div>
            <div class="text-forest font-display font-semibold">iagentek</div>
            <div class="text-sm text-pine mt-1">Plataforma de IA generativa aplicada — host del despliegue.</div>
            <a href="https://iagentek.com.mx" target="_blank" rel="noopener" class="text-xs text-forest font-mono mt-2 inline-block hover:underline">
              iagentek.com.mx →
            </a>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Identificadores</div>
            <ul class="text-sm stack-sm text-pine font-mono">
              <li>· mexmiart07_act2 (entregable)</li>
              <li>· Actividad 1 · Primer semestre</li>
              <li>· 2026 — Junio</li>
            </ul>
          </div>
        </aside>
      </div>
    </app-section-layout>
  `,
})
export class AutorComponent {}
