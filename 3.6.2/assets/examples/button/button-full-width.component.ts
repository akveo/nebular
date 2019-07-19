import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-full-width',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-full-width.component.html',
  styles: [`
    [nbButton] {
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonFullWidthComponent {
}
