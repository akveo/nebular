import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-colors.component.html',
  styles: [`.example-items-rows { align-items: center; }`],
})
export class ButtonColorsComponent {
}
