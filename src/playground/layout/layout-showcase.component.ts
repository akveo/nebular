import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-showcase',
  templateUrl: './layout-showcase.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
    }
    :host nb-layout-column:first-child {
      background: #edeef7;
    }
    :host nb-layout-column:last-child {
      background: #f4f4f7;
    }
  `],
})

export class NbLayoutShowcaseComponent {
}
