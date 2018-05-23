import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-sidebar-fixed',
  templateUrl: './sidebar-fixed.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
      background: #f4f4f7;
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
