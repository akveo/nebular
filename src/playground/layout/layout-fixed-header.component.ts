import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-fixed-header',
  templateUrl: './layout-fixed-header.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 120vh;
    }
  `],
})

export class NbLayoutFixedHeaderComponent {
}
