import { Component, Input, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-copy',
  standalone: true,
  template: `
    <button type="button"
            (click)="copy()"
            [disabled]="!supported"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-moss hover:text-forest transition-colors px-2.5 py-1 rounded-md border border-fog bg-white hover:border-forest hover:bg-gray-50">
      @if (copied()) {
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
             class="w-3 h-3" style="color: #059669">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        <span style="color: #059669">Copiado</span>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="w-3 h-3">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>{{ label }}</span>
      }
    </button>
  `,
})
export class CopyButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() label = 'Copiar';

  protected copied = signal(false);
  private platformId = inject(PLATFORM_ID);

  protected get supported(): boolean {
    return isPlatformBrowser(this.platformId) && typeof navigator !== 'undefined' && !!navigator.clipboard;
  }

  copy(): void {
    if (!this.supported) return;
    navigator.clipboard.writeText(this.text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    });
  }
}
