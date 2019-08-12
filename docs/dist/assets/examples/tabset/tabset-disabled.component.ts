import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-tabset-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabset-disabled.component.html',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class TabsetDisabledComponent {
}
