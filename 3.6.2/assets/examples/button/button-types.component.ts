import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-types',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-types.component.html',
})
export class ButtonTypesComponent {
  onClick() {
    return false;
  }
}
