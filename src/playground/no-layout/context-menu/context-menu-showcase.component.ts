import { Component } from '@angular/core';

@Component({
  selector: 'nb-context-menu-showcase',
  templateUrl: './context-menu-showcase.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
    }
    :host nb-layout-column:first-child {
      background: #f4f4f7;
    }
    :host nb-layout-header /deep/ nav {
      justify-content: flex-end;
    }
  `],
})

export class NbContextMenuShowcaseComponent {
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
}
