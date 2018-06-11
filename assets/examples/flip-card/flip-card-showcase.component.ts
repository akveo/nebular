import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-flip-card-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flip-card-showcase.component.html',
})
export class NbFlipCardShowcaseComponent {
}
