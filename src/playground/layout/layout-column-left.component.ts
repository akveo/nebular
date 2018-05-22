import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-column-left',
  templateUrl: './layout-column-left.component.html',
  styles: [`
    :host ::ng-deep nb-layout-column {
      height: 50vw;
    }
    :host ::ng-deep nb-layout-column:first-child {
      background: #e3e6f9;
    }
    :host ::ng-deep nb-layout-column:nth-child(2) {
      background: #edeef7;
    }
    :host ::ng-deep nb-layout-column:last-child {
      background: #f4f4f7;
    }
  `],
})

export class NbLayoutColumnLeftComponent {
}
