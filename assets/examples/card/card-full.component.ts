import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-card-full',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-full.component.html',
})
export class NbCardFullComponent {
}
