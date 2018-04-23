import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-icon-card',
  styleUrls: ['./ngd-icon-card.component.scss'],
  template: `
    <div class="icon"></div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdIconCardComponent {

  @Input() title: string;
  @Input() description: string;
}
