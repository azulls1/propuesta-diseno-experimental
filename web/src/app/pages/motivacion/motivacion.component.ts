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

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-6">
          <article class="card">
            <h2 class="text-xl mb-3 flex items-center gap-2">
              <span class="text-brand-400 mono text-sm">1.1</span>
              Contexto y problema
            </h2>
            <p class="text-ink-300 leading-relaxed mb-4">
              Los modelos de detección de discurso de odio en español han avanzado considerablemente, alcanzando
              F1-scores superiores a 0.85 en variantes peninsulares
              <span class="chip mono mx-1">[Plaza et al., 2021]</span>.
              Sin embargo, su desempeño cae sistemáticamente
              <strong class="text-white">entre 12 y 18 puntos</strong>
              cuando se evalúan sobre variantes dialectales latinoamericanas
              <span class="chip mono mx-1">[Pamungkas et al., 2023]</span>,
              particularmente las regionalismos mexicanos donde la frontera entre
              insulto, broma y agresión cambia con el registro coloquial.
            </p>
            <p class="text-ink-300 leading-relaxed">
              Este fenómeno es relevante porque las plataformas con mayor presencia en México
              (X, TikTok, Facebook) aplican filtros entrenados predominantemente con español
              ibérico, generando dos errores opuestos: falsos positivos (censurar expresiones
              culturales no agresivas) y falsos negativos (dejar pasar agresiones encubiertas
              en jerga local).
            </p>
          </article>

          <article class="card">
            <h2 class="text-xl mb-3 flex items-center gap-2">
              <span class="text-brand-400 mono text-sm">1.2</span>
              Estado del arte
            </h2>
            <div class="space-y-3">
              <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
                <div class="flex items-center justify-between gap-3">
                  <div class="font-medium text-white">BETO + fine-tuning multilingual</div>
                  <span class="chip mono">F1 0.84 (ES-ES)</span>
                </div>
                <p class="mt-1 text-sm text-ink-400">Línea base reportada en HatEval 2019, no evalúa dialectos LatAm.</p>
              </div>
              <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
                <div class="flex items-center justify-between gap-3">
                  <div class="font-medium text-white">XLM-RoBERTa-large zero-shot LatAm</div>
                  <span class="chip mono">F1 0.71 (MX)</span>
                </div>
                <p class="mt-1 text-sm text-ink-400">Sin fine-tuning dialectal — base de comparación realista del problema.</p>
              </div>
              <div class="rounded-lg border border-ink-800 bg-ink-900/40 p-4">
                <div class="flex items-center justify-between gap-3">
                  <div class="font-medium text-white">RoBERTuito + adaptación dominio</div>
                  <span class="chip mono">F1 0.78 (AR)</span>
                </div>
                <p class="mt-1 text-sm text-ink-400">Mejor para rioplatense, no validado en español mexicano.</p>
              </div>
            </div>
          </article>

          <article class="card">
            <h2 class="text-xl mb-3 flex items-center gap-2">
              <span class="text-brand-400 mono text-sm">1.3</span>
              Hueco de investigación
            </h2>
            <ul class="space-y-2 text-ink-300">
              <li class="flex gap-3">
                <span class="text-brand-400 mono shrink-0">·</span>
                <span>No existe un benchmark público de discurso de odio anotado por hablantes nativos de español mexicano.</span>
              </li>
              <li class="flex gap-3">
                <span class="text-brand-400 mono shrink-0">·</span>
                <span>Los modelos competitivos no se han evaluado sistemáticamente sobre dialectos mexicanos.</span>
              </li>
              <li class="flex gap-3">
                <span class="text-brand-400 mono shrink-0">·</span>
                <span>La literatura no cuantifica el costo en F1 del shift dialectal con pruebas estadísticas pareadas.</span>
              </li>
            </ul>
          </article>
        </div>

        <!-- Sidebar tips -->
        <aside class="space-y-4">
          <div class="card border-brand-500/30">
            <div class="flex items-center gap-2 text-brand-300 text-sm font-medium mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/>
              </svg>
              Lo que evalúa la rúbrica
            </div>
            <p class="text-sm text-ink-300 leading-relaxed">
              <strong class="text-white">Criterio 1 — 20%.</strong>
              Motivación suficientemente argumentada con referencias reales y problema bien acotado.
            </p>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-ink-500 mb-2">Checklist</div>
            <ul class="text-sm space-y-2 text-ink-300">
              <li class="flex gap-2">
                <span class="text-accent-success">✓</span>
                Problema con datos cuantitativos
              </li>
              <li class="flex gap-2">
                <span class="text-accent-success">✓</span>
                2-3 referencias reales citadas
              </li>
              <li class="flex gap-2">
                <span class="text-accent-success">✓</span>
                Hueco específico identificado
              </li>
              <li class="flex gap-2">
                <span class="text-accent-warn">○</span>
                Conexión explícita con hipótesis
              </li>
            </ul>
          </div>

          <div class="card">
            <div class="text-xs uppercase tracking-wider text-ink-500 mb-2">Referencias clave</div>
            <ol class="text-xs space-y-2 text-ink-400 mono leading-relaxed">
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
export class MotivacionComponent {}
