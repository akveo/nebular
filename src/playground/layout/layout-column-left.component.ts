import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-column-left',
  templateUrl: './layout-column-left.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 50vw;
    }
  `],
})

export class NbLayoutColumnLeftComponent {
}
