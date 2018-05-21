import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-sidebar-fixed',
  templateUrl: './sidebar-fixed.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      height: 50vw;
    }
  `],
})

export class NbSidebarFixedComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle();
  }
}
