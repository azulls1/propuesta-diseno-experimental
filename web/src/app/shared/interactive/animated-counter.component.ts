import { Component, Input, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `<span>{{ display() }}{{ suffix }}</span>`,
})
export class CounterComponent implements OnInit {
  @Input({ required: true }) value!: number;
  @Input() suffix: string = '';
  @Input() duration: number = 1200;
  @Input() startDelay: number = 0;

  protected display = signal(0);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.display.set(this.value);
      return;
    }
    setTimeout(() => this.animate(), this.startDelay);
  }

  private animate(): void {
    const start = performance.now();
    const target = this.value;
    const tick = (now: number) => {
      const t = Math.min((now - start) / this.duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      this.display.set(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
