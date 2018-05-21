import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-showcase',
  templateUrl: './sidebar-showcase.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 50vw;
    }
  `],
})

export class NbSidebarShowcaseComponent {
}
