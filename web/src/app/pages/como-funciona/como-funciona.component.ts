import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../shared/section-layout/section-layout.component';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [SectionLayoutComponent],
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
          <h2 class="font-display text-xl font-semibold text-forest mb-4">Stack tecnológico</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            @for (t of stack; track t.name) {
              <div class="rounded-lg border border-fog bg-gray-50 p-4 text-center">
                <div class="text-2xl mb-1">{{ t.icon }}</div>
                <div class="text-forest font-display font-medium text-sm">{{ t.name }}</div>
                <div class="text-xs text-moss font-mono mt-1">{{ t.version }}</div>
              </div>
            }
          </div>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-4">Pipeline de despliegue</h2>
          <ol class="stack-sm">
            @for (step of pipeline; track step.id) {
              <li class="flex gap-3 items-start">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-mono">
                  {{ step.id }}
                </span>
                <div class="flex-1 pt-0.5">
                  <div class="text-forest font-display font-medium">{{ step.title }}</div>
                  <div class="text-sm text-pine mt-0.5">{{ step.detail }}</div>
                  @if (step.cmd) {
                    <div class="mt-1.5 text-xs font-mono bg-gray-50 border border-fog rounded px-2 py-1 text-evergreen overflow-x-auto">{{ step.cmd }}</div>
                  }
                </div>
              </li>
            }
          </ol>
        </article>

        <article class="card">
          <h2 class="font-display text-xl font-semibold text-forest mb-3">Arquitectura en producción</h2>
          <div class="grid form-grid">
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Dominio</div>
              <div class="text-forest font-display font-mono text-sm">propuesta-diseno-experimental.iagentek.com.mx</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Orquestador</div>
              <div class="text-forest font-display font-medium">Docker Swarm (1 nodo)</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Reverse proxy</div>
              <div class="text-forest font-display font-medium">Traefik + Let's Encrypt</div>
            </div>
            <div class="rounded-lg border border-fog bg-gray-50 p-4">
              <div class="text-xs uppercase tracking-wider text-moss font-mono mb-1">Red overlay</div>
              <div class="text-forest font-display font-mono text-sm">iagenteknet</div>
            </div>
          </div>
        </article>
      </div>
    </app-section-layout>
  `,
})
export class ComoFuncionaComponent {
  readonly stack = [
    { icon: '🅰️',  name: 'Angular',     version: '19.x' },
    { icon: '🌬️',  name: 'Tailwind',    version: '4.x' },
    { icon: '🌲', name: 'Forest DS',   version: 'v1.0' },
    { icon: '⚡',  name: 'FastAPI',     version: 'pendiente' },
    { icon: '🟢', name: 'Supabase',    version: 'self-hosted' },
    { icon: '🔴', name: 'Redis',       version: '7.x' },
    { icon: '🥬', name: 'Celery',      version: '5.x' },
    { icon: '🐳', name: 'Docker',      version: '29.x' },
  ];

  readonly pipeline = [
    { id: '01', title: 'Desarrollo local',
      detail: 'npm start corre tailwind --watch + ng serve en paralelo (concurrently).',
      cmd: 'cd web && npm start  →  http://localhost:4200' },
    { id: '02', title: 'Commit + push',
      detail: 'Cambios al repo en GitHub (azulls1/propuesta-diseno-experimental).',
      cmd: 'git push origin main' },
    { id: '03', title: 'Pull en VPS',
      detail: 'SSH al VPS y pull del último commit.',
      cmd: 'ssh -p 22000 root@<VPS-IP-REDACTED> "cd /opt/propuesta-diseno-experimental && git pull"' },
    { id: '04', title: 'Build Docker',
      detail: 'Multi-stage (node:20-alpine para build, nginx:1.27-alpine para serve).',
      cmd: 'docker build --no-cache --pull -t propuesta-diseno-experimental-frontend:latest ./web' },
    { id: '05', title: 'Deploy stack',
      detail: 'docker stack deploy con labels Traefik; service update --force para garantizar refresh.',
      cmd: './deployment/deploy.sh --pull' },
    { id: '06', title: 'SSL automático',
      detail: 'Traefik solicita y renueva certificado Let\'s Encrypt vía HTTP-01 challenge.',
      cmd: '' },
  ];
}
