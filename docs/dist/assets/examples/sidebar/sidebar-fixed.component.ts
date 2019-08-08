import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-sidebar-fixed',
  templateUrl: './sidebar-fixed.component.html',
})

export class SidebarFixedComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle();
  }
}
