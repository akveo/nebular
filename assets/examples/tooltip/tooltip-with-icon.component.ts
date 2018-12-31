import { Component } from '@angular/core';


@Component({
  selector: 'nb-tooltip-with-icon',
  templateUrl: './tooltip-with-icon.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      align-items: center;
      display: flex;
    }
    button {
      margin: 0.5rem;
    }
  `],
})
export class TooltipWithIconComponent {
}
