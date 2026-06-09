import { Component, Input, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ChecklistItem {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-checklist',
  standalone: true,
  template: `
    <ul class="space-y-2">
      @for (item of items(); track item.text) {
        <li (click)="toggle(item.text)"
            class="flex items-start gap-2 cursor-pointer group select-none">
          <span class="shrink-0 mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all duration-200"
                [class.bg-forest]="item.done"
                [class.border-forest]="item.done"
                [class.border-fog]="!item.done"
                [class.group-hover:border-forest]="!item.done">
            @if (item.done) {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                   class="w-2.5 h-2.5">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            }
          </span>
          <span class="text-sm flex-1 transition-colors"
                [class.text-moss]="item.done"
                [class.line-through]="item.done"
                [class.text-pine]="!item.done"
                [class.group-hover:text-forest]="!item.done">
            {{ item.text }}
          </span>
        </li>
      }
    </ul>
    @if (showProgress && items().length > 0) {
      <div class="mt-4 pt-3 border-t border-fog">
        <div class="flex items-center justify-between text-xs font-mono text-moss mb-1.5">
          <span>{{ doneCount() }} / {{ items().length }}</span>
          <span>{{ percent() }}%</span>
        </div>
        <div class="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div class="h-full rounded-full bg-forest transition-all duration-500"
               [style.width.%]="percent()"></div>
        </div>
      </div>
    }
  `,
})
export class ChecklistComponent implements OnInit {
  @Input({ required: true }) storageKey!: string;
  @Input({ required: true }) initialItems!: ChecklistItem[];
  @Input() showProgress = true;

  protected items = signal<ChecklistItem[]>([]);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
          const stored = JSON.parse(raw) as ChecklistItem[];
          // merge: keep initial items, restore done state by text match
          const merged = this.initialItems.map(it => {
            const found = stored.find(s => s.text === it.text);
            return { ...it, done: found ? found.done : it.done };
          });
          this.items.set(merged);
          return;
        }
      } catch { /* ignore */ }
    }
    this.items.set([...this.initialItems]);
  }

  toggle(text: string): void {
    const updated = this.items().map(it =>
      it.text === text ? { ...it, done: !it.done } : it
    );
    this.items.set(updated);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(updated));
      } catch { /* ignore */ }
    }
  }

  protected doneCount(): number {
    return this.items().filter(it => it.done).length;
  }
  protected percent(): number {
    const total = this.items().length;
    return total === 0 ? 0 : Math.round((this.doneCount() / total) * 100);
  }
}
