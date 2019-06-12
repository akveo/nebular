import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-layout-sidebar-subheader',
  templateUrl: './layout-sidebar-subheader.component.html',
})

export class LayoutSidebarSubheaderComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
