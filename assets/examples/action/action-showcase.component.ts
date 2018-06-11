import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-action-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-showcase.component.html',
})
export class NbActionShowcaseComponent {
}
