import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-outline.component.html',
})
export class ButtonOutlineComponent {
}
