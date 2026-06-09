import {
  Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, PLATFORM_ID, inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (open) {
      <div class="overlay flex items-center justify-center p-4"
           (click)="close()"
           style="z-index: 60">
        <div
          class="relative bg-white rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-y-auto animate-fadeInUp"
          [style.max-width]="maxWidth"
          (click)="$event.stopPropagation()"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId">

          <header class="sticky top-0 bg-white border-b border-fog/60 px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl z-10">
            <div class="min-w-0 flex-1">
              @if (eyebrow) {
                <span class="font-mono text-[10px] text-moss tracking-wider uppercase block">{{ eyebrow }}</span>
              }
              <h2 [id]="titleId"
                  class="font-display text-xl sm:text-2xl text-forest font-semibold leading-tight mt-1">
                {{ title }}
              </h2>
              @if (subtitle) {
                <p class="text-sm text-pine mt-1">{{ subtitle }}</p>
              }
            </div>
            <button
              type="button"
              (click)="close()"
              class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-pine hover:bg-gray-100 hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </header>

          <div class="px-6 py-5">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) open!: boolean;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() eyebrow?: string;
  @Input() maxWidth = '640px';
  @Output() closeRequest = new EventEmitter<void>();

  protected titleId = `modal-title-${Math.random().toString(36).slice(2, 9)}`;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.open) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  ngOnChanges(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.open ? 'hidden' : '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() { if (this.open) this.close(); }

  close() {
    this.closeRequest.emit();
  }
}
