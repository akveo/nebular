import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-tabset-width',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabset-width.component.html',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class NbTabsetWidthComponent {
}
