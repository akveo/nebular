import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-text-card',
  styleUrls: ['./text-card.component.scss'],
  template: `
    <h2>
      <span>
        <i class="line" *ngFor="let item of lines"></i>
      </span>
      <span>{{ title }}</span>
    </h2>
    <p>{{ description }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTextCardComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() index: number;

  get lines() {
    return Array(++this.index);
  }
}
