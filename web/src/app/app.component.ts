import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

interface NavItem {
  route: string;
  label: string;
  criterio?: 'C1' | 'C2' | 'C3' | 'C4';
  iconPath: string;
  exact?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell">
      <!-- Mobile menu toggle (floating button) -->
      <button class="menu-toggle fixed top-3 left-3 z-50 bg-white shadow-md rounded-lg"
              (click)="toggleSidebar()" aria-label="Menú">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="w-5 h-5">
          @if (sidebarOpen()) {
            <path d="M18 6L6 18M6 6l12 12"/>
          } @else {
            <path d="M3 6h18M3 12h18M3 18h18"/>
          }
        </svg>
      </button>

      <!-- Sidebar backdrop on mobile -->
      @if (sidebarOpen()) {
        <div class="fixed inset-0 bg-black/30 z-30 lg:hidden" (click)="closeSidebar()"></div>
      }

      <!-- SIDEBAR -->
      <aside class="sidebar flex flex-col" [class.open]="sidebarOpen()">
        <!-- Brand -->
        <a routerLink="/" (click)="closeSidebar()"
           class="flex items-center gap-3 px-4 py-4 border-b border-fog/60 hover-scale">
          <div class="w-10 h-10 rounded-lg bg-forest flex items-center justify-center shrink-0 shadow-sm">
            <img src="/images/logo_ia_withe.webp" alt="iagentek" class="w-7 h-7 object-contain">
          </div>
          <div class="flex flex-col leading-tight min-w-0">
            <span class="font-display text-sm font-semibold text-forest truncate">
              Diseño Experimental
            </span>
            <span class="text-[10px] text-moss font-mono">Actividad 1 · MIA</span>
          </div>
        </a>

        <!-- Nav links -->
        <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route"
               [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
               routerLinkActive="active"
               (click)="closeSidebar()"
               class="sidebar-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                   class="sidebar-link__icon shrink-0" aria-hidden="true">
                <path [attr.d]="item.iconPath"/>
              </svg>
              <span class="flex-1">{{ item.label }}</span>
              @if (item.criterio) {
                <span class="text-[10px] font-mono text-moss">{{ item.criterio }}</span>
              }
            </a>
          }
        </nav>

        <!-- External links (GitHub, etc.) -->
        <div class="px-3 py-3 border-t border-fog/60 space-y-1">
          <a href="https://github.com/azulls1/propuesta-diseno-experimental"
             target="_blank" rel="noopener"
             class="sidebar-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 class="sidebar-link__icon shrink-0">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.67.8.55 4.57-1.53 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z"/>
            </svg>
            <span class="flex-1">Repositorio</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                 class="w-3 h-3 text-moss">
              <path d="M7 17l10-10M17 7H7m10 0v10"/>
            </svg>
          </a>
        </div>

        <!-- Footer del sidebar -->
        <div class="px-4 py-3 border-t border-fog/60 text-[10px] text-moss font-mono">
          <div class="flex items-center gap-2 mb-2 -mx-1 px-2 py-1.5 rounded bg-forest">
            <img src="/images/logo_ia_withe.webp" alt="iagentek" class="h-5 w-auto">
            <div class="flex flex-col leading-tight">
              <span class="text-[8px] text-white/60 uppercase tracking-wider">powered by</span>
              <span class="font-display text-[11px] text-white font-semibold normal-case">iagentek</span>
            </div>
          </div>
          <div>v0.2.0 · Maestría 2026</div>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="app-main">
        <main class="page page-wide">
          <router-outlet/>
        </main>

        <footer class="app-footer bg-forest text-white/80">
          <div class="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <img src="/images/logo_ia_withe.webp" alt="iagentek" class="h-8 w-auto">
              <div class="flex flex-col leading-tight text-left">
                <span class="font-display text-white font-semibold text-sm">iagentek</span>
                <span class="text-white/60 text-[11px]">Maestría en IA · Investigación · 2026</span>
              </div>
            </div>
            <div class="flex flex-col leading-tight text-right">
              <span>Propuesta de Diseño Experimental</span>
              <span class="font-mono text-white/60">propuesta-diseno-experimental</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `,
})
export class AppComponent {
  protected readonly sidebarOpen = signal(false);

  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  closeSidebar()  { this.sidebarOpen.set(false); }

  constructor(router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.closeSidebar());
  }

  protected readonly navItems: NavItem[] = [
    {
      route: '/',
      label: 'Inicio',
      iconPath: 'M3 11l9-8 9 8M5 10v10h14V10',
      exact: true,
    },
    {
      route: '/motivacion',
      label: 'Motivación',
      criterio: 'C1',
      iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    },
    {
      route: '/hipotesis',
      label: 'Hipótesis',
      criterio: 'C2',
      iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    },
    {
      route: '/metodologia',
      label: 'Metodología',
      criterio: 'C3',
      iconPath: 'M9 4v4M9 4H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4M9 8l3-4h4l3 4-3 4h-4L9 8zM12 12v8M12 20l-3 1m3-1l3 1',
    },
    {
      route: '/comparacion',
      label: 'Comparación',
      iconPath: 'M3 3v18h18M9 17V9m6 8v-4m-9 4v-2',
    },
    {
      route: '/datasets',
      label: 'Datasets',
      iconPath: 'M21 12c0 1.7-4 3-9 3s-9-1.3-9-3M21 6c0 1.7-4 3-9 3s-9-1.3-9-3 4-3 9-3 9 1.3 9 3zm0 0v12c0 1.7-4 3-9 3s-9-1.3-9-3V6',
    },
    {
      route: '/baselines',
      label: 'Baselines',
      iconPath: 'M3 6h18M3 12h12M3 18h6',
    },
    {
      route: '/redaccion',
      label: 'Redacción',
      criterio: 'C4',
      iconPath: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    },
    {
      route: '/entregables',
      label: 'Entregables',
      iconPath: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
    },
    {
      route: '/como-funciona',
      label: 'Cómo funciona',
      iconPath: 'M12 8v4l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    },
    {
      route: '/autor',
      label: 'Autor',
      iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    },
  ];
}
