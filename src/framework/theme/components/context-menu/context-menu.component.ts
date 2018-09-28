/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

import { NbMenuItem } from '../../components/menu/menu.service';
import { NbPositionedContainer } from '../cdk';

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
  template: `
    <span class="arrow"></span>
    <nb-menu class="context-menu" [items]="items" [tag]="tag"></nb-menu>
  `,
})
export class NbContextMenuComponent extends NbPositionedContainer {
  @Input() items: NbMenuItem[] = [];
  @Input() tag: string;
}
