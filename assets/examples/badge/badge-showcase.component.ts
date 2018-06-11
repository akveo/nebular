import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-badge-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge-showcase.component.html',
})
export class NbBadgeShowcaseComponent {
}
