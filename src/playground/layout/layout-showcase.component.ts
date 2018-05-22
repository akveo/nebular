import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-showcase',
  templateUrl: './layout-showcase.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 50vw;
    }
  `],
})

export class NbLayoutShowcaseComponent {
}
