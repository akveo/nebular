/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

import { NbMenuItem } from '../../components/menu/menu.service';
import { NbPositionedContainer, NbRenderableContainer } from '../cdk';

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
    <nb-menu class="context-menu" [items]="context.items" [tag]="context.tag"></nb-menu>
  `,
})
export class NbContextMenuComponent extends NbPositionedContainer implements NbRenderableContainer {

  @Input() items: NbMenuItem[] = [];
  @Input() tag: string;

  @Input()
  context: { items: NbMenuItem[], tag?: string } = { items: [] };


  /**
   * The method is empty since we don't need to do anything additionally
   * render is handled by change detection
   */
  renderContent() {}
}
