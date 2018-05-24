import { Component } from '@angular/core';

@Component({
  selector: 'nb-search-showcase',
  templateUrl: './search-showcase.component.html',
  styles: [`
    :host ::ng-deep nb-layout-column {
      height: 50vw;
      background: #f4f4f7;
    }
  `],
})
export class NbSearchShowcaseComponent {
}
