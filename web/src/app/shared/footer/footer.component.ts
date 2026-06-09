import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-sage-200 bg-white mt-16">
      <div class="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-600 font-ui">
        <div>
          © {{ year }} · Propuesta de Diseño Experimental · Maestría en IA
        </div>
        <div class="flex items-center gap-4">
          <a href="https://iagentek.com.mx" target="_blank" rel="noopener" class="hover:text-brand-500 transition-colors">iagentek.com.mx</a>
          <span class="text-sage-300">·</span>
          <span class="mono text-sage-500">v0.2.0</span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
