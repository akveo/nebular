import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-fixed-header',
  templateUrl: './layout-fixed-header.component.html',
  styles: [`
    :host nb-layout-column {
      height: 120vh;
    }
    :host nb-layout-column:first-child {
      background: #f4f4f7;
    }
  `],
})

export class NbLayoutFixedHeaderComponent {
}
