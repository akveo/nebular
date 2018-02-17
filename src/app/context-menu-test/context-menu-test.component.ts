import { Component } from '@angular/core';

@Component({
  selector: 'nb-context-menu-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>Context Menu</nb-card-header>
          <nb-card-body>
            <button class="btn btn-outline-danger" [nbContextMenu]="items">
              Context menu test
            </button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbContextMenuTestComponent {

  items = [
    { title: 'Profile', link: '/user', icon: 'nb-compose' },
    { title: 'Logout', link: '/popover', icon: 'nb-gear' },
  ];
}
