import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 50vw;
    }
  `],
})

export class NbSidebarRightComponent {
}
