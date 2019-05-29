import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-showcase.component.html',
})
export class ButtonShowcaseComponent {
}
