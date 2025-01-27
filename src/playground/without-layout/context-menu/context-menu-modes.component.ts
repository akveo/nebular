/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-context-menu-modes',
  templateUrl: './context-menu-modes.component.html',
  styles: [
    `
      :host nb-layout-column {
        height: 50vw;
      }

      button {
        margin-right: 1rem;
      }
    `,
  ],
  standalone: false,
})
export class ContextMenuModesComponent {
  items = [{ title: 'Profile' }, { title: 'Logout' }];
}
