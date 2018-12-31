import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-types',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-types.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonTypesComponent {


  onClick() {
    return false;
  }
}
