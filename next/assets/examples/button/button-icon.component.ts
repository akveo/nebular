import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-icon.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonIconComponent {
}
