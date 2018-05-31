import { Component } from '@angular/core';

@Component({
  selector: 'nb-context-menu-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>Context Menu</nb-card-header>
          <nb-card-body>
            <nb-user name="Nikita Poltoratsky" title="full-stack developer" [nbContextMenu]="items">
            </nb-user>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Context Menu</nb-card-header>
          <nb-card-body>
            <nb-user name="Nikita Poltoratsky" title="full-stack developer" [nbContextMenu]="itemsWithIcons">
            </nb-user>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbContextMenuTestComponent {

  items = [
    { title: 'Profile', link: '/user' },
    { title: 'Logout', link: '/popover' },
    { title: 'Another action' },
  ];

  itemsWithIcons = [
    { title: 'Profile', link: '/user', icon: 'nb-compose' },
    { title: 'Logout', link: '/popover', icon: 'nb-gear' },
  ];
}
