import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-column-left',
  templateUrl: './layout-column-left.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
    }
    :host nb-layout-column:first-child {
      background: #e3e6f9;
    }
    :host nb-layout-column:nth-child(2) {
      background: #edeef7;
    }
    :host nb-layout-column:last-child {
      background: #f4f4f7;
    }
  `],
})

export class NbLayoutColumnLeftComponent {
}
