import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styles: [`
    :host nb-layout-header button:last-child {
      margin-left: auto;
    }
  `],
})

export class SidebarToggleComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'right');
  }
}
