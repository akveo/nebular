import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-tabset-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabset-showcase.component.html',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class NbTabsetShowcaseComponent {
}
