import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-redaccion',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="05"
      sectionTitle="Redacción y presentación"
      sectionDescription="Estructura del documento académico final (≤5 páginas, Calibri 12, interlineado 1.5). Cómo distribuir las páginas y qué se evalúa en el Criterio 4."
      [rubricWeight]="20"
      status="in-progress"
      prevLink="/comparacion"
      prevLabel="Comparación"
      nextLink="/datasets"
      nextLabel="Datasets">

      <div class="stack-xl">
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Estructura sugerida (5 páginas)</h2>
          <ol class="stack-sm">
            @for (s of structure; track s.section) {
              <li class="flex gap-3 items-start">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-mono">
                  {{ s.num }}
                </span>
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-forest font-display font-medium">{{ s.section }}</span>
                    <span class="tag">{{ s.pages }} pg</span>
                  </div>
                  <p class="text-sm text-pine mt-0.5">{{ s.content }}</p>
                </div>
              </li>
            }
          </ol>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Reglas de redacción (C4 — 20%)</h2>
          <div class="grid form-grid">
            @for (r of rules; track r) {
              <div class="rounded-md border border-fog bg-gray-50 p-3 flex gap-2 text-sm">
                <span style="color:#059669" class="mt-0.5">✓</span>
                <span class="text-pine">{{ r }}</span>
              </div>
            }
          </div>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Formato exacto exigido</h2>
          <div class="grid form-grid--3">
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Tipografía</div>
              <div class="text-forest font-display font-medium">Calibri 12</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Interlineado</div>
              <div class="text-forest font-display font-medium">1.5</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Extensión</div>
              <div class="text-forest font-display font-medium">Máximo 5 páginas</div>
            </div>
          </div>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class RedaccionComponent {
  readonly structure = [
    { num: '1', section: 'Introducción y motivación', pages: '0.75', content: 'Contexto del problema, estado del arte, hueco de investigación, transición a la hipótesis.' },
    { num: '2', section: 'Hipótesis',                  pages: '0.5',  content: 'H1 y H0 explícitas, variables, criterio de refutación.' },
    { num: '3', section: 'Metodología',                pages: '1.75', content: 'Diseño, datos, splits, procedimiento, métricas, control de sesgos.' },
    { num: '4', section: 'Comparación',                pages: '0.75', content: 'Baselines y condiciones de comparación justa.' },
    { num: '5', section: 'Resultados esperados',       pages: '0.5',  content: 'Predicción + interpretación si se refuta.' },
    { num: '6', section: 'Referencias',                pages: '0.75', content: 'APA o IEEE consistente, 5-8 referencias reales.' },
  ];

  readonly rules = [
    'Tercera persona o plural ("se utilizará" / "utilizamos"), nunca primera del singular.',
    'Citas en el texto para cada afirmación no obvia.',
    'Tablas y figuras numeradas con descripción.',
    'Una idea por párrafo; oración tópica al inicio.',
    'Sin contracciones del registro coloquial.',
    'Tiempos verbales consistentes a lo largo del documento.',
    'Revisión ortográfica con el corrector activado.',
    'Referencias en un solo formato (APA o IEEE).',
  ];
}
