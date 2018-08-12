/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input, TemplateRef, Type } from '@angular/core';
import { NbPopoverPlacement } from './helpers/model';
import { Portal } from '@angular/cdk/portal';

/**
 * Popover can be one of the following types:
 * template, component or plain js string.
 * So NbPopoverContent provides types alias for this purposes.
 * */
export type NbPopoverContent = string | TemplateRef<any> | Type<any>;

/**
 * Popover container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-fg
 * popover-bg
 * popover-border
 * popover-shadow
 * */
@Component({
  selector: 'nb-popover',
  styleUrls: ['./popover.component.scss'],
  template: `
    <span class="arrow"></span>
    <ng-template [cdkPortalOutlet]="portal"></ng-template>
  `,
})
export class NbPopoverComponent {
  @Input()
  portal: Portal<any>;

  /**
   * Popover placement relatively host element.
   * */
  @Input()
  @HostBinding('class')
  placement: NbPopoverPlacement = NbPopoverPlacement.TOP;
}
