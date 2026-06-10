import { Component, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';
import { ModalComponent } from '../../shared/interactive/modal.component';

// Fusionado desde Cómo funciona
interface TechItem {
  icon: string; name: string; version: string; role: string;
  features?: string[]; docs?: string;
}

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [SectionLayoutComponent, CopyButtonComponent, ExpandCardComponent, ModalComponent],
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 200ms ease-out; }
  `],
  template: `
    <app-section-layout
      sectionNumber="07"
      sectionTitle="Autor"
      sectionDescription="Información sobre quién desarrolla esta propuesta de diseño experimental, y la arquitectura técnica del sitio (stack, despliegue y CI/CD)."
      status="done"
      prevLink="/laboratorio"
      prevLabel="Laboratorio"
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

      <!-- ════════ CÓMO FUNCIONA EL SITIO (fusionado) ════════ -->
      <div class="stack-xl mt-4">
        <header class="page-header">
          <span class="badge-forest mb-3 inline-flex">Arquitectura técnica</span>
          <h2 class="page-header__title text-xl sm:text-2xl">Cómo funciona el sitio</h2>
          <p class="page-header__desc max-w-3xl">Arquitectura técnica del proyecto: stack, despliegue, dominio y CI/CD.</p>
        </header>

        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Stack tecnológico</h2>
            <span class="text-xs text-moss font-mono">click cada tech para abrir modal →</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            @for (t of stack; track t.name) {
              <button type="button"
                      (click)="selectedTech.set(t)"
                      class="rounded-lg border border-fog bg-gray-50 p-4 text-center hover:border-forest hover:shadow-card transition-all">
                <div class="text-2xl mb-1">{{ t.icon }}</div>
                <div class="text-forest font-display font-medium text-sm">{{ t.name }}</div>
                <div class="text-xs text-moss font-mono mt-1">{{ t.version }}</div>
              </button>
            }
          </div>
        </article>

        <!-- MODAL: tech detail -->
        @if (selectedTech(); as t) {
          <app-modal [open]="true"
                     [eyebrow]="t.version"
                     [title]="t.icon + ' ' + t.name"
                     [subtitle]="'Rol en el stack del proyecto'"
                     (closeRequest)="selectedTech.set(null)">
            <p class="text-pine leading-relaxed mb-4">{{ t.role }}</p>
            @if (t.features?.length) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4 mb-4">
                <div class="text-xs uppercase tracking-wider text-moss font-mono mb-2">Características clave</div>
                <ul class="text-sm space-y-1.5 text-pine">
                  @for (f of t.features; track f) {
                    <li class="flex gap-2"><span class="text-forest">·</span><span>{{ f }}</span></li>
                  }
                </ul>
              </div>
            }
            @if (t.docs) {
              <a [href]="t.docs" target="_blank" rel="noopener" class="btn-ghost text-xs">
                Documentación oficial →
              </a>
            }
          </app-modal>
        }

        <article class="card">
          <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 class="font-display text-xl font-semibold text-forest">Pipeline de despliegue</h2>
            <span class="text-xs text-moss font-mono">click para expandir · copia los comandos</span>
          </div>
          <div class="stack-sm">
            @for (step of pipeline; track step.id) {
              <app-expand-card>
                <div summary>
                  <div class="flex items-center gap-3">
                    <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-mono font-semibold">
                      {{ step.id }}
                    </span>
                    <div class="flex-1">
                      <div class="text-forest font-display font-medium">{{ step.title }}</div>
                      <div class="text-sm text-pine">{{ step.detail }}</div>
                    </div>
                  </div>
                </div>
                <div details>
                  @if (step.cmd) {
                    <div class="flex items-start gap-2">
                      <div class="flex-1 text-xs font-mono bg-gray-50 border border-fog rounded px-3 py-2 text-evergreen overflow-x-auto whitespace-pre">{{ step.cmd }}</div>
                      <app-copy [text]="step.cmd" />
                    </div>
                  }
                  @if (step.note) {
                    <p class="text-xs text-pine mt-2">{{ step.note }}</p>
                  }
                </div>
              </app-expand-card>
            }
          </div>
        </article>

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

  // ══════════════ Cómo funciona el sitio (fusionado) ══════════════
  protected selectedTech = signal<TechItem | null>(null);

  readonly stack: TechItem[] = [
    { icon: '🅰️', name: 'Angular', version: 'SPA',
      role: 'Framework del frontend (single-page app) con componentes standalone y signals.',
      features: ['Componentes standalone', 'Signals para reactividad', 'Carga diferida por ruta', 'Control flow nativo'],
      docs: 'https://angular.dev' },
    { icon: '🌬️', name: 'Tailwind', version: 'CSS',
      role: 'CSS utilitario; base sobre la que se construye el design system Forest DS.',
      features: ['Estilos por utilidades', 'Design tokens propios', 'Sin hojas de estilo enormes'],
      docs: 'https://tailwindcss.com' },
    { icon: '🌲', name: 'Forest DS', version: 'propio',
      role: 'Design system propio de iagentek. Light-only, paleta forest, fuentes Sora + DM Sans.',
      features: ['Light mode', 'Paleta forest/pine/moss/fog', 'Componentes reutilizables'] },
    { icon: '🌐', name: 'nginx', version: 'web server',
      role: 'Sirve el SPA ya compilado (archivos estáticos). No hay backend propio: el frontend consume una API gestionada.',
      features: ['Sirve estáticos', 'SPA fallback', 'Compresión y cache', 'Cabeceras de seguridad'],
      docs: 'https://nginx.org/en/docs/' },
    { icon: '🚦', name: 'Reverse proxy', version: 'TLS',
      role: 'Enruta el dominio al contenedor y gestiona el certificado HTTPS de forma automática.',
      features: ['Terminación TLS', 'Certificado automático', 'Renovación sin downtime'] },
    { icon: '🟢', name: 'Supabase', version: 'datos',
      role: 'Backend de datos gestionado. El muro de comentarios usa una tabla protegida con políticas de seguridad a nivel de fila (RLS).',
      features: ['Acceso por API REST', 'Protegido con RLS', 'Solo operaciones permitidas por política'],
      docs: 'https://supabase.com/docs' },
    { icon: '🐳', name: 'Docker', version: 'contenedores',
      role: 'El frontend se empaqueta en un contenedor ligero (build multi-stage) y se publica detrás del reverse proxy.',
      features: ['Build multi-stage', 'Imagen ligera', 'Despliegue reproducible'],
      docs: 'https://docs.docker.com' },
  ];

  // Pipeline a nivel conceptual (sin comandos ni rutas, por seguridad en sitio público)
  readonly pipeline = [
    { id: '01', title: 'Desarrollo local',
      detail: 'Servidor de desarrollo con recarga en caliente mientras se programa.', cmd: '', note: '' },
    { id: '02', title: 'Control de versiones',
      detail: 'Los cambios se versionan en un repositorio público de GitHub.', cmd: '', note: '' },
    { id: '03', title: 'Integración continua',
      detail: 'El servidor toma el último commit y construye la imagen del contenedor.', cmd: '', note: '' },
    { id: '04', title: 'Despliegue',
      detail: 'La nueva imagen se publica detrás del reverse proxy, sin downtime.', cmd: '', note: '' },
    { id: '05', title: 'HTTPS automático',
      detail: 'El certificado TLS se emite y renueva automáticamente (Let\'s Encrypt).', cmd: '', note: '' },
  ];
}
