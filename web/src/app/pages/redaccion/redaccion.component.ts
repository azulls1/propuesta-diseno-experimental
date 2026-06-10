import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';

@Component({
  selector: 'app-redaccion',
  standalone: true,
  imports: [SectionLayoutComponent, ExpandCardComponent, ChecklistComponent],
  template: `
    <app-section-layout
      sectionNumber="05"
      sectionTitle="Redacción y presentación"
      sectionDescription="Estructura del documento académico final (≤5 páginas, Calibri 12, interlineado 1.5). Cómo distribuir las páginas y qué se evalúa en el Criterio 4."
      [rubricWeight]="20"
      status="done"
      prevLink="/comparacion"
      prevLabel="Comparación"
      nextLink="/datasets"
      nextLabel="Datasets">

      <div class="stack-xl">

        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Estructura sugerida (5 páginas)</h2>
            <span class="text-xs text-moss font-mono">click cada sección para tips →</span>
          </div>
          <div class="stack-sm">
            @for (s of structure; track s.section) {
              <app-expand-card>
                <div summary>
                  <div class="flex gap-3 items-center">
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-mono font-semibold">
                      {{ s.num }}
                    </span>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-forest font-display font-medium">{{ s.section }}</span>
                        <span class="tag">{{ s.pages }} pg</span>
                      </div>
                      <p class="text-sm text-pine mt-0.5">{{ s.content }}</p>
                    </div>
                  </div>
                </div>
                <div details>
                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Qué incluir</div>
                      <ul class="text-xs space-y-1 text-pine">
                        @for (t of s.include; track t) {
                          <li class="flex gap-1.5"><span style="color:#059669">·</span><span>{{ t }}</span></li>
                        }
                      </ul>
                    </div>
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Errores comunes</div>
                      <ul class="text-xs space-y-1 text-pine">
                        @for (e of s.avoid; track e) {
                          <li class="flex gap-1.5"><span style="color:#DC2626">·</span><span>{{ e }}</span></li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </app-expand-card>
            }
          </div>
        </article>

        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Reglas de redacción (C4 — 20%)</h2>
            <span class="text-xs text-moss font-mono">checklist persistente →</span>
          </div>
          <app-checklist storageKey="redaccion-rules" [initialItems]="rulesChecklist" />
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Formato exacto exigido</h2>
          <div class="grid form-grid--3">
            <div class="rounded-lg border border-fog bg-gray-50 p-4 hover:border-forest hover:shadow-card transition-all">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Tipografía</div>
              <div class="text-forest font-display font-medium text-lg">Calibri 12</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4 hover:border-forest hover:shadow-card transition-all">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Interlineado</div>
              <div class="text-forest font-display font-medium text-lg">1.5</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4 hover:border-forest hover:shadow-card transition-all">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Extensión</div>
              <div class="text-forest font-display font-medium text-lg">Máx. 5 páginas</div>
            </div>
          </div>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class RedaccionComponent {
  readonly structure = [
    { num: '1', section: 'Introducción y motivación', pages: '0.75',
      content: 'Contexto del problema, estado del arte, hueco de investigación, transición a la hipótesis.',
      include: ['Contexto del problema en IA', '2-3 papers como estado del arte', 'Hueco específico identificado', 'Transición clara a la hipótesis'],
      avoid: ['Texto divulgativo genérico', 'Sin referencias bibliográficas', 'Problema demasiado amplio', 'Saltar directo a "vamos a hacer X"'] },
    { num: '2', section: 'Hipótesis', pages: '0.5',
      content: 'H1 y H0 explícitas, variables, criterio de refutación.',
      include: ['H1 en una frase clara', 'H0 declarada (opcional pero recomendado)', 'Variables nombradas (VI, VD, control)', 'Criterio explícito de refutación'],
      avoid: ['Hipótesis vaga', 'Sin métrica cuantitativa', 'Sin nivel de significancia α', 'No falsable'] },
    { num: '3', section: 'Metodología', pages: '1.75',
      content: 'Diseño, datos, splits, procedimiento, métricas, control de sesgos.',
      include: ['Diseño experimental', 'Dataset con detalles', 'Partición train/val/test', 'Procedimiento paso a paso', 'Métricas justificadas', 'Sección de sesgos'],
      avoid: ['Omitir versiones/seeds', 'Muestreo sin justificar', 'Sin análisis estadístico', 'No mencionar sesgos'] },
    { num: '4', section: 'Comparación', pages: '0.75',
      content: 'Baselines y condiciones de comparación justa.',
      include: ['Tabla de baselines con tipo', 'Condiciones de comparación', 'Pruebas estadísticas a aplicar', 'Corrección por múltiples comparaciones'],
      avoid: ['Solo un baseline trivial', 'Sin pruebas estadísticas', 'Baselines mal sintonizados'] },
    { num: '5', section: 'Resultados esperados', pages: '0.5',
      content: 'Predicción + interpretación si se refuta.',
      include: ['Escenario si H1 se confirma', 'Escenario si H1 se refuta', 'Interpretación de ambos casos', 'Contribución científica esperada'],
      avoid: ['Inventar resultados', 'Solo mencionar escenario positivo'] },
    { num: '6', section: 'Referencias', pages: '0.75',
      content: 'APA o IEEE consistente, 5-8 referencias reales.',
      include: ['Formato consistente (APA o IEEE)', '5-8 referencias reales', 'DOI cuando disponible', 'Citas en el texto'],
      avoid: ['Mezclar formatos', 'Citar pero no incluir', 'Referencias inventadas'] },
  ];

  readonly rulesChecklist: ChecklistItem[] = [
    { text: 'Tercera persona o plural ("se utilizará" / "utilizamos"), nunca primera del singular.', done: false },
    { text: 'Citas en el texto para cada afirmación no obvia.',          done: false },
    { text: 'Tablas y figuras numeradas con descripción.',                done: false },
    { text: 'Una idea por párrafo; oración tópica al inicio.',            done: false },
    { text: 'Sin contracciones del registro coloquial.',                  done: false },
    { text: 'Tiempos verbales consistentes a lo largo del documento.',   done: false },
    { text: 'Revisión ortográfica con el corrector activado.',           done: false },
    { text: 'Referencias en un solo formato (APA o IEEE).',              done: false },
  ];
}
