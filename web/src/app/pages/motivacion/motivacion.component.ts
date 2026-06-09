import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-motivacion',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="01"
      sectionTitle="Motivación"
      sectionDescription="Identificación de un problema real en IA, sustento en literatura previa y argumentación del hueco de investigación que justifica esta propuesta."
      [rubricWeight]="20"
      status="in-progress"
      nextLink="/hipotesis"
      nextLabel="Hipótesis">

      <div class="grid-content">
        <!-- Main content -->
        <div class="stack-lg">
          <article class="card">
            <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
              <span class="section-num">1.1</span>
              <span>Contexto y problema</span>
            </h2>
            <p class="text-pine leading-relaxed mb-3">
              Los modelos de detección de discurso de odio en español han avanzado considerablemente, alcanzando
              F1-scores superiores a 0.85 en variantes peninsulares
              <span class="tag mx-1">[Plaza et al., 2021]</span>.
              Sin embargo, su desempeño cae sistemáticamente
              <strong class="text-forest">entre 12 y 18 puntos</strong>
              cuando se evalúan sobre variantes dialectales latinoamericanas
              <span class="tag mx-1">[Pamungkas et al., 2023]</span>.
            </p>
            <p class="text-pine leading-relaxed">
              Las plataformas con mayor presencia en México (X, TikTok, Facebook) aplican filtros
              entrenados predominantemente con español ibérico, generando dos errores opuestos:
              falsos positivos (censurar expresiones culturales no agresivas) y falsos negativos
              (dejar pasar agresiones encubiertas en jerga local).
            </p>
          </article>

          <article class="card">
            <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
              <span class="section-num">1.2</span>
              <span>Estado del arte</span>
            </h2>
            <div class="stack-sm">
              @for (s of stateOfArt; track s.method) {
                <div class="rounded-lg border border-fog bg-gray-50 p-4">
                  <div class="flex items-center justify-between gap-3 mb-1">
                    <div class="font-display font-medium text-forest">{{ s.method }}</div>
                    <span class="tag">{{ s.metric }}</span>
                  </div>
                  <p class="text-sm text-pine">{{ s.note }}</p>
                </div>
              }
            </div>
          </article>

          <article class="card">
            <h2 class="font-display text-xl font-semibold text-forest mb-3 flex items-center gap-2">
              <span class="section-num">1.3</span>
              <span>Hueco de investigación</span>
            </h2>
            <ul class="stack-sm text-pine">
              @for (gap of gaps; track gap) {
                <li class="flex gap-3">
                  <span class="text-forest font-mono shrink-0">·</span>
                  <span>{{ gap }}</span>
                </li>
              }
            </ul>
          </article>
        </div>

        <!-- Sidebar tips -->
        <aside class="stack">
          <div class="card" style="border-color: rgba(4,32,44,0.2)">
            <div class="flex items-center gap-2 text-forest text-sm font-display font-medium mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="w-4 h-4">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 8v4l3 2"/>
              </svg>
              Lo que evalúa la rúbrica
            </div>
            <p class="text-sm text-pine leading-relaxed">
              <strong class="text-forest">Criterio 1 — 20%.</strong>
              Motivación suficientemente argumentada con referencias reales y problema bien acotado.
            </p>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Checklist</div>
            <ul class="text-sm stack-sm text-pine">
              @for (item of checklist; track item.text) {
                <li class="flex gap-2">
                  <span [style.color]="item.done ? '#059669' : '#D97706'">{{ item.done ? '✓' : '○' }}</span>
                  <span>{{ item.text }}</span>
                </li>
              }
            </ul>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Referencias clave</div>
            <ol class="text-xs stack-sm text-pine font-mono leading-relaxed">
              <li>[1] Plaza-del-Arco et al. (2021). EmoEvent &amp; HaterNet.</li>
              <li>[2] Pamungkas et al. (2023). Cross-dialect transfer in Spanish hate speech.</li>
              <li>[3] Pérez et al. (2022). RoBERTuito for Spanish social media.</li>
            </ol>
          </div>
        </aside>
      </div>

    </app-section-layout>
  `,
})
export class MotivacionComponent {
  readonly stateOfArt = [
    { method: 'BETO + fine-tuning multilingual', metric: 'F1 0.84 (ES-ES)',
      note: 'Línea base reportada en HatEval 2019, no evalúa dialectos LatAm.' },
    { method: 'XLM-RoBERTa-large zero-shot LatAm', metric: 'F1 0.71 (MX)',
      note: 'Sin fine-tuning dialectal — base de comparación realista del problema.' },
    { method: 'RoBERTuito + adaptación dominio', metric: 'F1 0.78 (AR)',
      note: 'Mejor para rioplatense, no validado en español mexicano.' },
  ];

  readonly gaps = [
    'No existe un benchmark público de discurso de odio anotado por hablantes nativos de español mexicano.',
    'Los modelos competitivos no se han evaluado sistemáticamente sobre dialectos mexicanos.',
    'La literatura no cuantifica el costo en F1 del shift dialectal con pruebas estadísticas pareadas.',
  ];

  readonly checklist = [
    { text: 'Problema con datos cuantitativos', done: true },
    { text: '2-3 referencias reales citadas', done: true },
    { text: 'Hueco específico identificado', done: true },
    { text: 'Conexión explícita con hipótesis', done: false },
  ];
}
