import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-layout',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-6xl px-6 pt-12 pb-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-ink-500 mb-6">
        <a routerLink="/" class="hover:text-brand-300 transition-colors">Inicio</a>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-3 w-3">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
        </svg>
        <span class="text-ink-300">Sección {{ sectionNumber }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-3 w-3">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
        </svg>
        <span class="text-white">{{ sectionTitle }}</span>
      </nav>

      <!-- Hero -->
      <div class="flex items-start gap-5">
        <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/30 text-brand-300 font-mono text-2xl font-bold">
          {{ sectionNumber }}
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="badge-brand">Sección {{ sectionNumber }}</span>
            <span class="chip">
              <span class="h-1.5 w-1.5 rounded-full" [class.bg-accent-success]="status==='done'" [class.bg-accent-warn]="status==='in-progress'" [class.bg-ink-500]="status==='pending'"></span>
              {{ statusLabel }}
            </span>
            <span class="chip mono">Peso rúbrica: {{ rubricWeight }}%</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold leading-tight">{{ sectionTitle }}</h1>
          <p class="mt-3 text-ink-300 max-w-3xl leading-relaxed">{{ sectionDescription }}</p>
        </div>
      </div>
    </div>

    <div class="section-divider"></div>

    <!-- Slot content -->
    <div class="mx-auto max-w-6xl px-6 py-10">
      <ng-content></ng-content>
    </div>

    <div class="section-divider"></div>

    <!-- Nav prev/next -->
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div class="grid gap-3 sm:grid-cols-2">
        @if (prevLink) {
          <a [routerLink]="prevLink" class="card card-hover group">
            <div class="text-xs uppercase tracking-wider text-ink-500">← Anterior</div>
            <div class="mt-1 text-lg text-white group-hover:text-brand-300 transition-colors">{{ prevLabel }}</div>
          </a>
        } @else {
          <a routerLink="/" class="card card-hover group">
            <div class="text-xs uppercase tracking-wider text-ink-500">← Inicio</div>
            <div class="mt-1 text-lg text-white group-hover:text-brand-300 transition-colors">Página principal</div>
          </a>
        }
        @if (nextLink) {
          <a [routerLink]="nextLink" class="card card-hover group text-right">
            <div class="text-xs uppercase tracking-wider text-ink-500">Siguiente →</div>
            <div class="mt-1 text-lg text-white group-hover:text-brand-300 transition-colors">{{ nextLabel }}</div>
          </a>
        } @else {
          <a routerLink="/" class="card card-hover group text-right">
            <div class="text-xs uppercase tracking-wider text-ink-500">Cerrar →</div>
            <div class="mt-1 text-lg text-white group-hover:text-brand-300 transition-colors">Volver al inicio</div>
          </a>
        }
      </div>
    </div>
  `,
})
export class SectionLayoutComponent {
  @Input({ required: true }) sectionNumber!: string;
  @Input({ required: true }) sectionTitle!: string;
  @Input({ required: true }) sectionDescription!: string;
  @Input() status: 'pending' | 'in-progress' | 'done' = 'in-progress';
  @Input() rubricWeight: number = 20;
  @Input() prevLink: string | null = null;
  @Input() prevLabel: string = '';
  @Input() nextLink: string | null = null;
  @Input() nextLabel: string = '';

  get statusLabel(): string {
    return { pending: 'Pendiente', 'in-progress': 'Borrador', done: 'Listo' }[this.status];
  }
}
