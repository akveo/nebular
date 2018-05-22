import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-showcase',
  templateUrl: './layout-showcase.component.html',
  styles: [`
    :host ::ng-deep nb-layout-column {
      height: 50vw;
    }
    :host ::ng-deep nb-layout-column:first-child {
      background: #edeef7;
    }
    :host ::ng-deep nb-layout-column:last-child {
      background: #f4f4f7;
    }
  `],
})

export class NbLayoutShowcaseComponent {
}
