import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 border-b border-sage-200 bg-white/85 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a routerLink="/" class="flex items-center gap-2.5 text-brand-500 font-display font-semibold tracking-tight">
          <span class="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 3v6l-5 9a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 18l-5-9V3M9 3h6M9 14h6"/>
            </svg>
          </span>
          <span class="text-sm leading-tight">
            <span class="block text-brand-500">Propuesta</span>
            <span class="block text-sage-600 text-xs font-ui font-normal">de Diseño Experimental</span>
          </span>
        </a>

        <nav class="hidden md:flex items-center gap-1 text-sm font-ui">
          <a routerLink="/motivacion" routerLinkActive="text-brand-500 bg-sage-100"
             class="px-3 py-1.5 rounded-md text-sage-700 hover:text-brand-500 hover:bg-sage-100 transition-colors">
            Motivación
          </a>
          <a routerLink="/hipotesis" routerLinkActive="text-brand-500 bg-sage-100"
             class="px-3 py-1.5 rounded-md text-sage-700 hover:text-brand-500 hover:bg-sage-100 transition-colors">
            Hipótesis
          </a>
          <a routerLink="/metodologia" routerLinkActive="text-brand-500 bg-sage-100"
             class="px-3 py-1.5 rounded-md text-sage-700 hover:text-brand-500 hover:bg-sage-100 transition-colors">
            Metodología
          </a>
          <a routerLink="/comparacion" routerLinkActive="text-brand-500 bg-sage-100"
             class="px-3 py-1.5 rounded-md text-sage-700 hover:text-brand-500 hover:bg-sage-100 transition-colors">
            Comparación
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <span class="hidden sm:inline-flex chip">
            <span class="h-1.5 w-1.5 rounded-full bg-success animate-pulse"></span>
            Activo
          </span>
          <a href="https://github.com/azulls1/propuesta-diseno-experimental"
             target="_blank" rel="noopener"
             class="btn-ghost text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.67.8.55 4.57-1.53 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z"/>
            </svg>
            <span class="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
