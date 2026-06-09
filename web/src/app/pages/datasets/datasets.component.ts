import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-datasets',
  standalone: true,
  imports: [SectionLayoutComponent],
  template: `
    <app-section-layout
      sectionNumber="06"
      sectionTitle="Datasets"
      sectionDescription="Origen de los datos, preprocesamiento, particiones train/val/test y consideraciones éticas."
      status="in-progress"
      prevLink="/redaccion"
      prevLabel="Redacción"
      nextLink="/baselines"
      nextLabel="Baselines">

      <div class="stack-xl">
        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Dataset principal</h2>
          <div class="grid form-grid">
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Nombre</div>
              <div class="text-forest font-display font-medium">HateSpeech-MX (propio)</div>
              <div class="text-xs text-pine mt-1">A construir vía API académica de X.</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Tamaño objetivo</div>
              <div class="text-forest font-display font-medium font-mono">50 000 tuits</div>
              <div class="text-xs text-pine mt-1">Balanceado al ~30/70 hate/no-hate.</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Idioma / variante</div>
              <div class="text-forest font-display font-medium">Español mexicano</div>
              <div class="text-xs text-pine mt-1">Filtro <code class="text-xs">place_country=MX</code>.</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Licencia</div>
              <div class="text-forest font-display font-medium">CC BY-SA 4.0</div>
              <div class="text-xs text-pine mt-1">Anotaciones liberadas, contenido enlazado por tweet_id.</div>
            </div>
          </div>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Datasets de referencia</h2>
          <p class="text-sm text-pine mb-3">Datasets públicos que sirven como contraste o pre-entrenamiento.</p>
          <div class="stack-sm">
            @for (d of references; track d.name) {
              <div class="rounded-lg border border-fog bg-gray-50 p-3">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-forest font-display font-medium">{{ d.name }}</span>
                  <span class="tag">{{ d.size }}</span>
                </div>
                <p class="text-xs text-pine">{{ d.use }}</p>
              </div>
            }
          </div>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Aspectos éticos</h2>
          <ul class="stack-sm text-pine">
            @for (e of ethics; track e) {
              <li class="flex gap-2"><span class="text-forest font-mono shrink-0">·</span><span>{{ e }}</span></li>
            }
          </ul>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class DatasetsComponent {
  readonly references = [
    { name: 'HatEval 2019 (ES-ES)',         size: '6 600 tuits',  use: 'Pre-entrenamiento opcional; valida transferencia ES→MX.' },
    { name: 'OffendES (ES-ES)',             size: '32 000 ej.',   use: 'Datos adicionales para zero-shot baselines.' },
    { name: 'MexHate (proyecto académico)', size: '8 000 tuits',  use: 'Subset existente para validación cruzada.' },
  ];

  readonly ethics = [
    'No se almacenan datos personales identificables; solo tweet_id + texto anonimizado.',
    'URLs y menciones reemplazadas por placeholders [URL] / [USER].',
    'Anotadores informados sobre el contenido sensible; opción de retirarse.',
    'Resultados se reportan agregados, nunca a nivel de usuario individual.',
    'Cumplimiento con la política de uso de la API académica de X.',
  ];
}
