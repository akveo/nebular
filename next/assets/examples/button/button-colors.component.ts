import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-colors.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonColorsComponent {
}
