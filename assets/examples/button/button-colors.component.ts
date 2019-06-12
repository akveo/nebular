import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-colors.component.html',
})
export class ButtonColorsComponent {
}
