import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-layout-subheader',
  templateUrl: './layout-subheader.component.html',
})

export class LayoutSubheaderComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
