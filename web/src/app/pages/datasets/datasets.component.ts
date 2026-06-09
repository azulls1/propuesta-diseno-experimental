import { Component, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';
import { ChecklistComponent, ChecklistItem } from '../../shared/interactive/checklist.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';
import { ModalComponent } from '../../shared/interactive/modal.component';

interface AttrItem {
  label: string; value: string; note: string;
  mono: boolean; copyable: boolean; detail: string;
}

@Component({
  selector: 'app-datasets',
  standalone: true,
  imports: [SectionLayoutComponent, ExpandCardComponent, ChecklistComponent, CopyButtonComponent, ModalComponent],
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
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Dataset principal</h2>
            <span class="text-xs text-moss font-mono">hover para detalles · click ⧉ para copiar →</span>
          </div>
          <div class="grid form-grid">
            @for (a of attributes; track a.label) {
              <button type="button" (click)="selectedAttr.set(a)"
                      class="rounded-lg border border-fog bg-gray-50 p-4 text-left hover:border-forest hover:shadow-card transition-all">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ a.label }}</div>
                    <div class="text-forest font-display font-medium" [class.font-mono]="a.mono">{{ a.value }}</div>
                    <div class="text-xs text-pine mt-1">{{ a.note }}</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="w-3 h-3 text-moss shrink-0">
                    <path d="m9 5 7 7-7 7"/>
                  </svg>
                </div>
              </button>
            }
          </div>
        </article>

        @if (selectedAttr(); as a) {
          <app-modal [open]="true" [eyebrow]="'Dataset · ' + a.label"
                     [title]="a.value" [subtitle]="a.note"
                     (closeRequest)="selectedAttr.set(null)">
            <p class="text-pine leading-relaxed mb-4">{{ a.detail }}</p>
            @if (a.copyable) {
              <div class="flex items-center gap-2">
                <span class="text-xs text-moss font-mono">Copiar valor:</span>
                <app-copy [text]="a.value" />
              </div>
            }
          </app-modal>
        }

        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Datasets de referencia</h2>
            <span class="text-xs text-moss font-mono">click para más info →</span>
          </div>
          <p class="text-sm text-pine mb-3">Datasets públicos que sirven como contraste o pre-entrenamiento.</p>
          <div class="stack-sm">
            @for (d of references; track d.name) {
              <app-expand-card>
                <div summary>
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-forest font-display font-medium">{{ d.name }}</span>
                    <span class="tag">{{ d.size }}</span>
                  </div>
                  <p class="text-xs text-pine mt-1">{{ d.use }}</p>
                </div>
                <div details>
                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Fuente</div>
                      <div class="text-sm text-pine">{{ d.source }}</div>
                    </div>
                    <div>
                      <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Licencia</div>
                      <div class="text-sm text-pine font-mono">{{ d.license }}</div>
                    </div>
                  </div>
                  @if (d.url) {
                    <div class="mt-3 flex items-center gap-2">
                      <a [href]="d.url" target="_blank" rel="noopener" class="btn-ghost text-xs">Visitar →</a>
                      <app-copy [text]="d.url" label="URL" />
                    </div>
                  }
                </div>
              </app-expand-card>
            }
          </div>
        </article>

        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Aspectos éticos</h2>
            <span class="text-xs text-moss font-mono">checklist persistente →</span>
          </div>
          <p class="text-sm text-pine mb-3">Self-audit ético antes de publicar el dataset.</p>
          <app-checklist storageKey="datasets-ethics" [initialItems]="ethicsChecklist" />
        </article>
      </div>
    </app-section-layout>
  `,
})
export class DatasetsComponent {
  protected selectedAttr = signal<AttrItem | null>(null);

  readonly attributes: AttrItem[] = [
    { label: 'Nombre', value: 'HateSpeech-MX (propio)', note: 'A construir vía API académica de X.', mono: false, copyable: false,
      detail: 'Dataset original que crearemos como contribución del proyecto. No existe equivalente público con anotación dialectal mexicana validada por hablantes nativos.' },
    { label: 'Tamaño objetivo', value: '50 000 tuits', note: 'Balanceado al ~30/70 hate/no-hate.', mono: true, copyable: false,
      detail: '50k es un umbral razonable para fine-tuning de modelos transformer de tamaño medio (RoBERTuito) sin overfitting catastrófico. La proporción 30/70 refleja la prevalencia real estimada del discurso de odio en X (no es 50/50).' },
    { label: 'Idioma / variante', value: 'Español mexicano', note: 'Filtro place_country=MX.', mono: false, copyable: false,
      detail: 'El "español mexicano" no es monolítico — incluye chilango, norteño, yucateco, etc. Para esta primera versión usaremos un filtro nacional MX. Reportaremos distribución regional en limitaciones.' },
    { label: 'Filtro de query', value: 'lang:es place_country:MX', note: 'Comando Twarc2 para scraping.', mono: true, copyable: true,
      detail: 'Query reproducible para la API académica. lang:es asegura idioma español detectado por X. place_country:MX usa la geolocalización declarada en la cuenta o el tuit. Combinación permite excluir hispanohablantes residentes en EEUU.' },
    { label: 'Licencia', value: 'CC BY-SA 4.0', note: 'Anotaciones liberadas, contenido por tweet_id.', mono: false, copyable: false,
      detail: 'Creative Commons Attribution-ShareAlike 4.0 — terceros pueden usar las anotaciones citando la fuente y bajo la misma licencia. El contenido textual se distribuye SOLO por tweet_id (rehidratable con la API), respetando los TOS de X.' },
    { label: 'Plataforma anotación', value: 'Prolific MX', note: 'Hablantes nativos verificados. ~$0.20 USD/tuit.', mono: false, copyable: false,
      detail: 'Prolific filtra participantes por nationality, native_language y country_of_residence. A ~$0.20 USD por tuit y 3 anotadores, el costo total es ~$30,000 USD. Reduciremos a un subset de 10k tuits para fit dentro del presupuesto académico.' },
  ];

  readonly references = [
    { name: 'HatEval 2019 (ES-ES)', size: '6 600 tuits',
      use: 'Pre-entrenamiento opcional; valida transferencia ES→MX.',
      source: 'SemEval-2019 Task 5 — España',
      license: 'CC BY-NC-SA 4.0',
      url: 'https://github.com/msang/hateval2019' },
    { name: 'OffendES (ES-ES)', size: '32 000 ej.',
      use: 'Datos adicionales para zero-shot baselines.',
      source: 'Plaza-del-Arco et al. 2021',
      license: 'Académica',
      url: 'https://github.com/fmplaza/OffendES' },
    { name: 'MexHate (proyecto académico)', size: '8 000 tuits',
      use: 'Subset existente para validación cruzada.',
      source: 'Universidad Nacional Autónoma de México',
      license: 'CC BY 4.0',
      url: '' },
  ];

  readonly ethicsChecklist: ChecklistItem[] = [
    { text: 'No se almacenan datos personales identificables; solo tweet_id + texto anonimizado.', done: false },
    { text: 'URLs y menciones reemplazadas por placeholders [URL] / [USER].',                       done: false },
    { text: 'Anotadores informados sobre el contenido sensible; opción de retirarse.',              done: false },
    { text: 'Resultados se reportan agregados, nunca a nivel de usuario individual.',               done: false },
    { text: 'Cumplimiento con la política de uso de la API académica de X.',                        done: false },
    { text: 'Acuerdo de confidencialidad firmado con la plataforma de anotación.',                  done: false },
    { text: 'Plan de retirada de datos en caso de queja DMCA o ARCO.',                              done: false },
  ];
}
