import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-compacted',
  templateUrl: './sidebar-compacted.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 50vw;
    }
  `],
})

export class NbSidebarCompactedComponent {
}
