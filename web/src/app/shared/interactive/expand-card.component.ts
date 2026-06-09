import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-expand-card',
  standalone: true,
  template: `
    <div class="card transition-all"
         [class.cursor-pointer]="true"
         [class.shadow-card-hover]="open()"
         (click)="toggle()">
      <div class="flex justify-between items-start gap-4">
        <div class="flex-1 min-w-0">
          <ng-content select="[summary]"></ng-content>
        </div>
        <button type="button"
                (click)="toggle(); $event.stopPropagation()"
                [attr.aria-expanded]="open()"
                aria-label="Expandir"
                class="shrink-0 grid place-items-center w-8 h-8 rounded-md text-pine hover:text-forest hover:bg-gray-50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="w-4 h-4 transition-transform duration-300"
               [class.rotate-180]="open()">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>
      @if (open()) {
        <div class="mt-4 pt-4 border-t border-fog animate-fade-in">
          <ng-content select="[details]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 200ms ease-out; }
  `],
})
export class ExpandCardComponent {
  @Input() defaultOpen = false;
  protected open = signal(false);

  ngOnInit() { this.open.set(this.defaultOpen); }
  toggle(): void { this.open.update(v => !v); }
}
