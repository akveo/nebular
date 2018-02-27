/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';
import { NbMenuItem } from '../../';

/**
 * Context menu component used as content within NbContextMenuDirective.
 *
 * @styles
 *
 * context-menu-fg
 * context-menu-active-fg
 * context-menu-active-bg
 * */
@Component({
  selector: 'nb-context-menu',
  styleUrls: ['./context-menu.component.scss'],
  template: '<nb-menu class="context-menu" [items]="items" [tag]="tag"></nb-menu>',
})
export class NbContextMenuComponent {

  @Input()
  items: NbMenuItem[] = [];

  @Input()
  tag: string;
}
