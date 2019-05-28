/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild } from '@angular/core';
import { NbContextMenuDirective } from '@nebular/theme';


@Component({
  selector: 'nb-context-menu-noop',
  templateUrl: './context-menu-noop.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
    }
    .menu-target {
      margin-bottom: 7rem;
    }
    button {
      margin-right: 1rem;
      margin-top: 1rem;
    }
  `],
})
export class ContextMenuNoopComponent {
  @ViewChild(NbContextMenuDirective, { static: false }) contextMenu: NbContextMenuDirective;

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  open() {
    this.contextMenu.show();
  }

  close() {
    this.contextMenu.hide();
  }

}
