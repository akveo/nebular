import { Component } from '@angular/core';


@Component({
  selector: 'nb-tooltip-placements',
  templateUrl: './tooltip-placements.component.html',
  styles: [`
    :host {
      justify-content: center;
      align-items: center;
      display: flex;
      height: 10rem;
    }
    button {
      margin: 0.5rem;
    }
  `],
})
export class TooltipPlacementsComponent {
}
