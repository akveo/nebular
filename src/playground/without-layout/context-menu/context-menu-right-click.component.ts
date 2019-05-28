/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component, HostListener, ViewChild} from '@angular/core';
import { NbContextMenuDirective } from '@nebular/theme';


@Component({
  selector: 'nb-context-menu-right-click',
  templateUrl: './context-menu-right-click.component.html',
  styles: [`
    button {
      margin-right: 1rem;
      margin-top: 1rem;
    }
  `],
})
export class ContextMenuRightClickComponent {
  @ViewChild(NbContextMenuDirective, { static: false }) contextMenu: NbContextMenuDirective;

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  open() {
    this.contextMenu.show();
    return false;
  }

  @HostListener('document:click')
  close() {
    this.contextMenu.hide();
  }

}
