import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-ink-800/80 mt-16">
      <div class="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
        <div>
          © {{ year }} · Propuesta de Diseño Experimental · Maestría en IA
        </div>
        <div class="flex items-center gap-4">
          <a href="https://iagentek.com.mx" target="_blank" rel="noopener" class="hover:text-brand-400 transition-colors">iagentek.com.mx</a>
          <span class="text-ink-700">·</span>
          <span class="mono">v0.1.0</span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
