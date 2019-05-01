import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-outline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-outline.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonOutlineComponent {
}
