import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-card-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-colors.component.html',
})
export class NbCardColorsComponent {
}
