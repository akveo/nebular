import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-spinner-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spinner-colors.component.html',
  styleUrls: ['./spinner-colors.component.scss'],
})
export class SpinnerColorsComponent {
}
