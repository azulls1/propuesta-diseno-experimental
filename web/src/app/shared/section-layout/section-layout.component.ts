import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-layout',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a routerLink="/">Inicio</a>
      <span>→</span>
      <span>Sección {{ sectionNumber }}</span>
      <span>→</span>
      <span class="text-forest font-medium">{{ sectionTitle }}</span>
    </nav>

    <!-- Page header -->
    <header class="page-header">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span class="badge-forest">Sección {{ sectionNumber }}</span>
        @if (rubricWeight) {
          <span class="badge-moss font-mono">Peso: {{ rubricWeight }}%</span>
        }
        @switch (status) {
          @case ('done')        { <span class="badge-success">Listo</span> }
          @case ('in-progress') { <span class="badge-warning">Borrador</span> }
          @default              { <span class="badge-muted">Pendiente</span> }
        }
      </div>
      <h1 class="page-header__title text-2xl sm:text-3xl">{{ sectionTitle }}</h1>
      <p class="page-header__desc max-w-3xl">{{ sectionDescription }}</p>
    </header>

    <!-- Slot -->
    <div class="stack-lg">
      <ng-content></ng-content>
    </div>

    <!-- Nav prev/next -->
    <div class="mt-12 grid gap-3 sm:grid-cols-2">
      @if (prevLink) {
        <a [routerLink]="prevLink" class="card card-hover group">
          <div class="text-xs uppercase tracking-wider text-moss font-mono">← Anterior</div>
          <div class="mt-1 text-base text-forest font-display font-semibold group-hover:text-pine transition-colors">{{ prevLabel }}</div>
        </a>
      } @else {
        <a routerLink="/" class="card card-hover group">
          <div class="text-xs uppercase tracking-wider text-moss font-mono">← Inicio</div>
          <div class="mt-1 text-base text-forest font-display font-semibold group-hover:text-pine transition-colors">Página principal</div>
        </a>
      }
      @if (nextLink) {
        <a [routerLink]="nextLink" class="card card-hover group text-right">
          <div class="text-xs uppercase tracking-wider text-moss font-mono">Siguiente →</div>
          <div class="mt-1 text-base text-forest font-display font-semibold group-hover:text-pine transition-colors">{{ nextLabel }}</div>
        </a>
      } @else {
        <a routerLink="/" class="card card-hover group text-right">
          <div class="text-xs uppercase tracking-wider text-moss font-mono">Cerrar →</div>
          <div class="mt-1 text-base text-forest font-display font-semibold group-hover:text-pine transition-colors">Volver al inicio</div>
        </a>
      }
    </div>
  `,
})
export class SectionLayoutComponent {
  @Input({ required: true }) sectionNumber!: string;
  @Input({ required: true }) sectionTitle!: string;
  @Input({ required: true }) sectionDescription!: string;
  @Input() status: 'pending' | 'in-progress' | 'done' = 'in-progress';
  @Input() rubricWeight?: number;
  @Input() prevLink: string | null = null;
  @Input() prevLabel: string = '';
  @Input() nextLink: string | null = null;
  @Input() nextLabel: string = '';
}
