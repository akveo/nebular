import { Component } from '@angular/core';

@Component({
  selector: 'nb-w-footer-showcase',
  templateUrl: './layout-w-footer.component.html',
  styles: [`
    :host ::ng-deep nb-layout-column {
      height: 50vw;
    }
    :host ::ng-deep nb-layout-column:first-child {
      background: #e3e6f9;
    }
  `],
})

export class NbLayoutWFooterComponent {
}
