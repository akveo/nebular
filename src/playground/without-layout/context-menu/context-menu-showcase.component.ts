import { Component } from '@angular/core';

@Component({
  selector: 'nb-context-menu-showcase',
  templateUrl: './context-menu-showcase.component.html',
  styles: [`
    :host nb-layout-header ::ng-deep nav {
      justify-content: flex-end;
    }
  `],
})

export class ContextMenuShowcaseComponent {
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
}
