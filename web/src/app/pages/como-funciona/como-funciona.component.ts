import { Component, computed, signal } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';
import { CopyButtonComponent } from '../../shared/interactive/copy-button.component';
import { ExpandCardComponent } from '../../shared/interactive/expand-card.component';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [SectionLayoutComponent, CopyButtonComponent, ExpandCardComponent],
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 200ms ease-out; }
  `],
  template: `
    <app-section-layout
      sectionNumber="09"
      sectionTitle="Cómo funciona el sitio"
      sectionDescription="Arquitectura técnica del proyecto: stack, despliegue, dominio y CI/CD."
      status="in-progress"
      prevLink="/entregables"
      prevLabel="Entregables"
      nextLink="/autor"
      nextLabel="Autor">

      <div class="stack-xl">
        <article class="card">
          <div class="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <h2 class="font-display text-xl font-semibold text-forest">Stack tecnológico</h2>
            <span class="text-xs text-moss font-mono">click cada tech para más info →</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            @for (t of stack; track t.name) {
              <button type="button"
                      (click)="selectedTech.set(selectedTech() === t.name ? null : t.name)"
                      class="rounded-lg border bg-gray-50 p-4 text-center transition-all"
                      [class.border-fog]="selectedTech() !== t.name"
                      [class.border-forest]="selectedTech() === t.name"
                      [class.shadow-card]="selectedTech() === t.name"
                      [class.hover:border-forest]="selectedTech() !== t.name">
                <div class="text-2xl mb-1">{{ t.icon }}</div>
                <div class="text-forest font-display font-medium text-sm">{{ t.name }}</div>
                <div class="text-xs text-moss font-mono mt-1">{{ t.version }}</div>
              </button>
            }
          </div>
          @if (selectedTech() !== null) {
            @let t = currentTech();
            @if (t) {
              <div class="mt-4 rounded-lg border border-forest bg-white p-4 animate-fade-in">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">{{ t.icon }}</span>
                    <span class="text-forest font-display font-semibold">{{ t.name }}</span>
                    <span class="tag">{{ t.version }}</span>
                  </div>
                  <button type="button" (click)="selectedTech.set(null)"
                          class="text-moss hover:text-forest text-xs">✕ cerrar</button>
                </div>
                <p class="text-sm text-pine">{{ t.role }}</p>
              </div>
            }
          }
        </article>

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

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Arquitectura en producción</h2>
          <div class="grid form-grid">
            @for (a of arch; track a.label) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">{{ a.label }}</div>
                    <div class="text-forest font-display font-medium" [class.font-mono]="a.mono">{{ a.value }}</div>
                  </div>
                  @if (a.copyable) {
                    <app-copy [text]="a.value" label="" />
                  }
                </div>
              </div>
            }
          </div>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class ComoFuncionaComponent {
  protected selectedTech = signal<string | null>(null);
  protected currentTech = computed(() => this.stack.find(t => t.name === this.selectedTech()) ?? null);

  readonly stack = [
    { icon: '🅰️',  name: 'Angular',   version: '19.x',
      role: 'Framework SPA del frontend. Standalone components, signals, lazy routing y SSR-ready.' },
    { icon: '🌬️',  name: 'Tailwind',  version: '4.x',
      role: 'CSS atomic con @theme overrides. Permite Forest DS como capa de design tokens.' },
    { icon: '🌲', name: 'Forest DS', version: 'v1.0',
      role: 'Design system propio de iagentek. Light-only, paleta forest #04202C, fuentes Sora + DM Sans.' },
    { icon: '⚡',  name: 'FastAPI',   version: 'pendiente',
      role: 'API REST + WebSockets en Python. Manejará la lógica de validación de hipótesis y los endpoints.' },
    { icon: '🟢', name: 'Supabase',  version: 'self-hosted',
      role: 'PostgreSQL + Auth + Storage. Stack supabase_maestria corriendo en el VPS de iagentek.' },
    { icon: '🔴', name: 'Redis',     version: '7.x',
      role: 'Message broker para Celery y cache de sesiones FastAPI.' },
    { icon: '🥬', name: 'Celery',    version: '5.x',
      role: 'Workers asíncronos en Python. Ejecutan tareas pesadas (entrenamiento, evaluación batch).' },
    { icon: '🐳', name: 'Docker',    version: '29.x',
      role: 'Containerización del frontend (multi-stage build → nginx alpine) y orquestación Swarm.' },
  ];

  readonly pipeline = [
    { id: '01', title: 'Desarrollo local',
      detail: 'npm start corre tailwind --watch + ng serve en paralelo.',
      cmd: 'cd web && npm start',
      note: 'Abre automáticamente http://localhost:4200' },
    { id: '02', title: 'Commit + push',
      detail: 'Cambios al repo en GitHub (azulls1/propuesta-diseno-experimental).',
      cmd: 'git add -A && git commit -m "feat: ..." && git push',
      note: 'Usa Conventional Commits para mensajes claros.' },
    { id: '03', title: 'Pull en VPS',
      detail: 'SSH al VPS y pull del último commit.',
      cmd: 'ssh -p 22000 root@<VPS-IP-REDACTED> "cd /opt/propuesta-diseno-experimental && git pull"',
      note: 'El VPS tiene el repo clonado en /opt/.' },
    { id: '04', title: 'Build Docker',
      detail: 'Multi-stage (node:20-alpine para build, nginx:1.27-alpine para serve).',
      cmd: 'docker build --no-cache --pull -t propuesta-diseno-experimental-frontend:latest ./web',
      note: 'El --no-cache fuerza un build limpio.' },
    { id: '05', title: 'Deploy stack',
      detail: 'docker stack deploy con labels Traefik + service update --force.',
      cmd: './deployment/deploy.sh --pull',
      note: 'El script gestiona todo: git pull, build, deploy y force update.' },
    { id: '06', title: 'SSL automático',
      detail: 'Traefik solicita y renueva certificado Let\'s Encrypt vía HTTP-01 challenge.',
      cmd: '',
      note: 'No requiere acción manual. Renovación automática cada 60-90 días.' },
  ];

  readonly arch = [
    { label: 'Dominio', value: 'propuesta-diseno-experimental.iagentek.com.mx', mono: true, copyable: true },
    { label: 'Orquestador', value: 'Docker Swarm (1 nodo)', mono: false, copyable: false },
    { label: 'Reverse proxy', value: 'Traefik + Let\'s Encrypt', mono: false, copyable: false },
    { label: 'Red overlay', value: 'iagenteknet', mono: true, copyable: true },
    { label: 'Imagen', value: 'propuesta-diseno-experimental-frontend:latest', mono: true, copyable: true },
    { label: 'VPS', value: '<VPS-IP-REDACTED>:22000', mono: true, copyable: true },
  ];
}
