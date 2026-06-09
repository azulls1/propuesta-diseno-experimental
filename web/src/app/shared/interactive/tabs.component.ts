import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: `
    <div class="flex gap-1 border-b border-fog mb-4 overflow-x-auto" role="tablist">
      @for (t of tabs; track t.id) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="active === t.id"
          (click)="setActive(t.id)"
          class="px-4 py-2.5 text-sm font-display font-medium border-b-2 -mb-px transition-all whitespace-nowrap flex items-center gap-1.5"
          [class.text-forest]="active === t.id"
          [class.border-forest]="active === t.id"
          [class.text-pine]="active !== t.id"
          [class.border-transparent]="active !== t.id"
          [class.hover:text-forest]="active !== t.id">
          {{ t.label }}
          @if (t.badge) {
            <span class="text-[10px] font-mono text-moss px-1.5 py-0.5 rounded bg-gray-50 border border-fog">{{ t.badge }}</span>
          }
        </button>
      }
    </div>
  `,
})
export class TabsComponent {
  @Input({ required: true }) tabs!: TabItem[];
  @Input({ required: true }) active!: string;
  @Output() activeChange = new EventEmitter<string>();

  setActive(id: string): void {
    if (this.active === id) return;
    this.active = id;
    this.activeChange.emit(id);
  }
}
